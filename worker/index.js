import { PATHWAY_RECIPES } from "./pathway-recipes.js";

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
const BOOTSTRAP_ADMIN_NAME = "Kevin McCann";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function emailFrom(request) {
  return (request.headers.get("Cf-Access-Authenticated-User-Email") || "").trim().toLowerCase();
}

async function currentUser(request, env) {
  const email = emailFrom(request);
  if (!email) return null;
  const bootstrapEmail = String(env.BOOTSTRAP_ADMIN_EMAIL || "").trim().toLowerCase();
  const assigned = await env.DB.prepare("SELECT email, display_name, role, school, section_id FROM users WHERE email = ? AND active = 1")
    .bind(email).first();
  if (email === bootstrapEmail) {
    if (!assigned || assigned.display_name !== BOOTSTRAP_ADMIN_NAME || assigned.role !== "admin") {
      await env.DB.prepare("INSERT INTO users (email, display_name, role, school, active, updated_at) VALUES (?, ?, 'admin', 'Districtwide', 1, CURRENT_TIMESTAMP) ON CONFLICT(email) DO UPDATE SET display_name = excluded.display_name, role = 'admin', school = 'Districtwide', section_id = NULL, active = 1, updated_at = CURRENT_TIMESTAMP")
        .bind(email, BOOTSTRAP_ADMIN_NAME).run();
    }
    return { email, display_name: BOOTSTRAP_ADMIN_NAME, role: "admin", school: "Districtwide", section_id: null };
  }
  if (assigned) return assigned;
  return null;
}

function parseState(row) {
  try { return normalizeState(JSON.parse(row.state_json)); }
  catch { return normalizeState({}); }
}

function normalizeState(state = {}) {
  state.requests ||= [];
  state.events ||= [];
  state.recipeSubmissions ||= [];
  state.approvedRecipes ||= [];
  return state;
}

function recipeLibrary(state) {
  const revisions = new Map(PATHWAY_RECIPES.map(recipe => [recipe.id, recipe]));
  for (const recipe of state.approvedRecipes || []) revisions.set(recipe.id, recipe);
  return [...revisions.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function safeLines(value, limit = 120) {
  const lines = Array.isArray(value) ? value : String(value || "").split(/\r?\n/);
  return lines.map(line => String(line).trim()).filter(Boolean).slice(0, limit);
}

function submissionRecord(body, user) {
  const name = String(body?.name || "").trim().slice(0, 160);
  if (!name) return null;
  const numericYield = Number(body?.yield || 0);
  return {
    id: `submission-${crypto.randomUUID()}`,
    name,
    course: "Advanced Culinary student research",
    unit: null,
    version: 0,
    status: "Awaiting review",
    yield: numericYield > 0 ? numericYield : null,
    portion: String(body?.portion || "").trim().slice(0, 160),
    ingredients: safeLines(body?.ingredients),
    equipment: safeLines(body?.equipment, 50),
    procedure: safeLines(body?.procedure),
    allergens: String(body?.allergens || "").trim().slice(0, 800),
    sourceNotes: String(body?.sourceNotes || "").trim().slice(0, 2000),
    testNotes: String(body?.testNotes || "").trim().slice(0, 2000),
    submittedBy: user.display_name,
    submittedByEmail: user.email,
    submittedAt: new Date().toISOString(),
    reviewedBy: null,
    reviewedAt: null,
    reviewNote: ""
  };
}

function eventMap(state) {
  return new Map((state.events || []).map(event => [String(event.id), event]));
}

function canEditEvent(user, event) {
  return user.role === "admin" || event.owner === user.display_name || (event.collaborators || []).includes(user.display_name);
}

function validateTeacherChange(user, previous, next) {
  const before = eventMap(previous);
  const after = eventMap(next);
  for (const old of before.values()) {
    if (!after.has(String(old.id)) && user.role !== "admin") return "Only an administrator can remove an Event Order.";
  }
  for (const event of next.events || []) {
    const old = before.get(String(event.id));
    if (!old) {
      if (!["admin", "teacher"].includes(user.role) || (user.role !== "admin" && event.owner !== user.display_name)) return "New Event Orders must be owned by the teacher creating them.";
      continue;
    }
    if (JSON.stringify(old) === JSON.stringify(event)) continue;
    if (!canEditEvent(user, old)) return `You do not have edit access to ${old.name || "this event"}.`;
    if (old.owner !== event.owner && user.role !== "admin" && old.owner !== user.display_name) return "Only the Event Order owner can transfer ownership.";
    const publicationChanged = old.version !== event.version || old.publishedAt !== event.publishedAt || (old.stage !== event.stage && event.stage === "Published");
    if (publicationChanged && user.role !== "admin" && old.owner !== user.display_name) return "Only the Event Order owner can publish a revision.";
  }
  return null;
}

async function audit(env, user, action, entityType, entityId, detail = {}) {
  await env.DB.prepare("INSERT INTO audit_log (actor_email, action, entity_type, entity_id, detail_json) VALUES (?, ?, ?, ?, ?)")
    .bind(user.email, action, entityType, entityId || null, JSON.stringify(detail)).run();
}

async function getState(env) {
  return env.DB.prepare("SELECT revision, state_json, updated_at, updated_by FROM app_state WHERE id = 1").first();
}

async function handleApi(request, env, url) {
  const user = await currentUser(request, env);
  if (!user) return json({ error: "Your district account is not assigned to Advanced Culinary yet." }, 403);

  if (url.pathname === "/api/session" && request.method === "GET") return json({ user });

  if (url.pathname === "/api/recipes" && request.method === "GET") {
    const row = await getState(env);
    const state = parseState(row);
    return json({ recipes: recipeLibrary(state), revision: row.revision });
  }

  if (url.pathname === "/api/recipe-submissions" && request.method === "POST") {
    const body = await request.json().catch(() => null);
    const submission = submissionRecord(body, user);
    if (!submission || !submission.ingredients.length || !submission.procedure.length) {
      return json({ error: "A recipe title, ingredient list, and procedure are required." }, 400);
    }
    const row = await getState(env);
    const state = parseState(row);
    state.recipeSubmissions.push(submission);
    const result = await env.DB.prepare("UPDATE app_state SET revision = revision + 1, state_json = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ? WHERE id = 1 AND revision = ?")
      .bind(JSON.stringify(state), user.email, row.revision).run();
    if (!result.meta.changes) return json({ error: "Another update arrived first. Please submit again." }, 409);
    await audit(env, user, "submit", "recipe_submission", submission.id, { name: submission.name });
    return json({ ok: true, submission, revision: row.revision + 1 }, 201);
  }

  const recipeReviewMatch = url.pathname.match(/^\/api\/recipe-submissions\/([^/]+)$/);
  if (recipeReviewMatch && request.method === "PATCH") {
    if (!['admin', 'teacher'].includes(user.role)) return json({ error: "Teacher access required." }, 403);
    const body = await request.json().catch(() => null);
    const decision = String(body?.decision || "");
    if (!["Approve", "Return for revision"].includes(decision)) return json({ error: "Choose a valid review decision." }, 400);
    const row = await getState(env);
    const state = parseState(row);
    const submission = state.recipeSubmissions.find(item => item.id === decodeURIComponent(recipeReviewMatch[1]));
    if (!submission) return json({ error: "Recipe submission not found." }, 404);
    submission.status = decision === "Approve" ? "Approved" : "Returned for revision";
    submission.reviewedBy = user.display_name;
    submission.reviewedAt = new Date().toISOString();
    submission.reviewNote = String(body?.note || "").trim().slice(0, 1000);
    if (decision === "Approve") {
      const numericYield = Number(submission.yield || 0);
      if (!(numericYield > 0) || !submission.portion) return json({ error: "Confirm a standard yield and portion before approval." }, 400);
      const recipeId = `approved-${submission.id.replace(/^submission-/, "")}`;
      const existing = state.approvedRecipes.find(item => item.id === recipeId);
      const version = existing ? Number(existing.version || 1) + 1 : 1;
      const approved = {
        id: recipeId, name: submission.name, sourceName: submission.name, course: submission.course,
        unit: submission.unit, version, approvalStatus: "Approved for production", yield: numericYield,
        portion: submission.portion, ingredients: submission.ingredients, equipment: submission.equipment,
        procedure: submission.procedure, allergens: submission.allergens, source: "Student research · teacher approved",
        sourceNotes: submission.sourceNotes, approvedBy: user.display_name, approvedAt: submission.reviewedAt
      };
      const index = state.approvedRecipes.findIndex(item => item.id === recipeId);
      if (index >= 0) state.approvedRecipes[index] = approved; else state.approvedRecipes.push(approved);
      submission.approvedRecipeId = recipeId;
      submission.approvedVersion = version;
    }
    const result = await env.DB.prepare("UPDATE app_state SET revision = revision + 1, state_json = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ? WHERE id = 1 AND revision = ?")
      .bind(JSON.stringify(state), user.email, row.revision).run();
    if (!result.meta.changes) return json({ error: "Another update arrived first. Reload and review again." }, 409);
    await audit(env, user, decision === "Approve" ? "approve" : "return", "recipe_submission", submission.id, { name: submission.name });
    return json({ ok: true, submission, state, recipes: recipeLibrary(state), revision: row.revision + 1 });
  }

  if (url.pathname === "/api/state" && request.method === "GET") {
    if (!['admin', 'teacher'].includes(user.role)) return json({ error: "Teacher access required." }, 403);
    const row = await getState(env);
    const state = parseState(row);
    return json({ state, recipes: recipeLibrary(state), revision: row.revision, updatedAt: row.updated_at, user });
  }

  if (url.pathname === "/api/state" && request.method === "PUT") {
    if (!['admin', 'teacher'].includes(user.role)) return json({ error: "Teacher access required." }, 403);
    const body = await request.json().catch(() => null);
    if (!body || !body.state || !Number.isInteger(body.revision)) return json({ error: "Invalid state update." }, 400);
    const row = await getState(env);
    if (row.revision !== body.revision) return json({ error: "This Event Order changed on another device. Reload before saving again.", revision: row.revision }, 409);
    const previous = parseState(row);
    const violation = validateTeacherChange(user, previous, body.state);
    if (violation) return json({ error: violation }, 403);
    delete body.state.activeTeacher;
    const result = await env.DB.prepare("UPDATE app_state SET revision = revision + 1, state_json = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ? WHERE id = 1 AND revision = ?")
      .bind(JSON.stringify(body.state), user.email, body.revision).run();
    if (!result.meta.changes) return json({ error: "The Event Order changed while saving. Reload and try again." }, 409);
    await audit(env, user, "update", "application_state", "1", { fromRevision: body.revision, toRevision: body.revision + 1 });
    return json({ ok: true, revision: body.revision + 1 });
  }

  if (url.pathname === "/api/student/events" && request.method === "GET") {
    const row = await getState(env);
    const state = parseState(row);
    const events = (state.events || []).filter(event => event.publishedAt && event.stage !== "Draft").map(event => ({
      id: event.id, name: event.name, customer: event.customer, school: event.school, serviceDate: event.serviceDate,
      serviceTime: event.serviceTime, guestCount: event.guestCount, serviceFormat: event.serviceFormat,
      requirements: event.requirements, allergens: event.allergens, stage: event.stage, version: event.version,
      publishedAt: event.publishedAt, menu: event.menu,
      tasks: (event.tasks || []).filter(task => user.role !== "student" || (user.section_id && task.section === user.section_id))
    }));
    return json({ events, revision: row.revision, user });
  }

  const progressMatch = url.pathname.match(/^\/api\/tasks\/([^/]+)\/progress$/);
  if (progressMatch && request.method === "PATCH") {
    const body = await request.json().catch(() => null);
    const row = await getState(env);
    const state = parseState(row);
    let targetEvent;
    let task;
    for (const event of state.events || []) {
      const found = (event.tasks || []).find(item => String(item.id) === decodeURIComponent(progressMatch[1]));
      if (found) { targetEvent = event; task = found; break; }
    }
    if (!task || !targetEvent?.publishedAt) return json({ error: "Published task not found." }, 404);
    if (user.role === "student" && user.section_id && task.section !== user.section_id) return json({ error: "That task belongs to another section." }, 403);
    if (user.role !== "student" && !canEditEvent(user, targetEvent)) return json({ error: "You do not have access to update this event." }, 403);
    const allowedStatuses = ["Not started", "In progress", "Blocked", "Ready for handoff", "Complete"];
    const progress = body?.progress || {};
    if (!allowedStatuses.includes(progress.status)) return json({ error: "Invalid task status." }, 400);
    task.progress = {
      status: progress.status,
      quantity: Math.max(0, Number(progress.quantity || 0)), usableYield: Math.max(0, Number(progress.usableYield || 0)),
      waste: Math.max(0, Number(progress.waste || 0)), storage: String(progress.storage || "").slice(0, 300),
      issue: String(progress.issue || "").slice(0, 500), updatedAt: new Date().toISOString(), updatedBy: user.display_name
    };
    if (["In progress", "Blocked", "Ready for handoff"].includes(task.progress.status)) targetEvent.stage = "In production";
    const result = await env.DB.prepare("UPDATE app_state SET revision = revision + 1, state_json = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ? WHERE id = 1 AND revision = ?")
      .bind(JSON.stringify(state), user.email, row.revision).run();
    if (!result.meta.changes) return json({ error: "Another update arrived first. Please retry." }, 409);
    await audit(env, user, "update_progress", "task", task.id, { eventId: targetEvent.id, status: task.progress.status });
    return json({ ok: true, revision: row.revision + 1, progress: task.progress });
  }

  if (url.pathname === "/api/users" && request.method === "GET") {
    if (user.role !== "admin") return json({ error: "Administrator access required." }, 403);
    const result = await env.DB.prepare("SELECT email, display_name, role, school, section_id, active FROM users ORDER BY role, display_name").all();
    return json({ users: result.results });
  }

  if (url.pathname === "/api/users" && request.method === "POST") {
    if (user.role !== "admin") return json({ error: "Administrator access required." }, 403);
    const body = await request.json().catch(() => null);
    const email = String(body?.email || "").trim().toLowerCase();
    const role = String(body?.role || "student");
    if (!email.endsWith("@greececsd.org") || !["admin", "teacher", "student"].includes(role) || !body?.displayName) return json({ error: "Enter a district email, name, and valid role." }, 400);
    await env.DB.prepare("INSERT INTO users (email, display_name, role, school, section_id, active, updated_at) VALUES (?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP) ON CONFLICT(email) DO UPDATE SET display_name = excluded.display_name, role = excluded.role, school = excluded.school, section_id = excluded.section_id, active = 1, updated_at = CURRENT_TIMESTAMP")
      .bind(email, String(body.displayName).trim(), role, body.school || null, body.sectionId || null).run();
    await audit(env, user, "upsert", "user", email, { role, school: body.school, sectionId: body.sectionId });
    return json({ ok: true }, 201);
  }

  return json({ error: "Not found." }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith("/api/")) return await handleApi(request, env, url);
      if (url.pathname === "/teacher" || url.pathname.startsWith("/teacher/")) {
        const user = await currentUser(request, env);
        if (!user || !['admin', 'teacher'].includes(user.role)) return new Response("Teacher access is restricted to assigned GCSD Culinary staff.", { status: 403 });
      }
      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error(error);
      return url.pathname.startsWith("/api/") ? json({ error: "The Advanced Culinary service is temporarily unavailable." }, 500) : new Response("Service unavailable", { status: 500 });
    }
  }
};

export { canEditEvent, validateTeacherChange };

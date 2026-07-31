const json = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

function parseJson(value, fallback = {}) { try { return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
function displayName(email, teacherRoles) { return teacherRoles[email]?.name || email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }
function session(request, env) {
  const email = (request.headers.get("cf-access-authenticated-user-email") || request.headers.get("oai-authenticated-user-email") || "").trim().toLowerCase();
  if (!email) return null;
  const teachers = parseJson(env.TEACHER_ROLES, {});
  const roster = parseJson(env.SECTION_ROSTER, {});
  const teacher = teachers[email];
  return teacher ? { email, displayName: teacher.name || displayName(email, teachers), role: teacher.role || "teacher", schools: teacher.schools || [], sections: teacher.sections || [] }
    : { email, displayName: displayName(email, teachers), role: "student", schools: [], sections: roster[email] || [] };
}
async function ensureSchema(db) {
  await db.prepare("CREATE TABLE IF NOT EXISTS workspace_state (id INTEGER PRIMARY KEY CHECK (id = 1), revision INTEGER NOT NULL DEFAULT 0, state_json TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL)").run();
  await db.prepare("CREATE TABLE IF NOT EXISTS audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT NOT NULL, actor_email TEXT NOT NULL, event_id TEXT, detail_json TEXT NOT NULL, created_at TEXT NOT NULL)").run();
}
async function readState(db) {
  await ensureSchema(db);
  const row = await db.prepare("SELECT revision, state_json, updated_at, updated_by FROM workspace_state WHERE id = 1").first();
  return row ? { revision: Number(row.revision), state: parseJson(row.state_json, { events: [], requests: [] }), updatedAt: row.updated_at, updatedBy: row.updated_by } : { revision: 0, state: { events: [], requests: [] } };
}
function published(event) { return Boolean(event.publishedAt) || ["Published", "In production", "Ready for service", "Closeout required", "Completed"].includes(event.stage); }
function studentState(state, user) {
  return { events: (state.events || []).filter(published).map(event => ({
    id:event.id,name:event.name,type:event.type,school:event.school,customer:event.customer,serviceDate:event.serviceDate,serviceTime:event.serviceTime,guestCount:event.guestCount,serviceFormat:event.serviceFormat,requirements:event.requirements,allergens:event.allergens,stage:event.stage,version:event.version,publishedAt:event.publishedAt,
    menu:(event.menu||[]).map(item=>({name:item.name,required:item.required,yield:item.yield,portion:item.portion,status:item.status})),
    tasks:(event.tasks||[]).map(task=>({...task,progress:{...task.progress,issue: user.sections.includes(task.section) ? task.progress?.issue || "" : ""}}))
  })) };
}
function ownerNameFor(event) { return event.owner || ""; }
function changedPublication(before, after) { return Number(before?.version || 0) !== Number(after?.version || 0) || before?.publishedAt !== after?.publishedAt || before?.stage !== after?.stage && after?.stage === "Published"; }
async function audit(db, action, user, eventId, detail = {}) { await db.prepare("INSERT INTO audit_log (action, actor_email, event_id, detail_json, created_at) VALUES (?, ?, ?, ?, ?)").bind(action, user.email, eventId || null, JSON.stringify(detail), new Date().toISOString()).run(); }

async function handleApi(request, env) {
  const user = session(request, env);
  if (!user) return json({ error: "Authentication required" }, 401);
  const url = new URL(request.url);
  if (url.pathname === "/api/session" && request.method === "GET") return json({ session: user });
  if (url.pathname === "/api/state" && request.method === "GET") {
    const current = await readState(env.DB);
    return json({ ...current, state: user.role === "student" ? studentState(current.state, user) : current.state, session: user });
  }
  if (url.pathname === "/api/state" && request.method === "PUT") {
    if (user.role === "student" || user.role === "viewer") return json({ error: "Teacher write access required" }, 403);
    const body = await request.json(); const current = await readState(env.DB);
    if (Number(body.revision) !== current.revision) return json({ error: "Workspace changed", revision: current.revision }, 409);
    if (!body.state || !Array.isArray(body.state.events)) return json({ error: "Invalid workspace state" }, 400);
    for (const after of body.state.events) {
      const before = current.state.events?.find(event => event.id === after.id);
      if (before && changedPublication(before, after) && ownerNameFor(before) !== user.displayName) return json({ error: "Only the Event Order owner may publish or revise this event" }, 403);
    }
    const nextRevision = current.revision + 1; const now = new Date().toISOString();
    await env.DB.prepare("INSERT INTO workspace_state (id, revision, state_json, updated_at, updated_by) VALUES (1, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET revision=excluded.revision, state_json=excluded.state_json, updated_at=excluded.updated_at, updated_by=excluded.updated_by").bind(nextRevision, JSON.stringify(body.state), now, user.email).run();
    await audit(env.DB, "workspace.save", user, null, { revision: nextRevision });
    return json({ ok: true, revision: nextRevision, updatedAt: now });
  }
  if (url.pathname === "/api/student-update" && request.method === "POST") {
    if (user.role !== "student" && user.role !== "teacher" && user.role !== "owner") return json({ error: "Update access required" }, 403);
    const body = await request.json(); const current = await readState(env.DB); const event = current.state.events?.find(item => item.id === body.eventId); const task = event?.tasks?.[Number(body.taskIndex)];
    if (!event || !published(event) || !task) return json({ error: "Published task not found" }, 404);
    if (user.role === "student" && !user.sections.includes(task.section)) return json({ error: "This task is not assigned to your section" }, 403);
    const allowedStatuses = ["Not started","In progress","Blocked","Ready for handoff","Complete"];
    task.progress = { status: allowedStatuses.includes(body.status) ? body.status : "Not started", quantity: Math.max(0,Number(body.quantity)||0), usableYield: Math.max(0,Number(body.usableYield)||0), waste: Math.max(0,Number(body.waste)||0), storage:String(body.storage||"").slice(0,240), issue:String(body.issue||"").slice(0,500), updatedAt:new Date().toISOString(), updatedBy:user.email };
    event.stage = "In production"; const nextRevision=current.revision+1; const now=new Date().toISOString();
    await env.DB.prepare("UPDATE workspace_state SET revision = ?, state_json = ?, updated_at = ?, updated_by = ? WHERE id = 1").bind(nextRevision,JSON.stringify(current.state),now,user.email).run();
    await audit(env.DB,"task.update",user,event.id,{taskIndex:Number(body.taskIndex),status:task.progress.status});
    return json({ ok:true, revision:nextRevision, state:user.role==="student"?studentState(current.state,user):current.state });
  }
  return json({ error: "Not found" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) return handleApi(request, env);
    return env.ASSETS.fetch(request);
  }
};

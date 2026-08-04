import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/index.js";

class FakeStatement {
  constructor(db, sql) { this.db = db; this.sql = sql; this.args = []; }
  bind(...args) { this.args = args; return this; }
  async first() {
    if (this.sql.startsWith("SELECT email")) return this.db.users.get(String(this.args[0]).toLowerCase()) || null;
    if (this.sql.startsWith("SELECT revision")) return { ...this.db.stateRow };
    return null;
  }
  async all() { return { results: [...this.db.users.values()] }; }
  async run() {
    if (this.sql.startsWith("UPDATE app_state")) {
      const [stateJson, updatedBy, expected] = this.args;
      if (expected !== this.db.stateRow.revision) return { meta: { changes: 0 } };
      this.db.stateRow = { revision: expected + 1, state_json: stateJson, updated_at: new Date().toISOString(), updated_by: updatedBy };
      return { meta: { changes: 1 } };
    }
    if (this.sql.startsWith("INSERT INTO users")) {
      const [email, display_name, role, school, section_id] = this.args;
      this.db.users.set(email, { email, display_name, role, school, section_id, active: 1 });
    }
    return { meta: { changes: 1 } };
  }
}

class FakeDB {
  constructor(state) {
    this.stateRow = { revision: 0, state_json: JSON.stringify(state), updated_at: new Date().toISOString(), updated_by: "system" };
    this.users = new Map([
      ["admin@district.example", { email: "admin@district.example", display_name: "Admin", role: "admin", school: "Arcadia", section_id: null }],
      ["student@district.example", { email: "student@district.example", display_name: "Student One", role: "student", school: "Arcadia", section_id: "adv-p2" }]
    ]);
  }
  prepare(sql) { return new FakeStatement(this, sql); }
}

const event = {
  id: "event-1", name: "Dinner", owner: "Kevin McCann", collaborators: [], stage: "Published", version: 1,
  publishedAt: "2026-08-01T12:00:00Z", menu: [], tasks: [
    { id: "task-p2", section: "adv-p2", name: "Pasta", progress: { status: "Not started" } },
    { id: "task-p5", section: "adv-p5", name: "Sauce", progress: { status: "Not started" } }
  ]
};
const request = (path, email, init = {}) => new Request(`https://example.test${path}`, { ...init, headers: { ...(init.headers || {}), ...(email ? { "Cf-Access-Authenticated-User-Email": email } : {}) } });

test("API rejects an unassigned request", async () => {
  const env = { DB: new FakeDB({ requests: [], events: [event] }) };
  const response = await worker.fetch(request("/api/state"), env);
  assert.equal(response.status, 403);
});

test("shared recipe library includes the complete Culinary Arts 1 & 2 source set", async () => {
  const env = { DB: new FakeDB({ requests: [], events: [] }) };
  const response = await worker.fetch(request("/api/recipes", "student@district.example"), env);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.recipes.filter(recipe => recipe.course === "Culinary Arts 1 & 2").length, 37);
  assert.ok(body.recipes.some(recipe => recipe.name === "Rosemary Focaccia"));
  assert.ok(body.recipes.some(recipe => recipe.name === "Crème Brûlée"));
  const pathwayRecipes = body.recipes.filter(recipe => recipe.course === "Culinary Arts 1 & 2");
  assert.equal(pathwayRecipes.every(recipe => Number(recipe.yield) > 0 && recipe.portion), true);
  assert.equal(pathwayRecipes.find(recipe => recipe.name === "Cinnamon Rolls").yield, 16);
  assert.equal(pathwayRecipes.find(recipe => recipe.name === "Cinnamon Rolls").portion, "1 cinnamon roll");
  assert.equal(pathwayRecipes.find(recipe => recipe.name === "Whipped Cream").yield, 2);
  assert.equal(pathwayRecipes.find(recipe => recipe.name === "Whipped Cream").portion, "1 cup finished whipped cream");
  assert.equal(pathwayRecipes.every(recipe => Array.isArray(recipe.equipment) && recipe.equipment.length > 0), true);
  assert.ok(body.supplierCatalog.length >= 50);
  assert.equal(body.supplierCatalog.every(product => product.vendor === "Wegmans" && product.label && product.price > 0 && product.checkedAt), true);
});

test("student research requires teacher review before entering the recipe library", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  const env = { DB: db };
  const submitted = await worker.fetch(request("/api/recipe-submissions", "student@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
      eventId: "event-1", name: "Student Soup", yield: 8, portion: "8 oz bowl", ingredients: "2 lb squash\n1 qt stock",
      equipment: "Stockpot", procedure: "Roast squash\nSimmer with stock", allergens: "None identified"
    })
  }), env);
  assert.equal(submitted.status, 201);
  const submission = await submitted.json();
  let library = await (await worker.fetch(request("/api/recipes", "student@district.example"), env)).json();
  assert.equal(library.recipes.some(recipe => recipe.name === "Student Soup"), false);
  const approved = await worker.fetch(request(`/api/recipe-submissions/${submission.submission.id}`, "admin@district.example", {
    method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ decision: "Approve", note: "Standardized for production." })
  }), env);
  assert.equal(approved.status, 200);
  library = await (await worker.fetch(request("/api/recipes", "student@district.example"), env)).json();
  assert.equal(library.recipes.find(recipe => recipe.name === "Student Soup").approvalStatus, "Approved for production");
});

test("returned recipe preserves feedback and creates a new revision", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  const env = { DB: db };
  const firstResponse = await worker.fetch(request("/api/recipe-submissions", "student@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
      eventId: "event-1", name: "Student Tart", yield: 8, portion: "1 tart", ingredients: "8 tart shells\n2 cups filling",
      equipment: "Sheet pan", procedure: "Fill shells\nBake", allergens: "Wheat, dairy"
    })
  }), env);
  const first = (await firstResponse.json()).submission;
  const returned = await worker.fetch(request(`/api/recipe-submissions/${first.id}`, "admin@district.example", {
    method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ decision: "Return for revision", note: "Add the cooling procedure." })
  }), env);
  assert.equal(returned.status, 200);
  const revisedResponse = await worker.fetch(request("/api/recipe-submissions", "student@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
      parentSubmissionId: first.id, eventId: "event-1", name: "Student Tart", yield: 8, portion: "1 tart", ingredients: "8 tart shells\n2 cups filling",
      equipment: "Sheet pan\nCooling rack", procedure: "Fill shells\nBake\nCool on rack", allergens: "Wheat, dairy"
    })
  }), env);
  assert.equal(revisedResponse.status, 201);
  const revised = (await revisedResponse.json()).submission;
  assert.equal(revised.revision, 2);
  assert.equal(revised.threadId, first.threadId);
  const own = await (await worker.fetch(request("/api/recipe-submissions", "student@district.example"), env)).json();
  assert.deepEqual(new Set(own.submissions.map(item => item.status)), new Set(["Revised and resubmitted", "Awaiting review"]));
  assert.equal(own.submissions.find(item => item.id === first.id).reviewNote, "Add the cooling procedure.");
});

test("declined recipe stays out of library and approved recipe requires deliberate Event Order addition", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  const env = { DB: db };
  const submit = async name => (await (await worker.fetch(request("/api/recipe-submissions", "student@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ eventId: "event-1", name, yield: 12, portion: "1 piece", ingredients: "12 oz dough", equipment: "Sheet pan", procedure: "Shape\nBake", allergens: "Wheat" })
  }), env)).json()).submission;
  const declined = await submit("Declined Bread");
  const declineResponse = await worker.fetch(request(`/api/recipe-submissions/${declined.id}`, "admin@district.example", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ decision: "Decline", note: "Duplicate menu item." }) }), env);
  assert.equal(declineResponse.status, 200);
  let library = await (await worker.fetch(request("/api/recipes", "student@district.example"), env)).json();
  assert.equal(library.recipes.some(recipe => recipe.name === "Declined Bread"), false);

  const approvedSubmission = await submit("Approved Bread");
  await worker.fetch(request(`/api/recipe-submissions/${approvedSubmission.id}`, "admin@district.example", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ decision: "Approve", note: "Ready." }) }), env);
  assert.equal(JSON.parse(db.stateRow.state_json).events[0].menu.length, 0);
  const added = await worker.fetch(request(`/api/recipe-submissions/${approvedSubmission.id}/add-to-event`, "admin@district.example", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ required: 30 }) }), env);
  assert.equal(added.status, 200);
  const menu = JSON.parse(db.stateRow.state_json).events[0].menu;
  assert.equal(menu.length, 1);
  assert.equal(menu[0].required, 30);
  assert.equal(menu[0].recipeSnapshot.name, "Approved Bread");
});

test("bootstrap administrator is normalized to Kevin McCann", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  db.users.set("kevin@example.test", { email: "kevin@example.test", display_name: "Culinary Administrator", role: "admin", school: "Districtwide", section_id: null });
  const env = { DB: db, BOOTSTRAP_ADMIN_EMAIL: "kevin@example.test" };
  const response = await worker.fetch(request("/api/session", "kevin@example.test"), env);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.user.display_name, "Kevin McCann");
  assert.equal(body.user.role, "admin");
});

test("student receives only the assigned section packet", async () => {
  const env = { DB: new FakeDB({ requests: [], events: [event] }) };
  const response = await worker.fetch(request("/api/student/events", "student@district.example"), env);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(body.events[0].tasks.map(task => task.id), ["task-p2"]);
});

test("student progress reaches shared state and cannot cross sections", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  const env = { DB: db };
  const good = await worker.fetch(request("/api/tasks/task-p2/progress", "student@district.example", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ progress: { status: "In progress", quantity: 10, usableYield: 8, waste: 2, storage: "Rack A" } }) }), env);
  assert.equal(good.status, 200);
  assert.equal(JSON.parse(db.stateRow.state_json).events[0].tasks[0].progress.updatedBy, "Student One");
  const denied = await worker.fetch(request("/api/tasks/task-p5/progress", "student@district.example", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ progress: { status: "Complete" } }) }), env);
  assert.equal(denied.status, 403);
});

test("student contributionKey targets the correct team assignment", async () => {
  const multiTeamEvent = {
    id: "event-2",
    name: "Breakfast",
    owner: "Kevin McCann",
    collaborators: [],
    stage: "Published",
    version: 1,
    publishedAt: "2026-08-01T12:00:00Z",
    menu: [{
      name: "Cinnamon Rolls",
      required: 100,
      yield: 16,
      portion: "1 roll",
      ingredients: ["flour", "yeast"],
      equipment: ["mixer"],
      procedure: ["Mix", "Bake"],
      allergens: "Wheat, Milk",
      recipeId: "ca12-014-cinnamon-rolls"
    }],
    tasks: [{
      id: "task-mix",
      name: "Mix dough",
      menuIndex: 0,
      plannedQuantity: 5,
      plannedUnit: "batches",
      assignmentRecords: [{
        id: "assign-mix-1",
        sectionId: "kevin-advanced-p3",
        workDate: "2026-09-21",
        teamIds: ["kevin-p3-team-a", "kevin-p3-team-b"],
        kitchen: "Kitchen 2",
        stationDuty: "kitchen-production",
        stationSequence: 1,
        allocatedQuantity: 3,
        allocatedUnit: "batches"
      }],
      assignmentProgress: {}
    }]
  };
  const db = new FakeDB({
    requests: [],
    events: [multiTeamEvent],
    sections: [{
      id: "kevin-advanced-p3",
      name: "McCann Advanced - Period 3",
      teacher: "Kevin McCann",
      course: "Advanced Culinary Arts",
      period: 3,
      allowedPeriods: [3],
      active: true,
      teams: [
        { id: "kevin-p3-team-a", name: "Team A", students: ["Ava Rivera"] },
        { id: "kevin-p3-team-b", name: "Team B", students: ["Riley Chen"] }
      ]
    }]
  });
  db.users.set("student-p3@district.example", {
    email: "student-p3@district.example",
    display_name: "Student P3",
    role: "student",
    school: "Arcadia",
    section_id: "kevin-advanced-p3",
    active: 1
  });
  const env = { DB: db };
  const key = "task-mix::assign-mix-1::kevin-p3-team-b";
  const response = await worker.fetch(request("/api/tasks/task-mix/progress", "student-p3@district.example", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contributionKey: key,
      progress: { status: "Complete", quantity: 2, waste: 0, wasteCategory: "Trim", recoveryAction: "None needed" }
    })
  }), env);
  assert.equal(response.status, 200);
  const saved = JSON.parse(db.stateRow.state_json).events[0].tasks[0];
  assert.equal(saved.assignmentProgress[key].status, "Complete");
  assert.equal(saved.assignmentProgress[key].quantity, 2);
  assert.equal(saved.assignmentProgress[key].wasteCategory, "Trim");
  const packet = await (await worker.fetch(request("/api/student/events", "student-p3@district.example"), env)).json();
  assert.equal(packet.events[0].tasks[0].assignmentRecords[0].teamLabels.length, 2);
  assert.equal(packet.events[0].tasks[0].assignmentRecords[0].teamLabels[1].name, "Team B");
  assert.equal(packet.events[0].tasks[0].recipe.name, "Cinnamon Rolls");
  assert.equal(packet.events[0].tasks[0].recipe.procedure[0], "Mix");
});

test("teacher update uses optimistic revision protection", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  const env = { DB: db };
  const changed = structuredClone(event); changed.name = "Revised dinner";
  const first = await worker.fetch(request("/api/state", "admin@district.example", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ revision: 0, state: { requests: [], events: [changed] } }) }), env);
  assert.equal(first.status, 200);
  const stale = await worker.fetch(request("/api/state", "admin@district.example", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ revision: 0, state: { requests: [], events: [changed] } }) }), env);
  assert.equal(stale.status, 409);
});

test("new account creation requires an explicit role", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  const env = { DB: db };
  const response = await worker.fetch(request("/api/users", "admin@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "new@greececsd.org", displayName: "New User", school: "Arcadia" })
  }), env);
  assert.equal(response.status, 400);
});

test("teacher and administrator account scopes do not retain a student section", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  const env = { DB: db };
  const response = await worker.fetch(request("/api/users", "admin@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "teacher@greececsd.org", displayName: "Teacher One", role: "teacher", school: "Arcadia", sectionId: "adv-p2" })
  }), env);
  assert.equal(response.status, 201);
  assert.equal(db.users.get("teacher@greececsd.org").section_id, null);
});

test("an already authorized external bootstrap account can be preserved without opening general external creation", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  db.users.set("kevin@gmail.example", { email: "kevin@gmail.example", display_name: "Kevin McCann", role: "admin", school: "Districtwide", section_id: null });
  const env = { DB: db, BOOTSTRAP_ADMIN_EMAIL: "kevin@gmail.example" };
  const preserved = await worker.fetch(request("/api/users", "admin@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "kevin@gmail.example", displayName: "Kevin McCann", role: "admin", school: "Districtwide" })
  }), env);
  assert.equal(preserved.status, 201);
  const rejected = await worker.fetch(request("/api/users", "admin@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "new@gmail.example", displayName: "External User", role: "teacher", school: "Arcadia" })
  }), env);
  assert.equal(rejected.status, 400);
});

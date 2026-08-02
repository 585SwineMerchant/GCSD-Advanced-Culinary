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
});

test("student research requires teacher review before entering the recipe library", async () => {
  const db = new FakeDB({ requests: [], events: [] });
  const env = { DB: db };
  const submitted = await worker.fetch(request("/api/recipe-submissions", "student@district.example", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
      name: "Student Soup", yield: 8, portion: "8 oz bowl", ingredients: "2 lb squash\n1 qt stock",
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

test("teacher update uses optimistic revision protection", async () => {
  const db = new FakeDB({ requests: [], events: [event] });
  const env = { DB: db };
  const changed = structuredClone(event); changed.name = "Revised dinner";
  const first = await worker.fetch(request("/api/state", "admin@district.example", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ revision: 0, state: { requests: [], events: [changed] } }) }), env);
  assert.equal(first.status, 200);
  const stale = await worker.fetch(request("/api/state", "admin@district.example", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ revision: 0, state: { requests: [], events: [changed] } }) }), env);
  assert.equal(stale.status, 409);
});

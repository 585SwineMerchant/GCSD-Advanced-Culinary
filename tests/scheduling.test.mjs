import test from "node:test";
import assert from "node:assert/strict";
import { applyTeamToTask, normalizeSections, offsetDate, taskPublicationIssues, teamsForSection } from "../site/shared/scheduling.js";
import { validateTeacherChange } from "../worker/index.js";

const sections = normalizeSections([
  { id: "p2", name: "Period 2", teams: [
    { id: "p2-a", name: "Team A", students: ["Ada", "Luis"] },
    { id: "p2-b", name: "Team B", students: ["Mina"] }
  ] },
  { id: "p5", name: "Period 5", teams: [{ id: "p5-a", name: "Team A", students: ["Noah"] }] }
]);

test("calendar scheduling produces stable ISO dates across service-day offsets", () => {
  assert.equal(offsetDate("2026-09-24", -1), "2026-09-23");
  assert.equal(offsetDate("2026-09-24", 0), "2026-09-24");
});

test("team choices are dependent on the selected period", () => {
  assert.deepEqual(teamsForSection(sections, "p2").map(team => team.id), ["p2-a", "p2-b"]);
  assert.deepEqual(teamsForSection(sections, "p5").map(team => team.id), ["p5-a"]);
});

test("selecting a saved team propagates its name and student roster to a task", () => {
  const task = applyTeamToTask({}, sections, "p2", "p2-b");
  assert.deepEqual(task, { section: "p2", teamId: "p2-b", team: "Team B", students: "Mina" });
  sections[0].teams[1].students.push("Rae");
  applyTeamToTask(task, sections, "p2", "p2-b");
  assert.equal(task.students, "Mina, Rae");
});

test("publication is blocked until every task has a date, valid period, and configured team", () => {
  const previous = { sections, events: [{ id: "evt", name: "Breakfast", owner: "Kevin McCann", collaborators: [], version: 0, stage: "Draft", tasks: [] }] };
  const next = structuredClone(previous);
  next.events[0] = { ...next.events[0], version: 1, stage: "Published", publishedAt: "2026-08-03T12:00:00Z", tasks: [{ id: "task", name: "Bake", workDate: "", section: "p2", teamId: "" }] };
  assert.match(taskPublicationIssues(next.events[0], sections).join(" "), /production date/);
  assert.match(validateTeacherChange({ role: "admin", display_name: "Kevin McCann" }, previous, next), /production date/);
  Object.assign(next.events[0].tasks[0], { workDate: "2026-09-23", teamId: "p2-a", team: "Team A" });
  assert.equal(taskPublicationIssues(next.events[0], sections).length, 0);
  assert.equal(validateTeacherChange({ role: "admin", display_name: "Kevin McCann" }, previous, next), null);
});

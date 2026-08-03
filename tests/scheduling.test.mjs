import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  BELL_SCHEDULE,
  DEFAULT_SECTIONS,
  assignmentContributionKey,
  assignmentContributions,
  aggregateProgress,
  applyTeamToTask,
  assignmentIssues,
  availableMeetingsForDate,
  contributionsForDate,
  makeAssignment,
  normalizeSections,
  normalizeTaskAssignments,
  offsetDate,
  preferredProductionDate,
  productionCounts,
  productionDates,
  rotationDayForDate,
  sectionDisplayLabel,
  sectionMeetsOnDate,
  taskPublicationIssues,
  teamsForSection
} from "../site/shared/scheduling.js";
import { validateTeacherChange } from "../worker/index.js";

const sections = normalizeSections([
  { id: "adv-p2", teams: [
    { id: "adv-p2-team-a", name: "Team A", students: ["Ada", "Luis"] },
    { id: "adv-p2-team-b", name: "Team B", students: ["Mina"] }
  ] },
  { id: "adv-p5", teams: [{ id: "adv-p5-team-a", name: "Team A", students: ["Noah"] }] },
  { id: "carlson-advanced-p4", teams: [
    { id: "carlson-p4-team-a", name: "Team A", students: ["Rae"] },
    { id: "carlson-p4-team-b", name: "Team B", students: ["Sol"] }
  ] }
]);

test("calendar scheduling produces stable ISO dates across service-day offsets", () => {
  assert.equal(offsetDate("2026-09-24", -1), "2026-09-23");
  assert.equal(offsetDate("2026-09-24", 0), "2026-09-24");
});

test("four-day rotation advances across instructional days with overrides", () => {
  assert.equal(rotationDayForDate("2026-09-14"), 1);
  assert.equal(rotationDayForDate("2026-09-15"), 2);
  assert.equal(rotationDayForDate("2026-09-18"), 1);
  assert.equal(rotationDayForDate("2026-09-21"), 2);
  assert.equal(rotationDayForDate("2026-10-12"), null);
});

test("teacher course and period mapping derives a meeting window", () => {
  const meeting = sectionMeetsOnDate("carlson-advanced-p4", "2026-09-22", sections);
  assert.equal(meeting.rotationDay, 3);
  assert.equal(meeting.section.teacher, "Jason Carlson");
  assert.equal(meeting.section.course, "Advanced Culinary Arts");
  assert.equal(meeting.period, 4);
  assert.equal(meeting.start, BELL_SCHEDULE[4].start);
  assert.equal(meeting.end, BELL_SCHEDULE[4].end);
});

test("stable section identity is independent of provisional label and official section number", () => {
  const configured = normalizeSections([{ id: "adv-p2", provisionalLabel: "Section TBD A", officialSectionNumber: "", teams: [{ id: "adv-p2-team-a", name: "Team A", students: ["Ada"] }] }]);
  const before = configured.find(section => section.id === "adv-p2");
  assert.equal(sectionDisplayLabel(before), "McCann - Section TBD A");
  before.officialSectionNumber = "12345";
  assert.equal(before.id, "adv-p2");
  assert.equal(sectionDisplayLabel(before), "McCann - Section 12345");
  assert.deepEqual(teamsForSection(configured, "adv-p2")[0].students, ["Ada"]);
});

test("legacy period labels are mapped to canonical Advanced Culinary identity without losing rosters", () => {
  const configured = normalizeSections([{ id: "adv-p2", name: "Culinary Arts & Nutrition I - Kevin Period 2", course: "Culinary Arts & Nutrition I", teams: [{ id: "adv-p2-team-a", name: "Team A", students: ["Ada"] }] }]);
  const section = configured.find(item => item.id === "adv-p2");
  assert.equal(section.course, "Advanced Culinary Arts");
  assert.equal(sectionDisplayLabel(section), "McCann - Section TBD A");
  assert.deepEqual(teamsForSection(configured, "adv-p2")[0].students, ["Ada"]);
});

test("date-first filtering shows only Advanced Culinary meetings for the selected day", () => {
  const meetings = availableMeetingsForDate("2026-09-23", sections);
  assert.ok(meetings.length);
  assert.ok(meetings.every(meeting => meeting.section.course === "Advanced Culinary Arts"));
  assert.equal(meetings.some(meeting => meeting.section.id === "kevin-culinary-p1"), false);
  assert.equal(meetings.some(meeting => meeting.section.id === "km"), false);
});

test("a section unavailable on a non-meeting date is blocked", () => {
  assert.equal(sectionMeetsOnDate("carlson-advanced-p4", "2026-09-17", sections), null);
  assert.match(assignmentIssues({ id: "task", name: "Shape dough", assignmentRecords: [makeAssignment(sections, "carlson-advanced-p4", "2026-09-17", ["carlson-p4-team-a"])] }, sections).join(" "), /does not meet/);
});

test("team choices are dependent on the selected period", () => {
  assert.deepEqual(teamsForSection(sections, "adv-p2").map(team => team.id), ["adv-p2-team-a", "adv-p2-team-b"]);
  assert.deepEqual(teamsForSection(sections, "adv-p5").map(team => team.id), ["adv-p5-team-a"]);
});

test("selecting a saved team propagates its assignment record, name, and student roster", () => {
  const task = applyTeamToTask({}, sections, "adv-p2", "adv-p2-team-b");
  assert.equal(task.section, "adv-p2");
  assert.equal(task.teamId, "adv-p2-team-b");
  assert.equal(task.team, "Team B");
  assert.equal(task.students, "Mina");
  assert.deepEqual(task.assignmentRecords.map(record => ({ sectionId: record.sectionId, teamIds: record.teamIds })), [{ sectionId: "adv-p2", teamIds: ["adv-p2-team-b"] }]);
});

test("period changes refresh and validate team choices", () => {
  const task = { id: "task", workDate: "2026-09-23", assignmentRecords: [{ sectionId: "adv-p2", workDate: "2026-09-23", teamIds: ["adv-p2-team-b"] }] };
  task.assignmentRecords[0].sectionId = "adv-p5";
  normalizeTaskAssignments(task, sections);
  assert.equal(task.teamId, "adv-p5-team-a");
  assert.equal(task.assignmentRecords[0].teamIds.includes("adv-p2-team-b"), false);
});

test("one task can hold multiple sections and multiple teams without multiplying yield", () => {
  const task = { id: "task", name: "Bake", outputRecord: true, progress: { usableYield: 0 }, assignmentRecords: [
    makeAssignment(sections, "adv-p2", "2026-09-23", ["adv-p2-team-a", "adv-p2-team-b"]),
    makeAssignment(sections, "carlson-advanced-p4", "2026-09-23", ["carlson-p4-team-a"])
  ] };
  normalizeTaskAssignments(task, sections);
  assert.equal(task.assignmentRecords.length, 2);
  assert.equal(task.assignmentRecords[0].teamIds.length, 2);
  task.assignmentProgress = {
    "adv-p2": { status: "In progress", quantity: 3, usableYield: 0, waste: 1 },
    "carlson-advanced-p4": { status: "Complete", quantity: 2, usableYield: 5, waste: 0 }
  };
  assert.equal(aggregateProgress(task).quantity, 5);
  assert.equal(aggregateProgress(task).usableYield, 5);
});

test("assignment-level production contributions are keyed by task, assignment, and team", () => {
  const task = { id: "task", detail: "1 batch", assignmentRecords: [makeAssignment(sections, "adv-p2", "2026-09-23", ["adv-p2-team-a", "adv-p2-team-b"])] };
  const contributions = assignmentContributions(task, sections);
  assert.equal(contributions.length, 2);
  assert.ok(contributions.every(item => item.key === assignmentContributionKey("task", item.record, item.team.id)));
  assert.deepEqual(contributions.map(item => item.team.students.join(", ")), ["Ada, Luis", "Mina"]);
});

test("live production date filtering and counts keep one operational date at a time", () => {
  const event = { tasks: [
    { id: "mix", assignmentRecords: [makeAssignment(sections, "adv-p2", "2026-09-23", ["adv-p2-team-a"])], assignmentProgress: {} },
    { id: "bake", assignmentRecords: [makeAssignment(sections, "adv-p5", "2026-09-24", ["adv-p5-team-a"])], assignmentProgress: {} }
  ] };
  event.tasks[0].assignmentProgress[assignmentContributionKey("mix", event.tasks[0].assignmentRecords[0], "adv-p2-team-a")] = { status: "Complete", quantity: 1 };
  assert.deepEqual(productionDates(event, sections), ["2026-09-23", "2026-09-24"]);
  assert.equal(preferredProductionDate(event, "2026-09-22", sections), "2026-09-24");
  assert.equal(contributionsForDate(event, "2026-09-23", sections).length, 1);
  assert.deepEqual(productionCounts(event, sections, "2026-09-23"), { notStarted: 0, inProgress: 0, completed: 1, blocked: 0, invalid: 0, contributionTotal: 1, taskTotal: 1, taskCompleted: 1 });
});

test("removing one participating team does not delete the task or section assignment", () => {
  const task = { id: "task", assignmentRecords: [makeAssignment(sections, "adv-p2", "2026-09-23", ["adv-p2-team-a", "adv-p2-team-b"])] };
  task.assignmentRecords[0].teamIds = task.assignmentRecords[0].teamIds.filter(teamId => teamId !== "adv-p2-team-b");
  normalizeTaskAssignments(task, sections);
  assert.equal(task.id, "task");
  assert.deepEqual(task.assignmentRecords[0].teamIds, ["adv-p2-team-a"]);
});

test("publication is blocked until every task has a valid date, meeting section, and team", () => {
  const previous = { sections, events: [{ id: "evt", name: "Breakfast", owner: "Kevin McCann", collaborators: [], version: 0, stage: "Draft", tasks: [] }] };
  const next = structuredClone(previous);
  next.events[0] = { ...next.events[0], version: 1, stage: "Published", publishedAt: "2026-08-03T12:00:00Z", tasks: [{ id: "task", name: "Bake", assignmentRecords: [{ workDate: "", sectionId: "adv-p2", teamIds: [] }] }] };
  assert.match(taskPublicationIssues(next.events[0], sections).join(" "), /production date/);
  assert.match(validateTeacherChange({ role: "admin", display_name: "Kevin McCann" }, previous, next), /production date/);
  next.events[0].tasks[0].assignmentRecords = [makeAssignment(sections, "adv-p2", "2026-09-23", ["adv-p2-team-a"])];
  assert.equal(taskPublicationIssues(next.events[0], sections).length, 0);
  assert.equal(validateTeacherChange({ role: "admin", display_name: "Kevin McCann" }, previous, next), null);
});

test("section 4 production plan does not render an arbitrary Finish by time field", () => {
  const teacherOperations = readFileSync(new URL("../site/teacher/teacher-operations.js", import.meta.url), "utf8");
  assert.doesNotMatch(teacherOperations, /data-task-field="deadline"/);
  assert.doesNotMatch(teacherOperations, /Complete by<input data-task-field="deadline"/);
});

test("sections 4 and 5 are replaced by one data-backed production workspace", () => {
  const teacherHtml = readFileSync(new URL("../site/teacher/index.html", import.meta.url), "utf8");
  const teacherCss = readFileSync(new URL("../site/teacher/teacher.css", import.meta.url), "utf8");
  assert.match(teacherHtml, /Production plan &amp; assignments/i);
  assert.doesNotMatch(teacherHtml, /<button data-panel="assignments"/);
  assert.doesNotMatch(teacherHtml, /<h2>Work assignments<\/h2>/);
  assert.match(teacherCss, /\.assignment-record\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.doesNotMatch(teacherCss, /\.assignment-record\{[^}]*minmax\(260px,1\.2fr\)[^}]*minmax\(170px,\.85fr\)[^}]*minmax\(260px,1\.25fr\)[^}]*auto/);
});

test("teacher UI uses stage-aware workflow, stable-section terminology, and labeled removal controls", () => {
  const teacherHtml = readFileSync(new URL("../site/teacher/index.html", import.meta.url), "utf8");
  const teacherOperations = readFileSync(new URL("../site/teacher/teacher-operations.js", import.meta.url), "utf8");
  assert.match(teacherHtml, /1<\/span> Request inbox/);
  assert.match(teacherHtml, /8<\/span> Access &amp; rosters/);
  assert.match(teacherHtml, /Sections, teams &amp; rosters/);
  assert.doesNotMatch(teacherHtml, /Teams by period/);
  assert.match(teacherOperations, /stageContext/);
  assert.match(teacherOperations, /Remove assignment/);
  assert.match(teacherOperations, /Remove team/);
  assert.doesNotMatch(teacherOperations, /You control publication[^]*function renderLive/);
});

test("publish, live production, and closeout controls expose requested second-pass states", () => {
  const teacherHtml = readFileSync(new URL("../site/teacher/index.html", import.meta.url), "utf8");
  const teacherOperations = readFileSync(new URL("../site/teacher/teacher-operations.js", import.meta.url), "utf8");
  assert.match(teacherHtml, /publicationSummary/);
  assert.match(teacherHtml, /liveDateFilter/);
  assert.match(teacherHtml, /productionRecord/);
  assert.match(teacherOperations, /publishedSignature/);
  assert.match(teacherOperations, /assignmentProgress\[card\.dataset\.contributionKey\]/);
  assert.match(teacherOperations, /closeoutReadiness/);
  assert.match(teacherOperations, /Completion blocked/);
  assert.match(teacherOperations, /completeEvent\.disabled = !editable \|\| closeoutReadiness\(current\(\)\)\.blockers\.length > 0/);
});

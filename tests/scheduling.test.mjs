import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  BELL_SCHEDULE,
  DEFAULT_SECTIONS,
  MAX_SIMULTANEOUS_KITCHEN_TEAMS,
  MAX_TEAMS_PER_SECTION,
  allocationStatus,
  assignmentContributionKey,
  assignmentContributions,
  derivedTaskStatus,
  aggregateProgress,
  applyTeamToTask,
  assignmentIssues,
  availableMeetingsForDate,
  contributionsForDate,
  kitchenSchedulingIssues,
  makeAssignment,
  meetingForAssignment,
  normalizeSections,
  normalizeTaskAssignments,
  offsetDate,
  preferredProductionDate,
  productionCounts,
  productionDates,
  requiresKitchen,
  rotationDayForDate,
  sectionDisplayLabel,
  sectionMeetsOnDate,
  sectionTeamCapacity,
  stationAssignmentLabel,
  taskPublicationIssues,
  teamsForSection
} from "../site/shared/scheduling.js";
import { validateTeacherChange } from "../worker/index.js";

const sections = normalizeSections([
  { id: "kevin-advanced-p3", teams: [
    { id: "adv-p2-team-a", name: "Team A", students: ["Ada", "Luis"] },
    { id: "adv-p2-team-b", name: "Team B", students: ["Mina"] }
  ] },
  { id: "carlson-advanced-p5", teams: [{ id: "carlson-p5-team-a", name: "Team A", students: ["Noah"] }] },
  { id: "carlson-advanced-p4", teams: [
    { id: "carlson-p4-team-a", name: "Team A", students: ["Rae"] },
    { id: "carlson-p4-team-b", name: "Team B", students: ["Sol"] }
  ] }
]);

test("kitchen section inventory has nine active stable sections", () => {
  const active = sections.filter(section => section.active !== false);
  assert.equal(active.length, 9);
  assert.equal(active.filter(section => section.course === "Advanced Culinary Arts").length, 3);
  assert.equal(active.filter(section => section.course === "Culinary Arts & Nutrition I").length, 5);
  assert.equal(active.filter(section => section.course === "Kitchen & Restaurant Management").length, 1);
  assert.equal(active.filter(section => section.course === "Advanced Culinary Arts" && section.teacher === "Kevin McCann").length, 1);
  assert.equal(active.filter(section => section.course === "Advanced Culinary Arts" && section.teacher === "Jason Carlson").length, 2);
  assert.equal(active.filter(section => section.course === "Culinary Arts & Nutrition I" && section.teacher === "Kevin McCann").length, 4);
  assert.equal(active.filter(section => section.course === "Culinary Arts & Nutrition I" && section.teacher === "Jason Carlson").length, 1);
});

test("split-period sections remain one stable section with nullable official numbers", () => {
  const intro45 = sections.filter(section => section.teacher === "Kevin McCann" && section.course === "Culinary Arts & Nutrition I" && section.allowedPeriods?.join("/") === "4/5");
  assert.deepEqual(intro45.map(section => section.id).sort(), ["kevin-culinary-p4", "kevin-culinary-p6"]);
  assert.ok(sections.find(section => section.id === "carlson-advanced-p5")?.requiresRotationConfirmation);
  assert.equal(sectionMeetsOnDate("carlson-advanced-p5", "2026-09-22", sections), null);
  assert.match(assignmentIssues({ id: "task", name: "Shape dough", assignmentRecords: [makeAssignment(sections, "carlson-advanced-p5", "2026-09-22", ["carlson-p5-team-a"])] }, sections).join(" "), /confirm Period 5 or 6/i);
  assert.ok(sections.every(section => section.officialSectionNumber === ""));
});

test("surplus provisional Advanced records are inactive instead of deleted", () => {
  const inactive = sections.filter(section => section.active === false);
  assert.deepEqual(inactive.map(section => section.id).sort(), ["adv-p2", "adv-p5", "carlson-advanced-p6", "carlson-culinary-p2"]);
  assert.equal(sections.find(section => section.id === "adv-p2")?.retiredIntoSectionId, "kevin-advanced-p3");
  assert.equal(sections.find(section => section.id === "adv-p5")?.retiredIntoSectionId, "kevin-advanced-p3");
  assert.equal(sections.find(section => section.id === "carlson-advanced-p6")?.retiredIntoSectionId, "carlson-advanced-p5");
});

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

test("stable section identity is independent of label and official section number", () => {
  const configured = normalizeSections([{ id: "kevin-advanced-p3", officialSectionNumber: "", teams: [{ id: "kevin-p3-team-a", name: "Team A", students: ["Ada"] }] }]);
  const before = configured.find(section => section.id === "kevin-advanced-p3");
  assert.equal(sectionDisplayLabel(before), "McCann Advanced - Period 3");
  before.officialSectionNumber = "12345";
  assert.equal(before.id, "kevin-advanced-p3");
  assert.equal(sectionDisplayLabel(before), "McCann - Section 12345");
  assert.deepEqual(teamsForSection(configured, "kevin-advanced-p3")[0].students, ["Ada"]);
});

test("legacy provisional Advanced records stay inactive without losing rosters", () => {
  const configured = normalizeSections([{ id: "adv-p2", name: "Culinary Arts & Nutrition I - Kevin Period 2", course: "Culinary Arts & Nutrition I", teams: [{ id: "adv-p2-team-a", name: "Team A", students: ["Ada"] }] }]);
  const section = configured.find(item => item.id === "adv-p2");
  assert.equal(section.course, "Advanced Culinary Arts");
  assert.equal(section.active, false);
  assert.equal(section.retiredIntoSectionId, "kevin-advanced-p3");
  assert.deepEqual(teamsForSection(configured, "adv-p2")[0].students, ["Ada"]);
});

test("date-first filtering shows only Advanced Culinary meetings for the selected day", () => {
  const meetings = availableMeetingsForDate("2026-09-23", sections);
  assert.ok(meetings.length);
  assert.ok(meetings.every(meeting => meeting.section.course === "Advanced Culinary Arts"));
  assert.equal(meetings.some(meeting => meeting.section.id === "kevin-culinary-p1"), false);
  assert.equal(meetings.some(meeting => meeting.section.id === "km"), false);
});

test("a split section with unconfirmed rotation mapping is blocked until a period is confirmed", () => {
  assert.equal(sectionMeetsOnDate("carlson-advanced-p5", "2026-09-17", sections), null);
  assert.match(assignmentIssues({ id: "task", name: "Shape dough", assignmentRecords: [makeAssignment(sections, "carlson-advanced-p5", "2026-09-17", ["carlson-p5-team-a"])] }, sections).join(" "), /confirm Period 5 or 6/i);
  const confirmed = makeAssignment(sections, "carlson-advanced-p5", "2026-09-17", ["carlson-p5-team-a"]);
  confirmed.confirmedPeriod = 5;
  confirmed.kitchen = "Kitchen 1";
  const meeting = meetingForAssignment(confirmed, sections);
  assert.equal(meeting?.period, 5);
  assert.equal(meeting?.teacherConfirmedPeriod, true);
  assert.equal(assignmentIssues({ id: "task", name: "Shape dough", assignmentRecords: [confirmed] }, sections).some(issue => /confirm Period/i.test(issue)), false);
});

test("team choices are dependent on the selected period", () => {
  assert.deepEqual(teamsForSection(sections, "kevin-advanced-p3").map(team => team.id), ["adv-p2-team-a", "adv-p2-team-b"]);
  assert.deepEqual(teamsForSection(sections, "carlson-advanced-p4").map(team => team.id), ["carlson-p4-team-a", "carlson-p4-team-b"]);
});

test("selecting a saved team propagates its assignment record, name, and student roster", () => {
  const task = applyTeamToTask({}, sections, "kevin-advanced-p3", "adv-p2-team-b");
  assert.equal(task.section, "kevin-advanced-p3");
  assert.equal(task.teamId, "adv-p2-team-b");
  assert.equal(task.team, "Team B");
  assert.equal(task.students, "Mina");
  assert.deepEqual(task.assignmentRecords.map(record => ({ sectionId: record.sectionId, teamIds: record.teamIds })), [{ sectionId: "kevin-advanced-p3", teamIds: ["adv-p2-team-b"] }]);
});

test("period changes refresh and validate team choices", () => {
  const task = { id: "task", workDate: "2026-09-23", assignmentRecords: [{ sectionId: "kevin-advanced-p3", workDate: "2026-09-23", teamIds: ["adv-p2-team-b"] }] };
  task.assignmentRecords[0].sectionId = "carlson-advanced-p4";
  normalizeTaskAssignments(task, sections);
  assert.equal(task.teamId, "carlson-p4-team-a");
  assert.equal(task.assignmentRecords[0].teamIds.includes("adv-p2-team-b"), false);
});

test("one task can hold multiple sections and multiple teams without multiplying yield", () => {
  const task = { id: "task", name: "Bake", outputRecord: true, progress: { usableYield: 0 }, assignmentRecords: [
    makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a", "adv-p2-team-b"]),
    makeAssignment(sections, "carlson-advanced-p4", "2026-09-23", ["carlson-p4-team-a"])
  ] };
  normalizeTaskAssignments(task, sections);
  assert.equal(task.assignmentRecords.length, 2);
  assert.equal(task.assignmentRecords[0].teamIds.length, 2);
  task.assignmentProgress = {
    "kevin-advanced-p3": { status: "In progress", quantity: 3, usableYield: 0, waste: 1 },
    "carlson-advanced-p4": { status: "Complete", quantity: 2, usableYield: 5, waste: 0 }
  };
  assert.equal(aggregateProgress(task).quantity, 5);
  assert.equal(aggregateProgress(task).usableYield, 5);
});

test("assignment-level production contributions are keyed by task, assignment, and team", () => {
  const task = { id: "task", detail: "1 batch", assignmentRecords: [makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a", "adv-p2-team-b"])] };
  const contributions = assignmentContributions(task, sections);
  assert.equal(contributions.length, 2);
  assert.ok(contributions.every(item => item.key === assignmentContributionKey("task", item.record, item.team.id)));
  assert.deepEqual(contributions.map(item => item.team.students.join(", ")), ["Ada, Luis", "Mina"]);
});

test("live production date filtering and counts keep one operational date at a time", () => {
  const event = { tasks: [
    { id: "mix", assignmentRecords: [makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"])], assignmentProgress: {} },
    { id: "bake", assignmentRecords: [makeAssignment(sections, "carlson-advanced-p4", "2026-09-24", ["carlson-p4-team-a"])], assignmentProgress: {} }
  ] };
  event.tasks[0].assignmentRecords[0].kitchen = "Kitchen 1";
  event.tasks[0].assignmentProgress[assignmentContributionKey("mix", event.tasks[0].assignmentRecords[0], "adv-p2-team-a")] = { status: "Complete", quantity: 1 };
  event.tasks[0].plannedQuantity = 1; event.tasks[0].plannedUnit = "batches"; event.tasks[0].assignmentRecords[0].allocatedQuantity = 1; event.tasks[0].assignmentRecords[0].allocatedUnit = "batches";
  assert.deepEqual(productionDates(event, sections), ["2026-09-23", "2026-09-24"]);
  assert.equal(preferredProductionDate(event, "2026-09-22", sections), "2026-09-24");
  assert.equal(contributionsForDate(event, "2026-09-23", sections).length, 1);
  assert.deepEqual(productionCounts(event, sections, "2026-09-23"), { notStarted: 1, inProgress: 0, completed: 0, blocked: 0, invalid: 0, contributionTotal: 1, taskTotal: 1, taskCompleted: 0, taskInProgress: 0, taskBlocked: 0, taskInvalid: 0, taskNotStarted: 1 });
});

test("removing one participating team does not delete the task or section assignment", () => {
  const task = { id: "task", assignmentRecords: [makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a", "adv-p2-team-b"])] };
  task.assignmentRecords[0].teamIds = task.assignmentRecords[0].teamIds.filter(teamId => teamId !== "adv-p2-team-b");
  normalizeTaskAssignments(task, sections);
  assert.equal(task.id, "task");
  assert.deepEqual(task.assignmentRecords[0].teamIds, ["adv-p2-team-a"]);
});

test("allocation reconciliation detects balanced, under, and over allocation", () => {
  const task = { id: "task", plannedQuantity: 7, plannedUnit: "batches", assignmentRecords: [
    { ...makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"]), kitchen: "Kitchen 1", allocatedQuantity: 3, allocatedUnit: "batches" },
    { ...makeAssignment(sections, "carlson-advanced-p4", "2026-09-23", ["carlson-p4-team-a"]), kitchen: "Kitchen 2", allocatedQuantity: 4, allocatedUnit: "batches" }
  ] };
  assert.equal(allocationStatus(task, sections).state, "balanced");
  task.assignmentRecords[1].allocatedQuantity = 3;
  assert.equal(allocationStatus(task, sections).state, "under");
  task.assignmentRecords[1].allocatedQuantity = 5;
  assert.equal(allocationStatus(task, sections).state, "over");
});

test("one completed saved contribution cannot complete a multi-assignment task", () => {
  const task = { id: "task", plannedQuantity: 2, plannedUnit: "batches", assignmentRecords: [
    { ...makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"]), kitchen: "Kitchen 1", allocatedQuantity: 1, allocatedUnit: "batches" },
    { ...makeAssignment(sections, "carlson-advanced-p4", "2026-09-23", ["carlson-p4-team-a"]), kitchen: "Kitchen 2", allocatedQuantity: 1, allocatedUnit: "batches" }
  ], assignmentProgress: {} };
  task.assignmentProgress[assignmentContributionKey(task.id, task.assignmentRecords[0], "adv-p2-team-a")] = { status: "Complete", quantity: 1, updatedAt: "2026-09-23T10:00:00Z", updatedBy: "Kevin McCann" };
  assert.equal(derivedTaskStatus(task, sections), "In progress");
  task.assignmentProgress[assignmentContributionKey(task.id, task.assignmentRecords[1], "carlson-p4-team-a")] = { status: "Complete", quantity: 1, updatedAt: "2026-09-23T11:00:00Z", updatedBy: "Jason Carlson" };
  assert.equal(derivedTaskStatus(task, sections), "Completed");
});

test("kitchen choices are required and limited to Kitchen 1-4", () => {
  const task = { id: "task", plannedQuantity: 1, plannedUnit: "batches", assignmentRecords: [makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"])] };
  task.assignmentRecords[0].allocatedQuantity = 1;
  task.assignmentRecords[0].allocatedUnit = "batches";
  task.assignmentRecords[0].stationDuty = "kitchen-production";
  assert.match(assignmentIssues(task, sections).join(" "), /Kitchen 1-4/);
  task.assignmentRecords[0].kitchen = "Kitchen 4";
  assert.equal(assignmentIssues(task, sections).length, 0);
});

test("publication is blocked until every task has a valid date, meeting section, and team", () => {
  const previous = { sections, events: [{ id: "evt", name: "Breakfast", owner: "Kevin McCann", collaborators: [], version: 0, stage: "Draft", tasks: [] }] };
  const next = structuredClone(previous);
  next.events[0] = { ...next.events[0], version: 1, stage: "Published", publishedAt: "2026-08-03T12:00:00Z", tasks: [{ id: "task", name: "Bake", assignmentRecords: [{ workDate: "", sectionId: "kevin-advanced-p3", teamIds: [] }] }] };
  assert.match(taskPublicationIssues(next.events[0], sections).join(" "), /production date/);
  assert.match(validateTeacherChange({ role: "admin", display_name: "Kevin McCann" }, previous, next), /production date/);
  next.events[0].tasks[0].assignmentRecords = [makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"])];
  next.events[0].tasks[0].assignmentRecords[0].kitchen = "Kitchen 1";
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
  const teacherOperations = readFileSync(new URL("../site/teacher/teacher-operations.js", import.meta.url), "utf8");
  assert.match(teacherHtml, /Production plan &amp; assignments/i);
  assert.doesNotMatch(teacherHtml, /<button data-panel="assignments"/);
  assert.doesNotMatch(teacherHtml, /<h2>Work assignments<\/h2>/);
  assert.match(teacherCss, /\.assignment-grid-row\.schedule-row\{grid-template-columns:repeat\(auto-fit,minmax\(160px,1fr\)\)/);
  assert.match(teacherOperations, /production-menu-group/);
  assert.match(teacherOperations, /confirmedPeriod/);
  assert.match(teacherCss, /\.assignment-record\{display:grid;grid-template-columns:minmax\(0,1fr\)/);
  assert.doesNotMatch(teacherCss, /\.assignment-record\{[^}]*minmax\(260px,1\.2fr\)[^}]*minmax\(170px,\.85fr\)[^}]*minmax\(260px,1\.25fr\)[^}]*auto/);
});

test("teacher UI uses stage-aware workflow, stable-section terminology, and labeled removal controls", () => {
  const teacherHtml = readFileSync(new URL("../site/teacher/index.html", import.meta.url), "utf8");
  const teacherOperations = readFileSync(new URL("../site/teacher/teacher-operations.js", import.meta.url), "utf8");
  assert.match(teacherHtml, /1<\/span> Request inbox/);
  assert.match(teacherHtml, /8<\/span> Access &amp; rosters/);
  assert.match(teacherHtml, /Kitchen sections, teams &amp; rosters/);
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

test("eight persistent teams can exist in one section", () => {
  const eight = Array.from({ length: MAX_TEAMS_PER_SECTION }, (_, index) => ({
    id: `kevin-advanced-p3-team-${index + 1}`,
    name: `Team ${String.fromCharCode(65 + index)}`,
    students: []
  }));
  const configured = normalizeSections([{ id: "kevin-advanced-p3", teams: eight }]);
  const teams = teamsForSection(configured, "kevin-advanced-p3");
  assert.equal(teams.length, 8);
  assert.equal(sectionTeamCapacity(configured.find(section => section.id === "kevin-advanced-p3")).atLimit, true);
  assert.equal(sectionTeamCapacity(configured.find(section => section.id === "kevin-advanced-p3")).remaining, 0);
});

test("persistent section teams populate assignment choices without inventing kitchens", () => {
  const eight = Array.from({ length: 5 }, (_, index) => ({ id: `adv-team-${index + 1}`, name: `Team ${index + 1}`, students: [] }));
  const configured = normalizeSections([{ id: "kevin-advanced-p3", teams: eight }]);
  const record = makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["adv-team-3"]);
  assert.deepEqual(teamsForSection(configured, "kevin-advanced-p3").map(team => team.id), eight.map(team => team.id));
  assert.deepEqual(record.teamIds, ["adv-team-3"]);
  assert.equal(record.kitchen, "");
  assert.equal(record.stationDuty, "kitchen-production");
  assert.equal(record.stationSequence, 1);
  assert.equal(requiresKitchen(record), true);
});

test("kitchen selection remains event-specific and does not alter Step 8 team data", () => {
  const configured = normalizeSections([{ id: "kevin-advanced-p3", teams: [{ id: "adv-p2-team-a", name: "Team A", students: ["Ada"] }] }]);
  const before = JSON.stringify(teamsForSection(configured, "kevin-advanced-p3"));
  const task = { id: "task", plannedQuantity: 1, plannedUnit: "batches", assignmentRecords: [makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"])] };
  task.assignmentRecords[0].kitchen = "Kitchen 2";
  task.assignmentRecords[0].allocatedQuantity = 1;
  normalizeTaskAssignments(task, configured);
  assert.equal(task.assignmentRecords[0].kitchen, "Kitchen 2");
  assert.equal(JSON.stringify(teamsForSection(configured, "kevin-advanced-p3")), before);
  assert.equal(teamsForSection(configured, "kevin-advanced-p3")[0].kitchen, undefined);
});

test("only four teams can occupy kitchens simultaneously in one section date sequence", () => {
  const teamIds = Array.from({ length: 5 }, (_, index) => `adv-team-${index + 1}`);
  const configured = normalizeSections([{ id: "kevin-advanced-p3", teams: teamIds.map((id, index) => ({ id, name: `Team ${index + 1}`, students: [] })) }]);
  const event = {
    tasks: teamIds.map((teamId, index) => ({
      id: `task-${index}`,
      name: `Prep ${index + 1}`,
      plannedQuantity: 1,
      plannedUnit: "batches",
      assignmentRecords: [{
        ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", [teamId]),
        kitchen: `Kitchen ${(index % 4) + 1}`,
        stationDuty: "kitchen-production",
        stationSequence: 1,
        allocatedQuantity: 1,
        allocatedUnit: "batches"
      }]
    }))
  };
  const issues = kitchenSchedulingIssues(event, configured).join(" ");
  assert.match(issues, new RegExp(`${MAX_SIMULTANEOUS_KITCHEN_TEAMS}`));
  assert.match(issues, /at once/i);
});

test("additional teams can be assigned later in the same period through sequencing", () => {
  const configured = normalizeSections([{ id: "kevin-advanced-p3", teams: [
    { id: "t1", name: "Team 1", students: [] },
    { id: "t2", name: "Team 2", students: [] },
    { id: "t3", name: "Team 3", students: [] },
    { id: "t4", name: "Team 4", students: [] },
    { id: "t5", name: "Team 5", students: [] }
  ] }]);
  const event = {
    tasks: [
      { id: "a", name: "Block 1", plannedQuantity: 4, plannedUnit: "batches", assignmentRecords: [
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["t1"]), kitchen: "Kitchen 1", stationSequence: 1, allocatedQuantity: 1, allocatedUnit: "batches" },
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["t2"]), kitchen: "Kitchen 2", stationSequence: 1, allocatedQuantity: 1, allocatedUnit: "batches" },
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["t3"]), kitchen: "Kitchen 3", stationSequence: 1, allocatedQuantity: 1, allocatedUnit: "batches" },
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["t4"]), kitchen: "Kitchen 4", stationSequence: 1, allocatedQuantity: 1, allocatedUnit: "batches" }
      ] },
      { id: "b", name: "Block 2", plannedQuantity: 1, plannedUnit: "batches", assignmentRecords: [
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["t5"]), kitchen: "Kitchen 1", stationSequence: 2, allocatedQuantity: 1, allocatedUnit: "batches" }
      ] }
    ]
  };
  assert.equal(kitchenSchedulingIssues(event, configured).length, 0);
});

test("sequential reuse of one kitchen is valid while overlapping use is flagged", () => {
  const configured = sections;
  const sequential = {
    tasks: [{
      id: "task",
      name: "Turnover",
      plannedQuantity: 2,
      plannedUnit: "batches",
      assignmentRecords: [
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"]), kitchen: "Kitchen 1", stationSequence: 1, allocatedQuantity: 1, allocatedUnit: "batches" },
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-b"]), kitchen: "Kitchen 1", stationSequence: 2, allocatedQuantity: 1, allocatedUnit: "batches" }
      ]
    }]
  };
  assert.equal(kitchenSchedulingIssues(sequential, configured).length, 0);
  const overlapping = {
    tasks: [{
      id: "task",
      name: "Conflict",
      plannedQuantity: 2,
      plannedUnit: "batches",
      assignmentRecords: [
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"]), kitchen: "Kitchen 1", stationSequence: 1, allocatedQuantity: 1, allocatedUnit: "batches" },
        { ...makeAssignment(configured, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-b"]), kitchen: "Kitchen 1", stationSequence: 1, allocatedQuantity: 1, allocatedUnit: "batches" }
      ]
    }]
  };
  assert.match(kitchenSchedulingIssues(overlapping, configured).join(" "), /Kitchen 1 is assigned to more than one team/);
});

test("desk-work and off-station teams do not generate missing-kitchen warnings", () => {
  const desk = { id: "desk", plannedQuantity: 1, plannedUnit: "batches", assignmentRecords: [
    { ...makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"]), stationDuty: "desk-work", kitchen: "", allocatedQuantity: 1, allocatedUnit: "batches" }
  ] };
  const off = { id: "off", plannedQuantity: 1, plannedUnit: "batches", assignmentRecords: [
    { ...makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-b"]), stationDuty: "off-station", kitchen: "", allocatedQuantity: 1, allocatedUnit: "batches" }
  ] };
  assert.equal(requiresKitchen(desk.assignmentRecords[0]), false);
  assert.equal(stationAssignmentLabel(desk.assignmentRecords[0]), "Desk work");
  assert.equal(assignmentIssues(desk, sections).length, 0);
  assert.equal(assignmentIssues(off, sections).length, 0);
  desk.assignmentProgress = { [assignmentContributionKey("desk", desk.assignmentRecords[0], "adv-p2-team-a")]: { status: "Complete", quantity: 1, updatedAt: "2026-09-23T10:00:00Z", updatedBy: "Kevin McCann" } };
  assert.equal(derivedTaskStatus(desk, sections), "Completed");
});

test("saved team and kitchen assignments carry consistently through publication validation", () => {
  const task = {
    id: "task",
    name: "Bake",
    plannedQuantity: 1,
    plannedUnit: "batches",
    assignmentRecords: [{
      ...makeAssignment(sections, "kevin-advanced-p3", "2026-09-23", ["adv-p2-team-a"]),
      kitchen: "Kitchen 3",
      stationDuty: "kitchen-production",
      stationSequence: 1,
      allocatedQuantity: 1,
      allocatedUnit: "batches",
      studentDetails: "Release station after egg wash."
    }]
  };
  normalizeTaskAssignments(task, sections);
  assert.equal(task.assignmentRecords[0].kitchen, "Kitchen 3");
  assert.equal(task.assignmentRecords[0].stationSequence, 1);
  assert.equal(task.team, "Team A");
  assert.equal(taskPublicationIssues({ tasks: [task] }, sections).length, 0);
  assert.match(stationAssignmentLabel(task.assignmentRecords[0]), /Kitchen 3/);
});

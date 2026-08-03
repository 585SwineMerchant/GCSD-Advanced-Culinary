import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildEventProductionTasks } from "../site/teacher/production-planner.js";
import { reconcileActiveTeamLabels } from "../site/shared/scheduling.js";

const [, , inputPath, outDir = ".tmp/advanced-corrections-20260803", mode = "dry-run"] = process.argv;
if (!inputPath) throw new Error("Usage: node scripts/reconcile-advanced-corrections.mjs <wrapped-export.json> [outDir] [dry-run|write]");

const wrapped = JSON.parse(readFileSync(inputPath, "utf8").replace(/^\uFEFF/, ""));
const row = wrapped[0]?.results?.[0];
if (!row?.state_json) throw new Error("Export does not contain app_state.state_json.");

mkdirSync(outDir, { recursive: true });
const state = JSON.parse(row.state_json);
const before = structuredClone(state);
const report = {
  sourceRevision: row.revision,
  generatedAt: new Date().toISOString(),
  mode,
  recordsRetainedUnchanged: [],
  recordsRelabeled: [],
  recordsDeactivated: [],
  newAssignmentRecordsRequired: [],
  quantityChanges: [],
  publishedContentChanges: [],
  recordsRequiringTeacherReview: [],
  foreignKeySafety: "Single JSON app_state document; durable IDs retained; no delete/merge operations generated.",
  revisionSafety: "Existing event.version, publishedAt, and publishedBy are preserved. Corrected student-facing content remains unpublished until the normal publication workflow creates the next revision."
};

state.sections = reconcileActiveTeamLabels(state.sections || []);
for (const section of state.sections || []) {
  const previous = (before.sections || []).find(item => item.id === section.id);
  for (const team of section.teams || []) {
    const old = previous?.teams?.find(item => item.id === team.id);
    if (old && old.name !== team.name) report.recordsRelabeled.push({ sectionId: section.id, teamId: team.id, from: old.name, to: team.name });
  }
}

const event = state.events?.find(item => item.name === "New Teacher Welcome Breakfast");
if (!event) throw new Error("New Teacher Welcome Breakfast event not found.");
const originalEvent = before.events.find(item => item.id === event.id);
const cinnamon = event.menu?.find(item => item.name === "Cinnamon Rolls");
if (!cinnamon) throw new Error("Cinnamon Rolls menu item not found.");
if (Number(cinnamon.required) !== 100) {
  report.quantityChanges.push({ target: "menu:Cinnamon Rolls", field: "required", from: cinnamon.required, to: 100 });
  cinnamon.required = 100;
}

const generated = buildEventProductionTasks(event, state.sections);
event.tasks = (event.tasks || []).map((task, index) => {
  const replacement = generated[index];
  if (!replacement) return task;
  const next = {
    ...task,
    planKey: replacement.planKey,
    type: replacement.type,
    outputRecord: replacement.outputRecord,
    plannedQuantity: replacement.plannedQuantity,
    plannedUnit: replacement.plannedUnit,
    scaling: replacement.scaling,
    detail: replacement.detail,
    equipment: replacement.equipment,
    qualityControls: replacement.qualityControls,
    dependency: replacement.dependency
  };
  const records = Array.isArray(next.assignmentRecords) ? next.assignmentRecords : [];
  const base = records.length ? Math.floor(Number(next.plannedQuantity || 0) / records.length) : 0;
  const remainder = records.length ? Number(next.plannedQuantity || 0) - base * records.length : 0;
  next.assignmentRecords = records.map((record, recordIndex) => {
    const updated = {
      ...record,
      allocatedQuantity: Number(record.allocatedQuantity || 0) || base + (recordIndex === 0 ? remainder : 0),
      allocatedUnit: record.allocatedUnit || next.plannedUnit || "units",
      studentDetails: record.studentDetails || ""
    };
    if (!updated.kitchen) report.recordsRequiringTeacherReview.push({ taskId: task.id, taskName: task.name, assignmentId: record.id, sectionId: record.sectionId, teamIds: record.teamIds, issue: "Kitchen 1-4 requires teacher selection; no deterministic station mapping existed." });
    return updated;
  });
  if (task.detail !== next.detail || task.plannedQuantity !== next.plannedQuantity) {
    report.quantityChanges.push({ target: `task:${task.id}`, field: "plannedQuantity/detail", from: { detail: task.detail, plannedQuantity: task.plannedQuantity }, to: { detail: next.detail, plannedQuantity: next.plannedQuantity, plannedUnit: next.plannedUnit } });
  }
  report.recordsRetainedUnchanged.push(...next.assignmentRecords.map(record => ({ taskId: task.id, assignmentId: record.id, sectionId: record.sectionId, teamIds: record.teamIds })));
  return next;
});

if (originalEvent?.publishedAt) {
  event.stage = event.stage === "Published" ? "In production" : event.stage;
  event.unpublishedChanges = true;
  event.unpublishedChangeNote = "Production scaling, allocation, kitchen/team identity, and generated student-facing instructions corrected after teacher walkthrough. Publish the next revision through the established workflow.";
  report.publishedContentChanges.push({ eventId: event.id, currentRevision: event.version, revision1PublishedAt: originalEvent.publishedAt, action: "Marked unpublishedChanges; did not overwrite published revision metadata." });
}

const dryRunPath = join(outDir, "advanced-corrections-dry-run-report.json");
writeFileSync(dryRunPath, JSON.stringify(report, null, 2));

if (mode === "write") {
  const statePath = join(outDir, "advanced-corrections-state.json");
  writeFileSync(statePath, JSON.stringify(state, null, 2));
  const sqlPath = join(outDir, "advanced-corrections-update.sql");
  const escaped = JSON.stringify(state).replace(/'/g, "''");
  writeFileSync(sqlPath, `UPDATE app_state SET revision = revision + 1, state_json = '${escaped}', updated_at = CURRENT_TIMESTAMP, updated_by = 'codex-reconcile-advanced-corrections' WHERE id = 1 AND revision = ${Number(row.revision)};\n`);
}

console.log(JSON.stringify({ reportPath: dryRunPath, writeMode: mode === "write", sourceRevision: row.revision, eventId: event.id, recordsRequiringTeacherReview: report.recordsRequiringTeacherReview.length, relabeledTeams: report.recordsRelabeled.length }, null, 2));

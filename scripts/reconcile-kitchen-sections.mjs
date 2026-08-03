import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_SECTIONS, normalizeSections } from "../site/shared/scheduling.js";

const inputPath = process.argv[2];
const mode = process.argv.includes("--apply") ? "apply" : "dry-run";
if (!inputPath) throw new Error("Usage: node scripts/reconcile-kitchen-sections.mjs <wrangler-json-export> [--apply]");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const raw = readFileSync(resolve(root, inputPath), "utf8").replace(/^\uFEFF/, "");
const exportRows = JSON.parse(raw);
const row = exportRows[0]?.results?.[0];
if (!row?.state_json || !Number.isInteger(row.revision)) throw new Error("Expected a wrangler --json app_state export.");

const state = JSON.parse(row.state_json);
const originalSections = Array.isArray(state.sections) ? state.sections : [];
const originalById = new Map(originalSections.map(section => [section.id, section]));
const remap = new Map([
  ["adv-p2", "kevin-advanced-p3"],
  ["adv-p5", "kevin-advanced-p3"],
  ["carlson-advanced-p6", "carlson-advanced-p5"],
  ["carlson-culinary-p2", "carlson-culinary-p1"]
]);
const retained = new Set(DEFAULT_SECTIONS.map(section => section.id));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function uniqueTeams(...teamGroups) {
  const teams = [];
  const seen = new Set();
  for (const group of teamGroups) {
    for (const team of group || []) {
      if (seen.has(team.id)) continue;
      seen.add(team.id);
      teams.push(clone(team));
    }
  }
  return teams;
}

function referencedSectionIds(data) {
  const ids = new Set();
  for (const event of data.events || []) {
    for (const sectionId of Object.keys(event.assignments || {})) ids.add(sectionId);
    for (const task of event.tasks || []) {
      if (task.section) ids.add(task.section);
      for (const record of task.assignmentRecords || []) if (record.sectionId) ids.add(record.sectionId);
    }
  }
  for (const user of data.users || []) if (user.section_id) ids.add(user.section_id);
  return ids;
}

function referencedTeamIds(data) {
  const ids = new Set();
  for (const event of data.events || []) {
    for (const task of event.tasks || []) {
      if (task.teamId) ids.add(task.teamId);
      for (const record of task.assignmentRecords || []) for (const teamId of record.teamIds || []) ids.add(teamId);
    }
  }
  return ids;
}

function reconcileSections() {
  const normalized = normalizeSections(originalSections).map(section => clone(section));
  const byId = new Map(normalized.map(section => [section.id, section]));
  const mergeTeams = (targetId, sourceIds) => {
    const target = byId.get(targetId);
    if (!target) throw new Error(`Missing retained target section ${targetId}.`);
    target.teams = uniqueTeams(target.teams, ...sourceIds.map(id => byId.get(id)?.teams || originalById.get(id)?.teams || []));
  };
  mergeTeams("kevin-advanced-p3", ["adv-p2", "adv-p5"]);
  mergeTeams("carlson-advanced-p5", ["carlson-advanced-p6"]);
  mergeTeams("carlson-culinary-p1", ["carlson-culinary-p2"]);
  for (const [sourceId, targetId] of remap.entries()) {
    const section = byId.get(sourceId);
    if (!section) continue;
    section.active = false;
    section.retiredIntoSectionId = targetId;
    section.reconciliationAudit = [
      ...(section.reconciliationAudit || []),
      { at: new Date().toISOString(), action: "deactivated", reason: "Kitchen course-section inventory correction", retainedSectionId: targetId }
    ];
  }
  return normalized.filter(section => retained.has(section.id));
}

function reconcileState() {
  const next = clone(state);
  next.sections = reconcileSections();
  for (const event of next.events || []) {
    for (const task of event.tasks || []) {
      if (remap.has(task.section)) task.section = remap.get(task.section);
      for (const record of task.assignmentRecords || []) if (remap.has(record.sectionId)) record.sectionId = remap.get(record.sectionId);
    }
    const assignments = Object.fromEntries(next.sections.map(section => [section.id, []]));
    for (const task of event.tasks || []) {
      for (const record of task.assignmentRecords || []) {
        if (!assignments[record.sectionId]) assignments[record.sectionId] = [];
        if (!assignments[record.sectionId].includes(task.id)) assignments[record.sectionId].push(task.id);
      }
    }
    event.assignments = assignments;
  }
  return next;
}

function sectionCounts(sections) {
  const active = sections.filter(section => section.active !== false);
  return {
    activeTotal: active.length,
    advanced: active.filter(section => section.course === "Advanced Culinary Arts").length,
    intro: active.filter(section => section.course === "Culinary Arts & Nutrition I").length,
    kitchenManagement: active.filter(section => section.course === "Kitchen & Restaurant Management").length,
    mccannAdvanced: active.filter(section => section.course === "Advanced Culinary Arts" && section.teacher === "Kevin McCann").length,
    carlsonAdvanced: active.filter(section => section.course === "Advanced Culinary Arts" && section.teacher === "Jason Carlson").length,
    mccannIntro: active.filter(section => section.course === "Culinary Arts & Nutrition I" && section.teacher === "Kevin McCann").length,
    carlsonIntro: active.filter(section => section.course === "Culinary Arts & Nutrition I" && section.teacher === "Jason Carlson").length
  };
}

const nextState = reconcileState();
const validSectionIds = new Set(nextState.sections.map(section => section.id));
const validTeamIds = new Set(nextState.sections.flatMap(section => (section.teams || []).map(team => team.id)));
const unresolvedSections = [...referencedSectionIds(nextState)].filter(id => !validSectionIds.has(id));
const unresolvedTeams = [...referencedTeamIds(nextState)].filter(id => !validTeamIds.has(id));
if (unresolvedSections.length || unresolvedTeams.length) {
  throw new Error(`Reconciliation would orphan references: sections=${unresolvedSections.join(",") || "none"} teams=${unresolvedTeams.join(",") || "none"}`);
}

const report = {
  mode,
  sourceRevision: row.revision,
  sourceUpdatedAt: row.updated_at,
  countsBefore: sectionCounts(originalSections),
  countsAfter: sectionCounts(nextState.sections),
  retainedSections: nextState.sections.filter(section => section.active !== false).map(section => ({
    id: section.id,
    label: section.name,
    course: section.course,
    teacher: section.teacher,
    allowedPeriods: section.allowedPeriods,
    requiresRotationConfirmation: Boolean(section.requiresRotationConfirmation),
    officialSectionNumber: section.officialSectionNumber || null,
    teamIds: (section.teams || []).map(team => team.id)
  })),
  deactivatedSections: nextState.sections.filter(section => section.active === false).map(section => ({
    id: section.id,
    label: section.name,
    course: section.course,
    teacher: section.teacher,
    retainedSectionId: section.retiredIntoSectionId
  })),
  remappedSectionReferences: [...remap.entries()].map(([from, to]) => ({ from, to })),
  preservedEvents: (nextState.events || []).map(event => ({
    id: event.id,
    name: event.name,
    stage: event.stage,
    version: event.version,
    publishedAt: event.publishedAt || null,
    taskCount: (event.tasks || []).length,
    assignmentRecordCount: (event.tasks || []).reduce((sum, task) => sum + (task.assignmentRecords || []).length, 0),
    productionProgressCount: (event.tasks || []).filter(task => task.progress && task.progress.status !== "Not started").length
  })),
  unresolvedSections,
  unresolvedTeams,
  dayRotationMappingNeeded: nextState.sections.filter(section => section.active !== false && section.requiresRotationConfirmation).map(section => ({
    id: section.id,
    label: section.name,
    allowedPeriods: section.allowedPeriods
  }))
};

writeFileSync(resolve(root, ".tmp/section-reconciliation-report.json"), `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(resolve(root, ".tmp/section-reconciled-state.json"), `${JSON.stringify(nextState, null, 2)}\n`);
const escaped = JSON.stringify(nextState).replace(/'/g, "''");
writeFileSync(resolve(root, ".tmp/section-reconciliation-update.sql"), `UPDATE app_state SET revision = revision + 1, state_json = '${escaped}', updated_at = CURRENT_TIMESTAMP, updated_by = 'codex-section-reconciliation' WHERE id = 1 AND revision = ${row.revision};\n`);
console.log(JSON.stringify(report, null, 2));

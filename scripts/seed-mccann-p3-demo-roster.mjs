/**
 * Seeds McCann Advanced Period 3 demo roster into remote D1 app_state,
 * and clears stale unpublishedChanges on completed Welcome Breakfast.
 *
 * Demo names are intentional placeholders for walkthrough tracking until
 * real school rosters are available.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const tmp = path.join(root, ".tmp", "demo-roster-seed");
fs.mkdirSync(tmp, { recursive: true });

const DEMO_TEAMS = [
  { id: "kevin-p3-team-a", name: "Team A", students: ["Ava Rivera", "Jordan Lee", "Sam Patel", "Casey Morgan"] },
  { id: "adv-p2-team-a", name: "Team B", students: ["Riley Chen", "Morgan Brooks", "Quinn Alvarez", "Taylor Nguyen"] },
  { id: "adv-p5-team-a", name: "Team C", students: ["Jamie Ortiz", "Cameron Blake", "Avery Scott", "Reese Kim"] }
];

function quoteArg(value) {
  if (/[\s"]/u.test(value)) return `"${String(value).replaceAll('"', '\\"')}"`;
  return String(value);
}

function wrangler(args) {
  // Windows needs shell for npx.cmd; quote any args that contain spaces.
  const result = spawnSync("npx", ["wrangler", ...args.map(quoteArg)], {
    cwd: root,
    encoding: "utf8",
    shell: true
  });
  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    throw new Error(`wrangler ${args.join(" ")} failed`);
  }
  return result.stdout;
}

const exportJson = path.join(tmp, "export.json");
const raw = wrangler([
  "d1",
  "execute",
  "gcsd-advanced-culinary",
  "--remote",
  "--command",
  "SELECT revision, state_json, updated_at, updated_by FROM app_state WHERE id = 1;",
  "--json"
]);
fs.writeFileSync(exportJson, raw);
const parsed = JSON.parse(raw);
const row = parsed[0]?.results?.[0] || parsed.results?.[0] || parsed[0]?.result?.[0];
if (!row?.state_json) throw new Error("Could not read app_state row");

const state = JSON.parse(row.state_json);
const section = (state.sections || []).find(item => item.id === "kevin-advanced-p3");
if (!section) throw new Error("kevin-advanced-p3 missing from live state");

const byId = new Map((section.teams || []).map(team => [team.id, team]));
section.teams = DEMO_TEAMS.map(demo => {
  const existing = byId.get(demo.id) || {};
  return {
    ...existing,
    id: demo.id,
    name: demo.name,
    students: demo.students,
    updatedAt: new Date().toISOString(),
    updatedBy: "Demo roster seed"
  };
});

const event = (state.events || []).find(item => item.id === "evt-1785678039445");
if (event) {
  event.unpublishedChanges = false;
  event.unpublishedChangeNote = "";
}

const nextRevision = Number(row.revision) + 1;
// SQLite string literals use single quotes; escape by doubling.
const sqlJson = `'${JSON.stringify(state).replaceAll("'", "''")}'`;
const updateSql = path.join(tmp, "update.sql");
fs.writeFileSync(
  updateSql,
  `UPDATE app_state SET revision = ${nextRevision}, state_json = ${sqlJson}, updated_at = CURRENT_TIMESTAMP, updated_by = 'demo-roster-seed' WHERE id = 1 AND revision = ${Number(row.revision)};`
);
wrangler(["d1", "execute", "gcsd-advanced-culinary", "--remote", "--file", updateSql]);

console.log(JSON.stringify({
  ok: true,
  fromRevision: Number(row.revision),
  toRevision: nextRevision,
  mccannTeams: section.teams.map(team => ({ id: team.id, name: team.name, students: team.students.length })),
  clearedUnpublishedChanges: Boolean(event)
}, null, 2));

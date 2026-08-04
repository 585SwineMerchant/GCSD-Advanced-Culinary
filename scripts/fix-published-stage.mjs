/**
 * Restores Welcome Breakfast to Published stage when publishedAt exists
 * but a later Save Draft overwrote stage to Draft.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmp = path.join(root, ".tmp", "fix-published-stage");
fs.mkdirSync(tmp, { recursive: true });

function quoteArg(value) {
  if (/[\s"]/u.test(value)) return `"${String(value).replaceAll('"', '\\"')}"`;
  return String(value);
}

function wrangler(args) {
  const result = spawnSync("npx", ["wrangler", ...args.map(quoteArg)], { cwd: root, encoding: "utf8", shell: true });
  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    throw new Error(`wrangler failed`);
  }
  return result.stdout;
}

const raw = wrangler([
  "d1", "execute", "gcsd-advanced-culinary", "--remote",
  "--command", "SELECT revision, state_json FROM app_state WHERE id = 1;",
  "--json"
]);
const row = JSON.parse(raw)[0].results[0];
const state = JSON.parse(row.state_json);
const fixed = [];
for (const event of state.events || []) {
  if (event.publishedAt && (event.stage === "Draft" || !event.stage)) {
    fixed.push({ id: event.id, name: event.name, from: event.stage, to: "Published" });
    event.stage = "Published";
  }
}
if (!fixed.length) {
  console.log(JSON.stringify({ ok: true, changed: false, revision: row.revision }, null, 2));
  process.exit(0);
}
const nextRevision = Number(row.revision) + 1;
const sqlJson = `'${JSON.stringify(state).replaceAll("'", "''")}'`;
const updateSql = path.join(tmp, "update.sql");
fs.writeFileSync(updateSql, `UPDATE app_state SET revision = ${nextRevision}, state_json = ${sqlJson}, updated_at = CURRENT_TIMESTAMP, updated_by = 'fix-published-stage' WHERE id = 1 AND revision = ${Number(row.revision)};`);
wrangler(["d1", "execute", "gcsd-advanced-culinary", "--remote", "--file", updateSql]);
console.log(JSON.stringify({ ok: true, fromRevision: Number(row.revision), toRevision: nextRevision, fixed }, null, 2));

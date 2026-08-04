import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function quoteArg(value) {
  if (/[\s"]/u.test(value)) return `"${String(value).replaceAll('"', '\\"')}"`;
  return String(value);
}
function wrangler(args) {
  const result = spawnSync("npx", ["wrangler", ...args.map(quoteArg)], { cwd: root, encoding: "utf8", shell: true });
  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    throw new Error("wrangler failed");
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
const index = (state.events || []).findIndex((event) => event.publishedAt && (event.stage === "Draft" || !event.stage));
if (index < 0) {
  console.log(JSON.stringify({ ok: true, changed: false, revision: row.revision }, null, 2));
  process.exit(0);
}
const event = state.events[index];
const nextRevision = Number(row.revision) + 1;
const command = `UPDATE app_state SET revision = ${nextRevision}, updated_by = 'fix-published-stage', updated_at = CURRENT_TIMESTAMP, state_json = json_set(state_json, '$.events[${index}].stage', 'Published') WHERE id = 1 AND revision = ${Number(row.revision)};`;
wrangler(["d1", "execute", "gcsd-advanced-culinary", "--remote", "--command", command]);
console.log(JSON.stringify({
  ok: true,
  fromRevision: Number(row.revision),
  toRevision: nextRevision,
  fixed: { index, id: event.id, name: event.name, from: event.stage, to: "Published" }
}, null, 2));

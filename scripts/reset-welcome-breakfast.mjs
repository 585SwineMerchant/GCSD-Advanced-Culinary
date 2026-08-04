/**
 * Clears New Teacher Welcome Breakfast so it can be restarted from the inbox.
 * - Removes evt-1785678039445
 * - Resets req-001 to New (clears acceptance linkage)
 * Preserves demo roster and all other events/requests.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const tmp = path.join(root, ".tmp", "reset-welcome-breakfast");
fs.mkdirSync(tmp, { recursive: true });

const EVENT_ID = "evt-1785678039445";
const REQUEST_ID = "req-001";

function quoteArg(value) {
  if (/[\s"]/u.test(value)) return `"${String(value).replaceAll('"', '\\"')}"`;
  return String(value);
}

function wrangler(args) {
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

const raw = wrangler([
  "d1",
  "execute",
  "gcsd-advanced-culinary",
  "--remote",
  "--command",
  "SELECT revision, state_json, updated_at, updated_by FROM app_state WHERE id = 1;",
  "--json"
]);
fs.writeFileSync(path.join(tmp, "before.json"), raw);
const parsed = JSON.parse(raw);
const row = parsed[0]?.results?.[0] || parsed.results?.[0];
if (!row?.state_json) throw new Error("Could not read app_state row");

const state = JSON.parse(row.state_json);
const beforeEvents = (state.events || []).length;
state.events = (state.events || []).filter((event) => event.id !== EVENT_ID);

const request = (state.requests || []).find((item) => item.id === REQUEST_ID);
if (!request) throw new Error(`${REQUEST_ID} missing`);
request.status = "New";
delete request.eventId;
delete request.decidedBy;
delete request.decidedAt;
request.notes = request.notes || "";

// Drop any student contribution snapshots keyed to the removed event, if present.
if (state.studentContributions && typeof state.studentContributions === "object") {
  delete state.studentContributions[EVENT_ID];
}
if (Array.isArray(state.liveProgress)) {
  state.liveProgress = state.liveProgress.filter((item) => item.eventId !== EVENT_ID);
}

const nextRevision = Number(row.revision) + 1;
const sqlJson = `'${JSON.stringify(state).replaceAll("'", "''")}'`;
const updateSql = path.join(tmp, "update.sql");
fs.writeFileSync(
  updateSql,
  `UPDATE app_state SET revision = ${nextRevision}, state_json = ${sqlJson}, updated_at = CURRENT_TIMESTAMP, updated_by = 'reset-welcome-breakfast' WHERE id = 1 AND revision = ${Number(row.revision)};`
);
wrangler(["d1", "execute", "gcsd-advanced-culinary", "--remote", "--file", updateSql]);

console.log(JSON.stringify({
  ok: true,
  fromRevision: Number(row.revision),
  toRevision: nextRevision,
  removedEventId: EVENT_ID,
  eventsBefore: beforeEvents,
  eventsAfter: state.events.length,
  request: { id: request.id, status: request.status, eventName: request.eventName },
  remainingEvents: state.events.map((event) => ({ id: event.id, name: event.name, stage: event.stage }))
}, null, 2));

CREATE TABLE IF NOT EXISTS workspace_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  revision INTEGER NOT NULL DEFAULT 0,
  state_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  actor_email TEXT NOT NULL,
  event_id TEXT,
  detail_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

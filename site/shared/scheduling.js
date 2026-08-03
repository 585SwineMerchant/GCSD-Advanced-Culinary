export const BELL_SCHEDULE_NOTE = "Bell times are isolated here because the screenshots confirm period order and meeting patterns, not exact minute boundaries.";

export const BELL_SCHEDULE = {
  homeroom: { start: "07:15", end: "07:25" },
  1: { start: "07:30", end: "08:20" },
  2: { start: "08:25", end: "09:15" },
  3: { start: "09:20", end: "10:10" },
  4: { start: "10:15", end: "11:55" },
  5: { start: "12:05", end: "12:55" },
  6: { start: "13:00", end: "13:50" }
};

export const DEFAULT_SECTIONS = [
  { id: "kevin-culinary-p1", name: "Culinary Arts & Nutrition I - Kevin Period 1", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: 1, focus: "Intro culinary production", teams: [{ id: "kevin-p1-team-a", name: "Team A", students: [] }] },
  { id: "adv-p2", name: "Culinary Arts & Nutrition I - Kevin Period 2", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: 2, focus: "Intro culinary production", teams: [{ id: "adv-p2-team-a", name: "Team A", students: [] }] },
  { id: "kevin-advanced-p3", name: "Advanced Culinary Arts - Kevin Period 3", teacher: "Kevin McCann", site: "Arcadia", course: "Advanced Culinary Arts", period: 3, focus: "Advanced culinary production", teams: [{ id: "kevin-p3-team-a", name: "Team A", students: [] }] },
  { id: "kevin-culinary-p4", name: "Culinary Arts & Nutrition I - Kevin Period 4", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: 4, focus: "Intro culinary production", teams: [{ id: "kevin-p4-team-a", name: "Team A", students: [] }] },
  { id: "adv-p5", name: "Culinary Arts & Nutrition I - Kevin Period 5", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: 5, focus: "Intro culinary production", teams: [{ id: "adv-p5-team-a", name: "Team A", students: [] }] },
  { id: "kevin-culinary-p6", name: "Culinary Arts & Nutrition I - Kevin Period 6", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: 6, focus: "Intro culinary production", teams: [{ id: "kevin-p6-team-a", name: "Team A", students: [] }] },
  { id: "carlson-culinary-p1", name: "Culinary Arts & Nutrition I - Carlson Period 1", teacher: "Jason Carlson", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: 1, focus: "Intro culinary production", teams: [{ id: "carlson-p1-team-a", name: "Team A", students: [] }] },
  { id: "carlson-culinary-p2", name: "Culinary Arts & Nutrition I - Carlson Period 2", teacher: "Jason Carlson", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: 2, focus: "Intro culinary production", teams: [{ id: "carlson-p2-team-a", name: "Team A", students: [] }] },
  { id: "carlson-advanced-p4", name: "Advanced Culinary Arts - Carlson Period 4", teacher: "Jason Carlson", site: "Arcadia", course: "Advanced Culinary Arts", period: 4, focus: "Advanced culinary production", teams: [{ id: "carlson-p4-team-a", name: "Team A", students: [] }] },
  { id: "carlson-advanced-p5", name: "Advanced Culinary Arts - Carlson Period 5", teacher: "Jason Carlson", site: "Arcadia", course: "Advanced Culinary Arts", period: 5, focus: "Advanced culinary production", teams: [{ id: "carlson-p5-team-a", name: "Team A", students: [] }] },
  { id: "carlson-advanced-p6", name: "Advanced Culinary Arts - Carlson Period 6", teacher: "Jason Carlson", site: "Arcadia", course: "Advanced Culinary Arts", period: 6, focus: "Advanced culinary production", teams: [{ id: "carlson-p6-adv-team-a", name: "Team A", students: [] }] },
  { id: "km", name: "Kitchen & Restaurant Management - Carlson Period 6", teacher: "Jason Carlson", site: "Arcadia", course: "Kitchen & Restaurant Management", period: 6, focus: "Schedule, costing, controls, and objective event briefing", teams: [{ id: "km-team-a", name: "Management Team", students: [] }] }
];

export const SCHOOL_CALENDAR = {
  rotationStart: "2026-09-14",
  nonInstructionDays: ["2026-09-07", "2026-10-12", "2026-11-11", "2026-11-25", "2026-11-26", "2026-11-27"],
  specialSchedules: {}
};

export const ROTATION_OVERRIDES = {
  "2026-09-14": 1, "2026-09-15": 2, "2026-09-16": 3, "2026-09-17": 4, "2026-09-18": 1,
  "2026-09-21": 2, "2026-09-22": 3, "2026-09-23": 4, "2026-09-24": 1, "2026-09-25": 2,
  "2026-09-28": 3, "2026-09-29": 4, "2026-09-30": 1, "2026-10-01": 2, "2026-10-02": 3
};

const MEETING_TEMPLATES = {
  1: ["kevin-culinary-p1", "kevin-advanced-p3", "adv-p5", "kevin-culinary-p6", "carlson-culinary-p2", "carlson-advanced-p4", "carlson-advanced-p6"],
  2: ["kevin-culinary-p1", "adv-p2", "kevin-advanced-p3", "adv-p5", "carlson-culinary-p1", "carlson-culinary-p2", "carlson-advanced-p4", "km"],
  3: ["kevin-culinary-p1", "adv-p2", "kevin-advanced-p3", "kevin-culinary-p4", "adv-p5", "carlson-culinary-p1", "carlson-advanced-p4", "carlson-advanced-p5", "km"],
  4: ["adv-p2", "kevin-advanced-p3", "adv-p5", "kevin-culinary-p6", "carlson-culinary-p1", "carlson-culinary-p2", "carlson-advanced-p5", "km"]
};

const cleanStudents = value => (Array.isArray(value) ? value : String(value || "").split(/[\n,]+/))
  .map(student => String(student).trim()).filter(Boolean);

const isoDate = value => String(value || "").slice(0, 10);
const parseDate = value => {
  const date = new Date(`${isoDate(value)}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};
const dateKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export function normalizeSections(value) {
  const defaultsById = new Map(DEFAULT_SECTIONS.map(section => [section.id, section]));
  const suppliedById = new Map((Array.isArray(value) ? value : []).map(section => [String(section.id), section]));
  return DEFAULT_SECTIONS.map((fallback, index) => {
    const supplied = suppliedById.get(fallback.id) || {};
    const base = { ...fallback, ...supplied };
    return {
      id: String(base.id || `section-${index + 1}`),
      name: String(base.name || fallback.name),
      focus: String(base.focus || fallback.focus || ""),
      teacher: String(base.teacher || fallback.teacher || ""),
      site: String(base.site || fallback.site || ""),
      course: String(base.course || fallback.course || ""),
      period: Number(base.period || fallback.period || 0),
      teams: (Array.isArray(base.teams) && base.teams.length ? base.teams : fallback.teams).map((team, teamIndex) => ({
        id: String(team.id || `${base.id}-team-${teamIndex + 1}`),
        name: String(team.name || `Team ${teamIndex + 1}`),
        students: cleanStudents(team.students)
      }))
    };
  }).concat([...suppliedById.values()].filter(section => !defaultsById.has(String(section.id))).map((section, index) => ({
    id: String(section.id || `extra-section-${index + 1}`),
    name: String(section.name || `Section ${index + 1}`),
    focus: String(section.focus || ""),
    teacher: String(section.teacher || ""),
    site: String(section.site || ""),
    course: String(section.course || ""),
    period: Number(section.period || 0),
    teams: (Array.isArray(section.teams) ? section.teams : []).map((team, teamIndex) => ({
      id: String(team.id || `${section.id}-team-${teamIndex + 1}`),
      name: String(team.name || `Team ${teamIndex + 1}`),
      students: cleanStudents(team.students)
    }))
  })));
}

export function teamsForSection(sections, sectionId) {
  return normalizeSections(sections).find(section => section.id === sectionId)?.teams || [];
}

export function rotationDayForDate(iso, calendar = SCHOOL_CALENDAR) {
  const key = isoDate(iso);
  if (!key) return null;
  if (calendar.nonInstructionDays?.includes(key)) return null;
  if (calendar.specialSchedules?.[key]?.rotationDay) return calendar.specialSchedules[key].rotationDay;
  if (ROTATION_OVERRIDES[key]) return ROTATION_OVERRIDES[key];
  const start = parseDate(calendar.rotationStart);
  const target = parseDate(key);
  if (!start || !target || target < start) return null;
  let instructional = 0;
  for (let cursor = new Date(start); cursor <= target; cursor.setDate(cursor.getDate() + 1)) {
    const cursorKey = dateKey(cursor);
    const weekday = cursor.getDay();
    if (weekday && weekday < 6 && !calendar.nonInstructionDays?.includes(cursorKey)) instructional += 1;
  }
  return ((instructional - 1) % 4) + 1;
}

export function sectionMeetsOnDate(sectionId, iso, sections = DEFAULT_SECTIONS, calendar = SCHOOL_CALENDAR) {
  const section = normalizeSections(sections).find(item => item.id === sectionId);
  const rotationDay = rotationDayForDate(iso, calendar);
  if (!section || !rotationDay) return null;
  if (!MEETING_TEMPLATES[rotationDay]?.includes(section.id)) return null;
  const bell = BELL_SCHEDULE[section.period];
  if (!bell) return null;
  return { date: isoDate(iso), rotationDay, start: bell.start, end: bell.end, section };
}

export function nextMeetingDates(sectionId, fromIso, sections = DEFAULT_SECTIONS, count = 3) {
  const start = parseDate(fromIso);
  if (!start) return [];
  const matches = [];
  for (let offset = 1; offset <= 40 && matches.length < count; offset += 1) {
    const date = new Date(start);
    date.setDate(date.getDate() + offset);
    const key = dateKey(date);
    if (sectionMeetsOnDate(sectionId, key, sections)) matches.push(key);
  }
  return matches;
}

export function formatMeetingWindow(meeting) {
  if (!meeting) return "This section does not meet on the selected date.";
  const date = parseDate(meeting.date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  return `${date} · Day ${meeting.rotationDay} · Period ${meeting.section.period} · ${meeting.start}-${meeting.end} · ${meeting.section.course} · ${meeting.section.teacher}`;
}

export function makeAssignment(sections, sectionId, workDate, teamIds = []) {
  const section = normalizeSections(sections).find(item => item.id === sectionId);
  const teams = teamsForSection(sections, sectionId);
  const allowed = new Set(teams.map(team => team.id));
  const selected = (Array.isArray(teamIds) ? teamIds : [teamIds]).filter(teamId => allowed.has(teamId));
  return {
    id: `assign-${sectionId || "section"}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sectionId: section?.id || "",
    workDate: isoDate(workDate),
    teamIds: selected.length ? selected : teams.slice(0, 1).map(team => team.id)
  };
}

export function normalizeTaskAssignments(task, sections) {
  const normalized = normalizeSections(sections);
  const records = Array.isArray(task.assignmentRecords) && task.assignmentRecords.length
    ? task.assignmentRecords
    : [{ id: `assign-${task.id || "legacy"}-1`, sectionId: task.section || "", workDate: task.workDate || "", teamIds: [task.teamId || ""].filter(Boolean) }];
  task.assignmentRecords = records.map((record, index) => {
    const section = normalized.find(item => item.id === record.sectionId);
    const teams = section ? teamsForSection(normalized, section.id) : [];
    const allowed = new Set(teams.map(team => team.id));
    const teamIds = (Array.isArray(record.teamIds) ? record.teamIds : [record.teamId]).filter(teamId => allowed.has(teamId));
    return {
      id: String(record.id || `assign-${task.id || "task"}-${index + 1}`),
      sectionId: section?.id || "",
      workDate: isoDate(record.workDate || task.workDate || ""),
      teamIds: teamIds.length ? teamIds : teams.slice(0, 1).map(team => team.id)
    };
  });
  const primary = task.assignmentRecords[0] || {};
  const section = normalized.find(item => item.id === primary.sectionId);
  const teams = teamsForSection(normalized, primary.sectionId).filter(team => primary.teamIds?.includes(team.id));
  task.section = primary.sectionId || "";
  task.teamId = teams[0]?.id || "";
  task.team = teams.map(team => team.name).join(", ");
  task.students = teams.flatMap(team => team.students).join(", ");
  task.workDate = primary.workDate || task.workDate || "";
  return task.assignmentRecords;
}

export function applyTeamToTask(task, sections, sectionId, teamId) {
  task.assignmentRecords = [makeAssignment(sections, sectionId, task.workDate, [teamId])];
  normalizeTaskAssignments(task, sections);
  return task;
}

export function assignmentIssues(task, sections, calendar = SCHOOL_CALENDAR) {
  const configured = normalizeSections(sections);
  const issues = [];
  const label = task.name || "A production task";
  const records = normalizeTaskAssignments(task, configured);
  if (!records.length) issues.push(`${label} needs at least one participating section.`);
  for (const record of records) {
    const section = configured.find(item => item.id === record.sectionId);
    if (!record.workDate) issues.push(`${label} needs a production date.`);
    if (!section) { issues.push(`${label} has an unknown class section.`); continue; }
    const meeting = sectionMeetsOnDate(section.id, record.workDate, configured, calendar);
    if (!meeting) {
      const next = nextMeetingDates(section.id, record.workDate, configured).join(", ");
      issues.push(`${label}: ${section.name} does not meet on ${record.workDate || "that date"}${next ? `. Next available: ${next}.` : "."}`);
    }
    if (!record.teamIds?.length) issues.push(`${label}: ${section.name} needs at least one participating team.`);
    const allowed = new Set(teamsForSection(configured, section.id).map(team => team.id));
    if ((record.teamIds || []).some(teamId => !allowed.has(teamId))) issues.push(`${label}: a selected team does not belong to ${section.name}.`);
  }
  return issues;
}

export function taskPublicationIssues(event, sections) {
  return (event.tasks || []).flatMap(task => assignmentIssues(task, sections));
}

export function assignmentsForSection(task, sectionId, sections) {
  return normalizeTaskAssignments(task, sections).filter(record => record.sectionId === sectionId);
}

export function aggregateProgress(task) {
  const progress = task.progress || {};
  const assignmentProgress = Object.values(task.assignmentProgress || {});
  if (!assignmentProgress.length) return progress;
  const latest = assignmentProgress.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))[0] || {};
  const statuses = assignmentProgress.map(item => item.status);
  const status = statuses.includes("Blocked") ? "Blocked" : statuses.every(item => item === "Complete") ? "Complete" : statuses.includes("In progress") ? "In progress" : latest.status || progress.status || "Not started";
  return {
    ...progress,
    status,
    quantity: assignmentProgress.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    usableYield: assignmentProgress.reduce((sum, item) => sum + Number(item.usableYield || 0), 0),
    waste: assignmentProgress.reduce((sum, item) => sum + Number(item.waste || 0), 0),
    storage: latest.storage || progress.storage || "",
    issue: assignmentProgress.map(item => item.issue).filter(Boolean).join(" | "),
    updatedAt: latest.updatedAt || progress.updatedAt || null,
    updatedBy: latest.updatedBy || progress.updatedBy || null
  };
}

export function offsetDate(isoDateValue, offset) {
  const date = parseDate(isoDateValue);
  if (!date) return "";
  date.setDate(date.getDate() + offset);
  return dateKey(date);
}

export const BELL_SCHEDULE_NOTE = "Bell times are isolated here so schedule corrections can be made without changing assignment logic.";

export const BELL_SCHEDULE = {
  homeroom: { start: "07:20", end: "07:33" },
  1: { start: "07:38", end: "08:33" },
  2: { start: "08:38", end: "09:33" },
  3: { start: "09:38", end: "10:33" },
  4: { start: "10:38", end: "12:08" },
  5: { start: "12:11", end: "13:05" },
  6: { start: "13:10", end: "14:05" }
};

export const DEFAULT_SECTIONS = [
  { id: "kevin-advanced-p3", name: "McCann Advanced - Period 3", provisionalLabel: "Advanced - Period 3", officialSectionNumber: "", teacher: "Kevin McCann", site: "Arcadia", course: "Advanced Culinary Arts", period: 3, allowedPeriods: [3], focus: "Advanced culinary production", active: true, teams: [
    { id: "kevin-p3-team-a", name: "Team A", students: ["Ava Rivera", "Jordan Lee", "Sam Patel", "Casey Morgan"] },
    { id: "adv-p2-team-a", name: "Team B", students: ["Riley Chen", "Morgan Brooks", "Quinn Alvarez", "Taylor Nguyen"] },
    { id: "adv-p5-team-a", name: "Team C", students: ["Jamie Ortiz", "Cameron Blake", "Avery Scott", "Reese Kim"] }
  ] },
  { id: "carlson-advanced-p4", name: "Carlson Advanced - Period 4", provisionalLabel: "Advanced - Period 4", officialSectionNumber: "", teacher: "Jason Carlson", site: "Arcadia", course: "Advanced Culinary Arts", period: 4, allowedPeriods: [4], focus: "Advanced culinary production", active: true, teams: [{ id: "carlson-p4-team-a", name: "Team A", students: [] }] },
  { id: "carlson-advanced-p5", name: "Carlson Advanced - Period 5/6", provisionalLabel: "Advanced - Period 5/6", officialSectionNumber: "", teacher: "Jason Carlson", site: "Arcadia", course: "Advanced Culinary Arts", period: null, allowedPeriods: [5, 6], requiresRotationConfirmation: true, focus: "Advanced culinary production", active: true, teams: [{ id: "carlson-p5-team-a", name: "Team A", students: [] }] },
  { id: "kevin-culinary-p1", name: "McCann Intro - Period 1", provisionalLabel: "Intro - Period 1", officialSectionNumber: "", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: 1, allowedPeriods: [1], focus: "Intro culinary production", teams: [{ id: "kevin-p1-team-a", name: "Team A", students: [] }] },
  { id: "kevin-intro-p23", name: "McCann Intro - Period 2/3", provisionalLabel: "Intro - Period 2/3", officialSectionNumber: "", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: null, allowedPeriods: [2, 3], requiresRotationConfirmation: true, focus: "Intro culinary production", teams: [{ id: "kevin-intro-p23-team-a", name: "Team A", students: [] }] },
  { id: "kevin-culinary-p4", name: "McCann Intro - Period 4/5 A", provisionalLabel: "Intro - Period 4/5 A", officialSectionNumber: "", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: null, allowedPeriods: [4, 5], requiresRotationConfirmation: true, focus: "Intro culinary production", teams: [{ id: "kevin-p4-team-a", name: "Team A", students: [] }] },
  { id: "kevin-culinary-p6", name: "McCann Intro - Period 4/5 B", provisionalLabel: "Intro - Period 4/5 B", officialSectionNumber: "", teacher: "Kevin McCann", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: null, allowedPeriods: [4, 5], requiresRotationConfirmation: true, focus: "Intro culinary production", teams: [{ id: "kevin-p6-team-a", name: "Team A", students: [] }] },
  { id: "carlson-culinary-p1", name: "Carlson Intro - Period 1/2", provisionalLabel: "Intro - Period 1/2", officialSectionNumber: "", teacher: "Jason Carlson", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: null, allowedPeriods: [1, 2], requiresRotationConfirmation: true, focus: "Intro culinary production", teams: [{ id: "carlson-p1-team-a", name: "Team A", students: [] }] },
  { id: "km", name: "Carlson Kitchen Management - Period 6", provisionalLabel: "Kitchen Management - Period 6", officialSectionNumber: "", teacher: "Jason Carlson", site: "Arcadia", course: "Kitchen & Restaurant Management", period: 6, allowedPeriods: [6], focus: "Schedule, costing, controls, and objective event briefing", teams: [{ id: "km-team-a", name: "Management Team", students: [] }] },
  { id: "adv-p2", name: "Retired McCann Advanced provisional section", provisionalLabel: "Retired Advanced provisional section", officialSectionNumber: "", teacher: "Kevin McCann", site: "Arcadia", course: "Advanced Culinary Arts", period: null, allowedPeriods: [], focus: "Inactive legacy section retained for audit history", active: false, retiredIntoSectionId: "kevin-advanced-p3", teams: [{ id: "adv-p2-team-a", name: "Team A", students: [] }] },
  { id: "adv-p5", name: "Retired McCann Advanced provisional section", provisionalLabel: "Retired Advanced provisional section", officialSectionNumber: "", teacher: "Kevin McCann", site: "Arcadia", course: "Advanced Culinary Arts", period: null, allowedPeriods: [], focus: "Inactive legacy section retained for audit history", active: false, retiredIntoSectionId: "kevin-advanced-p3", teams: [{ id: "adv-p5-team-a", name: "Team A", students: [] }] },
  { id: "carlson-advanced-p6", name: "Retired Carlson Advanced provisional section", provisionalLabel: "Retired Advanced provisional section", officialSectionNumber: "", teacher: "Jason Carlson", site: "Arcadia", course: "Advanced Culinary Arts", period: null, allowedPeriods: [], focus: "Inactive legacy section retained for audit history", active: false, retiredIntoSectionId: "carlson-advanced-p5", teams: [{ id: "carlson-p6-adv-team-a", name: "Team A", students: [] }] },
  { id: "carlson-culinary-p2", name: "Retired Carlson Intro period occurrence", provisionalLabel: "Retired Intro period occurrence", officialSectionNumber: "", teacher: "Jason Carlson", site: "Arcadia", course: "Culinary Arts & Nutrition I", period: null, allowedPeriods: [], focus: "Inactive legacy section retained for audit history", active: false, retiredIntoSectionId: "carlson-culinary-p1", teams: [{ id: "carlson-p2-team-a", name: "Team A", students: [] }] }
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

export const ADVANCED_MEETING_RULES = {
  1: { "kevin-advanced-p3": 3, "carlson-advanced-p4": 4 },
  2: { "kevin-advanced-p3": 3, "carlson-advanced-p4": 4 },
  3: { "kevin-advanced-p3": 3, "carlson-advanced-p4": 4 },
  4: { "kevin-advanced-p3": 3, "carlson-advanced-p4": 4 }
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
    const canonicalAdvanced = fallback.course === "Advanced Culinary Arts";
    return {
      id: String(base.id || `section-${index + 1}`),
      name: String(fallback.name || base.name || ""),
      focus: String(fallback.focus || base.focus || ""),
      teacher: String(fallback.teacher || base.teacher || ""),
      site: String(fallback.site || base.site || ""),
      course: String(fallback.course || base.course || ""),
      provisionalLabel: String(base.provisionalLabel || fallback.provisionalLabel || ""),
      officialSectionNumber: String(base.officialSectionNumber || fallback.officialSectionNumber || ""),
      active: fallback.active === false ? false : base.active !== false,
      requiresReview: Boolean(base.requiresReview || fallback.requiresReview || false),
      requiresRotationConfirmation: Boolean(base.requiresRotationConfirmation || fallback.requiresRotationConfirmation || false),
      retiredIntoSectionId: String(base.retiredIntoSectionId || fallback.retiredIntoSectionId || ""),
      period: Number(fallback.period || base.period || 0) || null,
      allowedPeriods: (Array.isArray(fallback.allowedPeriods) ? fallback.allowedPeriods : Array.isArray(base.allowedPeriods) ? base.allowedPeriods : []).map(Number).filter(Boolean),
      teams: (Array.isArray(base.teams) && base.teams.length ? base.teams : fallback.teams).map((team, teamIndex) => normalizeTeamRecord(team, base.id || fallback.id, teamIndex))
    };
  }).concat([...suppliedById.values()].filter(section => !defaultsById.has(String(section.id))).map((section, index) => ({
    id: String(section.id || `extra-section-${index + 1}`),
    name: String(section.name || `Section ${index + 1}`),
    focus: String(section.focus || ""),
    teacher: String(section.teacher || ""),
    site: String(section.site || ""),
    course: String(section.course || ""),
    provisionalLabel: String(section.provisionalLabel || ""),
    officialSectionNumber: String(section.officialSectionNumber || ""),
    active: section.active !== false,
    requiresReview: Boolean(section.requiresReview || false),
    requiresRotationConfirmation: Boolean(section.requiresRotationConfirmation || false),
    retiredIntoSectionId: String(section.retiredIntoSectionId || ""),
    period: Number(section.period || 0) || null,
    allowedPeriods: (Array.isArray(section.allowedPeriods) ? section.allowedPeriods : []).map(Number).filter(Boolean),
    teams: (Array.isArray(section.teams) ? section.teams : []).map((team, teamIndex) => normalizeTeamRecord(team, section.id, teamIndex))
  })));
}

export function teamsForSection(sections, sectionId) {
  return (normalizeSections(sections).find(section => section.id === sectionId)?.teams || []).filter(team => team.active !== false);
}

export function sectionTeamCapacity(section) {
  const teams = Array.isArray(section?.teams) ? section.teams.filter(team => team.active !== false) : [];
  return { count: teams.length, remaining: Math.max(0, MAX_TEAMS_PER_SECTION - teams.length), atLimit: teams.length >= MAX_TEAMS_PER_SECTION };
}

export function isAdvancedSection(section) {
  return section?.active !== false && section?.course === "Advanced Culinary Arts";
}

export function sectionDisplayLabel(section) {
  if (!section) return "Unassigned section";
  const family = String(section.teacher || "").split(" ").at(-1) || section.teacher || "Teacher";
  return section.officialSectionNumber ? `${family} - Section ${section.officialSectionNumber}` : section.name || `${family} - ${section.provisionalLabel || "Section TBD"}`;
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
  if (section.requiresRotationConfirmation) return null;
  const period = ADVANCED_MEETING_RULES[rotationDay]?.[section.id];
  if (!isAdvancedSection(section) || !period) return null;
  const bell = BELL_SCHEDULE[period];
  if (!bell) return null;
  return { date: isoDate(iso), rotationDay, period, start: bell.start, end: bell.end, section };
}

export function availableMeetingsForDate(iso, sections = DEFAULT_SECTIONS, calendar = SCHOOL_CALENDAR) {
  return normalizeSections(sections).map(section => sectionMeetsOnDate(section.id, iso, sections, calendar)).filter(Boolean);
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
  return `${date} - Day ${meeting.rotationDay} - ${sectionDisplayLabel(meeting.section)} - Period ${meeting.period} - ${meeting.start}-${meeting.end}`;
}

export const PRODUCTION_STATUSES = ["Not started", "In progress", "Blocked", "Ready for handoff", "Complete"];
export const WASTE_CATEGORIES = ["", "Trim", "Spoilage", "Production error", "Damaged finished product", "Unused but recoverable", "Other"];
export const HANDOFF_DISPOSITIONS = ["", "Held at station", "Cooling rack", "Refrigerated", "Frozen", "Expo handoff", "Delivered", "Discarded", "Other"];
export const KITCHENS = ["", "Kitchen 1", "Kitchen 2", "Kitchen 3", "Kitchen 4"];
export const STATION_DUTIES = ["kitchen-production", "off-station", "desk-work"];
export const STATION_DUTY_LABELS = {
  "kitchen-production": "Kitchen production",
  "off-station": "Off-station",
  "desk-work": "Desk work"
};
export const MAX_TEAMS_PER_SECTION = 8;
export const MAX_SIMULTANEOUS_KITCHEN_TEAMS = 4;
export const SECTION_COLORS = {
  "kevin-advanced-p3": { name: "McCann Advanced", tint: "#eef7f1", border: "#2f7d57", text: "#123f31" },
  "carlson-advanced-p4": { name: "Carlson Advanced P4", tint: "#f4f1ea", border: "#9a6b24", text: "#4b3714" },
  "carlson-advanced-p5": { name: "Carlson Advanced P5/6", tint: "#f1f4f8", border: "#4f6f8f", text: "#233b52" }
};

export function normalizeStationDuty(value) {
  return STATION_DUTIES.includes(value) ? value : "kitchen-production";
}

export function requiresKitchen(record) {
  return normalizeStationDuty(record?.stationDuty) === "kitchen-production";
}

export function stationAssignmentLabel(record) {
  const duty = normalizeStationDuty(record?.stationDuty);
  if (duty !== "kitchen-production") return STATION_DUTY_LABELS[duty];
  return record?.kitchen || "Kitchen needed";
}

export function normalizeStationSequence(value) {
  const sequence = Math.trunc(Number(value));
  return Number.isFinite(sequence) && sequence > 0 ? sequence : 1;
}

function normalizeTeamRecord(team, sectionId, teamIndex) {
  return {
    id: String(team.id || `${sectionId}-team-${teamIndex + 1}`),
    name: String(team.name || `Team ${teamIndex + 1}`),
    students: cleanStudents(team.students),
    active: team.active !== false,
    updatedAt: team.updatedAt || null,
    updatedBy: team.updatedBy || null
  };
}

export function sectionColor(sectionId) {
  return SECTION_COLORS[sectionId] || { name: "Section", tint: "#f7f9f8", border: "#8a9891", text: "#25342e" };
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
    teamIds: selected.length ? selected : teams.slice(0, 1).map(team => team.id),
    kitchen: "",
    stationDuty: "kitchen-production",
    stationSequence: 1,
    station: "",
    allocatedQuantity: 0,
    allocatedUnit: "",
    studentDetails: "",
    handoffConfirmed: false,
    status: "Not started"
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
    const stationDuty = normalizeStationDuty(record.stationDuty);
    const kitchen = KITCHENS.includes(record.kitchen)
      ? record.kitchen
      : (/Kitchen\s+[1-4]/i.test(record.station) ? record.station.match(/Kitchen\s+[1-4]/i)[0].replace(/k/i, "K") : "");
    return {
      id: String(record.id || `assign-${task.id || "task"}-${index + 1}`),
      sectionId: section?.id || "",
      workDate: isoDate(record.workDate || task.workDate || ""),
      teamIds: teamIds.length ? teamIds : teams.slice(0, 1).map(team => team.id),
      kitchen: stationDuty === "kitchen-production" ? kitchen : "",
      stationDuty,
      stationSequence: normalizeStationSequence(record.stationSequence),
      station: String(record.station || ""),
      allocatedQuantity: Math.max(0, Number(record.allocatedQuantity || 0)),
      allocatedUnit: String(record.allocatedUnit || task.plannedUnit || ""),
      studentDetails: String(record.studentDetails || ""),
      handoffConfirmed: Boolean(record.handoffConfirmed),
      status: PRODUCTION_STATUSES.includes(record.status) ? record.status : "Not started"
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

export function kitchenUseSlots(event, sections = DEFAULT_SECTIONS) {
  const configured = normalizeSections(sections);
  const slots = [];
  for (const task of event?.tasks || []) {
    for (const record of normalizeTaskAssignments(task, configured)) {
      if (!requiresKitchen(record) || !record.sectionId || !record.workDate) continue;
      const teamIds = record.teamIds?.length ? record.teamIds : [""];
      for (const teamId of teamIds) {
        slots.push({
          taskId: task.id,
          taskName: task.name || "A production task",
          recordId: record.id,
          sectionId: record.sectionId,
          workDate: record.workDate,
          stationSequence: normalizeStationSequence(record.stationSequence),
          kitchen: record.kitchen || "",
          teamId,
          teamName: teamsForSection(configured, record.sectionId).find(team => team.id === teamId)?.name || "Team not selected"
        });
      }
    }
  }
  return slots;
}

export function kitchenSchedulingIssues(event, sections = DEFAULT_SECTIONS) {
  const issues = [];
  const slots = kitchenUseSlots(event, sections);
  const byBlock = new Map();
  for (const slot of slots) {
    const key = `${slot.sectionId}|${slot.workDate}|${slot.stationSequence}`;
    const list = byBlock.get(key) || [];
    list.push(slot);
    byBlock.set(key, list);
  }
  for (const list of byBlock.values()) {
    const uniqueTeams = [...new Set(list.map(slot => slot.teamId).filter(Boolean))];
    if (uniqueTeams.length > MAX_SIMULTANEOUS_KITCHEN_TEAMS) {
      const sample = list[0];
      issues.push(`${sectionDisplayLabel(normalizeSections(sections).find(section => section.id === sample.sectionId))} on ${sample.workDate}, sequence ${sample.stationSequence}: ${uniqueTeams.length} teams are scheduled in kitchens at once. Limit is ${MAX_SIMULTANEOUS_KITCHEN_TEAMS}.`);
    }
    const byKitchen = new Map();
    for (const slot of list.filter(item => item.kitchen)) {
      const kitchenTeams = byKitchen.get(slot.kitchen) || new Set();
      if (slot.teamId) kitchenTeams.add(slot.teamId);
      byKitchen.set(slot.kitchen, kitchenTeams);
    }
    for (const [kitchen, teamIds] of byKitchen.entries()) {
      if (teamIds.size > 1) {
        const sample = list.find(item => item.kitchen === kitchen);
        issues.push(`${sample.taskName}: ${kitchen} is assigned to more than one team at the same time on ${sample.workDate} sequence ${sample.stationSequence}. Use different sequences for sequential reuse.`);
      }
    }
  }
  return issues;
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
    if (!isAdvancedSection(section)) issues.push(`${label}: ${section.name} is not an Advanced Culinary section.`);
    if (section.requiresReview) issues.push(`${label}: ${section.name} requires teacher review before publication.`);
    if (section.requiresRotationConfirmation) issues.push(`${label}: ${section.name} has allowed periods ${section.allowedPeriods?.join("/") || "pending"}, but its exact Day 1-Day 4 mapping requires district confirmation.`);
    const meeting = sectionMeetsOnDate(section.id, record.workDate, configured, calendar);
    if (!meeting) {
      const next = nextMeetingDates(section.id, record.workDate, configured).join(", ");
      issues.push(`${label}: ${section.name} does not meet on ${record.workDate || "that date"}${next ? `. Next available: ${next}.` : "."}`);
    }
    const sectionTeams = teamsForSection(configured, section.id);
    if (!sectionTeams.length) issues.push(`${label}: ${section.name} has no teams in Access & Rosters. Complete team setup in Step 8.`);
    else if (!record.teamIds?.length) issues.push(`${label}: ${section.name} needs at least one participating team.`);
    if (requiresKitchen(record) && !record.kitchen) issues.push(`${label}: ${section.name} needs Kitchen 1-4 assigned.`);
    if (!requiresKitchen(record) && record.kitchen) issues.push(`${label}: ${section.name} is marked ${STATION_DUTY_LABELS[normalizeStationDuty(record.stationDuty)]} and should not carry a kitchen assignment.`);
    const allowed = new Set(sectionTeams.map(team => team.id));
    if ((record.teamIds || []).some(teamId => !allowed.has(teamId))) issues.push(`${label}: a selected team does not belong to ${section.name}.`);
  }
  const allocation = allocationStatus(task, configured);
  if (allocation.state === "under") issues.push(`${label}: assignment allocations are under the planned ${allocation.required} ${allocation.unit} by ${allocation.delta} ${allocation.unit}.`);
  if (allocation.state === "over") issues.push(`${label}: assignment allocations are over the planned ${allocation.required} ${allocation.unit} by ${allocation.delta} ${allocation.unit}.`);
  return issues;
}

export function taskPublicationIssues(event, sections) {
  return [
    ...(event.tasks || []).flatMap(task => assignmentIssues(task, sections)),
    ...kitchenSchedulingIssues(event, sections)
  ];
}

export function contributionNeedsKitchen(contribution) {
  return requiresKitchen(contribution?.record);
}

export function contributionIsIncomplete(contribution) {
  if (!contribution?.section || !contribution?.team?.id || !contribution?.meeting) return true;
  if (contributionNeedsKitchen(contribution) && !contribution.record.kitchen) return true;
  return false;
}

export function assignmentsForSection(task, sectionId, sections) {
  return normalizeTaskAssignments(task, sections).filter(record => record.sectionId === sectionId);
}

export function assignmentContributionKey(taskId, record, teamId) {
  return [taskId || "task", record?.id || record?.sectionId || "section", teamId || "team"].map(value => String(value).replace(/\s+/g, "-")).join("::");
}

export function assignmentContributions(task, sections) {
  const records = normalizeTaskAssignments(task, sections);
  const progress = task.assignmentProgress || {};
  return records.flatMap(record => {
    const section = normalizeSections(sections).find(item => item.id === record.sectionId);
    const teams = teamsForSection(sections, record.sectionId).filter(team => record.teamIds.includes(team.id));
    const usableTeams = teams.length ? teams : [{ id: "", name: "Team not selected", students: [] }];
    const meeting = sectionMeetsOnDate(record.sectionId, record.workDate, sections);
    return usableTeams.map(team => {
      const key = assignmentContributionKey(task.id, record, team.id);
      const legacy = progress[key] || progress[record.id] || progress[record.sectionId] || {};
      return {
        key,
        record,
        section,
        team,
        meeting,
        progress: normalizeProgress(legacy)
      };
    });
  });
}

export function normalizeProgress(value = {}) {
  const status = PRODUCTION_STATUSES.includes(value.status) ? value.status : "Not started";
  const wasteCategory = WASTE_CATEGORIES.includes(value.wasteCategory) ? value.wasteCategory : "";
  const handoffDisposition = HANDOFF_DISPOSITIONS.includes(value.handoffDisposition) ? value.handoffDisposition : "";
  return {
    status,
    quantity: Math.max(0, Number(value.quantity || 0)),
    unit: String(value.unit || ""),
    usableYield: Math.max(0, Number(value.usableYield || 0)),
    waste: Math.max(0, Number(value.waste || 0)),
    wasteCategory,
    storage: String(value.storage || value.handoffDisposition || ""),
    handoffDisposition,
    handoffNote: String(value.handoffNote || ""),
    issue: String(value.issue || ""),
    recoveryAction: String(value.recoveryAction || ""),
    legacyReviewRequired: Boolean(value.legacyReviewRequired),
    updatedAt: value.updatedAt || null,
    updatedBy: value.updatedBy || null
  };
}

export function hasSavedProgress(progress) {
  return Boolean(progress?.updatedAt || progress?.updatedBy);
}

export function progressDisplayState(progress) {
  const normalized = normalizeProgress(progress);
  return hasSavedProgress(progress) ? normalized.status : "Not yet saved";
}

export function allocationStatus(task, sections = DEFAULT_SECTIONS) {
  const records = normalizeTaskAssignments(task, sections);
  const required = Math.max(0, Number(task.plannedQuantity || String(task.detail || "").match(/(\d+(?:\.\d+)?)\s+(?:batch|roll|portion|piece|unit)/i)?.[1] || 0));
  const unit = String(task.plannedUnit || records.find(record => record.allocatedUnit)?.allocatedUnit || "units");
  const assigned = records.reduce((sum, record) => sum + Number(record.allocatedQuantity || 0), 0);
  const delta = Math.abs(required - assigned);
  const state = !required ? "none" : assigned < required ? "under" : assigned > required ? "over" : "balanced";
  return { required, assigned, delta, unit, state };
}

export function allocationLabel(record, task = {}) {
  const quantity = Number(record?.allocatedQuantity || 0);
  const unit = record?.allocatedUnit || task.plannedUnit || "units";
  return quantity > 0 ? `Allocated: ${quantity} ${unit}` : "Allocation needed";
}

export function derivedTaskStatus(task, sections = DEFAULT_SECTIONS) {
  const contributions = assignmentContributions(task, sections);
  const allocation = allocationStatus(task, sections);
  if (!contributions.length || allocation.state === "under" || allocation.state === "over") return "Invalid or incomplete";
  if (contributions.some(contributionIsIncomplete)) return "Invalid or incomplete";
  const statuses = contributions.map(item => progressDisplayState(item.progress));
  if (statuses.includes("Blocked")) return "Blocked";
  if (statuses.every(status => status === "Complete")) return "Completed";
  if (statuses.some(status => ["In progress", "Ready for handoff", "Complete"].includes(status))) return "In progress";
  return "Not started";
}

export function aggregateProgress(task) {
  const progress = normalizeProgress(task.progress || {});
  const assignmentProgress = Object.values(task.assignmentProgress || {}).map(normalizeProgress);
  if (!assignmentProgress.length) return progress;
  const latest = [...assignmentProgress].sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))[0] || {};
  const statuses = assignmentProgress.map(item => item.status);
  const status = statuses.includes("Blocked") ? "Blocked" : statuses.every(item => item === "Complete") ? "Complete" : statuses.includes("In progress") || statuses.includes("Ready for handoff") ? "In progress" : latest.status || progress.status || "Not started";
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

export function productionDates(event, sections = DEFAULT_SECTIONS) {
  const dates = new Set();
  for (const task of event?.tasks || []) {
    for (const record of normalizeTaskAssignments(task, sections)) {
      if (record.workDate) dates.add(record.workDate);
    }
  }
  return [...dates].sort();
}

export function preferredProductionDate(event, todayIso, sections = DEFAULT_SECTIONS) {
  const dates = productionDates(event, sections);
  if (!dates.length) return "";
  const today = isoDate(todayIso || new Date().toISOString());
  if (dates.includes(today)) return today;
  const unfinished = dates.find(date => (event.tasks || []).some(task => normalizeTaskAssignments(task, sections).some(record => record.workDate === date) && aggregateProgress(task).status !== "Complete"));
  return unfinished || dates.find(date => date >= today) || dates[0];
}

export function contributionsForDate(event, iso, sections = DEFAULT_SECTIONS) {
  return (event?.tasks || []).flatMap(task => assignmentContributions(task, sections)
    .filter(contribution => !iso || contribution.record.workDate === iso)
    .map(contribution => ({ task, ...contribution })));
}

export function productionCounts(event, sections = DEFAULT_SECTIONS, iso = "") {
  const contributions = contributionsForDate(event, iso, sections);
  const counts = { notStarted: 0, inProgress: 0, completed: 0, blocked: 0, invalid: 0, contributionTotal: contributions.length, taskTotal: 0, taskCompleted: 0, taskInProgress: 0, taskBlocked: 0, taskInvalid: 0, taskNotStarted: 0 };
  for (const contribution of contributions) {
    if (contributionIsIncomplete(contribution)) counts.invalid += 1;
    const status = progressDisplayState(contribution.progress);
    if (status === "Complete") counts.completed += 1;
    else if (status === "Blocked") counts.blocked += 1;
    else if (status === "In progress" || status === "Ready for handoff") counts.inProgress += 1;
    else counts.notStarted += 1;
  }
  const visibleTasks = (event?.tasks || []).filter(task => normalizeTaskAssignments(task, sections).some(record => !iso || record.workDate === iso));
  counts.taskTotal = visibleTasks.length;
  for (const task of visibleTasks) {
    const status = derivedTaskStatus(task, sections);
    if (status === "Completed") counts.taskCompleted += 1;
    else if (status === "Blocked") counts.taskBlocked += 1;
    else if (status === "In progress") counts.taskInProgress += 1;
    else if (status === "Invalid or incomplete") counts.taskInvalid += 1;
    else counts.taskNotStarted += 1;
  }
  return counts;
}

export function reconcileActiveTeamLabels(sections = DEFAULT_SECTIONS) {
  return normalizeSections(sections).map(section => {
    const teams = (section.teams || []).map(team => ({ ...team }));
    if (!isAdvancedSection(section)) return { ...section, teams };
    const activeTeams = teams.filter(team => team.active !== false);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const seen = new Set();
    activeTeams.forEach((team, index) => {
      const expected = `Team ${letters[index] || index + 1}`;
      if (!team.name || seen.has(team.name)) {
        team.previousName = team.previousName || team.name || "";
        team.name = expected;
      }
      seen.add(team.name);
    });
    return { ...section, teams };
  });
}

export function offsetDate(isoDateValue, offset) {
  const date = parseDate(isoDateValue);
  if (!date) return "";
  date.setDate(date.getDate() + offset);
  return dateKey(date);
}

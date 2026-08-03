export const DEFAULT_SECTIONS = [
  { id: "adv-p2", name: "Advanced Culinary · Period 2", focus: "Pasta and pastry production", teams: [{ id: "adv-p2-team-a", name: "Team A", students: [] }] },
  { id: "adv-p5", name: "Advanced Culinary · Period 5", focus: "Sauce, salad, assembly, and packing", teams: [{ id: "adv-p5-team-a", name: "Team A", students: [] }] },
  { id: "km", name: "Kitchen Management", focus: "Schedule, costing, controls, and objective event briefing", teams: [{ id: "km-team-a", name: "Management Team", students: [] }] }
];

const cleanStudents = value => (Array.isArray(value) ? value : String(value || "").split(/[\n,]+/))
  .map(student => String(student).trim()).filter(Boolean);

export function normalizeSections(value) {
  const supplied = Array.isArray(value) && value.length ? value : DEFAULT_SECTIONS;
  return supplied.map((section, sectionIndex) => ({
    id: String(section.id || `section-${sectionIndex + 1}`),
    name: String(section.name || `Period ${sectionIndex + 1}`),
    focus: String(section.focus || ""),
    teams: (Array.isArray(section.teams) ? section.teams : []).map((team, teamIndex) => ({
      id: String(team.id || `${section.id || `section-${sectionIndex + 1}`}-team-${teamIndex + 1}`),
      name: String(team.name || `Team ${teamIndex + 1}`),
      students: cleanStudents(team.students)
    }))
  }));
}

export function teamsForSection(sections, sectionId) {
  return normalizeSections(sections).find(section => section.id === sectionId)?.teams || [];
}

export function applyTeamToTask(task, sections, sectionId, teamId) {
  const section = normalizeSections(sections).find(item => item.id === sectionId);
  const team = section?.teams.find(item => item.id === teamId) || section?.teams[0] || null;
  task.section = section?.id || "";
  task.teamId = team?.id || "";
  task.team = team?.name || "";
  task.students = team?.students.join(", ") || "";
  return task;
}

export function taskPublicationIssues(event, sections) {
  const configured = normalizeSections(sections);
  const issues = [];
  for (const task of event.tasks || []) {
    const label = task.name || "A production task";
    const section = configured.find(item => item.id === task.section);
    const team = section?.teams.find(item => item.id === task.teamId || (!task.teamId && item.name === task.team));
    if (!task.workDate) issues.push(`${label} needs a production date.`);
    if (!section) issues.push(`${label} needs an assigned period.`);
    if (!team) issues.push(`${label} needs a team from its assigned period.`);
  }
  return issues;
}

export function offsetDate(isoDate, offset) {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

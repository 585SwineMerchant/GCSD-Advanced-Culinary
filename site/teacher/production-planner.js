import { offsetDate } from "../shared/scheduling.js";

const DEFAULT_PROGRESS = { status: "Not started", quantity: 0, usableYield: 0, waste: 0, storage: "", issue: "", updatedAt: null };

const pad = value => String(value).padStart(2, "0");

function minutesToTime(minutes) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  return `${pad(Math.floor(normalized / 60))}:${pad(normalized % 60)}`;
}

function timeToMinutes(value, fallback = 15 * 60) {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : fallback;
}

function requiredReadyTime(event) {
  const requirement = String(event.requirements || "").match(/before\s+(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?/i);
  if (requirement) {
    let hour = Number(requirement[1]);
    const minute = Number(requirement[2] || 0);
    const meridiem = String(requirement[3] || "").toLowerCase();
    if (meridiem.startsWith("p") && hour < 12) hour += 12;
    if (meridiem.startsWith("a") && hour === 12) hour = 0;
    return hour * 60 + minute;
  }
  return timeToMinutes(event.serviceTime) - 15;
}

function datedPoint(event, offset, label) {
  if (!event.serviceDate) return `${offset < 0 ? "Day before service" : "Service day"} · ${label}`;
  const date = new Date(`${event.serviceDate}T12:00:00`);
  date.setDate(date.getDate() + offset);
  const day = date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  return `${day} · ${label}`;
}

function pluralize(word, count) {
  if (count === 1) return word;
  if (/[^aeiou]y$/i.test(word)) return `${word.slice(0, -1)}ies`;
  if (/(s|x|z|ch|sh)$/i.test(word)) return `${word}es`;
  return `${word}s`;
}

export function productionUnit(item) {
  const portion = String(item.portion || "").trim();
  const required = Number(item.required || 0);
  const one = portion.match(/^1\s+(.+)$/i);
  if (one) return pluralize(one[1], required);
  const name = String(item.name || "output").trim().toLowerCase();
  return pluralize(name, required);
}

function stageTitle(text, index) {
  const value = text.toLowerCase();
  if (/filling/.test(value) && /cream|mix|combine|prepare/.test(value)) return "Prepare filling";
  if (/glaze|frost|\bice\b/.test(value)) return /cool/.test(value) ? "Cool and glaze" : "Finish and glaze";
  if (/bake|oven/.test(value)) return "Bake";
  if (/proof|rise/.test(value)) return "Final proof";
  if (/ferment/.test(value)) return "Bulk fermentation";
  if (/roll|shape|slice|cut|portion|divide/.test(value)) return "Shape and portion";
  if (/mix|knead|dough hook/.test(value) && /dough|flour/.test(value)) return "Mix dough";
  if (/chill|refrigerat|cool/.test(value)) return "Chill or cool";
  if (/sear|brown/.test(value)) return "Sear and develop color";
  if (/simmer|boil|cook|heat|roast|fry/.test(value)) return "Cook";
  if (/assemble|layer|fill/.test(value)) return "Assemble";
  if (/strain|drain/.test(value)) return "Strain and transfer";
  return `Procedure stage ${index + 1}`;
}

function qualityControls(text) {
  const controls = [];
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  const temperatures = normalized.match(/\d{2,3}(?:-\d{2,3})?°F/gi) || [];
  const times = normalized.match(/\d+(?:-\d+)?\s*(?:seconds?|minutes?|hours?)/gi) || [];
  const until = normalized.match(/until\s+[^.;]+/gi) || [];
  if (temperatures.length) controls.push(`Temperature: ${[...new Set(temperatures)].join("; ")}`);
  if (times.length) controls.push(`Timing: ${[...new Set(times)].join("; ")}`);
  controls.push(...until.map(value => value[0].toUpperCase() + value.slice(1)));
  if (/once cooled|when cool|after cooling/i.test(normalized)) controls.push("Product is cool before finishing.");
  return [...new Set(controls)];
}

function equipmentFor(stage, equipment) {
  const patterns = {
    "Prepare filling": /scale|mixer|paddle|bowl|spatula|whisk/,
    "Mix dough": /scale|mixer|dough hook|bowl|scraper/,
    "Bulk fermentation": /bowl|container|proof|refrigerator/,
    "Shape and portion": /scale|scraper|rolling pin|knife|floss|sheet pan|pan|parchment/,
    "Final proof": /proof|sheet pan|pan|parchment/,
    "Bake": /oven|sheet pan|pan|parchment|thermometer/,
    "Cool and glaze": /cooling rack|bowl|whisk|spatula/,
    "Finish and glaze": /cooling rack|bowl|whisk|spatula/,
    "Chill or cool": /refrigerator|freezer|cooling rack|container/,
    "Cook": /pan|pot|oven|range|griddle|fryer|thermometer|spider|skillet/,
    "Sear and develop color": /pan|pot|oven|range|thermometer|tongs/,
    "Strain and transfer": /strainer|cheesecloth|ladle|container|bowl/
  };
  const pattern = patterns[stage];
  let matched = pattern ? equipment.filter(item => pattern.test(String(item).toLowerCase())) : [];
  if (stage === "Prepare filling") matched = matched.filter(item => !/dough hook/i.test(item));
  if (stage === "Mix dough") matched = matched.filter(item => !/paddle/i.test(item));
  return matched.length ? matched : equipment.slice(0, 5);
}

function procedureStages(item) {
  const sentences = (item.procedure || []).flatMap(step => String(step).split(/(?<=[.!?])\s+(?=[A-Z])/)).map(value => value.trim()).filter(Boolean);
  const stages = sentences.map((detail, index) => ({ title: stageTitle(detail, index), detail, inferred: false }));
  const recipeText = `${item.name} ${(item.ingredients || []).map(value => value.name || value.sourceText || value).join(" ")}`.toLowerCase();
  const yeastedRoll = /yeast/.test(recipeText) && /cinnamon roll|donut|bread|focaccia/.test(recipeText);
  if (yeastedRoll && !stages.some(stage => /ferment|rise/.test(stage.detail.toLowerCase()))) {
    const mixIndex = stages.findIndex(stage => stage.title === "Mix dough");
    stages.splice(Math.max(0, mixIndex + 1), 0, {
      title: "Bulk fermentation",
      detail: "Ferment the mixed dough until it is relaxed and visibly expanded. The teacher confirms the stopping point before shaping.", inferred: true
    });
  }
  if (yeastedRoll && !stages.some(stage => /proof/.test(`${stage.title} ${stage.detail}`.toLowerCase()))) {
    const bakeIndex = stages.findIndex(stage => stage.title === "Bake");
    if (bakeIndex >= 0) stages.splice(bakeIndex, 0, {
      title: "Final proof",
      detail: "Proof the shaped product until visibly expanded and soft. The teacher confirms readiness before baking.", inferred: true
    });
  }
  return stages.length ? stages : [{ title: "Produce recipe", detail: `Complete the approved procedure for ${item.name}.`, inferred: true }];
}

function stageSchedule(stages, readyMinutes) {
  const sameDayStart = readyMinutes >= 13 * 60 ? Math.max(0, stages.length - 2) : stages.length;
  const advanceCount = sameDayStart;
  const sameDayCount = stages.length - sameDayStart;
  return stages.map((stage, index) => {
    const dayOffset = index < sameDayStart ? -1 : 0;
    if (dayOffset < 0) {
      const start = 12 * 60;
      const end = 15 * 60 + 15;
      return { dayOffset, deadline: minutesToTime(start + Math.round((end - start) * (index / Math.max(1, advanceCount - 1)))) };
    }
    const rank = index - sameDayStart;
    const start = Math.max(8 * 60, readyMinutes - Math.max(90, sameDayCount * 45));
    const end = readyMinutes - 15;
    return { dayOffset, deadline: minutesToTime(start + Math.round((end - start) * (rank / Math.max(1, sameDayCount - 1)))) };
  });
}

export function buildProductionTasks(item, menuIndex, event, sections, previousTasks = []) {
  const stages = procedureStages(item);
  const readyMinutes = requiredReadyTime(event);
  const batchCount = item.yield > 0 ? Math.ceil(Number(item.required || 0) / Number(item.yield)) : 0;
  const plannedOutput = batchCount * Number(item.yield || 0);
  const unit = productionUnit(item);
  const equipment = [...new Set(item.equipment || [])];
  const recipeKey = item.id || `${item.recipeId || item.name}-${menuIndex}`;
  const previousByKey = new Map(previousTasks.map(task => [task.planKey || task.name, task]));
  const schedule = stageSchedule(stages, readyMinutes);
  const taskStages = stages.map((stage, index) => {
    const planKey = `${recipeKey}:stage:${index}:${stage.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const prior = previousByKey.get(planKey) || {};
    const controls = qualityControls(stage.detail);
    if (stage.title === "Bulk fermentation" && !controls.length) controls.push("Dough is relaxed and visibly expanded; teacher approves shaping.");
    if (stage.title === "Final proof" && !controls.length) controls.push("Shaped product is visibly expanded and soft; teacher approves baking.");
    const pointLabel = schedule[index].dayOffset < 0 ? "advance production" : "service-day production";
    return {
      id: prior.id || `task-${recipeKey}-${index}`, planKey, menuIndex,
      type: "process", outputRecord: false,
      name: `${item.name} — ${stage.title}`,
      detail: `${batchCount} batch${batchCount === 1 ? "" : "es"} · ${stage.detail}`,
      workDate: prior.workDate || offsetDate(event.serviceDate, schedule[index].dayOffset),
      day: prior.day || datedPoint(event, schedule[index].dayOffset, pointLabel),
      deadline: prior.deadline || schedule[index].deadline,
      section: prior.section || sections[menuIndex % Math.max(1, sections.length - 1)]?.id || sections[0]?.id || "",
      station: prior.station || `${item.name} station`, team: prior.team || "Team A", students: prior.students || "",
      dependency: prior.dependency || (index ? `Begin after ${stages[index - 1].title.toLowerCase()} passes its quality check.` : "Ingredients, equipment, and station setup verified."),
      equipment: equipmentFor(stage.title, equipment), qualityControls: controls,
      progress: prior.progress || { ...DEFAULT_PROGRESS }
    };
  });
  const last = taskStages.at(-1);
  const handoffKey = `${recipeKey}:handoff`;
  const priorHandoff = previousByKey.get(handoffKey) || {};
  taskStages.push({
    id: priorHandoff.id || `task-${recipeKey}-handoff`, planKey: handoffKey, menuIndex, type: "handoff", outputRecord: true,
    name: `${item.name} — Final yield and handoff`,
    detail: `Confirm the planned ${plannedOutput} ${unit}, reserve at least ${Number(item.required || 0)} for service, label allergens, document storage, and hand off the finished product.`,
    workDate: priorHandoff.workDate || offsetDate(event.serviceDate, 0),
    day: priorHandoff.day || datedPoint(event, 0, "service handoff"), deadline: priorHandoff.deadline || minutesToTime(readyMinutes),
    section: priorHandoff.section || last.section, station: priorHandoff.station || "Expo / handoff", team: priorHandoff.team || "Team A", students: priorHandoff.students || "",
    dependency: priorHandoff.dependency || `Begin after ${last.name} passes its quality check.`, equipment: [],
    qualityControls: [`At least ${Number(item.required || 0)} ${unit} are service-ready.`, "Usable yield, any final sorting waste, allergen label, storage location, and handoff are recorded."],
    progress: priorHandoff.progress || { ...DEFAULT_PROGRESS }
  });
  return taskStages;
}

export function buildEventProductionTasks(event, sections) {
  const previous = event.tasks || [];
  return (event.menu || []).flatMap((item, menuIndex) => buildProductionTasks(item, menuIndex, event, sections, previous));
}

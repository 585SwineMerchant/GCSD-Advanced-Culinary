import { buildEventProductionTasks } from "./production-planner.js";
import { DEFAULT_SECTIONS, KITCHENS, MAX_TEAMS_PER_SECTION, PRODUCTION_STATUSES, STATION_DUTIES, STATION_DUTY_LABELS, WASTE_CATEGORIES, allocationLabel, allocationStatus, assignmentContributionKey, assignmentContributions, assignmentIssues, assignmentsForSection, aggregateProgress, availableMeetingsForDate, contributionIsIncomplete, contributionsForDate, derivedTaskStatus, eventSchoolYearAnchor, formatMeetingWindow, isAdvancedSection, isArchivedEvent, kitchenSchedulingIssues, makeAssignment, meetingForAssignment, normalizeConfirmedPeriod, normalizeSections, normalizeStationDuty, normalizeTaskAssignments, offsetDate, preferredProductionDate, productionCounts, productionDates, progressDisplayState, reconcileActiveTeamLabels, requiresKitchen, schedulableAdvancedSections, schoolYearLabel, sectionColor, sectionDisplayLabel, sectionMeetsOnDate, sectionTeamCapacity, stationAssignmentLabel, taskPublicationIssues, teamsForSection } from "../shared/scheduling.js";

const statuses = PRODUCTION_STATUSES;
let sections = normalizeSections(DEFAULT_SECTIONS);
const seed = {
  sections: cloneForSeed(DEFAULT_SECTIONS),
  requests: [
    { id: "req-001", submittedAt: "2026-09-08T09:15:00", requester: "Greece CSD New Teacher Orientation", contact: "District Professional Learning Office", eventName: "New Teacher Welcome Breakfast", type: "Catering", school: "Districtwide", serviceDate: "2026-09-24", serviceTime: "07:30", guestCount: 80, serviceFormat: "Delivery", budget: "$600", requestedMenu: "Breakfast pastries, fruit, and coffee service", requirements: "Delivery and setup must be complete before 7:15 a.m.", allergens: "Include nut-free choices and clear ingredient labels.", status: "New", notes: "" },
    { id: "req-002", submittedAt: "2026-09-09T14:40:00", requester: "Town of Greece Board Meeting", contact: "Town liaison — details withheld from student views", eventName: "October Board Reception", type: "Catering", school: "Arcadia", serviceDate: "2026-10-13", serviceTime: "17:00", guestCount: 60, serviceFormat: "Delivery", budget: "Pending", requestedMenu: "Passed appetizers and one vegetarian option", requirements: "Request does not yet identify service duration or delivery access.", allergens: "Not supplied", status: "Needs clarification", notes: "Confirm budget, access, and final guest count before acceptance." },
    { id: "req-003", submittedAt: "2026-09-03T11:05:00", requester: "Arcadia Counseling Office", contact: "School counselor team", eventName: "College Application Night Refreshments", type: "Internal service", school: "Arcadia", serviceDate: "2026-10-29", serviceTime: "18:00", guestCount: 120, serviceFormat: "On-site service", budget: "$450", requestedMenu: "Cookies, brownies, cider, and water", requirements: "Simple service with quick replenishment.", allergens: "Individually label major allergens.", status: "Accepted", eventId: "evt-001", notes: "Demonstration link to an existing event record." }
  ],
  events: [{
    id: "evt-001", name: "Cottage Fall Pasta Service", type: "Catering", school: "Arcadia",
    customer: "District Leadership Team", owner: "Jason Carlson", collaborators: ["Kevin McCann"],
    serviceDate: "2026-10-22", serviceTime: "17:30", guestCount: 100, serviceFormat: "Delivery",
    budget: "$850", requirements: "Fresh pasta, Bolognese, salad, bread, and packaged dessert. Deliver hot food ready for service.",
    allergens: "Document wheat, egg, dairy, and sesame controls. Prepare approved vegetarian portions separately.",
    stage: "Planning", version: 0, publishedAt: null,
    menu: [
      { name: "Fresh pasta with Bolognese", required: 100, yield: 20, portion: "12 oz entrée", status: "Approved", ingredients: [{ name: "00 flour", quantity: 5, unit: "lb", packSize: 5, packPrice: 8.49 }, { name: "Eggs", quantity: 20, unit: "each", packSize: 30, packPrice: 7.99 }, { name: "Ground beef", quantity: 8, unit: "lb", packSize: 5, packPrice: 22.5 }, { name: "Crushed tomatoes", quantity: 6, unit: "lb", packSize: 6.5, packPrice: 6.25 }] },
      { name: "Seasonal green salad", required: 100, yield: 25, portion: "4 oz side", status: "Approved", ingredients: [{ name: "Mixed greens", quantity: 6.25, unit: "lb", packSize: 3, packPrice: 15.5 }, { name: "Olive oil", quantity: 20, unit: "fl oz", packSize: 101, packPrice: 24.99 }, { name: "Lemons", quantity: 6, unit: "each", packSize: 12, packPrice: 8.99 }] },
      { name: "Focaccia", required: 120, yield: 24, portion: "1 piece", status: "Approved", ingredients: [{ name: "Bread flour", quantity: 4, unit: "lb", packSize: 25, packPrice: 18.99 }, { name: "Olive oil", quantity: 12, unit: "fl oz", packSize: 101, packPrice: 24.99 }, { name: "Yeast", quantity: 2, unit: "oz", packSize: 16, packPrice: 6.49 }] },
      { name: "Pastry box", required: 100, yield: 20, portion: "1 boxed pastry", status: "Approved", ingredients: [{ name: "All-purpose flour", quantity: 4, unit: "lb", packSize: 25, packPrice: 16.99 }, { name: "Butter", quantity: 3, unit: "lb", packSize: 4, packPrice: 15.99 }, { name: "Eggs", quantity: 10, unit: "each", packSize: 30, packPrice: 7.99 }] }
    ], tasks: [], assignments: {},
    closeout: { actualGuests: "", actualRevenue: "", actualCost: "", feedbackReceived: "No", customerFeedback: "", operationalNotes: "" }
  }]
};

function cloneForSeed(value) { return JSON.parse(JSON.stringify(value)); }

const q = selector => document.querySelector(selector);
const qa = selector => [...document.querySelectorAll(selector)];
const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const clone = value => JSON.parse(JSON.stringify(value));
const linkifyText = value => esc(value).replace(/https?:\/\/[^\s<>"']+/g, url => {
  const href = url.replace(/[.,);:]+$/g, "");
  const trailing = url.slice(href.length);
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${href}</a>${trailing}`;
});
const listHtml = (items, empty) => {
  const lines = (items || []).map(item => String(item || "").trim()).filter(Boolean);
  return lines.length ? `<ol>${lines.map(line => `<li>${esc(line)}</li>`).join("")}</ol>` : `<p class="muted">${esc(empty)}</p>`;
};

function submissionBodyHtml(item) {
  const sourceLines = String(item.sourceNotes || "").split(/\n+/).map(line => line.trim()).filter(Boolean);
  const sourceHtml = sourceLines.length
    ? `<ul class="recipe-submission-sources">${sourceLines.map(line => `<li>${linkifyText(line)}</li>`).join("")}</ul>`
    : `<p class="muted">No source recorded.</p>`;
  const testHtml = item.testNotes ? `<div class="recipe-submission-block"><strong>Test / revision notes</strong><p>${linkifyText(item.testNotes)}</p></div>` : "";
  const allergenHtml = item.allergens ? `<div class="recipe-submission-block"><strong>Allergens and controls</strong><p>${esc(item.allergens)}</p></div>` : "";
  const equipmentHtml = (item.equipment || []).length
    ? `<div class="recipe-submission-block"><strong>Equipment</strong>${listHtml(item.equipment, "None listed.")}</div>`
    : "";
  return `<div class="recipe-submission-body">
    <div class="recipe-submission-block"><strong>Source</strong>${sourceHtml}</div>
    <div class="recipe-submission-grid">
      <div class="recipe-submission-block"><strong>Ingredients</strong>${listHtml(item.ingredients, "No ingredients submitted.")}</div>
      <div class="recipe-submission-block"><strong>Procedure</strong>${listHtml(item.procedure, "No procedure submitted.")}</div>
    </div>
    ${equipmentHtml}${allergenHtml}${testHtml}
  </div>`;
}

let session = null;
let revision = 0;
let saveQueue = Promise.resolve();
let state = clone(seed);
let currentId = state.events[0].id;
let liveSection = "all";
let liveStatus = "all";
let liveDate = "";
let activePanel = "requests";
let requestFilter = "open";
let ingredientMenuIndex = 0;
let recipeLibrary = [];
let supplierCatalog = [];
let recipeSearch = "";

function current() { return state.events.find(event => String(event.id) === String(currentId)) || activeEvents()[0] || state.events[0]; }
function activeEvents() { return (state.events || []).filter(event => !isArchivedEvent(event)); }
function archivedEventsList() { return (state.events || []).filter(event => isArchivedEvent(event)); }
function isWorkingArchived() { return isArchivedEvent(current()); }
function setSync(message, kind = "") { const element = q("#syncStatus"); if (element) { element.textContent = message; element.dataset.kind = kind; } }
function save() {
  setSync("Saving…", "pending");
  saveQueue = saveQueue.then(async () => {
    const response = await fetch("/api/state", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ state, revision }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Shared save failed.");
    revision = result.revision;
    setSync("Shared · saved", "saved");
  }).catch(error => { setSync("Save needs attention", "error"); toast(error.message); });
  return saveQueue;
}
function activeTeacher() { return session?.user?.display_name || "Teacher"; }
function isOwner(event = current()) { return session?.user?.role === "admin" || event.owner === activeTeacher(); }
function canEdit(event = current()) { return session?.user?.role === "admin" || isOwner(event) || (event.collaborators || []).includes(activeTeacher()); }
function batches(item) { return item.yield > 0 ? Math.ceil(item.required / item.yield) : 0; }

const fractionValues = { "¼": .25, "½": .5, "¾": .75, "⅓": 1 / 3, "⅔": 2 / 3, "⅛": .125, "⅜": .375, "⅝": .625, "⅞": .875 };
const unitAliases = new Map(Object.entries({ g: "g", gram: "g", grams: "g", kg: "kg", oz: "oz", ounce: "oz", ounces: "oz", lb: "lb", lbs: "lb", pound: "lb", pounds: "lb", tsp: "tsp", teaspoon: "tsp", teaspoons: "tsp", t: "tsp", tbsp: "tbsp", tablespoon: "tbsp", tablespoons: "tbsp", cup: "cup", cups: "cup", c: "cup", ml: "ml", l: "L", gallon: "fl oz", gallons: "fl oz", gal: "fl oz", quart: "fl oz", quarts: "fl oz", qt: "fl oz", pint: "fl oz", pints: "fl oz", "fl oz": "fl oz", stick: "oz", sticks: "oz", each: "each", cloves: "each", clove: "each", head: "each", heads: "each", bunch: "each" }));
const gramsPerCup = { "weg-ap-flour": 120, "weg-whole-wheat-flour": 120, "weg-semolina": 167, "weg-cornmeal": 138, "weg-oats": 90, "weg-sugar": 200, "weg-brown-sugar": 210, "weg-powdered-sugar": 120, "weg-butter": 227, "weg-yeast": 144, "weg-baking-soda": 220, "weg-baking-powder": 192, "weg-cornstarch": 128, "weg-chocolate-chips": 168, "weg-cocoa": 100, "weg-salt": 288, "weg-black-pepper": 116, "weg-cinnamon": 125, "weg-ground-ginger": 96, "weg-nutmeg": 112, "weg-allspice": 96, "weg-cloves": 96, "weg-curry": 96, "weg-garlic-powder": 144, "weg-onion-powder": 128 };
function supplierProduct(text) {
  const value = String(text || "").toLowerCase().replace(/[–—]/g, "-");
  return supplierCatalog.flatMap(product => (product.aliases || []).map(alias => ({ product, alias: String(alias).toLowerCase() })))
    .sort((a, b) => b.alias.length - a.alias.length).find(entry => value.includes(entry.alias))?.product || null;
}
function purchaseQuantity(product, targetUnit) {
  const target = String(targetUnit || "").toLowerCase();
  const quantity = Number(product?.quantity || 0);
  const source = String(product?.unit || "").toLowerCase();
  if (!quantity || !target) return 0;
  if (product.id === "weg-eggs" && target === "g") return quantity * 18;
  if (target === source || (target === "l" && source === "l")) return quantity;
  if (["lb", "oz"].includes(source)) {
    const grams = source === "lb" ? quantity * 453.59237 : quantity * 28.349523;
    if (target === "g") return grams;
    if (target === "kg") return grams / 1000;
    if (target === "oz") return grams / 28.349523;
    if (target === "lb") return grams / 453.59237;
    const density = gramsPerCup[product.id];
    if (density && target === "cup") return grams / density;
    if (density && target === "tbsp") return grams / density * 16;
    if (density && target === "tsp") return grams / density * 48;
  }
  if (source === "fl oz") {
    const ml = quantity * 29.57353;
    if (target === "ml" || target === "g") return ml;
    if (target === "l") return ml / 1000;
    if (target === "cup") return quantity / 8;
    if (target === "tbsp") return quantity * 2;
    if (target === "tsp") return quantity * 6;
  }
  if (source === "each" && target === "each") return quantity;
  return 0;
}
function applySupplierData(ingredient) {
  const product = supplierProduct(`${ingredient.name || ""} ${ingredient.sourceText || ""}`);
  if (!product) return ingredient;
  const packSize = purchaseQuantity(product, ingredient.unit);
  return {
    ...ingredient,
    packSize: ingredient.supplierOverride ? Number(ingredient.packSize || packSize || 0) : packSize || Number(ingredient.packSize || 0), packPrice: ingredient.supplierOverride ? Number(ingredient.packPrice || product.price) : Number(product.price),
    packLabel: product.label, supplierId: product.id, supplierName: product.vendor,
    supplierItem: product.item, supplierUrl: product.url, supplierCheckedAt: product.checkedAt,
    supplierNote: product.variableWeight ? "Variable-weight package; forecast uses Wegmans' displayed average." : product.estimatedCount ? "Package count is a practical estimate for consolidated ordering." : ""
  };
}
function numericAmount(token) {
  const value = String(token || "").trim();
  if (!value) return 0;
  const range = value.match(/^(\d+(?:\.\d+)?)-\s*(\d+(?:\.\d+)?)$/);
  if (range) return Number(range[2]);
  if (fractionValues[value]) return fractionValues[value];
  const mixed = value.match(/^(\d+)\s*([¼½¾⅓⅔⅛⅜⅝⅞])$/);
  if (mixed) return Number(mixed[1]) + fractionValues[mixed[2]];
  const slash = value.match(/^(\d+)\/(\d+)$/);
  if (slash) return Number(slash[1]) / Number(slash[2]);
  return Number(value.replace(/,/g, "")) || 0;
}
function ingredientRecord(line) {
  const raw = String(line || "").trim();
  if (!raw || /:$/.test(raw)) return { name: raw, quantity: 0, unit: "", packSize: 0, packPrice: 0, sourceText: raw, heading: true };
  const compact = raw.replace(/^[-•]\s*/, "");
  let match = compact.match(/^(\d+(?:\.\d+)?-\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?|\d+\/\d+|\d+\s*[¼½¾⅓⅔⅛⅜⅝⅞]|[¼½¾⅓⅔⅛⅜⅝⅞])\s*(g|grams?|kg|oz|ounces?|lbs?|pounds?|tsp|teaspoons?|tbsp|tablespoons?|cups?|c\b|ml|l\b|gallons?|gal\b|quarts?|qt\b|pints?|fl\.?\s*oz|sticks?|each|cloves?|heads?|bunch)?\s*(.*)$/i);
  if (!match) {
    const suffix = compact.match(/^(.*?\D)\s*(\d+(?:\.\d+)?|\d+\/\d+)\s*(g|grams?|kg|oz|ounces?|lbs?|pounds?|tsp|teaspoons?|tbsp|tablespoons?|cups?|c\b|ml|l\b|gallons?|gal\b|quarts?|qt\b|pints?|fl\.?\s*oz|sticks?)\b\s*(.*)$/i);
    if (suffix) match = [suffix[0], suffix[2], suffix[3], `${suffix[1]} ${suffix[4]}`.trim()];
  }
  if (!match) return applySupplierData({ name: compact, quantity: 0, unit: "", packSize: 0, packPrice: 0, sourceText: raw });
  const rawUnit = String(match[2] || "each").toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
  let quantity = numericAmount(match[1]);
  if (["gallon", "gallons", "gal"].includes(rawUnit)) quantity *= 128;
  if (["quart", "quarts", "qt"].includes(rawUnit)) quantity *= 32;
  if (["pint", "pints"].includes(rawUnit)) quantity *= 16;
  if (["stick", "sticks"].includes(rawUnit)) quantity *= 4;
  const unit = unitAliases.get(rawUnit) || rawUnit;
  return applySupplierData({ name: (match[3] || compact).trim(), quantity, unit, packSize: 0, packPrice: 0, sourceText: raw });
}
function inferredAllergens(recipe) {
  const text = (recipe.ingredients || []).join(" ").toLowerCase();
  const rules = [["Milk", /milk|butter|cream|cheese|yogurt/], ["Egg", /\begg/], ["Wheat", /flour|wheat|bread|cookie/], ["Soy", /\bsoy\b/], ["Sesame", /sesame|tahini/], ["Peanut", /peanut/], ["Tree nuts", /almond|walnut|pecan|cashew|pistachio/], ["Fish", /anchovy|fish/], ["Shellfish", /shrimp|crab|lobster/]];
  return rules.filter(([, pattern]) => pattern.test(text)).map(([name]) => name).join(", ");
}
function recipeSnapshot(recipe, required) {
  const standardYield = Number(recipe.yield || 0);
  const ingredientLines = clone(recipe.ingredients || []);
  return {
    recipeId: recipe.id, recipeVersion: Number(recipe.version || 1), name: recipe.name,
    required: Number(required || 1), yield: standardYield, portion: recipe.portion || "",
    status: standardYield > 0 && recipe.portion ? "Approved" : "Review",
    approvalStatus: recipe.approvalStatus, sourceCourse: recipe.course, sourceUnit: recipe.unit,
    source: recipe.source, needsStandardization: !(standardYield > 0 && recipe.portion),
    rawIngredientLines: ingredientLines,
    ingredients: ingredientLines.map(item => typeof item === "string" ? ingredientRecord(item) : clone(item)).filter(item => !item.heading),
    equipment: clone(recipe.equipment || []), procedure: clone(recipe.procedure || []),
    allergens: recipe.allergens || inferredAllergens(recipe), recipeSnapshotAt: new Date().toISOString()
  };
}
function hydrateEventOrderItem(item) {
  item.ingredients = (item.ingredients || []).map(applySupplierData);
  const source = recipeLibrary.find(recipe => recipe.id === item.recipeId && Number(recipe.version || 1) === Number(item.recipeVersion || 1));
  if (source && !item.equipment?.length) item.equipment = clone(source.equipment || []);
  return item;
}
function dateLabel(value) { return value ? new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Not scheduled"; }
function sectionName(id) { const section = sections.find(section => section.id === id); return sectionDisplayLabel(section); }
function shortDate(value) { return value ? new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "Date needed"; }
function meetingOptions(workDate, selected = "") {
  if (!workDate) return '<option value="">Select a production date first</option>';
  const meetings = availableMeetingsForDate(workDate, sections);
  const meetingBySection = new Map(meetings.map(meeting => [meeting.section.id, meeting]));
  const options = sections.filter(isAdvancedSection).map(section => {
    const meeting = meetingBySection.get(section.id);
    let label;
    if (meeting) label = `${sectionDisplayLabel(section)} - P${meeting.period}`;
    else if (section.requiresRotationConfirmation) label = `${sectionDisplayLabel(section)} - confirm P${section.allowedPeriods?.join(" or P") || "?"}`;
    else label = `${sectionDisplayLabel(section)} - does not meet this date`;
    return `<option value="${esc(section.id)}" ${selected === section.id ? "selected" : ""}>${esc(label)}</option>`;
  }).join("");
  return `<option value="">Choose meeting</option>${options}`;
}

function periodConfirmOptions(section, selected) {
  if (!section?.requiresRotationConfirmation) return "";
  const periods = section.allowedPeriods || [];
  return `<label class="period-confirm">Confirm period<select data-assignment-record-field="confirmedPeriod">
    <option value="">Choose ${periods.map(period => `P${period}`).join(" or ")}</option>
    ${periods.map(period => `<option value="${period}" ${Number(selected) === period ? "selected" : ""}>Period ${period}</option>`).join("")}
  </select><small>Day 1-4 mapping is not fixed yet. Confirm which period meets on this date.</small></label>`;
}
function ensureTaskAssignment(task, event = current()) {
  if (!task.workDate && event?.serviceDate) {
    if (/advance|day before/i.test(task.day || "")) task.workDate = offsetDate(event.serviceDate, -1);
    else if (/service/i.test(task.day || "")) task.workDate = offsetDate(event.serviceDate, 0);
  }
  normalizeTaskAssignments(task, sections);
  allocateTaskRecords(task);
  return task;
}
function allocateTaskRecords(task) {
  const records = normalizeTaskAssignments(task, sections);
  const required = Math.max(0, Number(task.plannedQuantity || 0));
  const unit = task.plannedUnit || "units";
  const needsAllocation = required > 0 && records.some(record => !Number(record.allocatedQuantity || 0) || !record.allocatedUnit);
  if (!needsAllocation) return records;
  const base = Math.floor(required / records.length);
  const remainder = required - base * records.length;
  records.forEach((record, index) => {
    if (!Number(record.allocatedQuantity || 0)) record.allocatedQuantity = base + (index === 0 ? remainder : 0);
    if (!record.allocatedUnit) record.allocatedUnit = unit;
  });
  return records;
}
function assignmentSummary(task) {
  return normalizeTaskAssignments(task, sections).map(record => {
    const section = sections.find(item => item.id === record.sectionId);
    const teamNames = teamsForSection(sections, record.sectionId).filter(team => record.teamIds.includes(team.id)).map(team => team.name).join(", ") || "No team selected";
    const meeting = meetingForAssignment(record, sections);
    return `<div class="assignment-window ${meeting ? "" : "invalid-window"}"><strong>${esc(sectionDisplayLabel(section))}</strong><span>${esc(teamNames)} · ${esc(stationAssignmentLabel(record))}${requiresKitchen(record) ? ` · Seq ${record.stationSequence || 1}` : ""}</span><small>${esc(formatMeetingWindow(meeting))}</small>${record.studentDetails ? `<small>${esc(record.studentDetails)}</small>` : ""}</div>`;
  }).join("");
}
function assignmentRows(task, index, mode = "production") {
  const records = normalizeTaskAssignments(task, sections);
  return `<div class="assignment-records">${records.map((record, recordIndex) => {
    const teams = teamsForSection(sections, record.sectionId);
    const meeting = sectionMeetsOnDate(record.sectionId, record.workDate, sections);
    return `<div class="assignment-record" data-task="${index}" data-record="${recordIndex}">
      <label>Production date<input data-assignment-record-field="workDate" type="date" value="${esc(record.workDate)}"></label>
      <label>Advanced Culinary meeting<select data-assignment-record-field="sectionId">${meetingOptions(record.workDate, record.sectionId)}</select></label>
      <div class="team-chip-list"><span>Teams</span>${teams.length ? teams.map(team => `<label class="team-chip"><input data-assignment-team value="${esc(team.id)}" type="checkbox" ${record.teamIds.includes(team.id) ? "checked" : ""}>${esc(team.name)}</label>`).join("") : "<small>Set up a team in section 8.</small>"}</div>
      <div class="meeting-window ${meeting ? "" : "invalid-window"}">${esc(formatMeetingWindow(meeting))}</div>
      ${records.length > 1 ? `<button class="ghost-danger remove-assignment-button" data-remove-assignment type="button">Remove assignment</button>` : ""}
    </div>`;
  }).join("")}<button class="secondary-button add-assignment-row" data-add-assignment="${index}" data-mode="${esc(mode)}" type="button">Add class section</button></div>`;
}

function assignmentRowsV2(task, index, mode = "production") {
  const records = normalizeTaskAssignments(task, sections);
  return `<div class="assignment-records">${records.map((record, recordIndex) => {
    const teams = teamsForSection(sections, record.sectionId);
    const meeting = meetingForAssignment(record, sections);
    const section = sections.find(item => item.id === record.sectionId);
    const color = sectionColor(record.sectionId);
    const duty = normalizeStationDuty(record.stationDuty);
    const kitchenRequired = requiresKitchen(record);
    return `<div class="assignment-record section-tinted" style="--section-tint:${color.tint};--section-border:${color.border};--section-text:${color.text}" data-task="${index}" data-record="${recordIndex}">
      <div class="assignment-grid-row schedule-row">
        <label>Production date<input data-assignment-record-field="workDate" type="date" value="${esc(record.workDate)}"></label>
        <label>Advanced Culinary meeting<select data-assignment-record-field="sectionId">${meetingOptions(record.workDate, record.sectionId)}</select></label>
        ${periodConfirmOptions(section, record.confirmedPeriod)}
      </div>
      <div class="team-chip-list"><span>Participating teams</span>${teams.length ? teams.map(team => `<label class="team-chip"><input data-assignment-team value="${esc(team.id)}" type="checkbox" ${record.teamIds.includes(team.id) ? "checked" : ""}>${esc(team.name)}${team.students?.length ? ` (${team.students.length})` : ""}</label>`).join("") : "<small class=\"roster-warning\">No teams are saved for this stable section. Create teams in Step 8.</small>"}</div>
      <div class="assignment-grid-row station-row">
        <label>Station duty<select data-assignment-record-field="stationDuty">${STATION_DUTIES.map(value => `<option value="${esc(value)}" ${duty === value ? "selected" : ""}>${esc(STATION_DUTY_LABELS[value])}</option>`).join("")}</select></label>
        <label>Kitchen<select data-assignment-record-field="kitchen" ${kitchenRequired ? "" : "disabled"}>${KITCHENS.map(value => `<option value="${esc(value)}" ${record.kitchen === value ? "selected" : ""}>${esc(value || (kitchenRequired ? "Choose Kitchen 1-4" : "Not used for this duty"))}</option>`).join("")}</select></label>
        <label>Sequence<input data-assignment-record-field="stationSequence" type="number" min="1" step="1" value="${Number(record.stationSequence || 1)}"></label>
        <label>Allocated<input data-assignment-record-field="allocatedQuantity" type="number" min="0" step="0.25" value="${Number(record.allocatedQuantity || 0)}"><small>${esc(record.allocatedUnit || task.plannedUnit || "units")}</small></label>
      </div>
      <div class="assignment-grid-row notes-row">
        <label class="span-grow">Student instructions<textarea data-assignment-record-field="studentDetails" rows="2" placeholder="Mise en place, sequencing, or station notes">${esc(record.studentDetails)}</textarea></label>
        <label>Status<select data-assignment-record-field="status">${statuses.map(status => `<option ${record.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
      </div>
      <div class="meeting-window ${meeting ? "" : "invalid-window"}"><strong>${esc(meeting ? `Day ${meeting.rotationDay} · Period ${meeting.period}${meeting.teacherConfirmedPeriod ? " (confirmed)" : ""}` : "Schedule review required")}</strong><span>${esc(formatMeetingWindow(meeting))}</span></div>
      ${records.length > 1 ? `<button class="ghost-danger remove-assignment-button" data-remove-assignment type="button">Remove assignment</button>` : ""}
    </div>`;
  }).join("")}<button class="secondary-button add-assignment-row" data-add-assignment="${index}" data-mode="${esc(mode)}" type="button">Add class section</button></div>`;
}
function taskProgress(task) {
  task.progress = aggregateProgress(task);
  const derived = derivedTaskStatus(task, sections);
  task.progress.status = derived === "Completed" ? "Complete" : derived;
  return task.progress;
}
function isOutputRecord(task) { return task.outputRecord === true || (task.outputRecord == null && task.type === "production"); }
function toast(message) {
  const element = q("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove("show"), 2300);
}

function requestIsOpen(request) { return ["New", "Needs clarification"].includes(request.status); }

function renderRequests() {
  const requests = state.requests || [];
  const open = requests.filter(requestIsOpen).length;
  const accepted = requests.filter(request => request.status === "Accepted").length;
  q("#requestCount").textContent = open;
  q("#requestCount").hidden = open === 0;
  q("#requestSummary").innerHTML = `<div class="metric"><span>Awaiting decision</span><strong>${open}</strong></div><div class="metric"><span>Need clarification</span><strong>${requests.filter(request => request.status === "Needs clarification").length}</strong></div><div class="metric"><span>Accepted into planning</span><strong>${accepted}</strong></div>`;
  q("#requestFilter").value = requestFilter;
  const visible = requests.filter(request => requestFilter === "all" || (requestFilter === "open" ? requestIsOpen(request) : request.status === requestFilter));
  q("#requestInbox").innerHTML = visible.length ? visible.map(request => `<article class="request-card" data-request="${esc(request.id)}">
    <header><div><span class="request-status" data-status="${esc(request.status)}">${esc(request.status)}</span><h3>${esc(request.eventName)}</h3><p>${esc(request.requester)}</p></div><time datetime="${esc(request.submittedAt)}">Received ${new Date(request.submittedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</time></header>
    <dl class="request-facts"><div><dt>Requested service</dt><dd>${dateLabel(request.serviceDate)} · ${esc(request.serviceTime || "time pending")}</dd></div><div><dt>Quantity</dt><dd>${Number(request.guestCount || 0)} guests / orders</dd></div><div><dt>Format</dt><dd>${esc(request.serviceFormat)}</dd></div><div><dt>Budget</dt><dd>${esc(request.budget || "Not supplied")}</dd></div></dl>
    <div class="request-detail"><div><strong>Requested menu</strong><p>${esc(request.requestedMenu || "Open to recommendation")}</p></div><div><strong>Requirements &amp; controls</strong><p>${esc(request.requirements || "None supplied")}</p><p>${esc(request.allergens || "No allergen information supplied")}</p></div></div>
    <label>Internal review note<textarea data-request-notes rows="2" placeholder="Clarification needed, scheduling conflict, or decision rationale">${esc(request.notes || "")}</textarea></label>
    <footer>${request.eventId ? `<button class="secondary-button" data-open-request-event="${esc(request.eventId)}" type="button">Open Event Order</button>` : ""}${requestIsOpen(request) ? `<button class="secondary-button" data-request-action="clarify" type="button">Request clarification</button><button class="ghost-danger" data-request-action="decline" type="button">Decline</button><button class="primary-button" data-request-action="accept" type="button">Accept into planning</button>` : ""}</footer>
  </article>`).join("") : "<div class=\"empty-state\"><strong>No requests in this view.</strong><p>New Google Form submissions will appear here when the district integration is enabled.</p></div>";

  qa("[data-request]").forEach(card => {
    const request = requests.find(item => item.id === card.dataset.request);
    card.querySelector("[data-request-notes]")?.addEventListener("change", event => { request.notes = event.target.value; save(); });
    card.querySelectorAll("[data-request-action]").forEach(button => button.addEventListener("click", () => handleRequest(request, button.dataset.requestAction)));
  });
  qa("[data-open-request-event]").forEach(button => button.addEventListener("click", () => {
    if (!state.events.some(event => event.id === button.dataset.openRequestEvent)) return toast("The linked demonstration event is no longer available.");
    currentId = button.dataset.openRequestEvent; renderAll(); showPanel("brief");
  }));
}

function handleRequest(request, action) {
  if (action === "clarify") {
    request.status = "Needs clarification";
    save(); renderRequests(); toast("Request held for clarification."); return;
  }
  if (action === "decline") {
    if (!confirm("Decline this request? The record will remain in the inbox history.")) return;
    request.status = "Declined"; request.decidedBy = activeTeacher(); request.decidedAt = new Date().toISOString();
    save(); renderRequests(); toast("Request declined and preserved in history."); return;
  }
  const id = `evt-${Date.now()}`;
  state.events.push({ id, requestId: request.id, name: request.eventName, type: request.type, school: request.school, customer: request.requester, owner: activeTeacher(), collaborators: [], serviceDate: request.serviceDate, serviceTime: request.serviceTime, guestCount: Number(request.guestCount || 1), serviceFormat: request.serviceFormat, budget: request.budget, requirements: [request.requestedMenu, request.requirements].filter(Boolean).join(" — "), allergens: request.allergens, stage: "Draft", version: 0, publishedAt: null, menu: [], tasks: [], assignments: {}, closeout: clone(seed.events[0].closeout) });
  request.status = "Accepted"; request.eventId = id; request.decidedBy = activeTeacher(); request.decidedAt = new Date().toISOString();
  currentId = id; save(); renderAll(); showPanel("brief"); toast("Request accepted into a private Event Order draft.");
}

function readiness(event) {
  const checks = [event.name && event.customer, event.serviceDate && event.guestCount, event.menu.length,
    event.tasks.length, Object.keys(event.assignments || {}).length].filter(Boolean).length;
  return { checks, total: 5, percent: Math.round(checks / 5 * 100) };
}

function renderSelect() {
  const active = activeEvents();
  if (!active.some(event => String(event.id) === String(currentId))) currentId = active[0]?.id || "";
  q("#eventSelect").innerHTML = active.length
    ? active.map(event => `<option value="${esc(event.id)}">${esc(event.name)}</option>`).join("")
    : '<option value="">No active events</option>';
  if (currentId) q("#eventSelect").value = currentId;
  q("#accountName").textContent = activeTeacher();
  q("#accountRole").textContent = session?.user?.role === "admin" ? "Administrator" : "Teacher";
  const banner = q("#archivedBanner");
  if (banner) {
    banner.hidden = !isWorkingArchived();
    banner.innerHTML = isWorkingArchived()
      ? `<strong>Archived event record</strong><span>${esc(current()?.name || "")} · ${esc(schoolYearLabel(eventSchoolYearAnchor(current())))} · view only. Use Event archive to browse prior years.</span>`
      : "";
  }
}

function renderSummary() {
  const event = current();
  const ready = readiness(event);
  q("#summaryName").textContent = event.name;
  q("#summaryOwner").textContent = `${event.owner}${event.owner === activeTeacher() ? " · you" : ""}`;
  q("#summaryService").textContent = `${dateLabel(event.serviceDate)} · ${event.guestCount || 0} ${event.type === "Bakery sale" ? "orders" : "guests"}`;
  q("#summaryStage").textContent = event.stage;
  q("#summaryReadiness").textContent = `${ready.percent}% · ${ready.checks}/${ready.total} controls`;
}

function fillBrief() {
  const event = current();
  const form = q("#briefForm");
  ["name", "type", "school", "customer", "owner", "serviceDate", "serviceTime", "guestCount", "serviceFormat", "budget", "requirements", "allergens"]
    .forEach(key => { form.elements[key].value = event[key] ?? ""; });
}

function collectBrief() {
  if (!canEdit()) return;
  const event = current();
  const form = q("#briefForm");
  ["name", "type", "school", "customer", "owner", "serviceDate", "serviceTime", "guestCount", "serviceFormat", "budget", "requirements", "allergens"]
    .forEach(key => { event[key] = key === "guestCount" ? Number(form.elements[key].value) : form.elements[key].value; });
  event.stage = event.stage === "Published" ? "Revised draft" : "Planning";
}

function filteredRecipes() {
  const query = recipeSearch.trim().toLowerCase();
  return recipeLibrary.filter(recipe => !query || [recipe.name, recipe.course, `unit ${recipe.unit || ""}`].some(value => String(value).toLowerCase().includes(query)));
}

function renderRecipeLibrary() {
  const select = q("#recipeLibrarySelect");
  const visible = filteredRecipes();
  const previous = select.value;
  select.innerHTML = visible.length ? visible.map(recipe => `<option value="${esc(recipe.id)}">${esc(recipe.name)} · ${esc(recipe.course)}${recipe.unit ? ` · Unit ${recipe.unit}` : ""}</option>`).join("") : '<option value="">No matching recipes</option>';
  if (visible.some(recipe => recipe.id === previous)) select.value = previous;
  q("#recipeLibraryCount").textContent = `${recipeLibrary.length} recipes · ${recipeLibrary.filter(recipe => recipe.course === "Culinary Arts 1 & 2").length} from Culinary Arts 1 & 2`;
  const recipe = recipeLibrary.find(item => item.id === select.value) || visible[0];
  if (!recipe) { q("#recipeLibraryDetail").innerHTML = '<div class="recipe-warning">No recipes match this search.</div>'; return; }
  const ready = Number(recipe.yield || 0) > 0 && recipe.portion;
  const purchasable = (recipe.ingredients || []).filter(line => !String(typeof line === "string" ? line : line.name).endsWith(":"));
  const supplierMatches = purchasable.filter(line => supplierProduct(typeof line === "string" ? line : `${line.name || ""} ${line.sourceText || ""}`)).length;
  q("#recipeLibraryDetail").innerHTML = `<div><span>Course</span><strong>${esc(recipe.course)}</strong></div><div><span>Curriculum location</span><strong>${recipe.unit ? `Unit ${recipe.unit}` : "Teacher-approved addition"}</strong></div><div><span>Version</span><strong>v${Number(recipe.version || 1)}</strong></div><div><span>Status</span><strong>${esc(ready ? "Production ready" : recipe.approvalStatus || "Review")}</strong></div><div><span>Ingredients</span><strong>${purchasable.length}</strong></div><div><span>Wegmans matches</span><strong>${supplierMatches} of ${purchasable.length}</strong></div><div><span>Procedure</span><strong>${(recipe.procedure || []).length} steps</strong></div><div><span>Equipment</span><strong>${(recipe.equipment || []).length || "Not yet indexed"}</strong></div><div><span>Allergens</span><strong>${esc(recipe.allergens || inferredAllergens(recipe) || "Teacher verification required")}</strong></div>${ready ? "" : '<div class="recipe-warning"><strong>Pathway recipe preserved; standardization required.</strong> Confirm its standard yield, portion, purchasing units, and allergen controls before publication. The app will not invent missing production data.</div>'}`;
}

function submissionPricingHtml(item) {
  const ingredients = (item.ingredients || []).filter(line => !String(line).trim().endsWith(":"));
  const unmatched = ingredients.filter(line => !supplierProduct(line));
  const matched = ingredients.length - unmatched.length;
  return `<div class="recipe-pricing-readiness ${unmatched.length ? "needs-review" : "ready"}"><strong>Wegmans pricing: ${matched} of ${ingredients.length} ingredient lines matched</strong>${unmatched.length ? `<span>Return for revision or add a supplier record before production if these are purchased ingredients: ${unmatched.slice(0, 6).map(esc).join("; ")}${unmatched.length > 6 ? `; +${unmatched.length - 6} more` : ""}</span>` : "<span>Every listed ingredient has a current supplier package and price match.</span>"}</div>`;
}

function renderRecipeSubmissions() {
  const submissions = state.recipeSubmissions || [];
  const awaiting = submissions.filter(item => item.status === "Awaiting review");
  q("#recipeSubmissionCount").textContent = `${awaiting.length} awaiting review`;
  const awaitingHtml = awaiting.length ? awaiting.map(item => `<article class="recipe-submission-card" data-submission="${esc(item.id)}"><span class="recipe-source-badge">${esc(item.status)}</span><h4>${esc(item.name)}</h4><div class="recipe-submission-meta">${esc(item.eventName || "Event not identified")} · revision ${Number(item.revision || 1)} · Submitted by ${esc(item.submittedBy)} · ${item.yield || "Yield not confirmed"} · ${esc(item.portion || "Portion not confirmed")} · ${(item.ingredients || []).length} ingredients</div>${submissionBodyHtml(item)}${submissionPricingHtml(item)}<div class="recipe-submission-actions"><label>Teacher review note<input data-review-note placeholder="Required corrections, reason, or approval note"></label><button class="secondary-button" data-return-recipe type="button">Return for revision</button><button class="ghost-danger" data-decline-recipe type="button">Decline</button><button class="primary-button" data-approve-recipe type="button">Approve for production</button></div></article>`).join("") : '<div class="empty-state"><strong>No student recipes are waiting.</strong><p>New Recipe Studio submissions will appear here.</p></div>';
  const reviewed = submissions.filter(item => ["Approved", "Returned for revision", "Declined", "Revised and resubmitted"].includes(item.status)).sort((a, b) => String(b.reviewedAt || b.submittedAt).localeCompare(String(a.reviewedAt || a.submittedAt))).slice(0, 12);
  const reviewedHtml = reviewed.length ? `<div class="recipe-review-history"><h4>Recent decisions and revision history</h4>${reviewed.map(item => `<article class="recipe-submission-card compact" data-submission="${esc(item.id)}"><span class="recipe-source-badge">${esc(item.status)}</span><h4>${esc(item.name)} · revision ${Number(item.revision || 1)}</h4><div class="recipe-submission-meta">${esc(item.eventName || "Event not identified")} · ${esc(item.submittedBy)}</div>${submissionBodyHtml(item)}${item.reviewNote ? `<p><strong>Teacher note:</strong> ${esc(item.reviewNote)}</p>` : ""}${item.status === "Approved" ? `<div class="recipe-event-add"><label>Event quantity required<input type="number" min="1" value="${Number(item.yield || 1)}" data-event-quantity></label><button class="primary-button" data-add-approved-recipe type="button" ${item.addedToEventAt ? "disabled" : ""}>${item.addedToEventAt ? "Added to Event Order" : "Add to linked Event Order"}</button></div>` : ""}</article>`).join("")}</div>` : "";
  q("#recipeSubmissionList").innerHTML = awaitingHtml + reviewedHtml;
  qa("[data-return-recipe]").forEach(button => button.addEventListener("click", () => reviewRecipe(button.closest("[data-submission]"), "Return for revision")));
  qa("[data-decline-recipe]").forEach(button => button.addEventListener("click", () => reviewRecipe(button.closest("[data-submission]"), "Decline")));
  qa("[data-approve-recipe]").forEach(button => button.addEventListener("click", () => reviewRecipe(button.closest("[data-submission]"), "Approve")));
  qa("[data-add-approved-recipe]").forEach(button => button.addEventListener("click", () => addApprovedRecipe(button.closest("[data-submission]"))));
}

async function reviewRecipe(card, decision) {
  const response = await fetch(`/api/recipe-submissions/${encodeURIComponent(card.dataset.submission)}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ decision, note: card.querySelector("[data-review-note]").value }) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) return toast(result.error || "Recipe review could not be saved.");
  revision = result.revision; recipeLibrary = result.recipes || recipeLibrary; supplierCatalog = result.supplierCatalog || supplierCatalog; state = result.state || state;
  if (result.eventId && state.events.some(event => event.id === result.eventId)) currentId = result.eventId;
  renderRecipeLibrary(); renderRecipeSubmissions(); toast(decision === "Approve" ? "Recipe approved for the shared library. It has not been added to the Event Order." : decision === "Decline" ? "Recipe declined and closed with the teacher note preserved." : "Recipe returned to the student for revision.");
}

async function addApprovedRecipe(card) {
  const required = Number(card.querySelector("[data-event-quantity]").value || 0);
  const response = await fetch(`/api/recipe-submissions/${encodeURIComponent(card.dataset.submission)}/add-to-event`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ required }) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) return toast(result.error || "Recipe could not be added to the Event Order.");
  revision = result.revision; recipeLibrary = result.recipes || recipeLibrary; supplierCatalog = result.supplierCatalog || supplierCatalog; state = result.state || state;
  if (result.eventId && state.events.some(event => event.id === result.eventId)) currentId = result.eventId;
  renderEventSelector(); renderMenu(); renderRecipeSubmissions(); renderReadiness(); toast("Approved recipe added to the linked Event Order.");
}

function renderMenu() {
  const event = current();
  event.menu.forEach(item => item.ingredients ||= []);
  q("#menuRows").innerHTML = event.menu.map((item, index) => `<tr data-menu-row="${index}">
    <td><input data-field="name" value="${esc(item.name)}"><small class="menu-source">${item.recipeId ? `${esc(item.sourceCourse || "Recipe library")} · v${Number(item.recipeVersion || 1)}` : "New recipe draft"}</small>${item.needsStandardization ? '<small class="menu-standardization">Standardization required</small>' : ""}</td>
    <td><input data-field="required" type="number" min="1" value="${item.required || ""}"></td>
    <td><input data-field="yield" type="number" min="1" value="${item.yield || ""}"></td>
    <td><strong>${batches(item)}</strong></td>
    <td><input data-field="portion" value="${esc(item.portion)}"></td>
    <td><select data-field="status">${["Researching", "Testing", "Review", "Approved"].map(value => `<option ${item.status === value ? "selected" : ""}>${value}</option>`).join("")}</select></td>
    <td><button class="icon-button" data-remove-menu="${index}" aria-label="Remove ${esc(item.name)}" type="button">×</button></td>
  </tr>`).join("");
  qa('[data-menu-row]').forEach(row => row.addEventListener("input", () => {
    if (!canEdit()) return;
    const menuIndex = Number(row.dataset.menuRow);
    const item = event.menu[menuIndex];
    row.querySelectorAll("[data-field]").forEach(field => { item[field.dataset.field] = ["required", "yield"].includes(field.dataset.field) ? Number(field.value) : field.value; });
    row.children[3].querySelector("strong").textContent = batches(item);
    const recipeOption = q(`#ingredientMenuItem option[value="${menuIndex}"]`);
    if (recipeOption) recipeOption.textContent = item.name.trim() || "Untitled menu item";
  }));
  qa('[data-remove-menu]').forEach(button => button.addEventListener("click", () => {
    if (!canEdit()) return;
    event.menu.splice(Number(button.dataset.removeMenu), 1);
    renderAll();
  }));
}

function scaledIngredient(ingredient, item) {
  const need = Number(ingredient.quantity || 0) * batches(item);
  const packs = Number(ingredient.packSize || 0) > 0 ? Math.ceil(need / Number(ingredient.packSize)) : 0;
  return { need, packs, cost: packs * Number(ingredient.packPrice || 0) };
}

function renderIngredients() {
  const event = current();
  if (!event.menu.length) {
    q("#ingredientMenuItem").innerHTML = "<option>Add a menu item first</option>";
    q("#ingredientRows").innerHTML = "<tr><td colspan=\"7\">No recipe selected.</td></tr>";
    q("#purchasingRows").innerHTML = "<tr><td colspan=\"5\">Purchasing will appear after recipe ingredients are entered.</td></tr>";
    q("#estimatedPurchaseCost").textContent = "$0.00 estimated";
    q("#addIngredient").disabled = true;
    return;
  }
  ingredientMenuIndex = Math.min(ingredientMenuIndex, event.menu.length - 1);
  q("#ingredientMenuItem").innerHTML = event.menu.map((item, index) => `<option value="${index}" ${index === ingredientMenuIndex ? "selected" : ""}>${esc(item.name)}</option>`).join("");
  q("#addIngredient").disabled = !canEdit();
  const item = event.menu[ingredientMenuIndex];
  item.ingredients ||= [];
  q("#ingredientNote").textContent = item.recipeId
    ? `${item.name} is an Event Order snapshot of ${item.sourceCourse || "the shared recipe library"} version ${Number(item.recipeVersion || 1)}.${item.needsStandardization ? " Confirm its standard yield, portion, purchasing units, and allergens before approval." : " Supplier packages are the actual Wegmans shelf sizes; purchase counts are rounded up after event needs are combined."}`
    : "This is a new recipe draft. Complete and approve it before publication; supplier packages should describe the actual item purchased, not a converted recipe quantity.";
  q("#ingredientRows").innerHTML = item.ingredients.length ? item.ingredients.map((ingredient, index) => {
    const scaled = scaledIngredient(ingredient, item);
    const packageDisplay = ingredient.packLabel || (ingredient.supplierItem ? "Package details needed" : "Supplier match needed");
    const priceDisplay = Number(ingredient.packPrice || 0).toLocaleString(undefined, { style: "currency", currency: "USD" });
    return `<tr data-ingredient="${index}"><td><input data-ingredient-field="name" value="${esc(ingredient.name)}">${ingredient.supplierItem ? `<small class="supplier-detail">${esc(ingredient.supplierName)} · ${esc(ingredient.supplierItem)}</small>` : ""}</td><td><input data-ingredient-field="quantity" type="number" min="0" step="0.01" value="${Number(ingredient.quantity || 0)}"></td><td><input data-ingredient-field="unit" value="${esc(ingredient.unit)}" placeholder="lb, oz, each"></td><td><strong>${scaled.need.toFixed(2)} ${esc(ingredient.unit)}</strong></td><td><strong>${esc(packageDisplay)}</strong>${ingredient.supplierUrl ? `<small class="supplier-detail"><a href="${esc(ingredient.supplierUrl)}" target="_blank" rel="noreferrer">View Wegmans item</a></small>` : ""}${ingredient.supplierNote ? `<small class="supplier-detail">${esc(ingredient.supplierNote)}</small>` : ""}</td><td><strong>${priceDisplay}</strong>${ingredient.supplierCheckedAt ? `<small class="supplier-detail">Checked ${esc(ingredient.supplierCheckedAt)}</small>` : ""}</td><td><button class="icon-button" data-remove-ingredient="${index}" aria-label="Remove ${esc(ingredient.name)}" type="button">×</button></td></tr>`;
  }).join("") : "<tr><td colspan=\"7\">No ingredients entered for this approved recipe.</td></tr>";
  qa("[data-ingredient]").forEach(row => row.addEventListener("change", () => {
    if (!canEdit()) return;
    const ingredient = item.ingredients[Number(row.dataset.ingredient)];
    row.querySelectorAll("[data-ingredient-field]").forEach(field => { ingredient[field.dataset.ingredientField] = field.dataset.ingredientField === "quantity" ? Number(field.value) : field.value; });
    save(); renderIngredients();
  }));
  qa("[data-remove-ingredient]").forEach(button => button.addEventListener("click", () => {
    if (!canEdit()) return;
    item.ingredients.splice(Number(button.dataset.removeIngredient), 1); save(); renderIngredients();
  }));
  renderPurchasing();
}

function renderPurchasing() {
  const consolidated = new Map();
  current().menu.forEach(item => (item.ingredients || []).forEach(ingredient => {
    const key = ingredient.supplierId || `${String(ingredient.name).trim().toLowerCase()}|${String(ingredient.unit).trim().toLowerCase()}`;
    if (!ingredient.name || !key) return;
    const scaled = scaledIngredient(ingredient, item);
    const entry = consolidated.get(key) || { name: ingredient.supplierItem || ingredient.name, unit: ingredient.unit, need: 0, needByUnit: {}, packageFraction: 0, packSize: ingredient.packSize, packPrice: ingredient.packPrice, packLabel: ingredient.packLabel, supplierName: ingredient.supplierName, supplierCheckedAt: ingredient.supplierCheckedAt, supplierUrl: ingredient.supplierUrl, recipes: [] };
    entry.need += scaled.need;
    entry.needByUnit[ingredient.unit || "unit"] = Number(entry.needByUnit[ingredient.unit || "unit"] || 0) + scaled.need;
    if (ingredient.supplierId && Number(ingredient.packSize || 0) > 0) entry.packageFraction += scaled.need / Number(ingredient.packSize);
    if (!entry.packSize && ingredient.packSize) entry.packSize = ingredient.packSize;
    if (!entry.packPrice && ingredient.packPrice) entry.packPrice = ingredient.packPrice;
    entry.recipes.push(item.name); consolidated.set(key, entry);
  }));
  const rows = [...consolidated.values()].map(entry => {
    const packs = entry.supplierName && entry.packageFraction > 0 ? Math.ceil(entry.packageFraction) : Number(entry.packSize || 0) > 0 ? Math.ceil(entry.need / Number(entry.packSize)) : 0;
    const cost = packs * Number(entry.packPrice || 0);
    const needLabel = Object.entries(entry.needByUnit).map(([unit, need]) => `${Number(need).toFixed(2)} ${unit}`).join(" + ");
    return { ...entry, packs, cost, needLabel };
  }).sort((a, b) => a.name.localeCompare(b.name));
  q("#estimatedPurchaseCost").textContent = `${rows.reduce((sum, row) => sum + row.cost, 0).toLocaleString(undefined, { style: "currency", currency: "USD" })} estimated`;
  q("#purchasingRows").innerHTML = rows.length ? rows.map(row => `<tr><td><strong>${esc(row.name)}</strong>${row.supplierName ? `<small class="supplier-detail">${esc(row.supplierName)}${row.supplierCheckedAt ? ` · checked ${esc(row.supplierCheckedAt)}` : ""}</small>` : ""}</td><td>${esc(row.needLabel)}</td><td><strong>${row.packs ? `${row.packs} × ${esc(row.packLabel || `${Number(row.packSize)} ${row.unit}`)}` : "Supplier match needed"}</strong></td><td>${row.cost.toLocaleString(undefined, { style: "currency", currency: "USD" })}${row.supplierUrl ? `<small class="supplier-detail"><a href="${esc(row.supplierUrl)}" target="_blank" rel="noreferrer">View Wegmans item</a></small>` : ""}</td><td>${esc([...new Set(row.recipes)].join(", "))}</td></tr>`).join("") : "<tr><td colspan=\"5\">Purchasing will appear after recipe ingredients are entered.</td></tr>";
}

function generateTasks() {
  if (!canEdit()) return toast("This event is view-only for the selected teacher.");
  const event = current();
  event.tasks = buildEventProductionTasks(event, sections);
  event.tasks.forEach(task => ensureTaskAssignment(task, event));
  save();
  renderAll();
  toast("Production plan regenerated from the current menu.");
}

function taskCollapsedSummary(task) {
  const records = normalizeTaskAssignments(task, sections);
  const dates = [...new Set(records.map(record => record.workDate).filter(Boolean))].map(shortDate).join(", ") || "Date needed";
  const identities = records.flatMap(record => teamsForSection(sections, record.sectionId).filter(team => record.teamIds.includes(team.id)).map(team => `${sectionColor(record.sectionId).name} ${team.name} ${stationAssignmentLabel(record)}${requiresKitchen(record) ? ` seq ${record.stationSequence || 1}` : ""}`));
  const allocation = allocationStatus(task, sections);
  const issues = assignmentIssues(task, sections);
  const progress = taskProgress(task);
  return `<div class="task-collapsed-summary"><span>${esc(task.plannedQuantity ? `${task.plannedQuantity} ${task.plannedUnit}` : "Planned quantity")}</span><span>${esc(dates)}</span><span>${esc(identities.join("; ") || "Section/team/kitchen needed")}</span><span>${esc(`Allocated ${allocation.assigned}/${allocation.required} ${allocation.unit}`)}</span><strong>${esc(progress.status || "Not started")}</strong>${issues.length ? `<b class="warning-chip">${issues.length} warning${issues.length === 1 ? "" : "s"}</b>` : ""}</div>`;
}

function taskCardHtml(task, index) {
  const issues = assignmentIssues(task, sections);
  const progress = taskProgress(task);
  const open = Boolean(task.uiExpanded);
  const quantity = task.detail.match(/^([^·]+)/)?.[1]?.trim() || "Planned quantity in procedure";
  return `<details class="production-task-card" data-task="${index}" ${open ? "open" : ""}>
    <summary>
      <span class="task-number">${index + 1}</span>
      <div class="task-summary-main"><strong>${esc(task.name)}</strong>${taskCollapsedSummary(task)}</div>
    </summary>
    <div class="task-card-body">
      <section class="task-layer generated-layer" aria-label="Generated production requirements">
        <h3>Station work</h3>
        <dl>
          <div><dt>Task</dt><dd>${esc(task.name)}</dd></div>
          <div><dt>Planned quantity</dt><dd>${esc(quantity)}</dd></div>
          <div><dt>Direction</dt><dd>${esc(task.detail)}</dd></div>
          <div><dt>Equipment</dt><dd>${esc(task.equipment?.length ? task.equipment.join(", ") : "See approved recipe")}</dd></div>
          <div><dt>Quality controls</dt><dd>${esc(task.qualityControls?.length ? task.qualityControls.join(" | ") : "Teacher quality check required")}</dd></div>
          <div><dt>Sequence</dt><dd>${esc(task.dependency || "Follow the production sequence and teacher quality checks.")}</dd></div>
        </dl>
        <p class="section-note">Full procedure lives on the approved recipe linked from the student production sheet.</p>
      </section>
      <section class="task-layer delegation-layer" aria-label="Teacher scheduling and delegation">
        <h3>Schedule and assign</h3>
        ${assignmentRowsV2(task, index, "production")}
      </section>
    </div>
  </details>`;
}

function renderProduction() {
  const event = current();
  event.tasks.forEach(task => ensureTaskAssignment(task, event));
  const totalBatches = event.menu.reduce((sum, item) => sum + batches(item), 0);
  q("#productionSummary").innerHTML = `<div class="metric"><span>Menu outputs</span><strong>${event.menu.length}</strong></div><div class="metric"><span>Production batches</span><strong>${totalBatches}</strong></div><div class="metric"><span>Generated tasks</span><strong>${event.tasks.length}</strong></div>`;

  const groups = new Map();
  event.tasks.forEach((task, index) => {
    const key = Number.isInteger(task.menuIndex) ? task.menuIndex : "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ task, index });
  });

  const openMenuKey = event.uiOpenMenuIndex;
  q("#taskList").innerHTML = event.tasks.length ? [...groups.entries()].map(([menuKey, items]) => {
    const menuItem = event.menu[menuKey];
    const name = menuItem?.name || "Other production work";
    const required = menuItem ? `${menuItem.required || 0} required` : `${items.length} task(s)`;
    const issueCount = items.reduce((sum, item) => sum + assignmentIssues(item.task, sections).length, 0);
    const open = openMenuKey === menuKey || openMenuKey === String(menuKey);
    return `<details class="production-menu-group" data-menu-group="${esc(String(menuKey))}" ${open ? "open" : ""}>
      <summary>
        <div><strong>${esc(name)}</strong><small>${esc(required)} · ${items.length} station task${items.length === 1 ? "" : "s"}</small></div>
        ${issueCount ? `<b class="warning-chip">${issueCount} warning${issueCount === 1 ? "" : "s"}</b>` : "<span class=\"menu-group-hint\">Click to expand</span>"}
      </summary>
      <div class="production-menu-tasks">${items.map(item => taskCardHtml(item.task, item.index)).join("")}</div>
    </details>`;
  }).join("") : "<p>No tasks yet. Generate the production plan from the approved menu.</p>";

  qa('[data-panel-view="production"] [data-menu-group]').forEach(group => {
    group.addEventListener("toggle", () => {
      if (!group.open) {
        if (event.uiOpenMenuIndex === group.dataset.menuGroup || event.uiOpenMenuIndex === Number(group.dataset.menuGroup)) {
          event.uiOpenMenuIndex = null;
        }
        return;
      }
      event.uiOpenMenuIndex = Number.isNaN(Number(group.dataset.menuGroup)) ? group.dataset.menuGroup : Number(group.dataset.menuGroup);
      qa('[data-panel-view="production"] [data-menu-group]').forEach(other => {
        if (other !== group && other.open) other.open = false;
      });
    });
  });

  qa('[data-panel-view="production"] [data-task]').forEach(card => {
    card.addEventListener("toggle", () => {
      const task = event.tasks[Number(card.dataset.task)];
      if (task) task.uiExpanded = card.open;
    });
    card.addEventListener("input", input => {
      if (!canEdit() || !input.target.dataset.assignmentField) return;
      const task = event.tasks[Number(card.dataset.task)];
      task[input.target.dataset.assignmentField] = input.target.value;
    });
  });
  bindAssignmentRecords("production");
}
function renderAssignments() {
  const event = current();
  event.tasks.forEach(task => ensureTaskAssignment(task, event));
  const board = q("#assignmentBoard");
  if (!board) return;
  board.innerHTML = sections.filter(isAdvancedSection).map(section => {
    const assigned = event.tasks.filter(task => assignmentsForSection(task, section.id, sections).length);
    return `<article class="assignment-column"><h3>${esc(section.name)}</h3><p>${esc(section.focus)}</p>${assigned.length ? assigned.map(task => {
      const index = event.tasks.indexOf(task);
      return `<div class="assignment-task" data-assignment="${index}"><strong>${esc(task.name)}</strong><span>${esc(task.detail)}</span>${task.equipment?.length ? `<small class="task-equipment">Equipment: ${esc(task.equipment.join(", "))}</small>` : ""}${task.qualityControls?.length ? `<small class="task-quality"><b>Quality controls:</b> ${esc(task.qualityControls.join(" · "))}</small>` : ""}
        ${assignmentRowsV2(task, index, "assignments")}
      </div>`;
    }).join("") : "<p>No tasks assigned.</p>"}</article>`;
  }).join("");
  qa('[data-assignment]').forEach(card => {
    card.addEventListener("input", input => {
      if (!canEdit() || !input.target.dataset.assignmentField) return;
      const task = event.tasks[Number(card.dataset.assignment)];
      task[input.target.dataset.assignmentField] = input.target.value;
    });
  });
  bindAssignmentRecords("assignments");
  event.assignments = Object.fromEntries(sections.map(section => [section.id, event.tasks.filter(task => assignmentsForSection(task, section.id, sections).length).map(task => task.id)]));
}

function bindAssignmentRecords(mode) {
  const event = current();
  const scope = mode === "production" ? '[data-panel-view="production"]' : '[data-panel-view="assignments"]';
  qa(`${scope} [data-assignment-record-field]`).forEach(field => field.addEventListener("change", change => {
    if (!canEdit()) return;
    const row = change.target.closest("[data-task][data-record]");
    const task = event.tasks[Number(row.dataset.task)];
    const record = normalizeTaskAssignments(task, sections)[Number(row.dataset.record)];
    if (change.target.dataset.assignmentRecordField === "workDate") record.workDate = change.target.value;
    if (change.target.dataset.assignmentRecordField === "station") record.station = change.target.value;
    if (change.target.dataset.assignmentRecordField === "kitchen") record.kitchen = change.target.value;
    if (change.target.dataset.assignmentRecordField === "stationDuty") {
      record.stationDuty = change.target.value;
      if (!requiresKitchen(record)) record.kitchen = "";
    }
    if (change.target.dataset.assignmentRecordField === "stationSequence") record.stationSequence = Math.max(1, Number(change.target.value || 1));
    if (change.target.dataset.assignmentRecordField === "allocatedQuantity") record.allocatedQuantity = Number(change.target.value || 0);
    if (change.target.dataset.assignmentRecordField === "studentDetails") record.studentDetails = change.target.value;
    if (change.target.dataset.assignmentRecordField === "status") record.status = change.target.value;
    if (change.target.dataset.assignmentRecordField === "confirmedPeriod") {
      const section = sections.find(item => item.id === record.sectionId);
      record.confirmedPeriod = normalizeConfirmedPeriod(change.target.value, section);
    }
    if (change.target.dataset.assignmentRecordField === "sectionId") {
      record.sectionId = change.target.value;
      const sectionTeams = teamsForSection(sections, record.sectionId);
      record.teamIds = sectionTeams.slice(0, 1).map(team => team.id);
      const section = sections.find(item => item.id === record.sectionId);
      record.confirmedPeriod = section?.requiresRotationConfirmation ? record.confirmedPeriod : null;
      if (section?.requiresRotationConfirmation && !normalizeConfirmedPeriod(record.confirmedPeriod, section)) {
        record.confirmedPeriod = null;
      }
    }
    normalizeTaskAssignments(task, sections);
    renderProduction(); renderAssignments(); renderPublish(); renderLiveFilters(); renderLive(); renderAttention();
  }));
  qa(`${scope} [data-assignment-team]`).forEach(field => field.addEventListener("change", change => {
    if (!canEdit()) return;
    const row = change.target.closest("[data-task][data-record]");
    const task = event.tasks[Number(row.dataset.task)];
    const record = normalizeTaskAssignments(task, sections)[Number(row.dataset.record)];
    const checked = [...row.querySelectorAll("[data-assignment-team]:checked")].map(item => item.value);
    record.teamIds = checked.filter(teamId => teamsForSection(sections, record.sectionId).some(team => team.id === teamId));
    normalizeTaskAssignments(task, sections);
    renderProduction(); renderAssignments(); renderPublish(); renderLive();
  }));
  qa(`${scope} [data-add-assignment]`).forEach(button => button.addEventListener("click", () => {
    if (!canEdit()) return;
    const task = event.tasks[Number(button.dataset.addAssignment)];
    const firstSection = availableMeetingsForDate(task.workDate || event.serviceDate, sections)[0]?.section.id || schedulableAdvancedSections(sections)[0]?.id || "";
    task.assignmentRecords = normalizeTaskAssignments(task, sections).concat(makeAssignment(sections, firstSection, task.workDate || event.serviceDate, teamsForSection(sections, firstSection).slice(0, 1).map(team => team.id)));
    normalizeTaskAssignments(task, sections);
    renderProduction(); renderAssignments(); renderPublish();
  }));
  qa(`${scope} [data-remove-assignment]`).forEach(button => button.addEventListener("click", () => {
    if (!canEdit()) return;
    const row = button.closest("[data-task][data-record]");
    const task = event.tasks[Number(row.dataset.task)];
    task.assignmentRecords = normalizeTaskAssignments(task, sections).filter((_, index) => index !== Number(row.dataset.record));
    normalizeTaskAssignments(task, sections);
    renderProduction(); renderAssignments(); renderPublish();
  }));
}

function stageContext(event, panel = activePanel) {
  const ready = readiness(event);
  const issues = taskPublicationIssues(event, sections);
  const dates = productionDates(event, sections);
  const selectedDate = liveDate || preferredProductionDate(event, new Date().toISOString(), sections);
  const counts = productionCounts(event, sections, selectedDate);
  const contexts = {
    requests: ["Request review", `${(state.requests || []).filter(requestIsOpen).length} open request(s). Accept, clarify, or decline before an Event Order becomes active.`],
    brief: ["Event definition", event.customer && event.serviceDate && event.guestCount ? "Customer, date, service format, and quantity are defined." : "Complete the customer, service date, count, format, and required controls."],
    menu: ["Menu readiness", `${event.menu.filter(item => item.status === "Approved").length}/${event.menu.length} recipes approved. Purchasing and cost forecast update from recipe snapshots.`],
    production: ["Scheduling and delegation", `${event.tasks.length} generated tasks across ${dates.length || 0} production date(s). Assign valid Advanced Culinary meetings, sections, teams, stations, and handoffs.`],
    publish: [event.publishedAt ? "Published revision" : "Review required", issues.length ? `${issues.length} validation warning(s) remain before publication.` : "Validation is clear. Publish only when this revision is authoritative for students."],
    live: ["Operational date", selectedDate ? `${dateLabel(selectedDate)}: ${counts.completed}/${counts.contributionTotal} assignment contribution(s) complete; ${counts.blocked} blocked.` : "Choose a production date once tasks are scheduled."],
    closeout: ["Reconciliation", "Verify usable final yield, cost, waste, handoffs, cleanup, sanitation, and instructor closeout before completion."],
    access: ["Sections, teams, rosters, accounts", "Administer stable sections, team rosters, authorized identities, and packet permissions without changing section identity."]
  };
  const fallback = [`Readiness ${ready.percent}%`, "Complete the active workflow step before moving forward."];
  return contexts[panel] || fallback;
}

function renderAttention() {
  const event = current();
  const items = [];
  if (!canEdit()) items.push(["View-only event", `${event.owner} controls the Event Order. You can monitor the full operation.`]);
  if (!event.customer) items.push(["Customer missing", "Complete the accepted event brief."]);
  if (!event.menu.length) items.push(["Menu not entered", "Add required outputs and yields."]);
  const unapproved = event.menu.filter(item => item.status !== "Approved").length;
  if (unapproved) items.push([`${unapproved} menu item${unapproved === 1 ? "" : "s"} not approved`, "Resolve testing and recipe approval."]);
  if (!event.tasks.length) items.push(["Production plan missing", "Generate tasks from the menu."]);
  const blocked = event.tasks.filter(task => taskProgress(task).status === "Blocked").length;
  if (blocked) items.push([`${blocked} blocked task${blocked === 1 ? "" : "s"}`, "Open Live production and respond."]);
  const contributionAlerts = event.tasks.flatMap(task => assignmentContributions(task, sections).flatMap(item => {
    const alerts = [];
    if (!item.progress.updatedAt) alerts.push("assignment not yet saved");
    if (requiresKitchen(item.record) && !item.record.kitchen) alerts.push("kitchen selection missing");
    if (!item.team?.id) alerts.push("select a team from Access & Rosters");
    else if (!item.team?.students?.length) alerts.push("missing saved roster");
    if (!item.meeting) alerts.push("schedule mapping needs review");
    return alerts.map(alert => [`${task.name}: ${alert}`, `${sectionColor(item.record.sectionId).name} ${item.team?.name || "team"} - ${stationAssignmentLabel(item.record)}`]);
  }));
  const kitchenAlerts = kitchenSchedulingIssues(event, sections).map(issue => [issue, "Kitchen capacity or overlap review required in Step 4."]);
  const allocationAlerts = event.tasks.map(task => ({ task, allocation: allocationStatus(task, sections) })).filter(item => ["under", "over"].includes(item.allocation.state));
  allocationAlerts.forEach(({ task, allocation }) => items.push([`${task.name}: allocation ${allocation.state}`, `Allocated ${allocation.assigned}/${allocation.required} ${allocation.unit}.`]));
  items.push(...kitchenAlerts.slice(0, 6));
  items.push(...contributionAlerts.slice(0, 8));
  const [contextTitle, contextDetail] = stageContext(event);
  if (!items.length) items.push([activePanel === "publish" ? "Ready to publish" : "No critical alerts", contextDetail]);
  q("#attentionList").innerHTML = items.map(([title, detail]) => `<div class="attention-item"><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("");
  q(".rail-note").innerHTML = `<strong>${esc(contextTitle)}</strong><p>${esc(contextDetail)}</p>`;
}

function publicationSignature(event) {
  const publicTasks = (event.tasks || []).map(({ progress, assignmentProgress, uiExpanded, ...task }) => task);
  return JSON.stringify({
    name: event.name, customer: event.customer, serviceDate: event.serviceDate, serviceTime: event.serviceTime,
    guestCount: event.guestCount, serviceFormat: event.serviceFormat, requirements: event.requirements,
    allergens: event.allergens, menu: event.menu, tasks: publicTasks
  });
}

function hasUnpublishedEdits(event) {
  return Boolean(event.publishedAt && event.publishedSignature && event.publishedSignature !== publicationSignature(event));
}

function publicationSummary(event) {
  const assignments = event.tasks.flatMap(task => normalizeTaskAssignments(task, sections));
  const sectionIds = new Set(assignments.map(record => record.sectionId).filter(Boolean));
  const scheduled = assignments.filter(record => record.workDate && record.sectionId && record.teamIds?.length).length;
  const issues = taskPublicationIssues(event, sections);
  q("#publicationSummary").innerHTML = `<div class="publication-facts">
    <div><span>Current authoritative revision</span><strong>${event.version ? `Revision ${event.version}` : "No published revision"}</strong></div>
    <div><span>Published/draft status</span><strong>${esc(event.publishedAt ? event.stage : "Draft only")}</strong></div>
    <div><span>Publication date and time</span><strong>${esc(event.publishedAt ? new Date(event.publishedAt).toLocaleString() : "Not published")}</strong></div>
    <div><span>Published by</span><strong>${esc(event.publishedBy || (event.publishedAt ? event.owner : "Not published"))}</strong></div>
    <div><span>Student packets</span><strong>${sectionIds.size}</strong></div>
    <div><span>Participating sections</span><strong>${esc([...sectionIds].map(sectionName).join("; ") || "None assigned")}</strong></div>
    <div><span>Scheduled task assignments</span><strong>${scheduled}</strong></div>
    <div><span>Outstanding warnings</span><strong>${issues.length}</strong></div>
  </div>
  <div class="${hasUnpublishedEdits(event) ? "publish-warning" : "publication-current"}"><strong>${hasUnpublishedEdits(event) ? "Unpublished teacher changes exist." : event.publishedAt ? "Published revision is current." : "No student-facing revision yet."}</strong><p>${hasUnpublishedEdits(event) ? "Students still receive the last authoritative published revision until a new revision is published." : event.publishedAt ? "Student packets reflect the current authoritative revision." : "Publish after validation to make packets available."}</p></div>`;
}

function masterPreview() {
  const event = current();
  const ready = readiness(event);
  const grouped = new Map();
  for (const task of event.tasks) {
    for (const record of normalizeTaskAssignments(task, sections)) {
      const meeting = sectionMeetsOnDate(record.sectionId, record.workDate, sections);
      const key = `${record.workDate || "unscheduled"}|${meeting ? `Period ${meeting.period}` : "meeting review"}`;
      const list = grouped.get(key) || [];
      list.push({ task, record, meeting });
      grouped.set(key, list);
    }
  }
  q("#masterOrderPreview").innerHTML = `<div class="preview-block"><span>Customer commitment</span><strong>${esc(event.customer || "Not entered")} - ${event.guestCount || 0} guests</strong><small>${dateLabel(event.serviceDate)} at ${esc(event.serviceTime || "time pending")} - ${esc(event.serviceFormat)}</small></div>
    <div class="preview-block"><span>Menu and output</span><strong>${event.menu.length} items - ${event.menu.reduce((sum, item) => sum + item.required, 0)} total portions</strong><small>${event.menu.filter(item => item.status === "Approved").length} approved recipes</small></div>
    <div class="preview-block"><span>Production system</span><strong>${event.tasks.length} tasks across ${new Set(event.tasks.flatMap(task => normalizeTaskAssignments(task, sections).map(record => record.sectionId))).size} sections</strong><small>Readiness ${ready.percent}%</small></div>
    <div class="preview-block grouped-order"><span>Task schedule by production date and class meeting</span>${[...grouped.entries()].map(([key, items]) => `<details open><summary>${esc(key.replace("|", " - "))}</summary>${items.map(({ task }) => `<strong>${esc(task.name)}</strong>${assignmentSummary(task)}`).join("")}</details>`).join("") || "<p>No scheduled production tasks.</p>"}</div>
    <div class="preview-block"><span>Version</span><strong>${event.version ? `Published v${event.version}` : "Unpublished draft"}</strong><small>${event.publishedAt ? new Date(event.publishedAt).toLocaleString() : "No student instructions have been published."}</small></div>`;
}
function packetPreview() {
  const event = current();
  const sectionId = q("#packetView").value || sections.find(isAdvancedSection)?.id || sections[0].id;
  const section = sections.find(item => item.id === sectionId);
  const tasks = event.tasks.filter(task => assignmentsForSection(task, sectionId, sections).length);
  const firstMeeting = tasks.flatMap(task => assignmentsForSection(task, sectionId, sections).map(record => sectionMeetsOnDate(record.sectionId, record.workDate, sections))).filter(Boolean)[0];
  const warning = section?.officialSectionNumber ? "" : `<div class="provisional-warning"><strong>Official section number pending.</strong><p>${esc(section?.teacher || "Teacher")} may keep planning with this provisional stable section label; update the official number in Access & Rosters when confirmed.</p></div>`;
  q("#studentPacketPreview").innerHTML = `<div class="preview-block packet-audience"><span>Selected packet audience</span><strong>${esc(sectionDisplayLabel(section))}</strong><small>Teacher: ${esc(section?.teacher || "Teacher pending")} - ${firstMeeting ? `Day ${firstMeeting.rotationDay} - Period ${firstMeeting.period} - ${firstMeeting.date}` : "Rotation day, period, and date depend on the assigned meeting."}</small></div>
    ${warning}
    <div class="preview-block"><span>Shared purpose</span><strong>${esc(event.name)}</strong><small>${esc(event.customer)} - ${event.guestCount} guests - ${dateLabel(event.serviceDate)}</small></div>
    <div class="preview-block"><span>Authorized revision</span><strong>${event.version ? `Revision ${event.version}` : "Draft preview"}</strong><small>${event.publishedAt ? `Published ${new Date(event.publishedAt).toLocaleString()}` : "Not yet available to students"}</small></div>
    ${tasks.map(task => `<div class="packet-task"><strong>${esc(task.name)}</strong><div>${esc(task.detail)}</div>${task.equipment?.length ? `<small>Equipment: ${esc(task.equipment.join(", "))}</small>` : ""}${task.qualityControls?.length ? `<small><b>Quality controls:</b> ${esc(task.qualityControls.join(" | "))}</small>` : ""}${assignmentsForSection(task, sectionId, sections).map(record => {
      const teamNames = teamsForSection(sections, record.sectionId).filter(team => record.teamIds.includes(team.id)).map(team => team.name).join(", ") || "Team pending";
      return `<small>${esc(formatMeetingWindow(sectionMeetsOnDate(record.sectionId, record.workDate, sections)))}</small><small>${esc(teamNames)} - ${esc(stationAssignmentLabel(record))}${requiresKitchen(record) ? ` - Sequence ${record.stationSequence || 1}` : ""}</small>${record.studentDetails ? `<small>${esc(record.studentDetails)}</small>` : ""}`;
    }).join("")}${task.dependency ? `<small>Handoff: ${esc(task.dependency)}</small>` : ""}</div>`).join("") || "<p>No work assigned to this section.</p>"}`;
}
function renderPublish() {
  const event = current();
  const previous = q("#packetView").value;
  q("#packetView").innerHTML = sections.filter(isAdvancedSection).map(section => `<option value="${section.id}">${esc(sectionDisplayLabel(section))}</option>`).join("");
  if (previous) q("#packetView").value = previous;
  publicationSummary(event);
  masterPreview();
  packetPreview();
  const issues = [];
  if (event.menu.some(item => item.status !== "Approved")) issues.push("Every recipe must be approved before publication.");
  if (!event.tasks.length) issues.push("Generate and review the production plan.");
  const schedulingIssues = taskPublicationIssues(event, sections);
  if (schedulingIssues.length) issues.push(schedulingIssues.join(" "));
  if (!isOwner(event)) issues.push(`${event.owner} is the event owner and must publish the controlling order.`);
  q("#publishWarning").innerHTML = issues.length ? `<strong>Revision readiness warnings:</strong> ${esc(issues.join(" "))}` : "<strong>Revision readiness clear:</strong> menu, production tasks, and section assignments are ready for student packets.";
  q("#publishOrder").disabled = issues.length > 0;
}

function renderLiveFilters() {
  const event = current();
  const dates = productionDates(event, sections);
  liveDate = dates.includes(liveDate) ? liveDate : preferredProductionDate(event, new Date().toISOString(), sections);
  const sectionSelect = q("#liveSectionFilter");
  sectionSelect.innerHTML = `<option value="all">All sections</option>${sections.filter(isAdvancedSection).map(section => `<option value="${esc(section.id)}">${esc(sectionDisplayLabel(section))}</option>`).join("")}`;
  sectionSelect.value = liveSection;
  const dateSelect = q("#liveDateFilter");
  if (dateSelect) {
    dateSelect.innerHTML = dates.length ? dates.map(date => `<option value="${esc(date)}">${esc(dateLabel(date))}</option>`).join("") : `<option value="">No scheduled dates</option>`;
    dateSelect.value = liveDate;
  }
  q("#liveStatusFilter").value = liveStatus;
}

function contributionStudents(contribution) {
  const students = contribution.team?.students || [];
  if (students.length) return students.join(", ");
  return "Roster warning: no students are saved for this selected team.";
}

function renderLive() {
  const event = current();
  event.tasks.forEach(taskProgress);
  liveDate = liveDate || preferredProductionDate(event, new Date().toISOString(), sections);
  const counts = productionCounts(event, sections, liveDate);
  const usable = event.tasks.filter(isOutputRecord).reduce((sum, task) => sum + Number(taskProgress(task).usableYield || 0), 0);
  const title = q("#liveProductionTitle");
  if (title) title.textContent = `Live production - ${liveDate ? dateLabel(liveDate) : "No scheduled date"}`;
  q("#liveSummary").innerHTML = `<div class="metric"><span>Tasks completed</span><strong>${counts.taskCompleted} of ${counts.taskTotal}</strong></div><div class="metric"><span>Assignments completed</span><strong>${counts.completed} of ${counts.contributionTotal}</strong></div><div class="metric"><span>Assignments in progress / blocked</span><strong>${counts.inProgress} / ${counts.blocked}</strong></div><div class="metric"><span>Assignments needing correction</span><strong>${counts.invalid}</strong></div><div class="metric"><span>Final usable output reported</span><strong>${usable}</strong></div>`;
  const contributions = contributionsForDate(event, liveDate, sections).filter(item => (liveSection === "all" || item.record.sectionId === liveSection) && (liveStatus === "all" || item.progress.status === liveStatus));
  q("#liveBoard").innerHTML = contributions.length ? contributions.map(item => {
    const taskIndex = event.tasks.indexOf(item.task);
    const unit = item.progress.unit || item.record.allocatedUnit || item.task.plannedUnit || "units";
    const color = sectionColor(item.record.sectionId);
    return `<article class="live-task assignment-contribution section-tinted" style="--section-tint:${color.tint};--section-border:${color.border};--section-text:${color.text}" data-live-task="${taskIndex}" data-contribution-key="${esc(item.key)}" data-record-id="${esc(item.record.id)}" data-team-id="${esc(item.team.id)}" data-status="${esc(progressDisplayState(item.progress))}">
      <div class="live-task-title"><strong>${esc(item.task.name)}</strong><span>${esc(color.name)} - ${esc(item.team.name)} - ${esc(stationAssignmentLabel(item.record))}${requiresKitchen(item.record) ? ` - Seq ${item.record.stationSequence || 1}` : ""} - ${esc(allocationLabel(item.record, item.task))}</span><small>${esc(shortDate(item.record.workDate))} - ${esc(item.meeting ? `Day ${item.meeting.rotationDay}, Period ${item.meeting.period}, ${item.meeting.start}-${item.meeting.end}` : "Invalid or missing class meeting")}</small><small class="${item.team?.students?.length ? "" : "roster-warning"}">${esc(contributionStudents(item))}</small>${item.record.studentDetails ? `<small>${esc(item.record.studentDetails)}</small>` : ""}</div>
      <label>Status<select data-progress="status">${statuses.map(status => `<option ${item.progress.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
      <label>Quantity completed<input data-progress="quantity" type="number" min="0" value="${Number(item.progress.quantity || 0)}"><small>${Number(item.progress.quantity || 0)} of ${esc(item.task.detail.match(/^(.*?)\s*-|^(.*?)\s*·/)?.[1] || "planned work")} ${esc(unit)}</small></label>
      <input data-progress="unit" type="hidden" value="${esc(unit)}">
      ${isOutputRecord(item.task) ? `<label>Final usable yield<input data-progress="usableYield" type="number" min="0" value="${Number(item.progress.usableYield || 0)}"></label>` : ""}
      <label>Waste<input data-progress="waste" type="number" min="0" value="${Number(item.progress.waste || 0)}"></label>
      <label>Waste category<select data-progress="wasteCategory">${WASTE_CATEGORIES.map(value => `<option value="${esc(value)}" ${item.progress.wasteCategory === value ? "selected" : ""}>${esc(value || "None")}</option>`).join("")}</select></label>
      <label>Problem or interruption<input data-progress="issue" value="${esc(item.progress.issue)}" placeholder="Leave blank when work is proceeding"></label>
      <label>Recovery action<input data-progress="recoveryAction" value="${esc(item.progress.recoveryAction)}" placeholder="Correction, support, or next move"></label>
      <div class="save-meta"><span>${item.progress.updatedAt ? `Saved ${new Date(item.progress.updatedAt).toLocaleString()}` : "Not yet saved"}</span><strong>${esc(item.progress.updatedBy || "")}</strong></div>
    </article>`;
  }).join("") : "<p>No assignment contributions match the selected production date, section, and status.</p>";
  qa('[data-live-task][data-contribution-key]').forEach(card => card.addEventListener("change", () => {
    if (!canEdit()) return toast("This event is view-only for the selected teacher.");
    const task = event.tasks[Number(card.dataset.liveTask)];
    const progress = {};
    card.querySelectorAll("[data-progress]").forEach(field => { progress[field.dataset.progress] = ["quantity", "usableYield", "waste"].includes(field.dataset.progress) ? Number(field.value) : field.value; });
    progress.updatedAt = new Date().toISOString();
    progress.updatedBy = activeTeacher();
    task.assignmentProgress ||= {};
    task.assignmentProgress[card.dataset.contributionKey] = progress;
    task.progress = aggregateProgress(task);
    if (["In progress", "Blocked", "Ready for handoff"].includes(task.progress.status)) event.stage = "In production";
    save();
    renderLive(); renderAttention(); renderCloseout(); renderSummary();
  }));
}
function plannedIngredientCost(event) {
  return (event.menu || []).reduce((sum, item) => sum + (item.ingredients || []).reduce((itemSum, ingredient) => {
    const scaled = scaledIngredient(ingredient, item);
    const packs = ingredient.supplierName && Number(ingredient.packSize || 0) > 0 ? Math.ceil(scaled.need / Number(ingredient.packSize)) : 0;
    return itemSum + packs * Number(ingredient.packPrice || 0);
  }, 0), 0);
}

function currencyNumber(value) {
  if (/not applicable|^n\/?a$/i.test(String(value || "").trim())) return null;
  const number = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? number : null;
}

function ensureCloseoutDefaults(event) {
  event.closeout ||= clone(seed.events[0].closeout);
  const closeout = event.closeout;
  if (closeout.actualGuests === "" || closeout.actualGuests == null) {
    closeout.actualGuests = event.guestCount != null && event.guestCount !== "" ? String(event.guestCount) : "";
  }
  if (!String(closeout.actualRevenue ?? "").trim()) {
    const budgetNumber = currencyNumber(event.budget);
    closeout.actualRevenue = budgetNumber != null ? budgetNumber.toFixed(2) : String(event.budget || "").trim();
  }
  if (!String(closeout.actualCost ?? "").trim()) {
    const planned = plannedIngredientCost(event);
    closeout.actualCost = planned > 0 ? planned.toFixed(2) : "";
  }
  return closeout;
}

function closeoutReadiness(event) {
  const counts = productionCounts(event, sections);
  const finalRequired = event.menu.reduce((sum, item) => sum + Number(item.required || 0), 0);
  const finalUsable = event.tasks.filter(isOutputRecord).reduce((sum, task) => sum + Number(taskProgress(task).usableYield || 0), 0);
  const closeout = event.closeout || {};
  const exception = closeout.closeoutException;
  const blockers = [];
  if (!exception && (counts.notStarted || counts.inProgress || counts.blocked || counts.invalid)) blockers.push("Required production records are unfinished, blocked, or invalid.");
  if (!exception && finalRequired > 0 && finalUsable <= 0) blockers.push("Final usable event output has not been reconciled.");
  if (exception && !String(closeout.closeoutExceptionReason || "").trim()) blockers.push("A cancellation or zero-output exception requires an explicit reason.");
  return { counts, finalRequired, finalUsable, blockers };
}

function renderCloseout() {
  const event = current();
  ensureCloseoutDefaults(event);
  event.closeout.estimatedProgramValue ||= "";
  event.closeout.closeoutException ||= "";
  event.closeout.closeoutExceptionReason ||= "";
  const fields = ["actualGuests", "actualRevenue", "estimatedProgramValue", "actualCost", "feedbackReceived", "customerFeedback", "operationalNotes", "closeoutException", "closeoutExceptionReason"];
  fields.forEach(field => { const element = q(`#${field}`); if (element) element.value = event.closeout[field] ?? ""; });
  q("#closeoutRows").innerHTML = event.menu.map((item, menuIndex) => {
    const menuTasks = event.tasks.filter(task => task.menuIndex === menuIndex);
    const usable = menuTasks.filter(isOutputRecord).reduce((sum, task) => sum + Number(taskProgress(task).usableYield || 0), 0);
    const waste = menuTasks.reduce((sum, task) => sum + Number(taskProgress(task).waste || 0), 0);
    const variance = usable - Number(item.required || 0);
    return `<tr><td><strong>${esc(item.name)}</strong></td><td>${item.required}</td><td>${usable}</td><td>${waste}</td><td class="${variance < 0 ? "variance-negative" : "variance-positive"}">${variance > 0 ? "+" : ""}${variance}</td></tr>`;
  }).join("");
  const plannedOutput = event.menu.reduce((sum, item) => sum + Number(item.required || 0), 0);
  const grossPlannedOutput = event.tasks.filter(isOutputRecord).reduce((sum, task) => sum + Number(task.plannedQuantity || 0), 0);
  const actualOutput = event.tasks.filter(isOutputRecord).reduce((sum, task) => sum + Number(taskProgress(task).usableYield || 0), 0);
  const totalWaste = event.tasks.reduce((sum, task) => sum + Number(taskProgress(task).waste || 0), 0);
  const plannedCost = plannedIngredientCost(event);
  const actualCost = currencyNumber(event.closeout.actualCost);
  const variance = actualCost == null ? null : actualCost - plannedCost;
  const readiness = closeoutReadiness(event);
  q("#managementBriefing").innerHTML = `<div class="briefing-list">
    <div class="briefing-item"><span>Planned vs. actual schedule</span><strong>${productionDates(event, sections).map(dateLabel).join("; ") || "No scheduled production dates"}</strong></div>
    <div class="briefing-item"><span>Required / gross / usable yield</span><strong>${plannedOutput} reserved - ${grossPlannedOutput || plannedOutput} gross planned - ${actualOutput} usable reported</strong></div>
    <div class="briefing-item"><span>Cost and variance</span><strong>${plannedCost.toLocaleString(undefined, { style: "currency", currency: "USD" })} planned${variance == null ? " - actual cost not recorded" : ` - ${actualCost.toLocaleString(undefined, { style: "currency", currency: "USD" })} actual - ${variance.toLocaleString(undefined, { style: "currency", currency: "USD" })} variance`}</strong></div>
    <div class="briefing-item"><span>Waste</span><strong>${totalWaste} recorded units</strong></div>
    <div class="briefing-item"><span>Interruptions and recovery</span><strong>${readiness.counts.blocked} blocked contribution(s); recovery notes in the production record.</strong></div>
    <div class="briefing-item"><span>Customer/service results</span><strong>${esc(event.closeout.feedbackReceived || "No")} feedback; ${esc(event.closeout.actualRevenue || "revenue not recorded")}</strong></div>
    <div class="briefing-item"><span>Recommendations for next event</span><strong>${esc(event.closeout.operationalNotes || "Add recommendations before final completion.")}</strong></div>
  </div>`;
  q("#productionRecord").innerHTML = event.tasks.map(task => {
    const contributions = assignmentContributions(task, sections);
    return `<details class="stage-record"><summary>${esc(task.name)} - ${esc(taskProgress(task).status)}</summary>${contributions.map(item => `<div class="record-contribution section-tinted" style="--section-tint:${sectionColor(item.record.sectionId).tint};--section-border:${sectionColor(item.record.sectionId).border};--section-text:${sectionColor(item.record.sectionId).text}"><strong>${esc(sectionColor(item.record.sectionId).name)} - ${esc(item.team.name)} - ${esc(stationAssignmentLabel(item.record))}${requiresKitchen(item.record) ? ` - Seq ${item.record.stationSequence || 1}` : ""}</strong><span>${esc(item.record.workDate || "date missing")} - ${esc(item.meeting ? `Period ${item.meeting.period}` : "invalid meeting")} - ${esc(allocationLabel(item.record, task))}</span><span>${Number(item.progress.quantity || 0)} ${esc(item.progress.unit || item.record.allocatedUnit || task.plannedUnit || "units")} complete; ${Number(item.progress.waste || 0)} waste${item.progress.wasteCategory ? ` (${esc(item.progress.wasteCategory)})` : ""}</span><span>Problem: ${esc(item.progress.issue || "None")} | Recovery: ${esc(item.progress.recoveryAction || "None")}</span><small>${item.progress.updatedAt ? `Saved ${new Date(item.progress.updatedAt).toLocaleString()} by ${esc(item.progress.updatedBy || "unknown")}` : "Not yet saved"}</small></div>`).join("") || "<p>No assignment contributions.</p>"}</details>`;
  }).join("");
  const status = readiness.blockers.length ? readiness.blockers.join(" ") : "Closeout requirements are satisfied for ordinary completion.";
  q("#closeoutStatus").innerHTML = `<strong>${readiness.blockers.length ? "Completion blocked" : "Ready for completion"}</strong><p>${esc(status)}</p><small>Tasks completed: ${readiness.counts.taskCompleted} of ${readiness.counts.taskTotal}; task corrections: ${readiness.counts.taskInvalid}. Assignments completed: ${readiness.counts.completed} of ${readiness.counts.contributionTotal}; assignment corrections: ${readiness.counts.invalid}; blocked: ${readiness.counts.blocked}.</small>`;
  q("#completeEvent").disabled = !canEdit() || isWorkingArchived() || readiness.blockers.length > 0;
}
function collectCloseout() {
  if (!canEdit() || isWorkingArchived()) return false;
  const closeout = current().closeout ||= {};
  ["actualGuests", "actualRevenue", "estimatedProgramValue", "actualCost", "feedbackReceived", "customerFeedback", "operationalNotes", "closeoutException", "closeoutExceptionReason"].forEach(field => { const element = q(`#${field}`); if (element) closeout[field] = element.value; });
  closeout.updatedAt = new Date().toISOString();
  closeout.updatedBy = activeTeacher();
  return true;
}
function archiveCsvRows() {
  return archivedEventsList().map(event => {
    const sectionIds = [...new Set((event.tasks || []).flatMap(task => (task.assignmentRecords || []).map(record => record.sectionId)).filter(Boolean))];
    return {
      id: event.id,
      name: event.name,
      customer: event.customer || "",
      school: event.school || "",
      serviceDate: event.serviceDate || "",
      schoolYear: schoolYearLabel(eventSchoolYearAnchor(event)),
      guestCount: event.guestCount ?? "",
      budget: event.budget || "",
      actualGuests: event.closeout?.actualGuests ?? "",
      actualRevenue: event.closeout?.actualRevenue ?? "",
      actualCost: event.closeout?.actualCost ?? "",
      stage: event.stage || "",
      completedAt: event.completedAt || "",
      completedBy: event.completedBy || "",
      sections: sectionIds.map(id => sectionDisplayLabel(sections.find(section => section.id === id) || { id })).join("; "),
      menu: (event.menu || []).map(item => `${item.name} (${item.required || 0})`).join("; ")
    };
  });
}

function downloadArchiveSpreadsheet() {
  const rows = archiveCsvRows();
  const headers = ["id", "name", "customer", "school", "serviceDate", "schoolYear", "guestCount", "budget", "actualGuests", "actualRevenue", "actualCost", "stage", "completedAt", "completedBy", "sections", "menu"];
  const escapeCell = value => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [headers.join(","), ...rows.map(row => headers.map(key => escapeCell(row[key])).join(","))].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `gcsd-advanced-culinary-event-archive-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  toast(rows.length ? `Downloaded ${rows.length} archived event${rows.length === 1 ? "" : "s"}.` : "Archive spreadsheet downloaded (no completed events yet).");
}

function renderArchive() {
  const host = q("#archiveList");
  const yearFilter = q("#archiveYearFilter");
  if (!host || !yearFilter) return;
  const archived = archivedEventsList().sort((a, b) => String(b.serviceDate || b.completedAt || "").localeCompare(String(a.serviceDate || a.completedAt || "")));
  const years = [...new Set(archived.map(event => schoolYearLabel(eventSchoolYearAnchor(event))))].sort().reverse();
  const selectedYear = yearFilter.value && years.includes(yearFilter.value) ? yearFilter.value : (years[0] || "");
  yearFilter.innerHTML = years.length
    ? years.map(year => `<option value="${esc(year)}" ${year === selectedYear ? "selected" : ""}>${esc(year)}</option>`).join("")
    : '<option value="">No archived years yet</option>';
  const visible = archived.filter(event => !selectedYear || schoolYearLabel(eventSchoolYearAnchor(event)) === selectedYear);
  q("#archiveCount").textContent = `${archived.length} archived`;
  host.innerHTML = visible.length ? visible.map(event => {
    const closeout = event.closeout || {};
    return `<article class="archive-card" data-archive-event="${esc(event.id)}">
      <div class="archive-card-top"><span>${esc(schoolYearLabel(eventSchoolYearAnchor(event)))}</span><strong>${esc(event.stage || "Completed")}</strong></div>
      <h3>${esc(event.name)}</h3>
      <p>${esc(event.customer || "Customer not recorded")} · ${dateLabel(event.serviceDate)} · ${Number(event.guestCount || 0)} planned guests</p>
      <dl>
        <div><dt>Actual guests</dt><dd>${esc(closeout.actualGuests || "—")}</dd></div>
        <div><dt>Revenue</dt><dd>${esc(closeout.actualRevenue || "—")}</dd></div>
        <div><dt>Ingredient cost</dt><dd>${esc(closeout.actualCost || "—")}</dd></div>
        <div><dt>Completed</dt><dd>${event.completedAt ? new Date(event.completedAt).toLocaleString() : "—"} · ${esc(event.completedBy || "")}</dd></div>
      </dl>
      <p>${esc((event.menu || []).map(item => item.name).join(", ") || "No menu recorded")}</p>
      <button class="secondary-button" type="button" data-open-archive="${esc(event.id)}">Open archived record</button>
    </article>`;
  }).join("") : '<div class="empty-state"><strong>No archived events in this school year.</strong><p>Completing an event moves it here for year-over-year planning.</p></div>';
  qa("[data-open-archive]").forEach(button => button.addEventListener("click", () => {
    currentId = button.dataset.openArchive;
    renderAll();
    showPanel("closeout");
    toast("Opened archived event in view-only mode.");
  }));
}

function applyPermissions() {
  const editable = canEdit() && !isWorkingArchived();
  ["brief", "menu", "production"].forEach(panel => {
    qa(`[data-panel-view="${panel}"] input, [data-panel-view="${panel}"] select, [data-panel-view="${panel}"] textarea, [data-panel-view="${panel}"] button`).forEach(control => { control.disabled = !editable; });
  });
  q("#saveDraft").disabled = !editable;
  qa("#teamSetupList input, #teamSetupList textarea, #teamSetupList button, #teamForm input, #teamForm select, #teamForm textarea, #teamForm button").forEach(control => { control.disabled = session?.user?.role !== "admin"; });
  ["actualGuests", "actualRevenue", "estimatedProgramValue", "actualCost", "feedbackReceived", "customerFeedback", "operationalNotes", "closeoutException", "closeoutExceptionReason", "saveCloseout"].forEach(id => { const element = q(`#${id}`); if (element) element.disabled = !editable; });
  const completeEvent = q("#completeEvent");
  if (completeEvent) completeEvent.disabled = !editable || closeoutReadiness(current() || { menu: [], tasks: [], closeout: {} }).blockers.length > 0;
  if (q("#newEvent")) q("#newEvent").disabled = false;
}

function renderAll() {
  (state.events || []).forEach(event => { if (event.stage === "Completed") event.archived = true; });
  renderSelect(); renderSummary(); renderRequests(); fillBrief(); renderRecipeLibrary(); renderMenu(); renderIngredients(); renderRecipeSubmissions(); renderProduction(); renderAssignments(); renderAttention(); renderPublish(); renderLiveFilters(); renderLive(); renderCloseout(); renderArchive(); renderTeamSetup(); applyPermissions();
}

function showPanel(name) {
  activePanel = name;
  qa('[data-panel-view]').forEach(panel => panel.classList.toggle("active", panel.dataset.panelView === name));
  qa('[data-panel]').forEach(button => button.classList.toggle("active", button.dataset.panel === name));
  if (name === "publish") renderPublish();
  if (name === "requests") renderRequests();
  if (name === "menu") renderIngredients();
  if (name === "live") renderLive();
  if (name === "closeout") renderCloseout();
  if (name === "archive") renderArchive();
  if (name === "access") renderUsers();
  renderAttention();
  window.scrollTo({ top: 260, behavior: "smooth" });
}

qa('[data-panel]').forEach(button => button.addEventListener("click", () => showPanel(button.dataset.panel)));
qa('[data-next]').forEach(button => button.addEventListener("click", () => {
  if (button.dataset.next === "production" && !current().tasks.length) generateTasks();
  showPanel(button.dataset.next);
}));
qa('[data-save]').forEach(button => button.addEventListener("click", () => {
  if (!canEdit()) return;
  if (button.dataset.save === "brief") collectBrief();
  if (button.dataset.save === "production") current().stage = "Approved plan";
  save(); renderAll(); toast(`${button.dataset.save[0].toUpperCase() + button.dataset.save.slice(1)} saved.`);
}));

q("#eventSelect").addEventListener("change", event => { currentId = event.target.value; renderAll(); });
q("#requestFilter").addEventListener("change", event => { requestFilter = event.target.value; renderRequests(); });
q("#recipeLibrarySearch").addEventListener("input", event => { recipeSearch = event.target.value; renderRecipeLibrary(); });
q("#recipeLibrarySelect").addEventListener("change", renderRecipeLibrary);
q("#addRecipeToMenu").addEventListener("click", () => {
  if (!canEdit()) return;
  const recipe = recipeLibrary.find(item => item.id === q("#recipeLibrarySelect").value);
  const required = Number(q("#recipeRequiredQuantity").value || 0);
  if (!recipe || required < 1) return toast("Choose a recipe and enter the event quantity required.");
  current().menu.push(recipeSnapshot(recipe, required)); ingredientMenuIndex = current().menu.length - 1;
  save(); renderAll(); toast(`${recipe.name} added from the shared recipe library.`);
});
q("#addMenuItem").addEventListener("click", () => { if (canEdit()) { current().menu.push({ name: "New recipe draft", required: 1, yield: 0, portion: "", status: "Researching", ingredients: [], equipment: [], procedure: [], allergens: "", needsStandardization: true }); ingredientMenuIndex = current().menu.length - 1; save(); renderAll(); } });
q("#ingredientMenuItem").addEventListener("change", event => { ingredientMenuIndex = Number(event.target.value); renderIngredients(); });
q("#addIngredient").addEventListener("click", () => {
  if (!canEdit() || !current().menu[ingredientMenuIndex]) return;
  current().menu[ingredientMenuIndex].ingredients ||= [];
  current().menu[ingredientMenuIndex].ingredients.push({ name: "New ingredient", quantity: 0, unit: "lb", packSize: 0, packPrice: 0 });
  save(); renderIngredients();
});
q("#regenerateTasks").addEventListener("click", generateTasks);
q("#packetView").addEventListener("change", packetPreview);
q("#saveDraft").addEventListener("click", () => {
  if (!canEdit()) return;
  collectBrief();
  const event = current();
  if (event.publishedAt) {
    event.stage = "Revised draft";
  } else {
    event.stage = "Draft";
  }
  save();
  renderAll();
  toast(event.publishedAt ? "Draft edits saved. Students still see the last published revision until you publish again." : "Event Order saved as a private draft.");
});
q("#publishOrder").addEventListener("click", () => {
  if (!isOwner()) return;
  collectBrief();
  const event = current();
  event.version = (event.version || 0) + 1; event.publishedAt = new Date().toISOString(); event.publishedBy = activeTeacher(); event.stage = "Published"; event.publishedSignature = publicationSignature(event); event.unpublishedChanges = false; event.unpublishedChangeNote = "";
  save(); renderAll(); toast(`Event Order v${event.version} published to student views.`);
});
q("#newEvent").addEventListener("click", () => {
  const id = `evt-${Date.now()}`;
  state.events.push({ id, name: "New client event", type: "Catering", school: "Arcadia", customer: "", owner: activeTeacher(), collaborators: [], serviceDate: "", serviceTime: "", guestCount: 1, serviceFormat: "Customer pickup", budget: "", requirements: "", allergens: "", stage: "Draft", version: 0, publishedAt: null, menu: [], tasks: [], assignments: {}, closeout: clone(seed.events[0].closeout) });
  currentId = id; save(); renderAll(); showPanel("brief"); toast("New private event draft created.");
});
q("#liveSectionFilter").addEventListener("change", event => { liveSection = event.target.value; renderLive(); });
q("#liveDateFilter")?.addEventListener("change", event => { liveDate = event.target.value; renderLive(); renderAttention(); });
q("#liveStatusFilter").addEventListener("change", event => { liveStatus = event.target.value; renderLive(); });
q("#saveCloseout").addEventListener("click", () => { if (collectCloseout()) { current().stage = "Closeout required"; save(); renderAll(); showPanel("closeout"); toast("Event closeout saved as a draft."); } });
q("#completeEvent").addEventListener("click", () => {
  if (!collectCloseout()) return;
  const readiness = closeoutReadiness(current());
  if (readiness.blockers.length) { renderCloseout(); return toast("Closeout is blocked until required records are reconciled or an authorized exception is documented."); }
  const event = current();
  event.stage = "Completed";
  event.archived = true;
  event.completedAt = new Date().toISOString();
  event.completedBy = activeTeacher();
  event.unpublishedChanges = false;
  event.unpublishedChangeNote = "";
  if (event.publishedAt) event.publishedSignature = publicationSignature(event);
  const archivedId = event.id;
  currentId = activeEvents().find(item => item.id !== archivedId)?.id || "";
  save(); renderAll(); showPanel("archive"); toast("Event completed and moved to Event archive. Download the spreadsheet anytime from Archive.");
});
q("#refreshData").addEventListener("click", () => {
  initialize(true);
});
q("#archiveYearFilter")?.addEventListener("change", () => renderArchive());
q("#downloadArchiveCsv")?.addEventListener("click", () => downloadArchiveSpreadsheet());

function updateAccountScopeControls() {
  const role = q("#accountRoleSelect")?.value || "";
  const sectionField = q("#userSection")?.closest("label");
  if (!sectionField) return;
  sectionField.hidden = role !== "student";
  q("#userSection").disabled = role !== "student";
  if (role !== "student") q("#userSection").value = "";
}

async function renderUsers() {
  renderTeamSetup();
  const rows = q("#userRows");
  if (session?.user?.role !== "admin") { rows.innerHTML = '<tr><td colspan="5">Only an administrator can manage accounts.</td></tr>'; return; }
  const response = await fetch("/api/users");
  const result = await response.json().catch(() => ({}));
  if (!response.ok) { rows.innerHTML = `<tr><td colspan="5">${esc(result.error || "Accounts could not be loaded.")}</td></tr>`; return; }
  rows.innerHTML = result.users.map(user => `<tr><td><strong>${esc(user.display_name)}</strong></td><td>${esc(user.email)}</td><td>${esc(user.role)}</td><td>${esc(user.school || "—")}</td><td>${esc(user.section_id ? sectionName(user.section_id) : "—")}</td></tr>`).join("");
}

function renderTeamSetup() {
  state.sections = sections = reconcileActiveTeamLabels(state.sections || sections);
  const list = q("#teamSetupList");
  if (!list) return;
  const scheduleSummary = section => section.requiresRotationConfirmation
    ? `Allowed periods ${section.allowedPeriods?.join("/") || "pending"} - Day 1-Day 4 mapping requires district confirmation`
    : `Period ${section.period || section.allowedPeriods?.[0] || "pending"}`;
  const renderSectionCard = section => `<article class="team-period section-card ${section.active === false ? "inactive-section" : ""}" data-section-card="${esc(section.id)}"><header><div><h4>${esc(sectionDisplayLabel(section))}</h4><small>${esc(section.course)} - ${esc(section.teacher)} - ${esc(section.site)} - ${esc(section.active === false ? "Inactive legacy" : "Active")}</small></div><span class="stable-id">ID: ${esc(section.id)}</span></header>
    <div class="section-admin-grid"><label>Official section number<input data-section-field="officialSectionNumber" data-team-section="${esc(section.id)}" value="${esc(section.officialSectionNumber || "")}" placeholder="Pending"></label><label>Active state<select data-section-field="active" data-team-section="${esc(section.id)}"><option value="true" ${section.active !== false ? "selected" : ""}>Active</option><option value="false" ${section.active === false ? "selected" : ""}>Inactive</option></select></label><div class="assignment-meta"><span>Schedule model</span><strong>${esc(scheduleSummary(section))}</strong>${section.retiredIntoSectionId ? `<small>Retained for history; active successor: ${esc(section.retiredIntoSectionId)}</small>` : ""}</div></div>
    ${section.officialSectionNumber ? "" : `<div class="provisional-warning"><strong>Official district section number pending.</strong><p>This provisional label may be used for planning; adding the official number later will not change the durable section ID or connected records.</p></div>`}
    <div class="team-list">${section.teams.length ? section.teams.map(team => `<div class="team-row" data-team-section="${esc(section.id)}" data-team-id="${esc(team.id)}"><div><label>Team name<input data-team-field="name" value="${esc(team.name)}"></label><label>Student roster<textarea data-team-field="students" rows="2" placeholder="One name per line">${esc(team.students.join("\n"))}</textarea></label><small class="save-meta">${esc(team.updatedAt ? `Saved ${new Date(team.updatedAt).toLocaleString()} by ${team.updatedBy || "administrator"}` : "Roster not yet updated in this session.")}</small></div><button class="ghost-danger" data-remove-team type="button">Remove team</button></div>`).join("") : '<p class="team-empty">No teams configured. Create persistent teams here so Step 4 can select them for each event.</p>'}</div>
    ${sectionTeamCapacity(section).atLimit ? `<p class="roster-warning">This section already has ${MAX_TEAMS_PER_SECTION} teams. Remove or deactivate a team before adding another.</p>` : ""}
    <form class="team-inline-form" data-add-team-section="${esc(section.id)}"><label>Team name<input name="teamName" placeholder="Team B" required ${sectionTeamCapacity(section).atLimit ? "disabled" : ""}></label><label>Student roster<textarea name="students" rows="2" placeholder="One name per line" ${sectionTeamCapacity(section).atLimit ? "disabled" : ""}></textarea></label><button class="primary-button" type="submit" ${sectionTeamCapacity(section).atLimit ? "disabled" : ""}>Add team</button></form>
    <p class="section-note">Teams are persistent roster data for this section. Kitchen 1-4 assignments are made per event in Step 4 and are not stored here.</p>
  </article>`;
  const courseOrder = ["Advanced Culinary Arts", "Culinary Arts & Nutrition I", "Kitchen & Restaurant Management"];
  const activeSections = sections.filter(section => section.active !== false);
  const inactiveSections = sections.filter(section => section.active === false);
  list.innerHTML = courseOrder.map(course => {
    const courseSections = activeSections.filter(section => section.course === course);
    return `<section class="course-section-group"><header><h4>${esc(course)}</h4><strong>${courseSections.length} active section${courseSections.length === 1 ? "" : "s"}</strong></header>${courseSections.map(renderSectionCard).join("")}</section>`;
  }).join("") + (inactiveSections.length ? `<section class="course-section-group inactive-history"><header><h4>Inactive legacy records</h4><strong>${inactiveSections.length} retained</strong></header>${inactiveSections.map(renderSectionCard).join("")}</section>` : "");
  const sectionOptions = sections.filter(isAdvancedSection).map(section => `<option value="${esc(section.id)}">${esc(sectionDisplayLabel(section))}</option>`).join("");
  if (q("#teamSection")) q("#teamSection").innerHTML = sectionOptions;
  q("#userSection").innerHTML = `<option value="">Not assigned</option>${sectionOptions}`;
  qa("[data-section-field]").forEach(field => field.addEventListener("change", () => {
    const section = sections.find(item => item.id === field.dataset.teamSection);
    if (!section) return;
    if (field.dataset.sectionField === "active") {
      if (field.value === "false" && section.teams?.length && !confirm("Deactivate this section? Connected teams, rosters, assignments, publications, and production history will be preserved.")) { field.value = "true"; return; }
      section.active = field.value !== "false";
    } else section[field.dataset.sectionField] = field.value.trim();
    state.sections = sections;
    save(); renderAll();
  }));
  qa("[data-team-section]").forEach(row => {
    row.querySelectorAll("[data-team-field]").forEach(field => field.addEventListener("change", () => {
      const section = sections.find(item => item.id === row.dataset.teamSection);
      const team = section?.teams.find(item => item.id === row.dataset.teamId);
      if (!team) return;
      if (field.dataset.teamField === "name") team.name = field.value.trim() || team.name;
      if (field.dataset.teamField === "students") team.students = field.value.split(/[\n,]+/).map(value => value.trim()).filter(Boolean);
      team.updatedAt = new Date().toISOString(); team.updatedBy = activeTeacher();
      save(); renderAll();
    }));
    row.querySelector("[data-remove-team]")?.addEventListener("click", () => {
      const section = sections.find(item => item.id === row.dataset.teamSection);
      if (!section) return;
      const team = section.teams.find(item => item.id === row.dataset.teamId);
      const connected = current().tasks.some(task => normalizeTaskAssignments(task, sections).some(record => record.teamIds.includes(row.dataset.teamId)));
      if (connected && !confirm("Remove or deactivate this team? Connected assignment and production records will be preserved for review.")) return;
      section.teams = section.teams.filter(item => item.id !== row.dataset.teamId);
      section.teamAudit ||= [];
      section.teamAudit.push({ action: "removed", teamId: row.dataset.teamId, teamName: team?.name || "Team", at: new Date().toISOString(), by: activeTeacher() });
      save(); renderAll(); toast("Team removed; connected records remain for review.");
    });
  });
  qa("[data-add-team-section]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const section = sections.find(item => item.id === form.dataset.addTeamSection);
    const data = new FormData(form);
    const name = String(data.get("teamName") || "").trim();
    if (!section || !name) return;
    if (sectionTeamCapacity(section).atLimit) return toast(`A section can have at most ${MAX_TEAMS_PER_SECTION} teams.`);
    section.teams.push({ id: `${section.id}-team-${Date.now()}`, name, students: String(data.get("students") || "").split(/[\n,]+/).map(value => value.trim()).filter(Boolean), updatedAt: new Date().toISOString(), updatedBy: activeTeacher(), active: true });
    state.sections = sections;
    save(); renderAll(); toast(`${name} added to ${sectionDisplayLabel(section)}.`);
  }));
  updateAccountScopeControls();
}
q("#teamForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const section = sections.find(item => item.id === form.get("sectionId"));
  const name = String(form.get("teamName") || "").trim();
  if (!section || !name) return;
  if (sectionTeamCapacity(section).atLimit) return toast(`A section can have at most ${MAX_TEAMS_PER_SECTION} teams.`);
  const id = `${section.id}-team-${Date.now()}`;
  section.teams.push({ id, name, students: String(form.get("students") || "").split(/[\n,]+/).map(value => value.trim()).filter(Boolean), active: true });
  state.sections = sections;
  event.currentTarget.reset(); save(); renderAll(); toast(`${name} added to ${section.name}.`);
});

q("#accountRoleSelect")?.addEventListener("change", updateAccountScopeControls);

q("#userForm").addEventListener("submit", async event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const payload = Object.fromEntries(form);
  if (!payload.role) return toast("Choose an explicit account role.");
  if (payload.role !== "student") payload.sectionId = "";
  if (payload.role === "student" && !payload.sectionId) return toast("Assign the student to a stable section.");
  if (["teacher", "admin"].includes(payload.role) && !confirm(`Create or update this ${payload.role} account with ${payload.role === "admin" ? "districtwide administrative" : "teacher"} scope?`)) return;
  const response = await fetch("/api/users", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) return toast(result.error || "Account could not be saved.");
  event.currentTarget.reset(); updateAccountScopeControls(); await renderUsers(); toast("Authorized account assignment saved.");
});

async function initialize(force = false) {
  setSync(force ? "Reloading…" : "Connecting…", "pending");
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Teacher data could not be loaded.");
    session = { user: result.user }; revision = result.revision; recipeLibrary = result.recipes || []; supplierCatalog = result.supplierCatalog || [];
    const hasEvent = Array.isArray(result.state?.events) && result.state.events.length;
    state = hasEvent ? result.state : clone(seed);
    delete state.activeTeacher;
    state.requests ||= [];
    state.recipeSubmissions ||= [];
    state.approvedRecipes ||= [];
    state.sections = sections = reconcileActiveTeamLabels(state.sections || DEFAULT_SECTIONS);
    state.events.forEach(event => event.menu?.forEach(hydrateEventOrderItem));
    state.events.forEach(event => event.tasks?.forEach(task => ensureTaskAssignment(task, event)));
    let archiveMigrated = false;
    state.events.forEach(event => {
      if (event.stage === "Completed" && !event.archived) {
        event.archived = true;
        archiveMigrated = true;
      }
    });
    currentId = activeEvents()[0]?.id || state.events[0]?.id || "";
    if (current() && !current().tasks.length && !isArchivedEvent(current())) generateTasks();
    if (!hasEvent || archiveMigrated) await save();
    renderAll(); setSync("Shared · current", "saved");
  } catch (error) {
    document.querySelector("main").innerHTML = `<section class="command-hero"><div><p class="eyebrow">Secure connection required</p><h1>Teacher Command Center unavailable</h1><p>${esc(error.message)}</p></div></section>`;
    setSync("Not connected", "error");
  }
}

initialize();

async function refreshLiveProduction() {
  if (!q('[data-panel-view="live"]')?.classList.contains("active") || q("#syncStatus")?.dataset.kind === "pending") return;
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    const result = await response.json();
    if (!response.ok || result.revision === revision) return;
    const selected = currentId;
    state = result.state; revision = result.revision; recipeLibrary = result.recipes || recipeLibrary; supplierCatalog = result.supplierCatalog || supplierCatalog;
    state.events.forEach(event => event.menu?.forEach(hydrateEventOrderItem));
    currentId = activeEvents().some(event => event.id === selected) ? selected : (activeEvents()[0]?.id || state.events[0]?.id || "");
    renderSummary(); renderLive(); renderAttention(); renderCloseout(); renderArchive();
    setSync("Shared · updated", "saved");
  } catch { setSync("Live refresh delayed", "error"); }
}

setInterval(refreshLiveProduction, 10000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshLiveProduction(); });

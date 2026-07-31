const storageKey = "gcsdAdvancedTeacherPrototypeV2";
const statuses = ["Not started", "In progress", "Blocked", "Ready for handoff", "Complete"];
const sections = [
  { id: "adv-p2", name: "Advanced Culinary · Period 2", focus: "Pasta and pastry production" },
  { id: "adv-p5", name: "Advanced Culinary · Period 5", focus: "Sauce, salad, assembly, and packing" },
  { id: "km", name: "Kitchen Management", focus: "Schedule, costing, controls, and objective event briefing" }
];
const seed = {
  activeTeacher: "Kevin McCann",
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

const q = selector => document.querySelector(selector);
const qa = selector => [...document.querySelectorAll(selector)];
const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const clone = value => JSON.parse(JSON.stringify(value));

function load() {
  try {
    const loaded = JSON.parse(localStorage.getItem(storageKey)) || clone(seed);
    loaded.requests ||= clone(seed.requests);
    loaded.events?.forEach(event => event.menu?.forEach(item => item.ingredients ||= []));
    return loaded;
  }
  catch { return clone(seed); }
}

let state = load();
let currentId = state.events[0].id;
let liveSection = "all";
let liveStatus = "all";
let requestFilter = "open";
let ingredientMenuIndex = 0;

function current() { return state.events.find(event => event.id === currentId); }
function save() { localStorage.setItem(storageKey, JSON.stringify(state)); }
function activeTeacher() { return state.activeTeacher || "Kevin McCann"; }
function isOwner(event = current()) { return event.owner === activeTeacher(); }
function canEdit(event = current()) { return isOwner(event) || (event.collaborators || []).includes(activeTeacher()); }
function batches(item) { return item.yield > 0 ? Math.ceil(item.required / item.yield) : 0; }
function dateLabel(value) { return value ? new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Not scheduled"; }
function sectionName(id) { return sections.find(section => section.id === id)?.name || "Unassigned"; }
function taskProgress(task) {
  task.progress ||= { status: "Not started", quantity: 0, usableYield: 0, waste: 0, storage: "", issue: "", updatedAt: null };
  return task.progress;
}
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
  q("#eventSelect").innerHTML = state.events.map(event => `<option value="${esc(event.id)}">${esc(event.name)}</option>`).join("");
  q("#eventSelect").value = currentId;
  q("#activeTeacher").value = activeTeacher();
}

function renderSummary() {
  const event = current();
  const ready = readiness(event);
  q("#summaryName").textContent = event.name;
  q("#summaryOwner").textContent = `${event.owner}${isOwner(event) ? " · you" : ""}`;
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

function renderMenu() {
  const event = current();
  event.menu.forEach(item => item.ingredients ||= []);
  q("#menuRows").innerHTML = event.menu.map((item, index) => `<tr data-menu-row="${index}">
    <td><input data-field="name" value="${esc(item.name)}"></td>
    <td><input data-field="required" type="number" min="1" value="${item.required || ""}"></td>
    <td><input data-field="yield" type="number" min="1" value="${item.yield || ""}"></td>
    <td><strong>${batches(item)}</strong></td>
    <td><input data-field="portion" value="${esc(item.portion)}"></td>
    <td><select data-field="status">${["Researching", "Testing", "Review", "Approved"].map(value => `<option ${item.status === value ? "selected" : ""}>${value}</option>`).join("")}</select></td>
    <td><button class="icon-button" data-remove-menu="${index}" aria-label="Remove ${esc(item.name)}" type="button">×</button></td>
  </tr>`).join("");
  qa('[data-menu-row]').forEach(row => row.addEventListener("input", () => {
    if (!canEdit()) return;
    const item = event.menu[Number(row.dataset.menuRow)];
    row.querySelectorAll("[data-field]").forEach(field => { item[field.dataset.field] = ["required", "yield"].includes(field.dataset.field) ? Number(field.value) : field.value; });
    row.children[3].querySelector("strong").textContent = batches(item);
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
    q("#ingredientRows").innerHTML = "<tr><td colspan=\"8\">No recipe selected.</td></tr>";
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
  q("#ingredientRows").innerHTML = item.ingredients.length ? item.ingredients.map((ingredient, index) => {
    const scaled = scaledIngredient(ingredient, item);
    return `<tr data-ingredient="${index}"><td><input data-ingredient-field="name" value="${esc(ingredient.name)}"></td><td><input data-ingredient-field="quantity" type="number" min="0" step="0.01" value="${Number(ingredient.quantity || 0)}"></td><td><input data-ingredient-field="unit" value="${esc(ingredient.unit)}" placeholder="lb, oz, each"></td><td><input data-ingredient-field="packSize" type="number" min="0" step="0.01" value="${Number(ingredient.packSize || 0)}"></td><td><input data-ingredient-field="packPrice" type="number" min="0" step="0.01" value="${Number(ingredient.packPrice || 0)}"></td><td><strong>${scaled.need.toFixed(2)} ${esc(ingredient.unit)}</strong></td><td><strong>${scaled.packs} pack${scaled.packs === 1 ? "" : "s"}</strong></td><td><button class="icon-button" data-remove-ingredient="${index}" aria-label="Remove ${esc(ingredient.name)}" type="button">×</button></td></tr>`;
  }).join("") : "<tr><td colspan=\"8\">No ingredients entered for this approved recipe.</td></tr>";
  qa("[data-ingredient]").forEach(row => row.addEventListener("change", () => {
    if (!canEdit()) return;
    const ingredient = item.ingredients[Number(row.dataset.ingredient)];
    row.querySelectorAll("[data-ingredient-field]").forEach(field => { ingredient[field.dataset.ingredientField] = ["quantity", "packSize", "packPrice"].includes(field.dataset.ingredientField) ? Number(field.value) : field.value; });
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
    const key = `${String(ingredient.name).trim().toLowerCase()}|${String(ingredient.unit).trim().toLowerCase()}`;
    if (!ingredient.name || !key) return;
    const scaled = scaledIngredient(ingredient, item);
    const entry = consolidated.get(key) || { name: ingredient.name, unit: ingredient.unit, need: 0, packSize: ingredient.packSize, packPrice: ingredient.packPrice, recipes: [] };
    entry.need += scaled.need;
    if (!entry.packSize && ingredient.packSize) entry.packSize = ingredient.packSize;
    if (!entry.packPrice && ingredient.packPrice) entry.packPrice = ingredient.packPrice;
    entry.recipes.push(item.name); consolidated.set(key, entry);
  }));
  const rows = [...consolidated.values()].map(entry => {
    const packs = Number(entry.packSize || 0) > 0 ? Math.ceil(entry.need / Number(entry.packSize)) : 0;
    const cost = packs * Number(entry.packPrice || 0);
    return { ...entry, packs, cost };
  }).sort((a, b) => a.name.localeCompare(b.name));
  q("#estimatedPurchaseCost").textContent = `${rows.reduce((sum, row) => sum + row.cost, 0).toLocaleString(undefined, { style: "currency", currency: "USD" })} estimated`;
  q("#purchasingRows").innerHTML = rows.length ? rows.map(row => `<tr><td><strong>${esc(row.name)}</strong></td><td>${row.need.toFixed(2)} ${esc(row.unit)}</td><td>${row.packs}${row.packSize ? ` × ${Number(row.packSize)} ${esc(row.unit)}` : " · pack size needed"}</td><td>${row.cost.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td><td>${esc([...new Set(row.recipes)].join(", "))}</td></tr>`).join("") : "<tr><td colspan=\"5\">Purchasing will appear after recipe ingredients are entered.</td></tr>";
}

function generateTasks() {
  if (!canEdit()) return toast("This event is view-only for the selected teacher.");
  const event = current();
  const old = Object.fromEntries((event.tasks || []).map(task => [task.name, task]));
  event.tasks = event.menu.flatMap((item, menuIndex) => [
    { type: "production", suffix: "production", detail: `Produce ${item.required} portions (${batches(item)} batch${batches(item) === 1 ? "" : "es"})`, day: menuIndex % 2 ? "Day 2" : "Day 1" },
    { type: "handoff", suffix: "quality and handoff", detail: `Verify usable yield, label, store, and hand off ${item.name}`, day: "Final production" }
  ].map((template, taskIndex) => {
    const name = `${item.name} — ${template.suffix}`;
    const prior = old[name] || {};
    return {
      id: prior.id || `task-${Date.now()}-${menuIndex}-${taskIndex}`, menuIndex, type: template.type, name, detail: template.detail,
      day: prior.day || template.day, deadline: prior.deadline || event.serviceTime || "15:00", section: prior.section || sections[menuIndex % 2].id,
      station: prior.station || (template.type === "production" ? `${item.name} station` : "Expo / handoff"), team: prior.team || "Team A",
      students: prior.students || "", dependency: prior.dependency || "", progress: prior.progress || { status: "Not started", quantity: 0, usableYield: 0, waste: 0, storage: "", issue: "", updatedAt: null }
    };
  }));
  save();
  renderAll();
  toast("Production plan regenerated from the current menu.");
}

function renderProduction() {
  const event = current();
  const totalBatches = event.menu.reduce((sum, item) => sum + batches(item), 0);
  q("#productionSummary").innerHTML = `<div class="metric"><span>Menu outputs</span><strong>${event.menu.length}</strong></div><div class="metric"><span>Production batches</span><strong>${totalBatches}</strong></div><div class="metric"><span>Generated tasks</span><strong>${event.tasks.length}</strong></div>`;
  q("#taskList").innerHTML = event.tasks.length ? event.tasks.map((task, index) => `<article class="task-card" data-task="${index}">
    <span class="task-number">${index + 1}</span><div><strong>${esc(task.name)}</strong><span>${esc(task.detail)}</span></div>
    <label>Production point<input data-task-field="day" value="${esc(task.day)}"></label>
    <label>Deadline<input data-task-field="deadline" type="time" value="${esc(task.deadline)}"></label>
    <label>Assigned section<select data-task-field="section">${sections.map(section => `<option value="${section.id}" ${task.section === section.id ? "selected" : ""}>${esc(section.name)}</option>`).join("")}</select></label>
  </article>`).join("") : "<p>No tasks yet. Generate the production plan from the approved menu.</p>";
  qa('[data-task]').forEach(card => card.addEventListener("input", () => {
    if (!canEdit()) return;
    const task = event.tasks[Number(card.dataset.task)];
    card.querySelectorAll("[data-task-field]").forEach(field => { task[field.dataset.taskField] = field.value; });
  }));
}

function renderAssignments() {
  const event = current();
  q("#assignmentBoard").innerHTML = sections.map(section => {
    const assigned = event.tasks.filter(task => task.section === section.id);
    return `<article class="assignment-column"><h3>${esc(section.name)}</h3><p>${esc(section.focus)}</p>${assigned.length ? assigned.map(task => {
      const index = event.tasks.indexOf(task);
      return `<div class="assignment-task" data-assignment="${index}"><strong>${esc(task.name)}</strong><span>${esc(task.detail)}</span>
        <label>Station<input data-assignment-field="station" value="${esc(task.station)}"></label>
        <label>Team<input data-assignment-field="team" value="${esc(task.team)}"></label>
        <label>Students<input data-assignment-field="students" value="${esc(task.students)}" placeholder="Names or roster group"></label>
        <label>Dependency / handoff<input data-assignment-field="dependency" value="${esc(task.dependency)}" placeholder="What must arrive first or where this goes next"></label>
      </div>`;
    }).join("") : "<p>No tasks assigned.</p>"}</article>`;
  }).join("");
  qa('[data-assignment]').forEach(card => card.addEventListener("input", () => {
    if (!canEdit()) return;
    const task = event.tasks[Number(card.dataset.assignment)];
    card.querySelectorAll("[data-assignment-field]").forEach(field => { task[field.dataset.assignmentField] = field.value; });
  }));
  event.assignments = Object.fromEntries(sections.map(section => [section.id, event.tasks.filter(task => task.section === section.id).map(task => task.id)]));
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
  if (!items.length) items.push(["Ready for review", "All required planning areas are present."]);
  q("#attentionList").innerHTML = items.map(([title, detail]) => `<div class="attention-item"><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("");
  q(".rail-note").innerHTML = `<strong>${isOwner(event) ? "You control publication" : canEdit(event) ? "You are a collaborator" : "Teacher viewer access"}</strong><p>${isOwner(event) ? "Publish revisions after reviewing every affected output and team." : canEdit(event) ? `You may edit planning and production. ${event.owner} publishes the controlling order.` : "You can see the complete event and student activity without changing the controlling order."}</p>`;
}

function masterPreview() {
  const event = current();
  const ready = readiness(event);
  q("#masterOrderPreview").innerHTML = `<div class="preview-block"><span>Customer commitment</span><strong>${esc(event.customer || "Not entered")} · ${event.guestCount || 0} guests</strong><small>${dateLabel(event.serviceDate)} at ${esc(event.serviceTime || "time pending")} · ${esc(event.serviceFormat)}</small></div>
    <div class="preview-block"><span>Menu and output</span><strong>${event.menu.length} items · ${event.menu.reduce((sum, item) => sum + item.required, 0)} total portions</strong><small>${event.menu.filter(item => item.status === "Approved").length} approved recipes</small></div>
    <div class="preview-block"><span>Production system</span><strong>${event.tasks.length} tasks across ${new Set(event.tasks.map(task => task.section)).size} sections</strong><small>Readiness ${ready.percent}%</small></div>
    <div class="preview-block"><span>Version</span><strong>${event.version ? `Published v${event.version}` : "Unpublished draft"}</strong><small>${event.publishedAt ? new Date(event.publishedAt).toLocaleString() : "No student instructions have been published."}</small></div>`;
}

function packetPreview() {
  const event = current();
  const sectionId = q("#packetView").value || sections[0].id;
  const section = sections.find(item => item.id === sectionId);
  const tasks = event.tasks.filter(task => task.section === sectionId);
  q("#studentPacketPreview").innerHTML = `<div class="preview-block"><span>Shared purpose</span><strong>${esc(event.name)}</strong><small>${esc(event.customer)} · ${event.guestCount} guests · ${dateLabel(event.serviceDate)}</small></div>
    <div class="preview-block"><span>Your section</span><strong>${esc(section.name)}</strong><small>${esc(section.focus)}</small></div>
    ${tasks.map(task => `<div class="packet-task"><strong>${esc(task.name)}</strong><div>${esc(task.detail)}</div><small>${esc(task.station)} · ${esc(task.team)} · ${esc(task.day)} · complete by ${esc(task.deadline)}</small>${task.dependency ? `<small>Handoff: ${esc(task.dependency)}</small>` : ""}</div>`).join("") || "<p>No work assigned to this section.</p>"}`;
}

function renderPublish() {
  const event = current();
  const previous = q("#packetView").value;
  q("#packetView").innerHTML = sections.map(section => `<option value="${section.id}">${esc(section.name)}</option>`).join("");
  if (previous) q("#packetView").value = previous;
  masterPreview();
  packetPreview();
  const issues = [];
  if (event.menu.some(item => item.status !== "Approved")) issues.push("Every recipe must be approved before publication.");
  if (!event.tasks.length) issues.push("Generate and review the production plan.");
  if (!isOwner(event)) issues.push(`${event.owner} is the event owner and must publish the controlling order.`);
  q("#publishWarning").innerHTML = issues.length ? `<strong>Publication controls:</strong> ${esc(issues.join(" "))}` : "<strong>Ready:</strong> the Event Order has the required menu, production, and assignment information.";
  q("#publishOrder").disabled = issues.length > 0;
}

function renderLiveFilters() {
  const select = q("#liveSectionFilter");
  select.innerHTML = `<option value="all">All sections</option>${sections.map(section => `<option value="${section.id}">${esc(section.name)}</option>`).join("")}`;
  select.value = liveSection;
  q("#liveStatusFilter").value = liveStatus;
}

function renderLive() {
  const event = current();
  event.tasks.forEach(taskProgress);
  const completed = event.tasks.filter(task => task.progress.status === "Complete").length;
  const blocked = event.tasks.filter(task => task.progress.status === "Blocked").length;
  const usable = event.tasks.filter(task => task.type === "production").reduce((sum, task) => sum + Number(task.progress.usableYield || 0), 0);
  q("#liveSummary").innerHTML = `<div class="metric"><span>Tasks complete</span><strong>${completed}/${event.tasks.length}</strong></div><div class="metric"><span>Blocked / needs help</span><strong>${blocked}</strong></div><div class="metric"><span>Usable output reported</span><strong>${usable}</strong></div>`;
  const visible = event.tasks.filter(task => (liveSection === "all" || task.section === liveSection) && (liveStatus === "all" || task.progress.status === liveStatus));
  q("#liveBoard").innerHTML = visible.length ? visible.map(task => {
    const index = event.tasks.indexOf(task);
    const progress = task.progress;
    return `<article class="live-task" data-live-task="${index}" data-status="${esc(progress.status)}">
      <div class="live-task-title"><strong>${esc(task.name)}</strong><span>${esc(sectionName(task.section))} · ${esc(task.station)} · ${esc(task.team)}</span><span>${esc(task.students || "Students not assigned")}</span></div>
      <label>Status<select data-progress="status">${statuses.map(status => `<option ${progress.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
      <label>Quantity made<input data-progress="quantity" type="number" min="0" value="${Number(progress.quantity || 0)}"></label>
      <label>Usable yield<input data-progress="usableYield" type="number" min="0" value="${Number(progress.usableYield || 0)}"></label>
      <label>Waste<input data-progress="waste" type="number" min="0" value="${Number(progress.waste || 0)}"></label>
      <label>Storage / handoff<input data-progress="storage" value="${esc(progress.storage)}" placeholder="Rack, cooler, station"></label>
      <label class="issue-note">Problem or assistance needed<input data-progress="issue" value="${esc(progress.issue)}" placeholder="Leave blank when work is proceeding as planned"></label>
    </article>`;
  }).join("") : "<p>No tasks match the selected filters.</p>";
  qa('[data-live-task]').forEach(card => card.addEventListener("change", () => {
    if (!canEdit()) return toast("This event is view-only for the selected teacher.");
    const progress = taskProgress(event.tasks[Number(card.dataset.liveTask)]);
    card.querySelectorAll("[data-progress]").forEach(field => { progress[field.dataset.progress] = ["quantity", "usableYield", "waste"].includes(field.dataset.progress) ? Number(field.value) : field.value; });
    progress.updatedAt = new Date().toISOString();
    if (["In progress", "Blocked", "Ready for handoff"].includes(progress.status)) event.stage = "In production";
    save();
    renderLive(); renderAttention(); renderCloseout(); renderSummary();
  }));
}

function renderCloseout() {
  const event = current();
  event.closeout ||= clone(seed.events[0].closeout);
  const fields = ["actualGuests", "actualRevenue", "actualCost", "feedbackReceived", "customerFeedback", "operationalNotes"];
  fields.forEach(field => { q(`#${field}`).value = event.closeout[field] ?? ""; });
  q("#closeoutRows").innerHTML = event.menu.map((item, menuIndex) => {
    const productionTasks = event.tasks.filter(task => task.menuIndex === menuIndex && task.type === "production");
    const usable = productionTasks.reduce((sum, task) => sum + Number(taskProgress(task).usableYield || 0), 0);
    const waste = productionTasks.reduce((sum, task) => sum + Number(taskProgress(task).waste || 0), 0);
    const variance = usable - Number(item.required || 0);
    return `<tr><td><strong>${esc(item.name)}</strong></td><td>${item.required}</td><td>${usable}</td><td>${waste}</td><td class="${variance < 0 ? "variance-negative" : "variance-positive"}">${variance > 0 ? "+" : ""}${variance}</td></tr>`;
  }).join("");
  const plannedOutput = event.menu.reduce((sum, item) => sum + Number(item.required || 0), 0);
  const actualOutput = event.tasks.filter(task => task.type === "production").reduce((sum, task) => sum + Number(taskProgress(task).usableYield || 0), 0);
  const totalWaste = event.tasks.filter(task => task.type === "production").reduce((sum, task) => sum + Number(taskProgress(task).waste || 0), 0);
  const blocked = event.tasks.filter(task => taskProgress(task).status === "Blocked").length;
  q("#managementBriefing").innerHTML = `<div class="briefing-list">
    <div class="briefing-item"><span>Planned vs. usable output</span><strong>${plannedOutput} planned · ${actualOutput} reported</strong></div>
    <div class="briefing-item"><span>Recorded waste</span><strong>${totalWaste} portions / units</strong></div>
    <div class="briefing-item"><span>Production interruptions</span><strong>${blocked} currently blocked task${blocked === 1 ? "" : "s"}</strong></div>
    <div class="briefing-item"><span>Analysis boundary</span><strong>Evaluate the plan, schedule, cost, yield, and workflow—not individual cooks.</strong></div>
  </div>`;
}

function collectCloseout() {
  if (!canEdit()) return false;
  const closeout = current().closeout ||= {};
  ["actualGuests", "actualRevenue", "actualCost", "feedbackReceived", "customerFeedback", "operationalNotes"].forEach(field => { closeout[field] = q(`#${field}`).value; });
  return true;
}

function applyPermissions() {
  const editable = canEdit();
  ["brief", "menu", "production", "assignments"].forEach(panel => {
    qa(`[data-panel-view="${panel}"] input, [data-panel-view="${panel}"] select, [data-panel-view="${panel}"] textarea, [data-panel-view="${panel}"] button`).forEach(control => { control.disabled = !editable; });
  });
  q("#saveDraft").disabled = !editable;
  ["actualGuests", "actualRevenue", "actualCost", "feedbackReceived", "customerFeedback", "operationalNotes", "saveCloseout", "completeEvent"].forEach(id => { q(`#${id}`).disabled = !editable; });
}

function renderAll() {
  renderSelect(); renderSummary(); renderRequests(); fillBrief(); renderMenu(); renderIngredients(); renderProduction(); renderAssignments(); renderAttention(); renderPublish(); renderLiveFilters(); renderLive(); renderCloseout(); applyPermissions();
}

function showPanel(name) {
  qa('[data-panel-view]').forEach(panel => panel.classList.toggle("active", panel.dataset.panelView === name));
  qa('[data-panel]').forEach(button => button.classList.toggle("active", button.dataset.panel === name));
  if (name === "publish") renderPublish();
  if (name === "requests") renderRequests();
  if (name === "menu") renderIngredients();
  if (name === "live") renderLive();
  if (name === "closeout") renderCloseout();
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

q("#activeTeacher").addEventListener("change", event => { state.activeTeacher = event.target.value; save(); renderAll(); toast(`Viewing as ${state.activeTeacher}.`); });
q("#eventSelect").addEventListener("change", event => { currentId = event.target.value; renderAll(); });
q("#requestFilter").addEventListener("change", event => { requestFilter = event.target.value; renderRequests(); });
q("#addSampleRequest").addEventListener("click", () => {
  const count = (state.requests || []).length + 1;
  state.requests.unshift({ id: `req-${Date.now()}`, submittedAt: new Date().toISOString(), requester: "Sample district requester", contact: "Teacher-only contact record", eventName: `Demonstration Event Request ${count}`, type: "Catering", school: "Arcadia", serviceDate: "2026-11-12", serviceTime: "16:30", guestCount: 50, serviceFormat: "Customer pickup", budget: "$500", requestedMenu: "Chef recommendation requested", requirements: "Provide a realistic menu proposal and pickup instructions.", allergens: "Customer must confirm dietary needs before acceptance.", status: "New", notes: "" });
  requestFilter = "open"; save(); renderRequests(); toast("New form submission received.");
});
q("#addMenuItem").addEventListener("click", () => { if (canEdit()) { current().menu.push({ name: "New menu item", required: 1, yield: 1, portion: "", status: "Researching", ingredients: [] }); ingredientMenuIndex = current().menu.length - 1; save(); renderAll(); } });
q("#ingredientMenuItem").addEventListener("change", event => { ingredientMenuIndex = Number(event.target.value); renderIngredients(); });
q("#addIngredient").addEventListener("click", () => {
  if (!canEdit() || !current().menu[ingredientMenuIndex]) return;
  current().menu[ingredientMenuIndex].ingredients ||= [];
  current().menu[ingredientMenuIndex].ingredients.push({ name: "New ingredient", quantity: 0, unit: "lb", packSize: 0, packPrice: 0 });
  save(); renderIngredients();
});
q("#regenerateTasks").addEventListener("click", generateTasks);
q("#packetView").addEventListener("change", packetPreview);
q("#saveDraft").addEventListener("click", () => { if (canEdit()) { collectBrief(); current().stage = "Draft"; save(); renderAll(); toast("Event Order saved as a private draft."); } });
q("#publishOrder").addEventListener("click", () => {
  if (!isOwner()) return;
  collectBrief();
  const event = current();
  event.version = (event.version || 0) + 1; event.publishedAt = new Date().toISOString(); event.stage = "Published";
  save(); renderAll(); toast(`Event Order v${event.version} published to student views.`);
});
q("#newEvent").addEventListener("click", () => {
  const id = `evt-${Date.now()}`;
  state.events.push({ id, name: "New client event", type: "Catering", school: "Arcadia", customer: "", owner: activeTeacher(), collaborators: [], serviceDate: "", serviceTime: "", guestCount: 1, serviceFormat: "Customer pickup", budget: "", requirements: "", allergens: "", stage: "Draft", version: 0, publishedAt: null, menu: [], tasks: [], assignments: {}, closeout: clone(seed.events[0].closeout) });
  currentId = id; save(); renderAll(); showPanel("brief"); toast("New private event draft created.");
});
q("#liveSectionFilter").addEventListener("change", event => { liveSection = event.target.value; renderLive(); });
q("#liveStatusFilter").addEventListener("change", event => { liveStatus = event.target.value; renderLive(); });
q("#simulateUpdate").addEventListener("click", () => {
  if (!canEdit() || !current().tasks.length) return toast("No editable production task is available.");
  const task = current().tasks.find(item => taskProgress(item).status !== "Complete") || current().tasks[0];
  const progress = taskProgress(task);
  progress.status = progress.status === "Not started" ? "In progress" : progress.status === "In progress" ? "Ready for handoff" : "Complete";
  progress.quantity = Math.max(progress.quantity, Math.ceil((current().menu[task.menuIndex]?.required || 0) / 2));
  if (progress.status === "Complete" && task.type === "production") progress.usableYield = current().menu[task.menuIndex]?.required || progress.quantity;
  progress.storage = progress.status === "Complete" ? "Labeled and staged" : progress.storage;
  progress.updatedAt = new Date().toISOString(); current().stage = "In production";
  save(); renderAll(); showPanel("live"); toast(`Update received from ${sectionName(task.section)}.`);
});
q("#saveCloseout").addEventListener("click", () => { if (collectCloseout()) { current().stage = "Closeout required"; save(); renderAll(); showPanel("closeout"); toast("Event closeout saved as a draft."); } });
q("#completeEvent").addEventListener("click", () => {
  if (!collectCloseout()) return;
  const unfinished = current().tasks.filter(task => taskProgress(task).status !== "Complete").length;
  if (unfinished && !confirm(`${unfinished} production tasks are not marked complete. Complete the event anyway?`)) return;
  current().stage = "Completed"; current().completedAt = new Date().toISOString(); save(); renderAll(); showPanel("closeout"); toast("Event completed and preserved for Kitchen Management analysis.");
});
q("#resetDemo").addEventListener("click", () => {
  if (!confirm("Reset all prototype events and restore the sample event?")) return;
  state = clone(seed); currentId = state.events[0].id; requestFilter = "open"; ingredientMenuIndex = 0; save(); renderAll(); showPanel("requests"); toast("Prototype data reset.");
});

if (!current().tasks.length) generateTasks();
renderAll();

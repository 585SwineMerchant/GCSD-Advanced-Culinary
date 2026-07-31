const storageKey = "gcsdAdvancedTeacherPrototypeV2";
const statuses = ["Not started", "In progress", "Blocked", "Ready for handoff", "Complete"];
const sections = [
  { id: "adv-p2", name: "Advanced Culinary · Period 2", focus: "Pasta and pastry production" },
  { id: "adv-p5", name: "Advanced Culinary · Period 5", focus: "Sauce, salad, assembly, and packing" },
  { id: "km", name: "Kitchen Management", focus: "Schedule, costing, controls, and objective event briefing" }
];
const seed = {
  activeTeacher: "Kevin McCann",
  events: [{
    id: "evt-001", name: "Cottage Fall Pasta Service", type: "Catering", school: "Arcadia",
    customer: "District Leadership Team", owner: "Jason Carlson", collaborators: ["Kevin McCann"],
    serviceDate: "2026-10-22", serviceTime: "17:30", guestCount: 100, serviceFormat: "Delivery",
    budget: "$850", requirements: "Fresh pasta, Bolognese, salad, bread, and packaged dessert. Deliver hot food ready for service.",
    allergens: "Document wheat, egg, dairy, and sesame controls. Prepare approved vegetarian portions separately.",
    stage: "Planning", version: 0, publishedAt: null,
    menu: [
      { name: "Fresh pasta with Bolognese", required: 100, yield: 20, portion: "12 oz entrée", status: "Approved" },
      { name: "Seasonal green salad", required: 100, yield: 25, portion: "4 oz side", status: "Approved" },
      { name: "Focaccia", required: 120, yield: 24, portion: "1 piece", status: "Approved" },
      { name: "Pastry box", required: 100, yield: 20, portion: "1 boxed pastry", status: "Approved" }
    ], tasks: [], assignments: {},
    closeout: { actualGuests: "", actualRevenue: "", actualCost: "", feedbackReceived: "No", customerFeedback: "", operationalNotes: "" }
  }]
};

const q = selector => document.querySelector(selector);
const qa = selector => [...document.querySelectorAll(selector)];
const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const clone = value => JSON.parse(JSON.stringify(value));

function load() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || clone(seed); }
  catch { return clone(seed); }
}

let state = load();
let currentId = state.events[0].id;
let liveSection = "all";
let liveStatus = "all";

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
  renderSelect(); renderSummary(); fillBrief(); renderMenu(); renderProduction(); renderAssignments(); renderAttention(); renderPublish(); renderLiveFilters(); renderLive(); renderCloseout(); applyPermissions();
}

function showPanel(name) {
  qa('[data-panel-view]').forEach(panel => panel.classList.toggle("active", panel.dataset.panelView === name));
  qa('[data-panel]').forEach(button => button.classList.toggle("active", button.dataset.panel === name));
  if (name === "publish") renderPublish();
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
q("#addMenuItem").addEventListener("click", () => { if (canEdit()) { current().menu.push({ name: "New menu item", required: 1, yield: 1, portion: "", status: "Researching" }); renderAll(); } });
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
  state = clone(seed); currentId = state.events[0].id; save(); renderAll(); showPanel("brief"); toast("Prototype data reset.");
});

if (!current().tasks.length) generateTasks();
renderAll();

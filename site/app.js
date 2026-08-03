const experiences = [
  {
    id: 1,
    short: "Professional Kitchen Launch",
    timing: "September–October",
    focus: "Readiness, station systems, consistent execution",
    challenge: "Produce and serve safe, consistent small bites for an authentic or approved school audience at the promised service time.",
    needs: ["Kitchen systems", "Garde manger and presentation", "Quality calibration", "Service timing"]
  },
  {
    id: 2,
    short: "Preorder Pop-Up Bakery",
    timing: "November–December",
    focus: "Scaling, scheduling, packaging, fulfillment",
    challenge: "Convert known demand into consistent baked products, accurate orders, responsible ingredient use, and on-time fulfillment.",
    needs: ["Baking and pastry", "Formula scaling and yield", "Batch scheduling", "Packaging and labeling"]
  },
  {
    id: 3,
    short: "Seasonal Lunch Service",
    timing: "January–February",
    focus: "Menu balance, holding, coordinated components",
    challenge: "Build and deliver a cohesive seasonal meal whose components meet an approved recipient’s needs, quantity, and schedule.",
    needs: ["Stocks, soups, and sauces", "Vegetables and starches", "Menu balance", "Holding and transport"]
  },
  {
    id: 4,
    short: "Fast-Casual Pop-Up",
    timing: "February–March",
    focus: "Order flow, hospitality, speed, accuracy",
    challenge: "Deliver customized food efficiently without sacrificing safety, consistency, hospitality, or order accuracy.",
    needs: ["Batch production", "Station flow", "Hospitality and service", "Replenishment and waste"]
  },
  {
    id: 5,
    short: "Client Catering",
    timing: "March–April",
    focus: "Protein cookery, client needs, leadership",
    challenge: "Coordinate a complete catered menu built around safe, appropriate protein fabrication and cookery for a fixed client deadline.",
    needs: ["Meat, poultry, or seafood", "Fabrication and yield", "Sauces and accompaniments", "Catering and leadership"]
  },
  {
    id: 6,
    short: "Operations Capstone",
    timing: "May–June",
    focus: "Full-cycle planning, production, service, closeout",
    challenge: "Complete the client-centered production cycle with the greatest feasible student ownership while meeting every safety and delivery commitment.",
    needs: ["Integrated menu work", "Production leadership", "Quality and hospitality", "Evidence and improvement"]
  }
];

const phaseOrder = ["brief", "learn", "plan", "produce", "close", "improve"];
const phaseContent = {
  brief: {
    title: "Understand the promise",
    kicker: "Phase 1 · Brief",
    intro: "Know exactly what the department has accepted before menu ideas become production work.",
    actions: [
      "Identify the recipient, product or menu boundary, quantity, quality expectation, and deadline.",
      "Confirm budget, dietary needs, allergens, service or packaging conditions, equipment, storage, and delivery.",
      "Review the previous event’s objective management briefing and the approved goal for this cycle.",
      "Separate confirmed requirements from preferences, assumptions, and questions."
    ],
    protocolTitle: "Client commitment",
    protocol: [
      "Jason is the single point of approval and client communication for Cottage requests this year.",
      "A request is not an accepted order until feasibility and participating-class capacity are confirmed.",
      "After acceptance, no student or class independently changes product, quantity, price, quality, or deadline.",
      "A necessary change becomes valid only after Jason approves it and the client agrees."
    ],
    callout: "Before acceptance, scope can be negotiated. After acceptance, the department has promised a deliverable.",
    tools: ["brief"]
  },
  learn: {
    title: "Learn what this event requires",
    kicker: "Phase 2 · Learn and practice",
    intro: "The menu and production challenge create the reason to go deeper. Use the textbook and focused instruction to build readiness for this event.",
    actions: [
      "Name the techniques, ingredients, equipment, safety controls, and service knowledge the menu requires.",
      "Use the instructor-assigned ProStart Second Edition material as the information source.",
      "Complete demonstrations, focused lessons, recipe trials, and smaller labs that prepare the team for the event.",
      "Define an observable product and service standard before full production."
    ],
    protocolTitle: "Learning before labor",
    protocol: [
      "Advanced Culinary is experience-based; the textbook is a reference source, not the pacing guide.",
      "A new technique is taught and practiced before students are assessed on independent application.",
      "Review does not mean repeating Culinary 1 & 2; prior foundations are reverified and applied at greater complexity.",
      "Routine practice stays in class unless it provides meaningful evidence of readiness or growth."
    ],
    callout: "Do not browse disconnected chapters. Start with the production need, find the connected learning, then return to the event.",
    view: "learning"
  },
  plan: {
    title: "Build the game plan",
    kicker: "Phase 3 · Plan",
    intro: "Work backward from the promised service time. Production is not ready to begin until the team can see the whole path through closeout.",
    actions: [
      "Approve the standardized recipe, yield, portion, allergens, holding, packaging, and quality standard.",
      "Create a visible production timeline with milestones, assignments, shared equipment, and decision points.",
      "Assign meaningful cooking or production work to every student, including students serving in leadership roles.",
      "Identify ingredient quantities, available inventory, storage needs, contingencies, and teacher approval gates.",
      "Schedule packaging, labeling, handoff, dishes, sanitation, storage, waste recording, and station restoration."
    ],
    protocolTitle: "Time-management standard",
    protocol: [
      "The plan works backward from final delivery—not only from when cooking begins.",
      "Every task has an owner, start point, completion point, and relationship to other work.",
      "Cleaning and dishes are production tasks. They cannot be deferred to the instructor after students leave.",
      "Reserve ingredients, backup equipment, flexible labor, and approved simplifications protect the client commitment."
    ],
    callout: "If the food can be finished but the kitchen cannot be closed, the production plan is incomplete.",
    tools: ["recipe", "production"]
  },
  produce: {
    title: "Produce, communicate, and protect the standard",
    kicker: "Phase 4 · Produce",
    intro: "Follow the approved plan, communicate early, verify quality while correction is still possible, and keep the client commitment protected.",
    actions: [
      "Set the station from the approved plan and confirm the first three actions before beginning.",
      "Track milestones and report status, delay, shortage, risk, or quality concerns early.",
      "Complete assigned meaningful production work and preserve evidence of individual contribution.",
      "Use release standards for safety, flavor, texture, appearance, portion, temperature, packaging, and service readiness.",
      "Ask for instructor direction before correcting, repurposing, remaking, replacing, or removing a failed component."
    ],
    protocolTitle: "Own it. Diagnose it. Correct it.",
    protocol: [
      "Stop and protect remaining food, ingredients, equipment, and team workflow.",
      "Tell the instructor immediately and explain the process that produced the failure.",
      "Diagnose the likely cause with the instructor before choosing a response.",
      "Correct, repurpose, remake, replace, or remove only after instructor approval.",
      "The original technical result remains part of the assessment; professional recovery earns separate credit."
    ],
    callout: "An honest mistake can become productive learning. Hiding it, misrepresenting it, serving it knowingly, or improvising an unauthorized fix is a separate breach.",
    tools: ["production", "quality"]
  },
  close: {
    title: "Deliver and close completely",
    kicker: "Phase 5 · Close",
    intro: "The event is not finished when the last food leaves the kitchen. Fulfillment, records, dishes, sanitation, storage, and station restoration are part of the job.",
    actions: [
      "Verify quantity, quality, temperature, packaging, labeling, and handoff before release.",
      "Record required service counts, temperatures, substitutions, failures, corrections, waste, and variances.",
      "Complete dishes, sanitation, food storage, equipment shutdown, trash, laundry, floors, and station restoration.",
      "Confirm the accepted client commitment was fulfilled or that an adult-approved client revision was documented.",
      "Receive instructor closeout verification before leaving the production area."
    ],
    protocolTitle: "Complete-closeout standard",
    protocol: [
      "The team plans for closing from the beginning of the event.",
      "Students may be reassigned as production ends so no station’s unfinished work becomes one person’s burden.",
      "A student who finishes early reports available capacity and accepts the next assigned responsibility.",
      "The instructor verifies what is safe, stored, clean, complete, and ready for the next class."
    ],
    callout: "Food finished, packaged, and put away is not a complete event if dishes and sanitation remain for someone else.",
    tools: ["quality"]
  },
  improve: {
    title: "Use the evidence to improve",
    kicker: "Phase 6 · Improve",
    intro: "Study your own contribution now. Kitchen Management completes the deeper operational review between events and brings the verified results back as the next cycle begins.",
    actions: [
      "Identify your responsibility and point to specific evidence of what you completed.",
      "Explain the result using timing, temperature, yield, quality evidence, feedback, or another observable source.",
      "Document a failure or unexpected problem, the approved response, and the procedural change recommended.",
      "Curate limited portfolio evidence that demonstrates competency, growth, professional practice, or achievement.",
      "Apply the next event’s approved goal after Kitchen Management presents the objective event briefing."
    ],
    protocolTitle: "The feedback loop",
    protocol: [
      "Advanced Culinary supplies authentic production information and receives the verified operational results.",
      "Kitchen Management conducts the detailed cost, yield, waste, timing, packaging, compliance, and client-satisfaction analysis.",
      "Kitchen Management evaluates the operation, not the cooks; instructor assessment and structured peer critique address culinary quality.",
      "Initial operational targets are generous and achievable; real results establish the baseline for reasonable later goals.",
      "Once a meaningful standard is achieved, consistent performance across varied events matters more than moving the goalpost."
    ],
    callout: "The event ends here. The next event begins with what this one taught the team.",
    tools: ["reflection"]
  }
};

const toolDefinitions = {
  brief: {
    letter: "A",
    name: "Accepted Event Brief",
    when: "Brief",
    owner: "Class and instructor",
    fields: ["Recipient and occasion", "Accepted product / menu boundary", "Quantity and deadline", "Budget / cost boundary", "Dietary and allergen needs", "Service / packaging / handoff", "Previous-event result and current goal", "Open questions and adult approval"]
  },
  recipe: {
    letter: "B",
    name: "Standardized Recipe Approval",
    when: "Learn + Plan",
    owner: "Station with instructor approval",
    fields: ["Approved product and source", "Yield and portion", "Ingredients and quantities", "Method and critical controls", "Allergens", "Equipment and batch limits", "Holding / packaging / service", "Observable quality standard", "Test revision and approval"]
  },
  production: {
    letter: "C",
    name: "Plan-to-Close Game Plan",
    when: "Plan + Produce",
    owner: "Station with individual assignments",
    fields: ["Product and quantity", "Meaningful work by student", "Mise en place", "Shared equipment", "Production timeline and milestones", "Safety / temperature controls", "Communication checkpoints", "Contingencies", "Packaging / labeling / handoff", "Dishes / sanitation / storage / closing"]
  },
  quality: {
    letter: "D",
    name: "Quality, Recovery & Closeout Record",
    when: "Produce + Close",
    owner: "Station and assigned lead",
    fields: ["Approved release standard", "Safety and temperature record", "Status / deadline checkpoints", "Failure or unexpected problem", "Diagnosis and instructor direction", "Corrective action and resources used", "Quantity / packaging / labeling result", "Waste or variance", "Client commitment fulfilled", "Instructor closeout verification"]
  },
  reflection: {
    letter: "E",
    name: "Individual Evidence Reflection",
    when: "Improve",
    owner: "Individual student",
    fields: ["My responsibility", "Evidence of meaningful production work", "Result or feedback", "Problem and approved response", "What I learned from the event", "One change for the next event", "Portfolio evidence selected"]
  }
};

const learningTopics = [
  {
    id: "systems",
    title: "Professional Kitchen Systems",
    triggers: ["timeline", "mise en place", "station", "equipment", "closing", "communication"],
    purpose: "Use when the event requires coordinated people, equipment, ingredients, milestones, shared space, and complete closeout.",
    questions: ["What must be ready before production?", "Which work depends on another task?", "Where can delay be detected early?", "How will closing finish before class ends?"],
    sources: ["Instructor station-system lesson", "Assigned ProStart Second Edition material", "Plan-to-Close Game Plan", "Focused readiness or workflow lab"]
  },
  {
    id: "baking",
    title: "Baking, Pastry & Desserts",
    triggers: ["bread", "pastry", "cake", "cookie", "dessert", "fermentation", "baking"],
    purpose: "Use when formula balance, mixing method, fermentation, structure, temperature, batch size, cooling, or finishing controls the result.",
    questions: ["Which mixing or fermentation method applies?", "What controls structure and tenderness?", "Can the batch fit the equipment and timeline?", "When can the product be packaged safely?"],
    sources: ["Assigned ProStart Second Edition baking/dessert material", "Approved course formula", "Instructor demonstration", "Test batch and quality calibration"]
  },
  {
    id: "produce",
    title: "Fruits, Vegetables, Potatoes, Grains & Pasta",
    triggers: ["vegetable", "fruit", "potato", "grain", "rice", "pasta", "seasonal"],
    purpose: "Use when seasonality, fabrication, cooking method, color, texture, yield, holding, or coordination with other menu components matters.",
    questions: ["What method fits the ingredient and service?", "How will cut and portion affect timing and yield?", "What quality changes during holding?", "What can be prepared ahead without loss?"],
    sources: ["Assigned ProStart Second Edition topic", "Ingredient study", "Method demonstration", "Menu-specific practice lab"]
  },
  {
    id: "soups",
    title: "Stocks, Soups, Sauces & Emulsions",
    triggers: ["stock", "soup", "sauce", "emulsion", "thickening", "reduction"],
    purpose: "Use when flavor development, extraction, thickening, consistency, finishing, cooling, reheating, or holding determines success.",
    questions: ["What is the desired body and finish?", "Which thickening or emulsifying method applies?", "When should seasoning be adjusted?", "How will the product cool, reheat, hold, and serve safely?"],
    sources: ["Assigned ProStart Second Edition topic", "Instructor technique lesson", "Controlled sauce or soup lab", "Approved recipe and quality standard"]
  },
  {
    id: "proteins",
    title: "Meat, Poultry, Seafood & Eggs",
    triggers: ["meat", "poultry", "seafood", "fish", "egg", "protein", "fabrication", "doneness"],
    purpose: "Use when fabrication, yield, cooking method, doneness, carryover, holding, service timing, or food-safety controls shape the menu.",
    questions: ["Which cooking method fits the cut or product?", "What proves safety and what proves quality?", "How do fabrication and trim affect yield?", "How will portions finish together and rest or hold?"],
    sources: ["Assigned ProStart Second Edition protein material", "Fabrication demonstration", "Doneness calibration", "Instructor-approved production plan"]
  },
  {
    id: "nutrition",
    title: "Nutrition, Allergens & Menu Balance",
    triggers: ["nutrition", "allergen", "dietary", "healthy", "menu balance", "restriction"],
    purpose: "Use when the recipient’s needs, major allergens, cross-contact, menu variety, portion, or dietary expectations affect the product.",
    questions: ["What is confirmed and what still needs clarification?", "Which ingredients and surfaces create cross-contact risk?", "Does the menu provide balance and reasonable variety?", "What claims can the team verify honestly?"],
    sources: ["Assigned ProStart Second Edition nutrition material", "Current allergen procedures", "Product labels and approved specifications", "Instructor/client clarification"]
  },
  {
    id: "service",
    title: "Hospitality, Packaging & Service",
    triggers: ["service", "hospitality", "packaging", "label", "delivery", "client", "order"],
    purpose: "Use when the product must be communicated, packaged, labeled, transported, released, served, or recovered for a real recipient.",
    questions: ["What does the recipient experience at handoff?", "What must the label communicate?", "How will temperature and quality survive the service model?", "Who is authorized to resolve a client concern?"],
    sources: ["Assigned ProStart Second Edition hospitality material", "Accepted Event Brief", "Packaging and handoff test", "Instructor-approved service plan"]
  },
  {
    id: "business",
    title: "Cost, Yield, Waste & Event Results",
    triggers: ["cost", "yield", "waste", "price", "quantity", "financial", "inventory"],
    purpose: "Use when ingredient quantities, yield, portion, waste, packaging, event results, or an approved operating goal affects production decisions.",
    questions: ["What ingredients and quantities are required?", "How do yield and portion affect the order?", "What production choices create waste or overproduction?", "Which results will Kitchen Management analyze and return?"],
    sources: ["Assigned ProStart Second Edition cost/yield material", "Verified event data", "Instructor-approved ingredient request", "Kitchen Management event briefing"]
  }
];

const quickReferences = [
  {
    title: "Plan-to-Close Time Management",
    steps: ["Start with the promised delivery time.", "Schedule service, packaging, holding, production, mise en place, and setup backward.", "Place dishes, sanitation, storage, waste recording, and station restoration on the same timeline.", "Assign owners and checkpoints.", "Reforecast early when a milestone slips."]
  },
  {
    title: "Own It · Diagnose It · Correct It",
    steps: ["Stop and protect food, ingredients, equipment, and workflow.", "Tell the instructor immediately.", "Explain the process that produced the problem.", "Diagnose likely cause with the instructor.", "Take only the approved correction, remake, replacement, repurpose, or removal action.", "Record what will change next time."]
  },
  {
    title: "Safety Stop",
    steps: ["Stop unsafe work immediately.", "Keep affected food from service.", "Report the condition honestly.", "Follow instructor direction for discard, correction, restart, or reassessment.", "Do not let a finished-looking product hide a critical violation."]
  },
  {
    title: "Complete Closeout",
    steps: ["Verify delivery, packaging, labels, temperatures, and counts.", "Store food safely and label it correctly.", "Complete dishes and sanitize food-contact surfaces.", "Shut down and restore equipment.", "Remove trash, handle laundry, and finish floors.", "Receive instructor closeout verification before leaving."]
  },
  {
    title: "Client Change Authority",
    steps: ["Students identify the problem and develop possible alternatives.", "The participating instructor reviews production reality.", "Jason makes the operational decision and communicates with the client.", "Product, quantity, price, or deadline changes only after client agreement.", "The revised commitment is recorded for every class."]
  },
  {
    title: "Individual Evidence",
    steps: ["Name your assigned responsibility.", "Point to observable evidence of meaningful production work.", "Explain the result using data, quality evidence, or feedback.", "Separate the original technical result from recovery actions.", "Select only evidence that demonstrates competency, growth, professional practice, or achievement."]
  }
];

let sourceCatalog = { recipes: [], references: [], statusNote: "" };
const recipeCategoriesByTopic = {
  baking: ["Breads and yeast doughs", "Pastry, cakes, and desserts"],
  produce: ["Grains, pasta, and legumes", "Potatoes"],
  soups: ["Stocks and sauces", "Soups", "Dressings and flavored oils", "Dips, relishes, and condiments"],
  business: [], service: [], nutrition: [], proteins: []
};

const techniques = ["Safety and sanitation", "Mise en place and time management", "Knife work or fabrication", "Garde manger", "Baking or pastry", "Stocks, soups, or sauces", "Vegetables, grains, or pasta", "Protein or egg cookery", "Menu balance and allergens", "Scaling and yield", "Holding, packaging, or labeling", "Hospitality and service"];
const candidateFields = ["Product or concept", "Source URL / book / chef", "Why it fits the event", "Feasibility concerns"];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const eventKey = () => String($("#eventSelect")?.value || localStorage.getItem("advancedCurrentEvent") || "1");

function getState() {
  try { return JSON.parse(localStorage.getItem("advancedEventStateV3") || "{}"); }
  catch { return {}; }
}
function saveState(state) { localStorage.setItem("advancedEventStateV3", JSON.stringify(state)); }
function currentEvent() { return experiences.find(item => String(item.id) === eventKey()) || experiences[0]; }
function eventRecord(id = eventKey()) {
  const state = getState();
  return state[id] || {phase: "brief", completed: {}, checks: {}};
}
function updateEventRecord(update, id = eventKey()) {
  const state = getState();
  state[id] = {...eventRecord(id), ...update};
  saveState(state);
  return state[id];
}

function showView(name) {
  $$("[data-view-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === name));
  $$(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.viewTarget === name));
  $("#primaryNav").classList.remove("open");
  $("#menuButton").setAttribute("aria-expanded", "false");
  window.scrollTo({top: 0, behavior: "smooth"});
  if (name === "today") renderHome();
  if (name === "workspace") renderWorkspace();
}

function setCurrentEvent(id) {
  localStorage.setItem("advancedCurrentEvent", String(id));
  if ($("#eventSelect")) $("#eventSelect").value = String(id);
  renderHome();
  renderWorkspace();
  if ($("#recipeExperience")) $("#recipeExperience").value = String(id);
}

function nextIncompletePhase(record) {
  return phaseOrder.find(phase => !record.completed?.[phase]) || "improve";
}

function renderHome() {
  const exp = experiences.find(item => String(item.id) === (localStorage.getItem("advancedCurrentEvent") || "1")) || experiences[0];
  const record = eventRecord(String(exp.id));
  const phase = record.phase || nextIncompletePhase(record);
  const completeCount = phaseOrder.filter(item => record.completed?.[item]).length;
  $("#homeEventNumber").textContent = String(exp.id).padStart(2, "0");
  $("#homeEventTiming").textContent = exp.timing;
  $("#homeEventTitle").textContent = exp.short;
  $("#homeEventChallenge").textContent = exp.challenge;
  $("#homePhaseName").textContent = phaseContent[phase].title;
  $("#homeProgress").textContent = `${completeCount} of 6 phases`;
  const phaseChecks = phaseContent[phase].actions;
  const nextIndex = phaseChecks.findIndex((_, index) => !record.checks?.[`${phase}-${index}`]);
  $("#homeNextAction").textContent = nextIndex >= 0 ? phaseChecks[nextIndex] : `Complete the ${phaseContent[phase].title.toLowerCase()} phase.`;
  $("#homeProgressBar").style.width = `${completeCount / 6 * 100}%`;
  $("#homeExperienceStrip").innerHTML = experiences.map(item => `
    <button class="arc-card ${item.id === exp.id ? "current" : ""}" data-home-event="${item.id}">
      <span>Experience ${item.id}</span><strong>${item.short}</strong><small>${item.timing}</small>
    </button>`).join("");
  $$("[data-home-event]").forEach(button => button.addEventListener("click", () => {
    setCurrentEvent(button.dataset.homeEvent);
    showView("workspace");
  }));
}

function renderEventSelector() {
  $("#eventSelect").innerHTML = experiences.map(item => `<option value="${item.id}">${item.id}. ${item.short}</option>`).join("");
  $("#eventSelect").value = localStorage.getItem("advancedCurrentEvent") || "1";
}

function renderWorkspace() {
  const exp = currentEvent();
  const record = eventRecord();
  const activePhase = record.phase || nextIncompletePhase(record);
  $("#workspaceEventNumber").textContent = String(exp.id).padStart(2, "0");
  $("#workspaceEventTitle").textContent = exp.short;
  $("#workspaceEventFocus").textContent = exp.focus;
  const completeCount = phaseOrder.filter(phase => record.completed?.[phase]).length;
  $("#workflowProgressText").textContent = `${completeCount} of 6 phases complete`;
  $("#workflowProgressBar").style.width = `${completeCount / 6 * 100}%`;
  $$(".phase-tab").forEach(tab => {
    const active = tab.dataset.phase === activePhase;
    tab.classList.toggle("active", active);
    tab.classList.toggle("complete", !!record.completed?.[tab.dataset.phase]);
    tab.setAttribute("aria-selected", String(active));
  });
  renderPhase(activePhase);
  renderToolMap();
}

function openPhase(name, scroll = true) {
  updateEventRecord({phase: name});
  renderWorkspace();
  if (scroll) $(".workflow-shell").scrollIntoView({behavior: "smooth", block: "start"});
}

function renderPhase(name) {
  const phase = phaseContent[name];
  const record = eventRecord();
  const exp = currentEvent();
  const tools = (phase.tools || []).map(key => `<button class="button secondary" data-tool="${key}">Open ${toolDefinitions[key].name}</button>`).join("");
  const viewButton = phase.view ? `<button class="button secondary" data-view-target="${phase.view}">Open Connected Learning</button>` : "";
  $("#phaseStage").innerHTML = `
    <div class="phase-stage-header">
      <div><p class="eyebrow">${phase.kicker}</p><h2>${phase.title}</h2><p>${phase.intro}</p></div>
      <span class="phase-badge">${exp.short}</span>
    </div>
    <div class="phase-grid">
      <article class="phase-main">
        <h3>What to complete</h3>
        <div class="action-list">
          ${phase.actions.map((action, index) => `
            <label class="action-check">
              <input type="checkbox" data-phase-check="${name}-${index}" ${record.checks?.[`${name}-${index}`] ? "checked" : ""} />
              <span>${action}</span>
            </label>`).join("")}
        </div>
        <p class="phase-callout"><strong>Standard:</strong> ${phase.callout}</p>
        <div class="phase-tools">${tools}${viewButton}</div>
        <div class="complete-phase">
          <label><input type="checkbox" id="completePhase" ${record.completed?.[name] ? "checked" : ""} /> This phase is complete and the instructor has approved moving forward when approval is required.</label>
        </div>
      </article>
      <aside class="phase-side">
        <p class="eyebrow">${phase.protocolTitle}</p>
        <ol class="protocol-list">${phase.protocol.map(item => `<li>${item}</li>`).join("")}</ol>
        ${name === "learn" ? `<h4>Likely needs for this event</h4><ul>${exp.needs.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
      </aside>
    </div>`;
  $$("[data-phase-check]", $("#phaseStage")).forEach(box => box.addEventListener("change", () => {
    const fresh = eventRecord();
    const checks = {...fresh.checks, [box.dataset.phaseCheck]: box.checked};
    updateEventRecord({checks});
    renderHome();
  }));
  $("#completePhase").addEventListener("change", event => {
    const fresh = eventRecord();
    const completed = {...fresh.completed, [name]: event.target.checked};
    const next = event.target.checked ? phaseOrder[Math.min(phaseOrder.indexOf(name) + 1, phaseOrder.length - 1)] : name;
    updateEventRecord({completed, phase: next});
    renderWorkspace();
    renderHome();
  });
  bindDynamicButtons($("#phaseStage"));
}

function renderToolMap() {
  $("#toolMap").innerHTML = Object.entries(toolDefinitions).map(([key, tool]) => `
    <article class="tool-card">
      <span class="tool-letter">${tool.letter}</span>
      <h3>${tool.name}</h3>
      <p><strong>Used:</strong> ${tool.when}<br><strong>Owner:</strong> ${tool.owner}</p>
      <button class="text-link" data-tool="${key}">Preview / print →</button>
    </article>`).join("");
  bindDynamicButtons($("#toolMap"));
}

function toolFormHtml(tool) {
  return `
    <div class="modal-hero">
      <p class="eyebrow">Production Tool ${tool.letter} · ${tool.when}</p>
      <h2>${tool.name}</h2><p>${tool.owner}</p>
    </div>
    <div class="modal-body">
      <div class="tool-identifiers">
        <label>Student / team<input /></label>
        <label>Event<input value="${currentEvent().id} — ${currentEvent().short}" /></label>
        <label>Date<input type="date" /></label>
        <label>Version / status<input placeholder="Draft / approved" /></label>
      </div>
      <div class="tool-form">
        ${tool.fields.map((field, index) => `<label class="${index === tool.fields.length - 1 ? "wide" : ""}">${field}<textarea rows="${field.length > 30 ? 3 : 2}"></textarea></label>`).join("")}
      </div>
      <div class="form-actions">
        <button class="button primary" type="button" data-print-tool>Print this tool</button>
        <button class="button secondary" type="button" data-close-modal="toolDialog">Close</button>
      </div>
    </div>`;
}

function openTool(key) {
  const tool = toolDefinitions[key];
  $("#toolDialogContent").innerHTML = toolFormHtml(tool);
  $("#toolDialog").showModal();
  $("[data-print-tool]").addEventListener("click", () => printTool(tool));
  $$('[data-close-modal="toolDialog"]', $("#toolDialogContent")).forEach(button => button.addEventListener("click", () => $("#toolDialog").close()));
}

function printTool(tool) {
  const exp = currentEvent();
  $("#printArea").innerHTML = `
    <div class="print-header">
      <div><h1>Advanced Culinary</h1><p>Tool ${tool.letter}: ${tool.name}</p></div>
      <div><p>Event ${exp.id}: ${exp.short}</p><p>Student / team: ____________________ Date: ______</p></div>
    </div>
    <p><strong>Owner:</strong> ${tool.owner} &nbsp; <strong>Use:</strong> ${tool.when}</p>
    <div class="print-grid">
      ${tool.fields.map((field, index) => `<section class="print-box ${index === tool.fields.length - 1 ? "wide" : ""}"><strong>${field}</strong><div class="print-lines"></div></section>`).join("")}
      <section class="print-box wide"><strong>Instructor status / approval</strong><p>☐ Continue &nbsp; ☐ Revise &nbsp; ☐ Stop / reassess &nbsp; Signature: ____________________</p></section>
    </div>`;
  window.print();
}

let activeTopic = 0;
function renderLearning(search = "") {
  const term = search.trim().toLowerCase();
  const matches = learningTopics.map((topic, index) => ({topic, index})).filter(({topic}) => JSON.stringify(topic).toLowerCase().includes(term));
  if (!matches.some(item => item.index === activeTopic)) activeTopic = matches[0]?.index || 0;
  $("#topicNav").innerHTML = matches.length ? matches.map(({topic, index}) => `<button class="${index === activeTopic ? "active" : ""}" data-topic="${index}">${topic.title}</button>`).join("") : "<p class='field-help'>No matching learning area.</p>";
  if (!matches.length) {
    $("#topicReader").innerHTML = "<h2>No results</h2><p>Try a broader production need or ask your instructor which topic applies.</p>";
    return;
  }
  const topic = learningTopics[activeTopic];
  const relatedReferences = sourceCatalog.references.filter(reference => {
    const text = `${reference.topic} ${reference.type} ${reference.coreIdea} ${reference.advancedFunction}`.toLowerCase();
    return topic.triggers.some(trigger => text.includes(trigger)) || (topic.id === "business" && /cost|yield|portion|recipe conversion|apq|epq|waste/.test(text));
  }).slice(0, 8);
  const categoryMatches = recipeCategoriesByTopic[topic.id] || [];
  const relatedRecipes = sourceCatalog.recipes.filter(recipe => !categoryMatches.length || categoryMatches.includes(recipe.category));
  $("#topicReader").innerHTML = `
    <p class="eyebrow">Connected learning area</p>
    <h2>${topic.title}</h2>
    <p>${topic.purpose}</p>
    <div class="topic-tags">${topic.triggers.map(item => `<span>${item}</span>`).join("")}</div>
    <h3>Questions that guide the deep dive</h3>
    <ul>${topic.questions.map(item => `<li>${item}</li>`).join("")}</ul>
    <h3>Where the learning may come from</h3>
    <ul>${topic.sources.map(item => `<li>${item}</li>`).join("")}</ul>
    ${relatedReferences.length ? `<h3>Course quick references</h3><div class="related-reference-list">${relatedReferences.map(reference => `<button class="reference-jump" data-reference-jump="${escapeHtml(reference.topic)}"><strong>${escapeHtml(reference.topic)}</strong><span>${escapeHtml(reference.coreIdea)}</span></button>`).join("")}</div>` : ""}
    ${relatedRecipes.length ? `<p class="source-note"><strong>${relatedRecipes.length} source recipes and formulas are indexed for this learning area.</strong> Examples include ${relatedRecipes.slice(0, 5).map(recipe => escapeHtml(recipe.name)).join(", ")}. Open Recipe Studio to search the full source bank.</p>` : ""}
    <p class="source-note"><strong>Source rule:</strong> ProStart Second Edition and instructor-approved course materials provide the specific information. The event supplies the reason and the place to apply it.</p>
    <button class="button primary" data-view-target="workspace" data-open-phase="learn">Return to the Learn phase →</button>`;
  $$("[data-topic]").forEach(button => button.addEventListener("click", () => {
    activeTopic = Number(button.dataset.topic);
    renderLearning($("#learningSearch").value);
  }));
  $$('[data-reference-jump]', $("#topicReader")).forEach(button => button.addEventListener("click", () => {
    showView("reference");
    $("#referenceSearch").value = button.dataset.referenceJump;
    renderReferences(button.dataset.referenceJump, $("#referenceType").value);
  }));
  bindDynamicButtons($("#topicReader"));
}

function renderReferences(search = "", type = "") {
  const term = search.trim().toLowerCase();
  const operating = quickReferences.map((reference, index) => ({ ...reference, id: `O${index + 1}`, type: "Operating standards", coreIdea: reference.steps.join(" "), operating: true }));
  const entries = [...operating, ...sourceCatalog.references].filter(reference => {
    const text = JSON.stringify(reference).toLowerCase();
    return (!term || text.includes(term)) && (!type || reference.type === type);
  });
  $("#referenceSummary").textContent = `${entries.length} of ${operating.length + sourceCatalog.references.length} references shown`;
  $("#referenceGrid").innerHTML = entries.length ? entries.map(reference => `
    <article class="reference-card">
      <div class="reference-card-top"><span class="ref-number">${escapeHtml(reference.id)}</span><span class="reference-type">${escapeHtml(reference.type)}</span></div>
      <h2>${escapeHtml(reference.topic || reference.title)}</h2>
      ${reference.operating ? `<ol>${reference.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>` : `<p>${escapeHtml(reference.coreIdea)}</p><dl class="reference-meta"><div><dt>Use in Advanced</dt><dd>${escapeHtml(reference.advancedFunction)}</dd></div><div><dt>Course route</dt><dd>${escapeHtml(reference.primaryCourse)} · ${escapeHtml(reference.placement)}</dd></div></dl>`}
    </article>`).join("") : '<div class="empty-state"><strong>No matching reference.</strong><p>Try a broader method, ingredient, or calculation.</p></div>';
}

async function loadSourceCatalog() {
  const response = await fetch("./data/advanced-recipe-source-catalog.json");
  if (!response.ok) throw new Error("Source catalog unavailable");
  sourceCatalog = await response.json();
}

function sourceRecipeUseOptions() {
  const uses = new Set();
  sourceCatalog.recipes.forEach(recipe => String(recipe.eventUses || "").split(";").map(value => value.trim()).filter(Boolean).forEach(value => uses.add(value)));
  return [...uses].sort();
}

function renderSourceBank(search = "", category = "", eventUse = "") {
  const term = search.trim().toLowerCase();
  const matches = sourceCatalog.recipes.filter(recipe => {
    const text = JSON.stringify(recipe).toLowerCase();
    return (!term || text.includes(term)) && (!category || recipe.category === category) && (!eventUse || String(recipe.eventUses).split(";").map(value => value.trim()).includes(eventUse));
  });
  const displayed = matches.slice(0, 48);
  const productionReady = matches.filter(recipe => recipe.databaseStatus === "Approved for production").length;
  $("#sourceBankSummary").innerHTML = `<strong>${matches.length} of ${sourceCatalog.recipes.length} source recipes match${matches.length > displayed.length ? ` · showing the first ${displayed.length}` : ""}</strong><span>${productionReady} production-approved · ${matches.length - productionReady} require transcription and teacher approval</span>`;
  $("#sourceRecipeGrid").innerHTML = matches.length ? displayed.map(recipe => `
    <article class="source-recipe-card">
      <div class="source-recipe-card-top"><span>${escapeHtml(recipe.id)}</span><strong>Priority ${Number(recipe.priority || 2)}</strong></div>
      <h3>${escapeHtml(recipe.name)}</h3>
      <p>${escapeHtml(recipe.category)} · ${escapeHtml(recipe.subcategory)}</p>
      <dl><div><dt>Captured yield</dt><dd>${escapeHtml(recipe.capturedYield || "Verify from source")}</dd></div><div><dt>Likely event use</dt><dd>${escapeHtml(recipe.eventUses)}</dd></div><div><dt>Course route</dt><dd>${escapeHtml(recipe.courseRoute)}</dd></div></dl>
      <div class="source-status">Source captured · production approval still required</div>
      <button class="text-link" type="button" data-use-source-recipe="${escapeHtml(recipe.id)}">Use as a research starting point →</button>
    </article>`).join("") : '<div class="empty-state"><strong>No matching source recipe.</strong><p>Try a broader product, category, or event use.</p></div>';
  $$('[data-use-source-recipe]', $("#sourceRecipeGrid")).forEach(button => button.addEventListener("click", () => useSourceRecipe(button.dataset.useSourceRecipe)));
}

function useSourceRecipe(recipeId) {
  const recipe = sourceCatalog.recipes.find(item => item.id === recipeId);
  if (!recipe) return;
  const openCandidate = [1, 2, 3].find(number => !document.querySelector(`[data-candidate="${number}-0"]`)?.value) || 1;
  $(`[data-candidate="${openCandidate}-0"]`).value = recipe.name;
  $(`[data-candidate="${openCandidate}-1"]`).value = `Course source ${recipe.sourceImages}`;
  $(`[data-candidate="${openCandidate}-2"]`).value = `${recipe.eventUses}; ${recipe.courseRoute}`;
  $(`[data-candidate="${openCandidate}-3"]`).value = `Captured yield: ${recipe.capturedYield || "verify from source"}. Ingredients, procedure, equipment, allergens, and current supplier pricing must be checked before production approval.`;
  $("#recipeName").value ||= recipe.name;
  $("#recipeSearchTerms").value ||= recipe.name;
  $("#recipeCourseConnection").value ||= recipe.courseAlignment || recipe.courseRoute;
  $("#recipeMessage").textContent = `${recipe.name} was added as Possibility ${openCandidate}. It is a source candidate, not an approved production recipe.`;
  updateRecipeSummary();
  $(".recipe-workspace").scrollIntoView({ behavior: "smooth", block: "start" });
}

function initializeSourceControls() {
  const categories = [...new Set(sourceCatalog.recipes.map(recipe => recipe.category))].sort();
  $("#sourceRecipeCategory").innerHTML += categories.map(category => `<option>${escapeHtml(category)}</option>`).join("");
  $("#sourceRecipeUse").innerHTML += sourceRecipeUseOptions().map(use => `<option>${escapeHtml(use)}</option>`).join("");
  const referenceTypes = ["Operating standards", ...new Set(sourceCatalog.references.map(reference => reference.type))].sort();
  $("#referenceType").innerHTML += referenceTypes.map(type => `<option>${escapeHtml(type)}</option>`).join("");
  renderSourceBank();
}

let liveRecipeEvents = [];
let recipeSubmissions = [];

function renderRecipeEventOptions() {
  const select = $("#recipeExperience");
  const previous = select.value || localStorage.getItem("advancedRecipeEvent") || "";
  select.innerHTML = liveRecipeEvents.length
    ? liveRecipeEvents.map(event => `<option value="${event.id}">${event.name} · ${event.serviceDate || "Date pending"}</option>`).join("")
    : '<option value="">No published Event Orders available</option>';
  if (liveRecipeEvents.some(event => String(event.id) === previous)) select.value = previous;
}

function renderRecipeWorkspace() {
  renderRecipeEventOptions();
  $("#techniqueChoices").innerHTML = techniques.map((technique, index) => `<label><input type="checkbox" data-technique="${index}" /> ${technique}</label>`).join("");
  $("#candidateGrid").innerHTML = [1, 2, 3].map(number => `
    <article class="candidate-card"><h3>Possibility ${number}</h3>
      ${candidateFields.map((field, index) => `<label>${field}${index > 1 ? `<textarea rows="3" data-candidate="${number}-${index}"></textarea>` : `<input data-candidate="${number}-${index}" ${index === 1 ? 'type="url"' : ""} />`}</label>`).join("")}
    </article>`).join("");
  loadRecipeExperience($("#recipeExperience").value);
}
function recipeStorage() { try { return JSON.parse(localStorage.getItem("advancedRecipeStudioV3") || "{}"); } catch { return {}; } }
function collectRecipeData() {
  const fields = ["recipeOccasion", "recipeCount", "recipeBudget", "recipeService", "recipeTime", "recipeNeeds", "recipeCourseConnection", "recipeSearchTerms", "recipeSelection", "recipeApproval", "recipeTestNotes", "recipeName", "recipeYield", "recipePortion", "recipeIngredients", "recipeEquipment", "recipeProcedure", "recipeAllergens"];
  const data = Object.fromEntries(fields.map(id => [id, $("#" + id).value]));
  data.techniques = $$("[data-technique]").filter(box => box.checked).map(box => box.dataset.technique);
  data.candidates = {}; $$("[data-candidate]").forEach(field => data.candidates[field.dataset.candidate] = field.value);
  const latest = latestRecipeSubmission($("#recipeExperience").value);
  if (latest?.status === "Returned for revision") {
    data.parentSubmissionId = latest.id;
    data.threadId = latest.threadId || latest.id;
    data.revision = Number(latest.revision || 1) + 1;
  }
  return data;
}
function fillRecipeData(data = {}) {
  ["recipeOccasion", "recipeCount", "recipeBudget", "recipeService", "recipeTime", "recipeNeeds", "recipeCourseConnection", "recipeSearchTerms", "recipeSelection", "recipeTestNotes", "recipeName", "recipeYield", "recipePortion", "recipeIngredients", "recipeEquipment", "recipeProcedure", "recipeAllergens"].forEach(id => $("#" + id).value = data[id] || "");
  $("#recipeApproval").value = data.recipeApproval || "Researching";
  $$("[data-technique]").forEach(box => box.checked = (data.techniques || []).includes(box.dataset.technique));
  $$("[data-candidate]").forEach(field => field.value = (data.candidates || {})[field.dataset.candidate] || "");
  updateRecipeSummary();
}
function loadRecipeExperience(id) {
  const saved = recipeStorage()[id];
  const returned = latestRecipeSubmission(id);
  const recovered = returned?.status === "Returned for revision" ? {
    recipeName: returned.name, recipeYield: returned.yield, recipePortion: returned.portion,
    recipeIngredients: (returned.ingredients || []).join("\n"), recipeEquipment: (returned.equipment || []).join("\n"),
    recipeProcedure: (returned.procedure || []).join("\n"), recipeAllergens: returned.allergens,
    recipeTestNotes: returned.testNotes, recipeApproval: "Returned for revision"
  } : {};
  fillRecipeData(saved || recovered);
  $("#recipeMessage").textContent = saved ? "Saved work loaded for this event." : returned?.status === "Returned for revision" ? "The returned recipe and teacher feedback were restored for revision." : "No saved work yet for this event.";
  renderStudentReviewStatus();
}
function latestRecipeSubmission(eventId) {
  return recipeSubmissions.filter(item => String(item.eventId) === String(eventId)).sort((a, b) => Number(b.revision || 1) - Number(a.revision || 1) || String(b.submittedAt).localeCompare(String(a.submittedAt)))[0] || null;
}
function setRecipeLocked(locked) {
  $$("#recipeForm input, #recipeForm textarea, #recipeForm select, #recipeForm button").forEach(control => {
    if (control.id === "recipeExperience" || control.id === "copyRecipe") return;
    control.disabled = locked;
  });
}
function renderStudentReviewStatus() {
  const status = $("#recipeReviewStatus");
  const submission = latestRecipeSubmission($("#recipeExperience").value);
  if (!submission) {
    status.dataset.status = "draft";
    status.innerHTML = '<strong>Draft</strong><p>Your saved work stays on this device until you submit it for teacher review.</p>';
    setRecipeLocked(false);
    return;
  }
  const canRevise = submission.status === "Returned for revision";
  const locked = ["Awaiting review", "Approved", "Declined", "Revised and resubmitted"].includes(submission.status);
  const history = recipeSubmissions.filter(item => (item.threadId || item.id) === (submission.threadId || submission.id)).sort((a, b) => Number(a.revision || 1) - Number(b.revision || 1));
  const historyText = history.length > 1 ? `<p><b>History:</b> ${history.map(item => `revision ${Number(item.revision || 1)} — ${escapeHtml(item.status)}`).join("; ")}</p>` : "";
  status.dataset.status = submission.status.toLowerCase().replaceAll(" ", "-");
  status.innerHTML = `<strong>${escapeHtml(submission.status)} · revision ${Number(submission.revision || 1)}</strong><p>${submission.reviewNote ? `<b>Teacher feedback:</b> ${escapeHtml(submission.reviewNote)}` : submission.status === "Awaiting review" ? "This submitted version is locked while your teacher reviews it." : submission.status === "Approved" ? "This version is now in the approved recipe library. Your teacher decides whether to add it to the Event Order." : "No teacher note has been added yet."}</p>${canRevise ? "<p>Edit the draft below and submit a new revision. The earlier version and feedback remain in its history.</p>" : ""}${historyText}`;
  setRecipeLocked(locked);
  $("#recipeApproval").value = submission.status === "Approved" ? "Approved for production" : submission.status;
}
async function loadRecipeReviewData() {
  const [eventResponse, submissionResponse] = await Promise.all([fetch("/api/student/events"), fetch("/api/recipe-submissions")]);
  if (eventResponse.ok) liveRecipeEvents = (await eventResponse.json()).events || [];
  if (submissionResponse.ok) recipeSubmissions = (await submissionResponse.json()).submissions || [];
  renderRecipeEventOptions();
  loadRecipeExperience($("#recipeExperience").value);
}
function recipeSummaryText() {
  const data = collectRecipeData();
  const liveEvent = liveRecipeEvents.find(item => String(item.id) === $("#recipeExperience").value);
  const exp = liveEvent ? { short: liveEvent.name } : { short: "Event not selected" };
  const selectedTechniques = data.techniques.map(index => techniques[Number(index)]).join(", ") || "Not selected";
  const possibilities = [1, 2, 3].map(number => `Possibility ${number}: ${data.candidates[`${number}-0`] || "Not entered"}\nSource: ${data.candidates[`${number}-1`] || "No source"}\nFit: ${data.candidates[`${number}-2`] || "No rationale"}\nFeasibility: ${data.candidates[`${number}-3`] || "No concerns recorded"}`).join("\n\n");
  return `${exp.short}

EVENT / RECIPIENT
Occasion or recipient: ${data.recipeOccasion || "Not entered"}
Count: ${data.recipeCount || "Not entered"}
Cost boundary: ${data.recipeBudget || "Not entered"}
Service / packaging: ${data.recipeService || "Not entered"}
Production time: ${data.recipeTime || "Not entered"}
Dietary needs and allergens: ${data.recipeNeeds || "Not entered"}

CONNECTED LEARNING
Selected learning: ${selectedTechniques}
Assigned topic / stretch: ${data.recipeCourseConnection || "Not entered"}

RESEARCH
${possibilities}

TEST AND APPROVAL
Selection: ${data.recipeSelection || "Not selected"}
Status: ${data.recipeApproval || "Researching"}
Test / revision / quality notes: ${data.recipeTestNotes || "Not entered"}

STANDARDIZED RECIPE DRAFT
Recipe: ${data.recipeName || "Not entered"}
Yield: ${data.recipeYield || "Not entered"}
Portion / package: ${data.recipePortion || "Not entered"}
Ingredients:\n${data.recipeIngredients || "Not entered"}
Equipment:\n${data.recipeEquipment || "Not entered"}
Procedure:\n${data.recipeProcedure || "Not entered"}
Allergens and controls: ${data.recipeAllergens || "Not entered"}`;
}
function updateRecipeSummary() { $("#recipeSummary").textContent = recipeSummaryText(); }
async function copyText(text, target) {
  try { await navigator.clipboard.writeText(text); target.textContent = "Copied."; }
  catch {
    const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); target.textContent = "Copied.";
  }
}
function bindRecipeEvents() {
  $("#recipeExperience").addEventListener("change", event => { localStorage.setItem("advancedRecipeEvent", event.target.value); loadRecipeExperience(event.target.value); });
  $("#recipeForm").addEventListener("input", updateRecipeSummary);
  $("#recipeForm").addEventListener("submit", event => {
    event.preventDefault(); const store = recipeStorage(); store[$("#recipeExperience").value] = collectRecipeData();
    localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store)); $("#recipeMessage").textContent = "Saved on this device for this event."; updateRecipeSummary();
  });
  $("#copyRecipe").addEventListener("click", () => copyText(recipeSummaryText(), $("#recipeMessage")));
  $("#submitRecipeForReview").addEventListener("click", async () => {
    const data = collectRecipeData();
    const event = liveRecipeEvents.find(item => String(item.id) === $("#recipeExperience").value);
    if (!event) { $("#recipeMessage").textContent = "Choose a published Event Order before submitting."; return; }
    const sources = [1, 2, 3].map(number => [data.candidates[`${number}-0`], data.candidates[`${number}-1`]].filter(Boolean).join(": ")).filter(Boolean);
    const response = await fetch("/api/recipe-submissions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
      name: data.recipeName, yield: data.recipeYield, portion: data.recipePortion,
      ingredients: data.recipeIngredients, equipment: data.recipeEquipment, procedure: data.recipeProcedure,
      eventId: event.id, eventName: event.name, parentSubmissionId: data.parentSubmissionId, threadId: data.threadId, revision: data.revision,
      allergens: data.recipeAllergens || data.recipeNeeds, sourceNotes: sources.join("\n"), testNotes: data.recipeTestNotes
    }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { $("#recipeMessage").textContent = result.error || "Recipe could not be submitted."; return; }
    data.recipeApproval = "Submitted for teacher review";
    $("#recipeApproval").value = data.recipeApproval;
    const store = recipeStorage(); store[$("#recipeExperience").value] = data; localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store));
    $("#recipeMessage").textContent = "Submitted to the teacher recipe approval queue."; updateRecipeSummary();
    await loadRecipeReviewData();
  });
  $("#clearRecipe").addEventListener("click", () => {
    if (!window.confirm("Clear the Recipe Studio work saved for this event?")) return;
    const store = recipeStorage(); delete store[$("#recipeExperience").value]; localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store)); fillRecipeData({}); $("#recipeMessage").textContent = "This event was cleared.";
  });
  $("#webRecipeSearch").addEventListener("click", () => {
    const query = $("#recipeSearchTerms").value.trim() || [$("#recipeOccasion").value, $("#recipeNeeds").value, $("#recipeCourseConnection").value, "recipe"].filter(Boolean).join(" ");
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query || "professional recipe")}`, "_blank", "noopener");
  });
}

function bindDynamicButtons(root = document) {
  $$("[data-view-target]", root).forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      showView(button.dataset.viewTarget);
      if (button.dataset.openPhase) openPhase(button.dataset.openPhase);
    });
  });
  $$("[data-tool]", root).forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => openTool(button.dataset.tool));
  });
}

async function init() {
  await loadSourceCatalog().catch(() => {
    sourceCatalog = { recipes: [], references: [], statusNote: "The source bank is temporarily unavailable." };
  });
  renderEventSelector();
  renderHome();
  renderWorkspace();
  renderLearning();
  renderReferences();
  renderRecipeWorkspace();
  initializeSourceControls();
  bindRecipeEvents();
  bindDynamicButtons();
  loadRecipeReviewData().catch(() => { $("#recipeReviewStatus").innerHTML = "<strong>Status unavailable</strong><p>Saved work is still available on this device. Refresh to reconnect to the review queue.</p>"; });

  $("#menuButton").addEventListener("click", () => {
    const open = $("#primaryNav").classList.toggle("open");
    $("#menuButton").setAttribute("aria-expanded", String(open));
  });
  $("#eventSelect").addEventListener("change", event => setCurrentEvent(event.target.value));
  $$(".phase-tab").forEach(tab => tab.addEventListener("click", () => openPhase(tab.dataset.phase)));
  $("#continueWork").addEventListener("click", () => { showView("workspace"); openPhase(eventRecord().phase || nextIncompletePhase(eventRecord())); });
  $("#openCurrentPhase").addEventListener("click", () => { showView("workspace"); openPhase(eventRecord().phase || nextIncompletePhase(eventRecord())); });
  $("#learningSearch").addEventListener("input", event => renderLearning(event.target.value));
  const updateSourceBank = () => renderSourceBank($("#sourceRecipeSearch").value, $("#sourceRecipeCategory").value, $("#sourceRecipeUse").value);
  $("#sourceRecipeSearch").addEventListener("input", updateSourceBank);
  $("#sourceRecipeCategory").addEventListener("change", updateSourceBank);
  $("#sourceRecipeUse").addEventListener("change", updateSourceBank);
  const updateReferences = () => renderReferences($("#referenceSearch").value, $("#referenceType").value);
  $("#referenceSearch").addEventListener("input", updateReferences);
  $("#referenceType").addEventListener("change", updateReferences);
  $$("[data-close-modal]").forEach(button => button.addEventListener("click", () => $("#" + button.dataset.closeModal).close()));
  $("#toolDialog").addEventListener("click", event => { if (event.target === $("#toolDialog")) $("#toolDialog").close(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && $("#toolDialog").open) $("#toolDialog").close(); });
}

init();

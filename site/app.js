const openingUnit = {
  id: "launch",
  short: "Food Handler Certification",
  timing: "September",
  focus: "Safety clearance to produce food for sale",
  challenge: "Review food and kitchen safety, learn how this class and app operate, then earn ServSafe Food Handler certification so you can produce for customers.",
  kind: "opening",
  needs: ["Food safety", "Workplace safety", "Kitchen basics", "Course operations"]
};

const launchSteps = [
  {
    id: "orient",
    title: "How this class and app work",
    kicker: "Step 1 · Orientation",
    intro: "Advanced Culinary runs on authentic customer work and classroom preparation. Today holds Event Orders. Classwork holds your unit path. Learning supports lectures, demos, and menu problems.",
    actions: [
      "Identify the two tracks: Events (customer Event Orders on Today) and Classwork (classroom path).",
      "Open Learning and Reference so you know where to follow a lecture or look up a standard.",
      "Confirm that certification comes before producing food for sale to a customer.",
      "Ask clarifying questions about teams, kitchens, classroom work, and how updates reach your chef."
    ],
    protocolTitle: "How the year is organized",
    protocol: [
      "Smaller catering Event Orders build technique and standards toward the six comprehensive assessment experiences.",
      "Some students work in the kitchen on an Event Order while others work Classwork in the classroom—the tracks correspond.",
      "Teacher lectures and demos often use Learning as the follow-along guide.",
      "After the opening unit, every comprehensive assessment uses the same six-phase Classwork cycle."
    ],
    callout: "You are learning the operating system of the class before you cook for a paying or school customer."
  },
  {
    id: "food-safety",
    title: "Food safety review",
    kicker: "Step 2 · Food safety",
    intro: "Revisit the controls that keep customers safe: contamination, personal hygiene, temperature, allergens, and holding. This review prepares you for the Food Handler exam.",
    actions: [
      "Identify common foodborne illness risks and how personal hygiene prevents contamination.",
      "Explain time and temperature controls for receiving, storing, cooking, holding, cooling, and reheating.",
      "Name major allergens and the cross-contact controls your station must follow.",
      "Complete the assigned ProStart / instructor food-safety review materials."
    ],
    protocolTitle: "Food safety standard",
    protocol: [
      "Unsafe food never leaves the kitchen.",
      "If you are unsure about a temperature, allergen, or contamination risk, stop and ask before continuing.",
      "Certification proves readiness to produce for customers—it does not replace daily vigilance."
    ],
    callout: "Food Handler clearance is the gate to customer production in this course.",
    view: "learning"
  },
  {
    id: "workplace-safety",
    title: "Kitchen and workplace safety",
    kicker: "Step 3 · Workplace safety",
    intro: "Professional kitchens demand fire awareness, equipment safety, knife discipline, and emergency response—not only food sanitation.",
    actions: [
      "Identify kitchen workplace hazards and the correct response for burns, cuts, slips, and fires.",
      "Review knife safety and why uniform cuts protect quality and reduce injury risk.",
      "Locate fire safety equipment and explain emergency procedures for your kitchen.",
      "Complete the assigned workplace-safety review or demonstration."
    ],
    protocolTitle: "Workplace safety standard",
    protocol: [
      "Stop unsafe work immediately and protect people first.",
      "Report injuries and near-misses to the instructor without delay.",
      "Equipment is used only after you can name its hazard and correct setup."
    ],
    callout: "A certified food handler still owes the team a safe workstation.",
    view: "reference"
  },
  {
    id: "kitchen-basics",
    title: "Kitchen basics for Advanced",
    kicker: "Step 4 · Kitchen basics",
    intro: "Confirm mise en place, standardized recipes, station setup, and the flow between classroom preparation and kitchen production.",
    actions: [
      "Define mise en place for an Advanced production station.",
      "Explain how a standardized recipe, yield, and portion protect the customer promise.",
      "Practice setting a workstation from an assigned recipe or demo.",
      "Connect Classwork preparation to the Event Order you will eventually cook."
    ],
    protocolTitle: "Readiness before labor",
    protocol: [
      "Foundations from Culinary 1 & 2 are reverified here, then applied at greater complexity.",
      "A station is ready when ingredients, tools, controls, and first actions are clear.",
      "Classroom Classwork and kitchen Event Orders are separate desks that serve the same job."
    ],
    callout: "Basics are not busywork—they are the difference between a safe sale and a scramble."
  },
  {
    id: "exam-prep",
    title: "Exam readiness check",
    kicker: "Step 5 · Ready to test",
    intro: "Before the ServSafe Food Handler exam, confirm weak spots, complete assigned practice, and know the testing expectations.",
    actions: [
      "Complete instructor-assigned practice or review for the Food Handler exam.",
      "List any topics you still need clarified and resolve them with the teacher.",
      "Confirm testing date, materials, and accommodations with your instructor.",
      "Arrive prepared to demonstrate professional food-handler knowledge."
    ],
    protocolTitle: "Exam expectations",
    protocol: [
      "The Food Handler exam is a credential gate for customer production this year.",
      "Honest preparation beats last-minute guessing.",
      "If you do not pass on the first attempt, follow the instructor’s retest plan before kitchen production for sale."
    ],
    callout: "Clearance is earned—then protected every service day."
  },
  {
    id: "certify",
    title: "Earn Food Handler certification",
    kicker: "Step 6 · Certification",
    intro: "Take the ServSafe Food Handler examination. Passing clears you to produce food for customer Event Orders under course supervision.",
    actions: [
      "Complete the ServSafe Food Handler exam under instructor direction.",
      "Record your result with the teacher and keep evidence for your portfolio.",
      "If returned for retest, complete the assigned remediation before kitchen production for sale.",
      "After clearance, open Experience 01 and begin the comprehensive assessment cycle."
    ],
    protocolTitle: "After certification",
    protocol: [
      "Certified students may enter customer production on published Event Orders.",
      "Simple catering Event Orders continue to teach technique between the six major assessments.",
      "The next Classwork focus is Professional Kitchen Launch—the first comprehensive assessment experience."
    ],
    callout: "Certification opens the year. The six major experiences become your main assessments."
  }
];

const experiences = [
  {
    id: 1,
    short: "Professional Kitchen Launch",
    timing: "September–October",
    focus: "Readiness, station systems, consistent execution",
    challenge: "Produce and serve safe, consistent small bites for an authentic or approved school audience at the promised service time.",
    kind: "assessment",
    needs: ["Kitchen systems", "Garde manger and presentation", "Quality calibration", "Service timing"]
  },
  {
    id: 2,
    short: "Preorder Pop-Up Bakery",
    timing: "November–December",
    focus: "Scaling, scheduling, packaging, fulfillment",
    challenge: "Convert known demand into consistent baked products, accurate orders, responsible ingredient use, and on-time fulfillment.",
    kind: "assessment",
    needs: ["Baking and pastry", "Formula scaling and yield", "Batch scheduling", "Packaging and labeling"]
  },
  {
    id: 3,
    short: "Seasonal Lunch Service",
    timing: "January–February",
    focus: "Menu balance, holding, coordinated components",
    challenge: "Build and deliver a cohesive seasonal meal whose components meet an approved recipient’s needs, quantity, and schedule.",
    kind: "assessment",
    needs: ["Stocks, soups, and sauces", "Vegetables and starches", "Menu balance", "Holding and transport"]
  },
  {
    id: 4,
    short: "Fast-Casual Pop-Up",
    timing: "February–March",
    focus: "Order flow, hospitality, speed, accuracy",
    challenge: "Deliver customized food efficiently without sacrificing safety, consistency, hospitality, or order accuracy.",
    kind: "assessment",
    needs: ["Batch production", "Station flow", "Hospitality and service", "Replenishment and waste"]
  },
  {
    id: 5,
    short: "Client Catering",
    timing: "March–April",
    focus: "Protein cookery, client needs, leadership",
    challenge: "Coordinate a complete catered menu built around safe, appropriate protein fabrication and cookery for a fixed client deadline.",
    kind: "assessment",
    needs: ["Meat, poultry, or seafood", "Fabrication and yield", "Sauces and accompaniments", "Catering and leadership"]
  },
  {
    id: 6,
    short: "Operations Capstone",
    timing: "May–June",
    focus: "Full-cycle planning, production, service, closeout",
    challenge: "Complete the client-centered production cycle with the greatest feasible student ownership while meeting every safety and delivery commitment.",
    kind: "assessment",
    needs: ["Integrated menu work", "Production leadership", "Quality and hospitality", "Evidence and improvement"]
  }
];

const launchStepOrder = launchSteps.map(step => step.id);

const phaseOrder = ["brief", "learn", "plan", "produce", "close", "improve"];
const phaseContent = {
  brief: {
    title: "Understand the promise",
    kicker: "Phase 1 · Brief",
    intro: "When a Live Event Order is published on Today, read that packet first. Know exactly what the department has accepted before menu ideas become production work. Do not retype the chef’s brief into a blank form.",
    actions: [
      "Open Today and read the published Event Order commitment, menu, allergens, quantity, and service time.",
      "Confirm budget, dietary needs, packaging, equipment, storage, and delivery expectations for your section.",
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
    tools: []
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
    callout: "Do not browse disconnected chapters. Start with the production or lesson need, find the connected learning, then return to Classwork or Today.",
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
    tools: []
  },
  produce: {
    title: "Produce, communicate, and protect the standard",
    kicker: "Phase 4 · Produce",
    intro: "Produce on the published Event Order on Today. Classwork here is about readiness, standards, and evidence—not a second copy of the station desk.",
    actions: [
      "Confirm your Event Order station assignment on Today before cooking.",
      "Track milestones and report status, delay, shortage, risk, or quality concerns early on the Event desk.",
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
    tools: []
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
    tools: []
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
    tools: []
  }
};

const learningTopics = [
  {
    id: "systems",
    title: "Professional Kitchen Systems",
    triggers: ["timeline", "mise en place", "station", "equipment", "closing", "communication"],
    purpose: "Use when the event requires coordinated people, equipment, ingredients, milestones, shared space, and complete closeout.",
    questions: ["What must be ready before production?", "Which work depends on another task?", "Where can delay be detected early?", "How will closing finish before class ends?"],
    sources: ["Instructor station-system lesson", "Assigned ProStart Second Edition material", "Live production station plan", "Focused readiness or workflow lab"]
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
    sources: ["Assigned ProStart Second Edition hospitality material", "Live Event Order", "Packaging and handoff test", "Instructor-approved service plan"]
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
let activeTopic = 0;
const recipeCategoriesByTopic = {
  baking: ["Breads and yeast doughs", "Pastry, cakes, and desserts"],
  produce: ["Grains, pasta, and legumes", "Potatoes"],
  soups: ["Stocks and sauces", "Soups", "Dressings and flavored oils", "Dips, relishes, and condiments"],
  business: [], service: [], nutrition: [], proteins: []
};

const candidateFields = ["Product or concept", "Source URL / book / chef", "Why it fits the event", "Feasibility concerns"];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const eventKey = () => String($("#eventSelect")?.value || localStorage.getItem("advancedCurrentEvent") || "launch");
const isLaunchKey = id => String(id) === "launch";

function getState() {
  try { return JSON.parse(localStorage.getItem("advancedEventStateV3") || "{}"); }
  catch { return {}; }
}
function saveState(state) { localStorage.setItem("advancedEventStateV3", JSON.stringify(state)); }
function currentEvent() {
  if (isLaunchKey(eventKey())) return openingUnit;
  return experiences.find(item => String(item.id) === eventKey()) || experiences[0];
}
function eventRecord(id = eventKey()) {
  const state = getState();
  if (isLaunchKey(id)) {
    return state[id] || { phase: launchStepOrder[0], completed: {}, checks: {} };
  }
  return state[id] || { phase: "brief", completed: {}, checks: {} };
}
function updateEventRecord(update, id = eventKey()) {
  const state = getState();
  state[id] = {...eventRecord(id), ...update};
  saveState(state);
  return state[id];
}

function showView(name) {
  $$("[data-view-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === name));
  $$(".nav-link").forEach(link => {
    if (!link.dataset.viewTarget) return;
    link.classList.toggle("active", link.dataset.viewTarget === name);
  });
  $("#primaryNav")?.classList.remove("open");
  $("#menuButton")?.setAttribute("aria-expanded", "false");
  window.scrollTo({top: 0, behavior: "smooth"});
  if (name === "today") renderHome();
  if (name === "workspace") renderWorkspace();
  if (name === "recipes") loadRecipeReviewData().catch(() => {
    $("#recipeReviewStatus").innerHTML = "<strong>Status unavailable</strong><p>Saved work is still available on this device. Refresh to reconnect to the review queue.</p>";
  });
}

function setCurrentEvent(id) {
  localStorage.setItem("advancedCurrentEvent", String(id));
  if ($("#eventSelect")) $("#eventSelect").value = String(id);
  renderHome();
  renderWorkspace();
}

function nextIncompletePhase(record) {
  return phaseOrder.find(phase => !record.completed?.[phase]) || "improve";
}

function nextIncompleteLaunchStep(record) {
  return launchStepOrder.find(step => !record.completed?.[step]) || launchStepOrder[launchStepOrder.length - 1];
}

function classworkNextAction() {
  const exp = currentEvent();
  const record = eventRecord(String(exp.id));
  const returned = actionableRecipeSubmissions().find(item => item.status === "Returned for revision");
  if (returned) return `Revise ${returned.name}: ${returned.reviewNote || "Teacher returned this recipe for revision."}`;
  if (isLaunchKey(exp.id)) {
    const stepId = record.phase || nextIncompleteLaunchStep(record);
    const step = launchSteps.find(item => item.id === stepId) || launchSteps[0];
    const nextIndex = step.actions.findIndex((_, index) => !record.checks?.[`${stepId}-${index}`]);
    return nextIndex >= 0 ? step.actions[nextIndex] : `Complete ${step.title}.`;
  }
  const phase = record.phase || nextIncompletePhase(record);
  const phaseChecks = phaseContent[phase].actions;
  const nextIndex = phaseChecks.findIndex((_, index) => !record.checks?.[`${phase}-${index}`]);
  return nextIndex >= 0 ? phaseChecks[nextIndex] : `Complete the ${phaseContent[phase].title.toLowerCase()} phase.`;
}

function renderHome() {
  const exp = currentEvent();
  const record = eventRecord(String(exp.id));
  const launch = isLaunchKey(exp.id);
  const stepOrPhase = launch
    ? (record.phase || nextIncompleteLaunchStep(record))
    : (record.phase || nextIncompletePhase(record));
  const step = launch ? (launchSteps.find(item => item.id === stepOrPhase) || launchSteps[0]) : null;
  const completeCount = launch
    ? launchStepOrder.filter(item => record.completed?.[item]).length
    : phaseOrder.filter(item => record.completed?.[item]).length;
  const total = launch ? launchStepOrder.length : phaseOrder.length;

  $("#homeEventNumber").textContent = launch ? "00" : String(exp.id).padStart(2, "0");
  $("#homeEventTiming").textContent = exp.timing;
  $("#homeEventTitle").textContent = exp.short;
  $("#homeEventChallenge").textContent = exp.challenge;
  $("#homeTrackLabel").textContent = launch ? "Opening unit" : "Comprehensive assessment";
  $("#homePhaseLabel").textContent = launch ? "Current step" : "Current phase";
  $("#homePhaseName").textContent = launch ? step.title : phaseContent[stepOrPhase].title;
  $("#homeProgress").textContent = `${completeCount} of ${total} ${launch ? "steps" : "phases"}`;
  $("#homeNextAction").textContent = classworkNextAction();
  $("#homeProgressBar").style.width = `${completeCount / total * 100}%`;

  $("#agendaClassEyebrow").textContent = launch ? "Classwork · opening unit" : "Classwork · comprehensive assessment";
  $("#agendaClassTitle").textContent = exp.short;
  $("#agendaClassMeta").textContent = launch
    ? "Food & kitchen safety review, course operations, then ServSafe Food Handler certification."
    : `${exp.timing} · ${exp.focus}`;
  $("#agendaClassAction").textContent = classworkNextAction();

  $("#homeExperienceStrip").innerHTML = [
    `<button class="arc-card ${launch ? "current" : ""}" data-home-event="launch">
      <span>Opening unit</span><strong>${openingUnit.short}</strong><small>${openingUnit.timing}</small>
    </button>`,
    ...experiences.map(item => `
    <button class="arc-card ${!launch && item.id === exp.id ? "current" : ""}" data-home-event="${item.id}">
      <span>Assessment ${item.id}</span><strong>${item.short}</strong><small>${item.timing}</small>
    </button>`)
  ].join("");
  $$("[data-home-event]").forEach(button => button.addEventListener("click", () => {
    setCurrentEvent(button.dataset.homeEvent);
    showView("workspace");
  }));
  renderRecipeActionInbox("#homeRecipeActions", true);
  syncAgendaFromLive();
}

function syncAgendaFromLive() {
  const cache = window.GCSDStudentOps?.getCache?.();
  const event = cache?.events?.[0];
  const title = $("#agendaEventTitle");
  const meta = $("#agendaEventMeta");
  const action = $("#agendaEventAction");
  if (!title || !meta || !action) return;
  if (event) {
    const tier = event.assessmentTier === "comprehensive" ? "Comprehensive assessment event" : "Simple catering Event Order";
    title.textContent = event.name;
    meta.textContent = `${tier} · ${event.customer || "Client"} · ${event.serviceDate || "Date pending"} · ${Number(event.guestCount || 0)} guests`;
    action.textContent = "Read the packet, cook your station, and send short updates on the Event desk.";
  } else if (cache?.error) {
    title.textContent = "Event Order unavailable";
    meta.textContent = cache.error;
    action.textContent = "Use Classwork until the Event desk reconnects.";
  } else {
    title.textContent = "No published Event Order yet";
    meta.textContent = "Simple catering jobs arrive here throughout the year and build toward the six comprehensive assessments.";
    action.textContent = "Start Classwork before the teacher begins, then return here when a job publishes.";
  }
}
window.syncAgendaFromLive = syncAgendaFromLive;

function renderEventSelector() {
  $("#eventSelect").innerHTML = [
    `<option value="launch">Opening · ${openingUnit.short}</option>`,
    ...experiences.map(item => `<option value="${item.id}">Assessment ${item.id}. ${item.short}</option>`)
  ].join("");
  $("#eventSelect").value = localStorage.getItem("advancedCurrentEvent") || "launch";
}

function renderWorkspace() {
  const exp = currentEvent();
  const launch = isLaunchKey(exp.id);
  $("#workspaceEventNumber").textContent = launch ? "00" : String(exp.id).padStart(2, "0");
  $("#workspaceEventTitle").textContent = exp.short;
  $("#workspaceEventFocus").textContent = exp.focus;
  $("#assessmentWorkflow").hidden = launch;
  $("#launchWorkflow").hidden = !launch;
  if (launch) renderLaunchWorkspace();
  else renderAssessmentWorkspace();
  window.GCSDStudentOps?.syncWorkspacePanels?.();
}

function renderAssessmentWorkspace() {
  const record = eventRecord();
  const activePhase = record.phase && phaseOrder.includes(record.phase) ? record.phase : nextIncompletePhase(record);
  const completeCount = phaseOrder.filter(phase => record.completed?.[phase]).length;
  $("#workflowProgressText").textContent = `${completeCount} of 6 phases complete`;
  $("#workflowProgressBar").style.width = `${completeCount / 6 * 100}%`;
  $$(".phase-tab", $("#assessmentWorkflow")).forEach(tab => {
    const active = tab.dataset.phase === activePhase;
    tab.classList.toggle("active", active);
    tab.classList.toggle("complete", !!record.completed?.[tab.dataset.phase]);
    tab.setAttribute("aria-selected", String(active));
  });
  renderPhase(activePhase);
}

function renderLaunchWorkspace() {
  const record = eventRecord("launch");
  const activeStep = record.phase && launchStepOrder.includes(record.phase) ? record.phase : nextIncompleteLaunchStep(record);
  const completeCount = launchStepOrder.filter(step => record.completed?.[step]).length;
  const shortLabels = ["Orient", "Food safety", "Workplace", "Basics", "Exam prep", "Certify"];
  $("#launchProgressText").textContent = `${completeCount} of ${launchStepOrder.length} steps complete`;
  $("#launchProgressBar").style.width = `${completeCount / launchStepOrder.length * 100}%`;
  $("#launchStepTabs").innerHTML = launchSteps.map((step, index) => `
    <button class="phase-tab ${step.id === activeStep ? "active" : ""} ${record.completed?.[step.id] ? "complete" : ""}" role="tab" aria-selected="${step.id === activeStep}" data-launch-step="${step.id}">
      <span>${index + 1}</span><strong>${shortLabels[index]}</strong><small>${step.kicker.replace(/^Step \d+ · /, "")}</small>
    </button>`).join("");
  $$("[data-launch-step]").forEach(tab => tab.addEventListener("click", () => openLaunchStep(tab.dataset.launchStep)));
  renderLaunchStep(activeStep);
}

function openPhase(name, scroll = true) {
  if (isLaunchKey(eventKey())) {
    openLaunchStep(launchStepOrder[0], scroll);
    return;
  }
  updateEventRecord({ phase: name });
  renderWorkspace();
  if (scroll) $("#assessmentWorkflow")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openLaunchStep(name, scroll = true) {
  setCurrentEvent("launch");
  updateEventRecord({ phase: name }, "launch");
  renderWorkspace();
  if (scroll) $("#launchWorkflow")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPhase(name) {
  const phase = phaseContent[name];
  const record = eventRecord();
  const exp = currentEvent();
  const viewButton = phase.view ? `<button class="button secondary" data-view-target="${phase.view}">Open Connected Learning</button>` : "";
  const eventLink = `<button class="button secondary" data-view-target="today" data-scroll-live>Open Event desk on Today</button>`;
  $("#phaseStage").innerHTML = `
    <div class="phase-stage-header">
      <div><p class="eyebrow">${phase.kicker}</p><h2>${phase.title}</h2><p>${phase.intro}</p></div>
      <span class="phase-badge">Assessment · ${exp.short}</span>
    </div>
    <p class="phase-callout"><strong>Events stay on Today.</strong> Classwork prepares and documents the classroom side of the same customer work. Kitchen teams use the Event Order; classroom teams use this path.</p>
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
        <div class="phase-tools">${viewButton}${eventLink}</div>
        <div class="complete-phase">
          <label><input type="checkbox" id="completePhase" ${record.completed?.[name] ? "checked" : ""} /> This phase is complete and the instructor has approved moving forward when approval is required.</label>
        </div>
      </article>
      <aside class="phase-side">
        <p class="eyebrow">${phase.protocolTitle}</p>
        <ol class="protocol-list">${phase.protocol.map(item => `<li>${item}</li>`).join("")}</ol>
        ${name === "learn" ? `<h4>Likely needs for this assessment</h4><ul>${exp.needs.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
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

function renderLaunchStep(name) {
  const step = launchSteps.find(item => item.id === name) || launchSteps[0];
  const record = eventRecord("launch");
  const viewButton = step.view ? `<button class="button secondary" data-view-target="${step.view}">Open ${step.view === "learning" ? "Connected Learning" : "Quick Reference"}</button>` : "";
  $("#launchStage").innerHTML = `
    <div class="phase-stage-header">
      <div><p class="eyebrow">${step.kicker}</p><h2>${step.title}</h2><p>${step.intro}</p></div>
      <span class="phase-badge">Opening unit</span>
    </div>
    <div class="phase-grid">
      <article class="phase-main">
        <h3>What to complete</h3>
        <div class="action-list">
          ${step.actions.map((action, index) => `
            <label class="action-check">
              <input type="checkbox" data-launch-check="${name}-${index}" ${record.checks?.[`${name}-${index}`] ? "checked" : ""} />
              <span>${action}</span>
            </label>`).join("")}
        </div>
        <p class="phase-callout"><strong>Standard:</strong> ${step.callout}</p>
        <div class="phase-tools">${viewButton}</div>
        <div class="complete-phase">
          <label><input type="checkbox" id="completeLaunchStep" ${record.completed?.[name] ? "checked" : ""} /> This step is complete and the instructor has approved moving forward when approval is required.</label>
        </div>
      </article>
      <aside class="phase-side">
        <p class="eyebrow">${step.protocolTitle}</p>
        <ol class="protocol-list">${step.protocol.map(item => `<li>${item}</li>`).join("")}</ol>
      </aside>
    </div>`;
  $$("[data-launch-check]", $("#launchStage")).forEach(box => box.addEventListener("change", () => {
    const fresh = eventRecord("launch");
    const checks = {...fresh.checks, [box.dataset.launchCheck]: box.checked};
    updateEventRecord({checks}, "launch");
    renderHome();
  }));
  $("#completeLaunchStep").addEventListener("change", event => {
    const fresh = eventRecord("launch");
    const completed = {...fresh.completed, [name]: event.target.checked};
    const next = event.target.checked
      ? launchStepOrder[Math.min(launchStepOrder.indexOf(name) + 1, launchStepOrder.length - 1)]
      : name;
    updateEventRecord({completed, phase: next}, "launch");
    if (event.target.checked && name === "certify") {
      // stay on launch until teacher moves them; offer assessment 1 via selector
    }
    renderWorkspace();
    renderHome();
  });
  bindDynamicButtons($("#launchStage"));
}

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
    <button class="button primary" data-view-target="workspace">Return to Classwork →</button>`;
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

function actionableRecipeSubmissions() {
  const latestByThread = new Map();
  [...recipeSubmissions]
    .sort((a, b) => Number(b.revision || 1) - Number(a.revision || 1) || String(b.submittedAt).localeCompare(String(a.submittedAt)))
    .forEach(item => {
      const key = item.threadId || item.id;
      if (!latestByThread.has(key)) latestByThread.set(key, item);
    });
  return [...latestByThread.values()].filter(item => ["Returned for revision", "Awaiting review", "Declined", "Approved"].includes(item.status));
}

function openReturnedRecipe(submissionId, scrollToDraft = true) {
  const submission = recipeSubmissions.find(item => item.id === submissionId) || actionableRecipeSubmissions().find(item => item.id === submissionId);
  if (!submission) return;
  showView("recipes");
  if (submission.eventId && liveRecipeEvents.some(event => String(event.id) === String(submission.eventId))) {
    $("#recipeExperience").value = String(submission.eventId);
    localStorage.setItem("advancedRecipeEvent", String(submission.eventId));
  }
  loadRecipeExperience($("#recipeExperience").value);
  if (scrollToDraft) {
    requestAnimationFrame(() => {
      ($("#recipeReviewStatus") || $(".recipe-workspace"))?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function renderRecipeActionInbox(selector, homeOnlyReturned = false) {
  const host = $(selector);
  if (!host) return;
  const items = actionableRecipeSubmissions().filter(item => !homeOnlyReturned || item.status === "Returned for revision");
  host.hidden = !items.length;
  if (!items.length) {
    host.innerHTML = "";
    return;
  }
  host.innerHTML = items.map(item => {
    const statusKey = String(item.status).toLowerCase().replaceAll(" ", "-");
    const actionLabel = item.status === "Returned for revision" ? "Open and revise →" : item.status === "Awaiting review" ? "View submission →" : "Open recipe →";
    return `<article class="recipe-action-card" data-status="${escapeHtml(statusKey)}">
      <strong>${escapeHtml(item.status)} · ${escapeHtml(item.name)}</strong>
      <p>${escapeHtml(item.eventName || "Event not identified")} · revision ${Number(item.revision || 1)}${item.reviewNote ? ` · Teacher feedback: ${escapeHtml(item.reviewNote)}` : ""}</p>
      <button class="button ${item.status === "Returned for revision" ? "primary" : "secondary"}" type="button" data-open-recipe-submission="${escapeHtml(item.id)}">${actionLabel}</button>
    </article>`;
  }).join("");
  $$("[data-open-recipe-submission]", host).forEach(button => button.addEventListener("click", () => openReturnedRecipe(button.dataset.openRecipeSubmission)));
}

function renderRecipeEventOptions() {
  const select = $("#recipeExperience");
  const returned = actionableRecipeSubmissions().find(item => item.status === "Returned for revision");
  const previous = returned?.eventId || select.value || localStorage.getItem("advancedRecipeEvent") || "";
  select.innerHTML = liveRecipeEvents.length
    ? liveRecipeEvents.map(event => `<option value="${event.id}">${event.name} · ${event.serviceDate || "Date pending"}</option>`).join("")
    : '<option value="">No published Event Orders available</option>';
  if (liveRecipeEvents.some(event => String(event.id) === String(previous))) select.value = String(previous);
  updateRecipeEventSummary();
}

function updateRecipeEventSummary() {
  const summary = $("#recipeEventSummary");
  if (!summary) return;
  const event = liveRecipeEvents.find(item => String(item.id) === String($("#recipeExperience").value));
  if (!event) {
    summary.textContent = "Choose the published Event Order this recipe supports. Guest count, budget, service details, and allergen controls already live on that order.";
    return;
  }
  const parts = [
    event.customer,
    event.guestCount != null ? `${event.guestCount} guests` : null,
    event.serviceFormat,
    event.serviceDate,
    event.budget ? `Budget ${event.budget}` : null
  ].filter(Boolean);
  summary.textContent = parts.length ? parts.join(" · ") : `${event.name} is selected. Event details stay on the Event Order.`;
}

function renderRecipeWorkspace() {
  renderRecipeEventOptions();
  $("#candidateGrid").innerHTML = [1, 2, 3].map(number => `
    <article class="candidate-card"><h3>Possibility ${number}</h3>
      ${candidateFields.map((field, index) => `<label>${field}${index > 1 ? `<textarea rows="3" data-candidate="${number}-${index}"></textarea>` : `<input data-candidate="${number}-${index}" ${index === 1 ? 'type="url"' : ""} />`}</label>`).join("")}
    </article>`).join("");
  loadRecipeExperience($("#recipeExperience").value);
}
function recipeStorage() { try { return JSON.parse(localStorage.getItem("advancedRecipeStudioV3") || "{}"); } catch { return {}; } }
function collectRecipeData() {
  const fields = ["recipeSearchTerms", "recipeSelection", "recipeApproval", "recipeTestNotes", "recipeName", "recipeYield", "recipePortion", "recipeIngredients", "recipeEquipment", "recipeProcedure", "recipeAllergens"];
  const data = Object.fromEntries(fields.map(id => [id, $("#" + id).value]));
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
  ["recipeSearchTerms", "recipeSelection", "recipeTestNotes", "recipeName", "recipeYield", "recipePortion", "recipeIngredients", "recipeEquipment", "recipeProcedure", "recipeAllergens"].forEach(id => $("#" + id).value = data[id] || "");
  $("#recipeApproval").value = data.recipeApproval || "Researching";
  $$("[data-candidate]").forEach(field => field.value = (data.candidates || {})[field.dataset.candidate] || "");
  updateRecipeSummary();
  updateRecipeEventSummary();
}
function loadRecipeExperience(id) {
  const saved = recipeStorage()[id];
  const returned = latestRecipeSubmission(id);
  const recovered = returned ? {
    recipeName: returned.name, recipeYield: returned.yield, recipePortion: returned.portion,
    recipeIngredients: (returned.ingredients || []).join("\n"), recipeEquipment: (returned.equipment || []).join("\n"),
    recipeProcedure: (returned.procedure || []).join("\n"), recipeAllergens: returned.allergens,
    recipeTestNotes: returned.testNotes || saved?.recipeTestNotes || "",
    recipeApproval: returned.status === "Approved" ? "Approved for production" : returned.status === "Awaiting review" ? "Submitted for teacher review" : returned.status
  } : {};
  const merged = returned?.status === "Returned for revision"
    ? { ...(saved || {}), ...recovered, candidates: saved?.candidates || {} }
    : (saved || recovered);
  fillRecipeData(merged);
  $("#recipeMessage").textContent = returned?.status === "Returned for revision"
    ? "Teacher returned this recipe. Review the feedback above, revise the draft, and submit a new revision."
    : saved ? "Saved work loaded for this event." : "No saved work yet for this event.";
  renderStudentReviewStatus();
  renderRecipeActionInbox("#recipeActionInbox");
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
  status.innerHTML = `<strong>${escapeHtml(submission.status)} · ${escapeHtml(submission.name)} · revision ${Number(submission.revision || 1)}</strong><p>${submission.reviewNote ? `<b>Teacher feedback:</b> ${escapeHtml(submission.reviewNote)}` : submission.status === "Awaiting review" ? "This submitted version is locked while your teacher reviews it." : submission.status === "Approved" ? "This version is now in the approved recipe library. Your teacher decides whether to add it to the Event Order." : "No teacher note has been added yet."}</p>${canRevise ? "<p>Edit the draft below and submit a new revision. The earlier version and feedback remain in its history.</p>" : ""}${historyText}`;
  setRecipeLocked(locked);
  $("#recipeApproval").value = submission.status === "Approved" ? "Approved for production" : submission.status === "Awaiting review" ? "Submitted for teacher review" : submission.status;
}
async function loadRecipeReviewData() {
  const [eventResponse, submissionResponse] = await Promise.all([fetch("/api/student/events"), fetch("/api/recipe-submissions")]);
  if (eventResponse.ok) liveRecipeEvents = (await eventResponse.json()).events || [];
  if (submissionResponse.ok) recipeSubmissions = (await submissionResponse.json()).submissions || [];
  renderRecipeEventOptions();
  loadRecipeExperience($("#recipeExperience").value);
  renderRecipeActionInbox("#recipeActionInbox");
  renderRecipeActionInbox("#homeRecipeActions", true);
  if ($(".view.active")?.dataset.viewPanel === "today") renderHome();
}
function recipeSummaryText() {
  const data = collectRecipeData();
  const liveEvent = liveRecipeEvents.find(item => String(item.id) === $("#recipeExperience").value);
  const exp = liveEvent ? { short: liveEvent.name } : { short: "Event not selected" };
  const possibilities = [1, 2, 3].map(number => `Possibility ${number}: ${data.candidates[`${number}-0`] || "Not entered"}\nSource: ${data.candidates[`${number}-1`] || "No source"}\nFit: ${data.candidates[`${number}-2`] || "No rationale"}\nFeasibility: ${data.candidates[`${number}-3`] || "No concerns recorded"}`).join("\n\n");
  return `${exp.short}

EVENT
Published Event Order: ${liveEvent ? `${liveEvent.name}${liveEvent.customer ? ` · ${liveEvent.customer}` : ""}${liveEvent.guestCount != null ? ` · ${liveEvent.guestCount} guests` : ""}` : "Not selected"}

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
  $("#recipeExperience").addEventListener("change", event => { localStorage.setItem("advancedRecipeEvent", event.target.value); updateRecipeEventSummary(); loadRecipeExperience(event.target.value); });
  $("#recipeForm").addEventListener("input", updateRecipeSummary);
  $("#recipeForm").addEventListener("submit", event => {
    event.preventDefault(); const store = recipeStorage(); store[$("#recipeExperience").value] = collectRecipeData();
    localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store)); $("#recipeMessage").textContent = "Saved on this device for this event."; updateRecipeSummary();
  });
  $("#copyRecipe").addEventListener("click", () => copyText(recipeSummaryText(), $("#recipeMessage")));
  $("#submitRecipeForReview").addEventListener("click", async () => {
    const message = $("#recipeMessage");
    const data = collectRecipeData();
    const selectedId = $("#recipeExperience")?.value || "";
    const event = liveRecipeEvents.find(item => String(item.id) === String(selectedId));
    if (!selectedId || !event) {
      message.textContent = "Choose a published Event Order in the Event dropdown before submitting.";
      message.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!String(data.recipeName || "").trim() || !String(data.recipeIngredients || "").trim() || !String(data.recipeProcedure || "").trim()) {
      message.textContent = "Add a recipe title, ingredient list, and procedure before submitting.";
      message.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    message.textContent = "Submitting to the teacher review queue…";
    const sources = [1, 2, 3].map(number => [data.candidates[`${number}-0`], data.candidates[`${number}-1`]].filter(Boolean).join(": ")).filter(Boolean);
    try {
      const response = await fetch("/api/recipe-submissions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
        name: data.recipeName, yield: data.recipeYield, portion: data.recipePortion,
        ingredients: data.recipeIngredients, equipment: data.recipeEquipment, procedure: data.recipeProcedure,
        eventId: event.id, eventName: event.name, parentSubmissionId: data.parentSubmissionId, threadId: data.threadId, revision: data.revision,
        allergens: data.recipeAllergens, sourceNotes: sources.join("\n"), testNotes: data.recipeTestNotes
      }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        message.textContent = result.error || "Recipe could not be submitted.";
        message.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      data.recipeApproval = "Submitted for teacher review";
      $("#recipeApproval").value = data.recipeApproval;
      const store = recipeStorage(); store[$("#recipeExperience").value] = data; localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store));
      message.textContent = "Submitted to the teacher recipe approval queue. Refresh Teacher → Menu to see it awaiting review.";
      updateRecipeSummary();
      await loadRecipeReviewData();
      message.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      message.textContent = "Submission failed. Check your connection and try again.";
      message.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  $("#clearRecipe").addEventListener("click", () => {
    if (!window.confirm("Clear the Recipe Studio work saved for this event?")) return;
    const store = recipeStorage(); delete store[$("#recipeExperience").value]; localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store)); fillRecipeData({}); $("#recipeMessage").textContent = "This event was cleared.";
  });
  $("#webRecipeSearch").addEventListener("click", () => {
    const query = $("#recipeSearchTerms").value.trim() || "professional recipe";
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query || "professional recipe")}`, "_blank", "noopener");
  });
}

function bindDynamicButtons(root = document) {
  $$("[data-view-target]", root).forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      if (button.dataset.scrollLive != null && button.dataset.scrollLive !== "") return;
      if (!button.dataset.viewTarget) return;
      showView(button.dataset.viewTarget);
      if (button.dataset.openPhase) openPhase(button.dataset.openPhase);
    });
  });
}

async function init() {
  await loadSourceCatalog().catch(() => {
    sourceCatalog = { recipes: [], references: [], statusNote: "The source bank is temporarily unavailable." };
  });
  try {
    renderEventSelector();
    renderHome();
    renderWorkspace();
    renderLearning();
    renderReferences();
    renderRecipeWorkspace();
    initializeSourceControls();
    bindRecipeEvents();
  } catch (error) {
    console.error("Student app initialization error:", error);
  }
  bindDynamicButtons();
  loadRecipeReviewData().catch(() => { $("#recipeReviewStatus").innerHTML = "<strong>Status unavailable</strong><p>Saved work is still available on this device. Refresh to reconnect to the review queue.</p>"; });

  $("#menuButton")?.addEventListener("click", () => {
    const open = $("#primaryNav")?.classList.toggle("open");
    $("#menuButton")?.setAttribute("aria-expanded", String(Boolean(open)));
  });
  $("#eventSelect")?.addEventListener("change", event => setCurrentEvent(event.target.value));
  $$("#assessmentWorkflow .phase-tab").forEach(tab => tab.addEventListener("click", () => openPhase(tab.dataset.phase)));
  $("#continueWork")?.addEventListener("click", () => {
    const liveRoot = document.querySelector("#liveEventOrder");
    const hasLive = Boolean(window.GCSDStudentOps?.getCache?.()?.events?.length);
    if (hasLive && liveRoot) {
      showView("today");
      liveRoot.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    showView("workspace");
  });
  $("#openCurrentPhase")?.addEventListener("click", () => {
    showView("workspace");
  });
  window.addEventListener("gcsd:live-events", () => {
    window.GCSDStudentOps?.syncWorkspacePanels?.();
    syncAgendaFromLive();
  });
  document.addEventListener("click", event => {
    const scrollLive = event.target.closest("[data-scroll-live]");
    if (!scrollLive) return;
    showView("today");
    const packet = document.querySelector("#liveEventOrder");
    const status = document.querySelector("#deskStatus");
    (packet && !packet.hidden ? packet : status)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#learningSearch")?.addEventListener("input", event => renderLearning(event.target.value));
  const updateSourceBank = () => renderSourceBank($("#sourceRecipeSearch")?.value || "", $("#sourceRecipeCategory")?.value || "", $("#sourceRecipeUse")?.value || "");
  $("#sourceRecipeSearch")?.addEventListener("input", updateSourceBank);
  $("#sourceRecipeCategory")?.addEventListener("change", updateSourceBank);
  $("#sourceRecipeUse")?.addEventListener("change", updateSourceBank);
  const updateReferences = () => renderReferences($("#referenceSearch")?.value || "", $("#referenceType")?.value || "");
  $("#referenceSearch")?.addEventListener("input", updateReferences);
  $("#referenceType")?.addEventListener("change", updateReferences);
  $$("[data-close-modal]").forEach(button => button.addEventListener("click", () => $("#" + button.dataset.closeModal)?.close()));
  $("#recipeDialog")?.addEventListener("click", event => { if (event.target === $("#recipeDialog")) $("#recipeDialog").close(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && $("#recipeDialog")?.open) $("#recipeDialog").close(); });
}

init();

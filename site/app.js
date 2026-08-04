const experiences = [
  { id: 1, short: "Professional Kitchen Launch", timing: "September–October", focus: "Readiness, station systems, consistent execution", challenge: "Produce and serve safe, consistent small bites for an authentic or approved school audience at the promised service time.", kind: "assessment", needs: ["Kitchen systems", "Garde manger and presentation", "Quality calibration", "Service timing"] },
  { id: 2, short: "Preorder Pop-Up Bakery", timing: "November–December", focus: "Scaling, scheduling, packaging, fulfillment", challenge: "Convert known demand into consistent baked products, accurate orders, responsible ingredient use, and on-time fulfillment.", kind: "assessment", needs: ["Baking and pastry", "Formula scaling and yield", "Batch scheduling", "Packaging and labeling"] },
  { id: 3, short: "Seasonal Lunch Service", timing: "January–February", focus: "Menu balance, holding, coordinated components", challenge: "Build and deliver a cohesive seasonal meal whose components meet an approved recipient’s needs, quantity, and schedule.", kind: "assessment", needs: ["Stocks, soups, and sauces", "Vegetables and starches", "Menu balance", "Holding and transport"] },
  { id: 4, short: "Fast-Casual Pop-Up", timing: "February–March", focus: "Order flow, hospitality, speed, accuracy", challenge: "Deliver customized food efficiently without sacrificing safety, consistency, hospitality, or order accuracy.", kind: "assessment", needs: ["Batch production", "Station flow", "Hospitality and service", "Replenishment and waste"] },
  { id: 5, short: "Client Catering", timing: "March–April", focus: "Protein cookery, client needs, leadership", challenge: "Coordinate a complete catered menu built around safe, appropriate protein fabrication and cookery for a fixed client deadline.", kind: "assessment", needs: ["Meat, poultry, or seafood", "Fabrication and yield", "Sauces and accompaniments", "Catering and leadership"] },
  { id: 6, short: "Operations Capstone", timing: "May–June", focus: "Full-cycle planning, production, service, closeout", challenge: "Complete the client-centered production cycle with the greatest feasible student ownership while meeting every safety and delivery commitment.", kind: "assessment", needs: ["Integrated menu work", "Production leadership", "Quality and hospitality", "Evidence and improvement"] }
];

const phaseOrder = ["brief", "learn", "plan", "produce", "close", "improve"];
const phaseContent = {
  brief: { title: "Understand the promise", kicker: "Phase 1 · Brief", intro: "When a Live Event Order is published on Today, read that packet first. Know exactly what the department has accepted before menu ideas become production work.", actions: ["Open Today and read the published Event Order commitment, menu, allergens, quantity, and service time.", "Confirm budget, dietary needs, packaging, equipment, storage, and delivery expectations for your section.", "Review the previous event’s objective management briefing and the approved goal for this cycle.", "Separate confirmed requirements from preferences, assumptions, and questions."], protocolTitle: "Client commitment", protocol: ["A request is not an accepted order until feasibility and participating-class capacity are confirmed.", "After acceptance, no student or class independently changes product, quantity, price, quality, or deadline.", "A necessary change becomes valid only after the authorized adult approves it and the client agrees."], callout: "Before acceptance, scope can be negotiated. After acceptance, the department has promised a deliverable." },
  learn: { title: "Learn what this event requires", kicker: "Phase 2 · Learn and practice", intro: "The menu and production challenge create the reason to go deeper. Use the textbook and focused instruction to build readiness for this event.", actions: ["Name the techniques, ingredients, equipment, safety controls, and service knowledge the menu requires.", "Use the instructor-assigned ProStart Second Edition material as the information source.", "Complete demonstrations, focused lessons, recipe trials, and smaller labs that prepare the team for the event.", "Define an observable product and service standard before full production."], protocolTitle: "Learning before labor", protocol: ["Advanced Culinary is experience-based; the textbook is a reference source, not the pacing guide.", "A new technique is taught and practiced before students are assessed on independent application.", "Prior foundations are reverified and applied at greater complexity."], callout: "Start with the production or lesson need, find the connected learning, then return to Today." },
  plan: { title: "Build the game plan", kicker: "Phase 3 · Plan", intro: "Work backward from the promised service time. Production is not ready to begin until the team can see the whole path through closeout.", actions: ["Approve the standardized recipe, yield, portion, allergens, holding, packaging, and quality standard.", "Create a visible production timeline with milestones, assignments, shared equipment, and decision points.", "Identify ingredient quantities, inventory, storage needs, contingencies, and approval gates.", "Schedule packaging, labeling, handoff, dishes, sanitation, storage, waste recording, and station restoration."], protocolTitle: "Time-management standard", protocol: ["The plan works backward from final delivery—not only from when cooking begins.", "Every task has an owner, start point, completion point, and relationship to other work.", "Cleaning and dishes are production tasks.", "Reserve ingredients, backup equipment, flexible labor, and approved simplifications protect the client commitment."], callout: "If the food can be finished but the kitchen cannot be closed, the production plan is incomplete." },
  produce: { title: "Produce, communicate, and protect the standard", kicker: "Phase 4 · Produce", intro: "Produce on the published Event Order on Today. Use your station card to communicate status, delays, shortages, and quality concerns early.", actions: ["Confirm your Event Order station assignment on Today before cooking.", "Track milestones and report status, delay, shortage, risk, or quality concerns early.", "Complete assigned meaningful production work and preserve evidence of individual contribution.", "Use release standards for safety, flavor, texture, appearance, portion, temperature, packaging, and service readiness.", "Ask for instructor direction before correcting, repurposing, remaking, replacing, or removing a failed component."], protocolTitle: "Own it. Diagnose it. Correct it.", protocol: ["Stop and protect remaining food, ingredients, equipment, and team workflow.", "Tell the instructor immediately and explain the process that produced the failure.", "Diagnose the likely cause with the instructor before choosing a response.", "Correct, repurpose, remake, replace, or remove only after instructor approval."], callout: "An honest mistake can become productive learning. Never hide it, misrepresent it, serve it knowingly, or improvise an unauthorized fix." },
  close: { title: "Deliver and close completely", kicker: "Phase 5 · Close", intro: "The event is not finished when the last food leaves the kitchen. Fulfillment, records, dishes, sanitation, storage, and station restoration are part of the job.", actions: ["Verify quantity, quality, temperature, packaging, labeling, and handoff before release.", "Record required service counts, temperatures, substitutions, failures, corrections, waste, and variances.", "Complete dishes, sanitation, food storage, equipment shutdown, trash, laundry, floors, and station restoration.", "Receive instructor closeout verification before leaving the production area."], protocolTitle: "Complete-closeout standard", protocol: ["The team plans for closing from the beginning of the event.", "Students may be reassigned as production ends so no station’s unfinished work becomes one person’s burden.", "A student who finishes early reports available capacity and accepts the next assigned responsibility.", "The instructor verifies what is safe, stored, clean, complete, and ready for the next class."], callout: "Food finished, packaged, and put away is not a complete event if dishes and sanitation remain for someone else." },
  improve: { title: "Use the evidence to improve", kicker: "Phase 6 · Improve", intro: "Study your own contribution. Kitchen Management completes the deeper operational review between events and brings verified results back as the next cycle begins.", actions: ["Identify your responsibility and point to specific evidence of what you completed.", "Explain the result using timing, temperature, yield, quality evidence, feedback, or another observable source.", "Document a failure or unexpected problem, the approved response, and the procedural change recommended.", "Curate limited portfolio evidence that demonstrates competency, growth, professional practice, or achievement."], protocolTitle: "The feedback loop", protocol: ["Kitchen Management conducts detailed cost, yield, waste, timing, packaging, compliance, and client-satisfaction analysis.", "Instructor assessment and structured peer critique address culinary quality.", "Real results establish the baseline for reasonable later goals."], callout: "The event ends here. The next event begins with what this one taught the team." }
};

const learningTopics = [
  { id: "safety", title: "Food & Kitchen Safety", triggers: ["safety", "ServSafe", "foodborne", "hygiene", "TCS", "allergen", "knife", "fire"], purpose: "Use before producing for customers and whenever a food, workplace, or allergen control is uncertain.", questions: ["What hazard could harm a guest or teammate?", "Which control must happen now?", "When should I stop and ask the instructor?"], sources: ["ServSafe Food Handler materials", "Instructor safety demonstrations", "Current kitchen procedures"], sections: [{ heading: "Food safety and hygiene", points: ["Foodborne illness is prevented through clean hands, exclusion when ill, safe sourcing, correct cooking, holding, cooling, and reheating.", "Wash hands correctly and often; gloves never replace handwashing.", "Keep TCS food under reliable time and temperature control, and use a calibrated thermometer when a temperature matters."] }, { heading: "Allergens and cross-contact", points: ["Know the confirmed allergens in an Event Order before starting.", "Prevent cross-contact with clean and sanitized tools, separate storage and prep, and clear communication.", "Never make an allergen-free claim unless the approved procedure and instructor confirm it."] }, { heading: "Workplace and emergency safety", points: ["Keep floors dry, aisles clear, and pan handles turned safely; report hazards and near-misses immediately.", "Use knives with a stable board, claw grip, sharp blade, and proper carrying and storage practices.", "Stop unsafe work. For burns, cuts, fires, chemical exposure, or equipment problems, protect people first and follow instructor emergency procedures.", "ServSafe Food Handler certification is the credential gate before producing food for customers; certification supports daily judgment, not replaces it."] }] },
  { id: "operations", title: "How Advanced Culinary Operates", triggers: ["operations", "Event Order", "Google Classroom", "station update", "closeout", "certification"], purpose: "Understand where course work lives and how professional kitchen habits protect a real client commitment.", questions: ["Is this an Event Order task or a graded Google Classroom assignment?", "What does my team need to communicate before a small problem becomes a missed commitment?", "How does closeout protect the next class?"], sources: ["Instructor operations lesson", "Published Event Orders on Today", "Google Classroom", "Kitchen procedures"], sections: [{ heading: "Two connected workspaces", points: ["Today holds published Event Orders, station assignments, and short production updates for customer work.", "Google Classroom holds graded assignments, written work, lessons, and teacher directions.", "Learning, Recipes, and Reference are support tools when a lesson or production need creates a question."] }, { heading: "Professional production habits", points: ["A client commitment means protecting the accepted product, quantity, quality, packaging, and deadline.", "Teams communicate station status, shortages, delays, risks, and recovery needs early.", "Closeout includes food safety, records, dishes, sanitation, storage, equipment shutdown, and restoring the station.", "Food Handler certification matters because production for customers requires demonstrated safety readiness."] }] },
  { id: "cycle", title: "The Event Cycle (Brief → Improve)", triggers: ["brief", "plan", "produce", "closeout", "improve", "event cycle"], purpose: "Use after the operations lesson to understand the six phases that guide how the team approaches an event.", questions: ["What does the customer promise require?", "What must be learned before production?", "What evidence will improve the next event?"], sources: ["Published Event Order", "Instructor lessons and demonstrations", "Production evidence and verified event results"], sections: [{ heading: "A shared approach, not a tracker", points: ["The six phases organize professional thinking from the client brief through improvement.", "They are read-only guidance in this app, not a separate classwork checklist or grading tracker.", "Follow your instructor’s lesson and the live Event Order for the work that applies today."] }] },
  { id: "systems", title: "Professional Kitchen Systems", triggers: ["timeline", "mise en place", "station", "equipment", "closing", "communication"], purpose: "Use when the event requires coordinated people, equipment, ingredients, milestones, shared space, and complete closeout.", questions: ["What must be ready before production?", "Which work depends on another task?", "Where can delay be detected early?", "How will closing finish before class ends?"], sources: ["Instructor station-system lesson", "Assigned ProStart Second Edition material", "Live production station plan", "Focused readiness or workflow lab"] },
  { id: "baking", title: "Baking, Pastry & Desserts", triggers: ["bread", "pastry", "cake", "cookie", "dessert", "fermentation", "baking"], purpose: "Use when formula balance, mixing method, fermentation, structure, temperature, batch size, cooling, or finishing controls the result.", questions: ["Which mixing or fermentation method applies?", "What controls structure and tenderness?", "Can the batch fit the equipment and timeline?", "When can the product be packaged safely?"], sources: ["Assigned ProStart Second Edition baking/dessert material", "Approved course formula", "Instructor demonstration", "Test batch and quality calibration"] },
  { id: "produce", title: "Fruits, Vegetables, Potatoes, Grains & Pasta", triggers: ["vegetable", "fruit", "potato", "grain", "rice", "pasta", "seasonal"], purpose: "Use when seasonality, fabrication, cooking method, color, texture, yield, holding, or coordination with other menu components matters.", questions: ["What method fits the ingredient and service?", "How will cut and portion affect timing and yield?", "What quality changes during holding?", "What can be prepared ahead without loss?"], sources: ["Assigned ProStart Second Edition topic", "Ingredient study", "Method demonstration", "Menu-specific practice lab"] },
  { id: "soups", title: "Stocks, Soups, Sauces & Emulsions", triggers: ["stock", "soup", "sauce", "emulsion", "thickening", "reduction"], purpose: "Use when flavor development, extraction, thickening, consistency, finishing, cooling, reheating, or holding determines success.", questions: ["What is the desired body and finish?", "Which thickening or emulsifying method applies?", "When should seasoning be adjusted?", "How will the product cool, reheat, hold, and serve safely?"], sources: ["Assigned ProStart Second Edition topic", "Instructor technique lesson", "Controlled sauce or soup lab", "Approved recipe and quality standard"] },
  { id: "proteins", title: "Meat, Poultry, Seafood & Eggs", triggers: ["meat", "poultry", "seafood", "fish", "egg", "protein", "fabrication", "doneness"], purpose: "Use when fabrication, yield, cooking method, doneness, carryover, holding, service timing, or food-safety controls shape the menu.", questions: ["Which cooking method fits the cut or product?", "What proves safety and what proves quality?", "How do fabrication and trim affect yield?", "How will portions finish together and rest or hold?"], sources: ["Assigned ProStart Second Edition protein material", "Fabrication demonstration", "Doneness calibration", "Instructor-approved production plan"] },
  { id: "nutrition", title: "Nutrition, Allergens & Menu Balance", triggers: ["nutrition", "allergen", "dietary", "healthy", "menu balance", "restriction"], purpose: "Use when the recipient’s needs, major allergens, cross-contact, menu variety, portion, or dietary expectations affect the product.", questions: ["What is confirmed and what still needs clarification?", "Which ingredients and surfaces create cross-contact risk?", "Does the menu provide balance and reasonable variety?", "What claims can the team verify honestly?"], sources: ["Assigned ProStart Second Edition nutrition material", "Current allergen procedures", "Product labels and approved specifications", "Instructor/client clarification"] },
  { id: "service", title: "Hospitality, Packaging & Service", triggers: ["service", "hospitality", "packaging", "label", "delivery", "client", "order"], purpose: "Use when the product must be communicated, packaged, labeled, transported, released, served, or recovered for a real recipient.", questions: ["What does the recipient experience at handoff?", "What must the label communicate?", "How will temperature and quality survive the service model?", "Who is authorized to resolve a client concern?"], sources: ["Assigned ProStart Second Edition hospitality material", "Live Event Order", "Packaging and handoff test", "Instructor-approved service plan"] },
  { id: "business", title: "Cost, Yield, Waste & Event Results", triggers: ["cost", "yield", "waste", "price", "quantity", "financial", "inventory"], purpose: "Use when ingredient quantities, yield, portion, waste, packaging, event results, or an approved operating goal affects production decisions.", questions: ["What ingredients and quantities are required?", "How do yield and portion affect the order?", "What production choices create waste or overproduction?", "Which results will Kitchen Management analyze and return?"], sources: ["Assigned ProStart Second Edition cost/yield material", "Verified event data", "Instructor-approved ingredient request", "Kitchen Management event briefing"] }
];

const quickReferences = [
  { title: "Plan-to-Close Time Management", steps: ["Start with the promised delivery time.", "Schedule service, packaging, holding, production, mise en place, and setup backward.", "Place dishes, sanitation, storage, waste recording, and station restoration on the same timeline.", "Assign owners and checkpoints.", "Reforecast early when a milestone slips."] },
  { title: "Own It · Diagnose It · Correct It", steps: ["Stop and protect food, ingredients, equipment, and workflow.", "Tell the instructor immediately.", "Explain the process that produced the problem.", "Diagnose likely cause with the instructor.", "Take only the approved correction, remake, replacement, repurpose, or removal action.", "Record what will change next time."] },
  { title: "Safety Stop", steps: ["Stop unsafe work immediately.", "Keep affected food from service.", "Report the condition honestly.", "Follow instructor direction for discard, correction, restart, or reassessment.", "Do not let a finished-looking product hide a critical violation."] },
  { title: "Complete Closeout", steps: ["Verify delivery, packaging, labels, temperatures, and counts.", "Store food safely and label it correctly.", "Complete dishes and sanitize food-contact surfaces.", "Shut down and restore equipment.", "Remove trash, handle laundry, and finish floors.", "Receive instructor closeout verification before leaving."] },
  { title: "Client Change Authority", steps: ["Students identify the problem and develop possible alternatives.", "The participating instructor reviews production reality.", "The authorized adult makes the operational decision and communicates with the client.", "Product, quantity, price, or deadline changes only after client agreement.", "The revised commitment is recorded for every class."] },
  { title: "Individual Evidence", steps: ["Name your assigned responsibility.", "Point to observable evidence of meaningful production work.", "Explain the result using data, quality evidence, or feedback.", "Separate the original technical result from recovery actions.", "Select only evidence that demonstrates competency, growth, professional practice, or achievement."] }
];

let sourceCatalog = { recipes: [], references: [], statusNote: "" };
let approvedLibrary = [];
let vocabulary = { foundations: [], advancedTerms: [] };
let activeTopic = 0;
let referenceMode = "operating";
let liveRecipeEvents = [];
let recipeSubmissions = [];
const recipeCategoriesByTopic = { baking: ["Breads and yeast doughs", "Pastry, cakes, and desserts"], produce: ["Grains, pasta, and legumes", "Potatoes"], soups: ["Stocks and sauces", "Soups", "Dressings and flavored oils", "Dips, relishes, and condiments"], business: [], service: [], nutrition: [], proteins: [] };
const candidateFields = ["Product or concept", "Source URL / book / chef", "Why it fits the event", "Feasibility concerns"];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const cleanText = value => String(value ?? "").replace(/\s+/g, " ").trim();

function showView(name) {
  if (!["today", "learning", "recipes", "reference"].includes(name)) return;
  $$("[data-view-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === name));
  $$(".nav-link[data-view-target]").forEach(link => link.classList.toggle("active", link.dataset.viewTarget === name));
  $("#primaryNav")?.classList.remove("open");
  $("#menuButton")?.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "today") renderHome();
  if (name === "learning") renderLearning($("#learningSearch")?.value || "");
  if (name === "recipes") loadRecipeReviewData().catch(showRecipeStatusUnavailable);
  if (name === "reference") renderReferences($("#referenceSearch")?.value || "", $("#referenceType")?.value || "");
}

function renderHome() {
  const strip = $("#homeExperienceStrip");
  if (strip) {
    strip.innerHTML = experiences.map(item => `<article class="arc-card" data-learning-experience="${escapeHtml(item.short)}"><span>Assessment ${item.id}</span><strong>${escapeHtml(item.short)}</strong><small>${escapeHtml(item.timing)}</small><p>${escapeHtml(item.focus)}</p></article>`).join("");
    $$("[data-learning-experience]", strip).forEach(card => card.addEventListener("click", () => {
      showView("learning");
      const search = $("#learningSearch");
      if (search) { search.value = card.dataset.learningExperience; renderLearning(search.value); }
    }));
  }
  renderRecipeActionInbox("#homeRecipeActions", true);
}
window.syncAgendaFromLive = () => {};

function phaseCardsHtml() {
  return `<section class="cycle-phase-cards"><h3>The six phases</h3>${phaseOrder.map(id => {
    const phase = phaseContent[id];
    return `<article class="phase-card"><p class="eyebrow">${escapeHtml(phase.kicker)}</p><h3>${escapeHtml(phase.title)}</h3><p>${escapeHtml(phase.intro)}</p><p class="eyebrow">${escapeHtml(phase.protocolTitle)}</p><ol class="protocol-list">${phase.protocol.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ol></article>`;
  }).join("")}</section>`;
}

function renderLearning(search = "") {
  const term = search.trim().toLowerCase();
  const matches = learningTopics.map((topic, index) => ({ topic, index })).filter(({ topic }) => JSON.stringify(topic).toLowerCase().includes(term));
  if (!matches.some(item => item.index === activeTopic)) activeTopic = matches[0]?.index || 0;
  $("#topicNav").innerHTML = matches.length ? matches.map(({ topic, index }) => `<button class="${index === activeTopic ? "active" : ""}" data-topic="${index}">${escapeHtml(topic.title)}</button>`).join("") : "<p class='field-help'>No matching learning area.</p>";
  if (!matches.length) { $("#topicReader").innerHTML = "<h2>No results</h2><p>Try a broader production need or ask your instructor which topic applies.</p>"; return; }
  const topic = learningTopics[activeTopic];
  const relatedReferences = sourceCatalog.references.filter(reference => {
    const text = `${reference.topic} ${reference.type} ${reference.coreIdea} ${reference.advancedFunction}`.toLowerCase();
    return topic.triggers.some(trigger => text.includes(trigger)) || (topic.id === "business" && /cost|yield|portion|recipe conversion|apq|epq|waste/.test(text));
  }).slice(0, 8);
  const categoryMatches = recipeCategoriesByTopic[topic.id] || [];
  const relatedRecipes = sourceCatalog.recipes.filter(recipe => !categoryMatches.length || categoryMatches.includes(recipe.category));
  $("#topicReader").innerHTML = `<p class="eyebrow">Connected learning area</p><h2>${escapeHtml(topic.title)}</h2><p>${escapeHtml(topic.purpose)}</p><div class="topic-tags">${topic.triggers.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>${topic.sections?.map(section => `<section class="topic-section"><h3>${escapeHtml(section.heading)}</h3><ul>${section.points.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul></section>`).join("") || ""}${topic.id === "cycle" ? phaseCardsHtml() : ""}<h3>Questions that guide the deep dive</h3><ul>${topic.questions.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3>Where the learning may come from</h3><ul>${topic.sources.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>${relatedReferences.length ? `<h3>Course quick references</h3><div class="related-reference-list">${relatedReferences.map(reference => `<button class="reference-jump" data-reference-jump="${escapeHtml(reference.topic)}"><strong>${escapeHtml(reference.topic)}</strong><span>${escapeHtml(reference.coreIdea)}</span></button>`).join("")}</div>` : ""}${relatedRecipes.length ? `<p class="source-note"><strong>${relatedRecipes.length} catalog recipes and formulas are indexed for this learning area.</strong> Examples include ${relatedRecipes.slice(0, 5).map(recipe => escapeHtml(recipe.name)).join(", ")}. Open Recipes to search the full library.</p>` : ""}<p class="source-note"><strong>Source rule:</strong> ProStart Second Edition and instructor-approved course materials provide specific information. The event supplies the reason and place to apply it.</p><button class="button primary" data-view-target="today">Back to Today →</button>`;
  $$("[data-topic]").forEach(button => button.addEventListener("click", () => { activeTopic = Number(button.dataset.topic); renderLearning($("#learningSearch").value); }));
  $$("[data-reference-jump]", $("#topicReader")).forEach(button => button.addEventListener("click", () => { referenceMode = "technique"; showView("reference"); $("#referenceSearch").value = button.dataset.referenceJump; renderReferences(button.dataset.referenceJump, $("#referenceType").value); }));
  bindDynamicButtons($("#topicReader"));
}

function renderReferences(search = "", type = "") {
  const term = search.trim().toLowerCase();
  $$(".reference-mode").forEach(button => { const active = button.dataset.refMode === referenceMode; button.classList.toggle("active", active); button.setAttribute("aria-selected", String(active)); });
  $("#vocabularyPanel").hidden = referenceMode !== "vocabulary";
  $("#referenceGrid").hidden = referenceMode === "vocabulary";
  $("#referenceFilterBar").hidden = false;
  $("#referenceTypeWrap").hidden = referenceMode !== "technique";
  if (referenceMode === "vocabulary") { renderVocabulary(term); return; }
  const pool = referenceMode === "operating"
    ? quickReferences.map((reference, index) => ({ ...reference, id: `O${index + 1}`, type: "Operating standards", coreIdea: reference.steps.join(" "), operating: true }))
    : sourceCatalog.references;
  const entries = pool.filter(reference => {
    const text = JSON.stringify(reference).toLowerCase();
    return (!term || text.includes(term)) && (!type || reference.type === type);
  });
  $("#referenceSummary").textContent = `${entries.length} of ${pool.length} references shown`;
  $("#referenceGrid").innerHTML = entries.length ? entries.map(reference => `<article class="reference-card"><div class="reference-card-top"><span class="ref-number">${escapeHtml(reference.id || "")}</span><span class="reference-type">${escapeHtml(reference.type)}</span></div><h2>${escapeHtml(reference.topic || reference.title)}</h2>${reference.operating ? `<ol>${reference.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>` : `<p>${escapeHtml(reference.coreIdea)}</p><dl class="reference-meta"><div><dt>Use in Advanced</dt><dd>${escapeHtml(reference.advancedFunction)}</dd></div><div><dt>Course route</dt><dd>${escapeHtml(reference.primaryCourse)} · ${escapeHtml(reference.placement)}</dd></div></dl>`}</article>`).join("") : '<div class="empty-state"><strong>No matching reference.</strong><p>Try a broader method, ingredient, or calculation.</p></div>';
}

function allVocabulary() {
  return [...(vocabulary.foundations || []), ...(vocabulary.advancedTerms || [])].map(entry => ({ ...entry, term: cleanText(entry.term), definition: cleanText(entry.definition) })).filter(entry => entry.term).sort((a, b) => a.term.localeCompare(b.term));
}
function renderVocabulary(search = "") {
  const entries = allVocabulary().filter(entry => !search || `${entry.term} ${entry.definition} ${entry.level}`.toLowerCase().includes(search));
  const letters = [...new Set(entries.map(entry => entry.term[0].toUpperCase()))];
  $("#vocabLetters").innerHTML = letters.map(letter => `<button type="button" data-vocab-letter="${escapeHtml(letter)}">${escapeHtml(letter)}</button>`).join("");
  $("#vocabList").innerHTML = entries.length ? entries.map(entry => {
    const letter = entry.term[0].toUpperCase();
    return `<div data-vocab-letter-group="${escapeHtml(letter)}"><dt><button type="button" data-open-vocab="${escapeHtml(entry.term)}">${escapeHtml(entry.term)}</button></dt><dd><span class="vocab-level">${escapeHtml(entry.level || "Course vocabulary")}</span> ${escapeHtml(entry.definition)}</dd></div>`;
  }).join("") : "<div><dt>No matching vocabulary</dt><dd>Try a broader term.</dd></div>";
  $("#referenceSummary").textContent = `${entries.length} vocabulary terms shown · Culinary 1 & 2 foundations plus Advanced`;
  $$("[data-vocab-letter]").forEach(button => button.addEventListener("click", () => {
    $(`#vocabList [data-vocab-letter-group="${button.dataset.vocabLetter}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  $$("[data-open-vocab]").forEach(button => button.addEventListener("click", () => {
    openVocabulary(entries.find(entry => entry.term === button.dataset.openVocab));
  }));
}
function openVocabulary(entry) {
  const dialog = $("#vocabDialog");
  if (!entry || !dialog) return;
  $("#vocabDialogContent").innerHTML = `<div class="modal-hero"><p class="eyebrow">${escapeHtml(entry.level || "Course vocabulary")}</p><h2>${escapeHtml(entry.term)}</h2><p>${escapeHtml(entry.definition)}</p></div>`;
  dialog.showModal();
}

async function loadSourceCatalog() {
  const response = await fetch("./data/advanced-recipe-source-catalog.json");
  if (!response.ok) throw new Error("Source catalog unavailable");
  sourceCatalog = await response.json();
}
async function loadVocabulary() {
  const response = await fetch("./data/vocabulary.json");
  if (!response.ok) throw new Error("Vocabulary unavailable");
  vocabulary = await response.json();
}
async function loadApprovedLibrary() {
  try {
    const response = await fetch("/api/recipes");
    if (response.ok) approvedLibrary = (await response.json()).recipes || [];
  } catch { approvedLibrary = []; }
}

function recipeLines(value) {
  return (Array.isArray(value) ? value : String(value || "").split(/\n+/)).map(item => {
    if (item && typeof item === "object") return [item.quantity, item.unit, item.name || item.ingredient || item.sourceText].filter(Boolean).join(" ");
    return String(item || "").trim();
  }).filter(Boolean);
}
function isCookable(recipe) { return recipeLines(recipe.ingredients).length > 0 && recipeLines(recipe.procedure).length > 0; }
function libraryEntries() {
  const api = approvedLibrary.map(recipe => ({ ...recipe, libraryType: "cookable", id: recipe.id || `approved-${recipe.name}`, category: recipe.category || "Approved recipes" }));
  const catalog = sourceCatalog.recipes.map(recipe => ({ ...recipe, libraryType: "index", id: recipe.id || `catalog-${recipe.name}` }));
  return [...api, ...catalog];
}
function renderSourceBank(search = "", category = "", use = "") {
  const all = libraryEntries();
  const term = search.trim().toLowerCase();
  const matches = all.filter(recipe => (!term || JSON.stringify(recipe).toLowerCase().includes(term)) && (!category || recipe.category === category) && (!use || recipe.libraryType === use));
  const displayed = matches.slice(0, 48);
  const cookableCount = all.filter(recipe => recipe.libraryType === "cookable" && isCookable(recipe)).length;
  const indexCount = all.length - cookableCount;
  $("#sourceBankSummary").textContent = `${all.length} library entries · ${cookableCount} cookable · ${indexCount} index${matches.length !== all.length ? ` · ${matches.length} matching` : ""}`;
  $("#sourceRecipeGrid").innerHTML = matches.length ? displayed.map(recipe => {
    const cookable = recipe.libraryType === "cookable" && isCookable(recipe);
    return `<article class="source-recipe-card"><div class="source-recipe-card-top"><span>${escapeHtml(recipe.id)}</span><strong>${cookable ? "Cookable packet" : "Research index"}</strong></div><h3>${escapeHtml(recipe.name)}</h3><p>${escapeHtml(recipe.category || "Uncategorized")} · ${escapeHtml(recipe.subcategory || recipe.portion || "")}</p>${cookable ? `<dl><div><dt>Yield</dt><dd>${escapeHtml(recipe.yield || "See packet")}</dd></div><div><dt>Portion</dt><dd>${escapeHtml(recipe.portion || "See packet")}</dd></div></dl><button class="text-link" type="button" data-open-library-recipe="${escapeHtml(recipe.id)}">Open recipe packet →</button>` : `<dl><div><dt>Captured yield</dt><dd>${escapeHtml(recipe.capturedYield || "Verify from source")}</dd></div><div><dt>Likely event use</dt><dd>${escapeHtml(recipe.eventUses || "Verify for event")}</dd></div></dl><div class="source-status">Research starting point · production approval required</div><button class="text-link" type="button" data-use-source-recipe="${escapeHtml(recipe.id)}">Use as a research starting point →</button>`}</article>`;
  }).join("") : '<div class="empty-state"><strong>No matching library entry.</strong><p>Try a broader product or category.</p></div>';
  $$("[data-open-library-recipe]").forEach(button => button.addEventListener("click", () => openLibraryRecipe(button.dataset.openLibraryRecipe)));
  $$("[data-use-source-recipe]").forEach(button => button.addEventListener("click", () => useSourceRecipe(button.dataset.useSourceRecipe)));
}
function recipePacketHtml(recipe, includeActions = true) {
  const ingredients = recipeLines(recipe.ingredients), equipment = recipeLines(recipe.equipment), procedure = recipeLines(recipe.procedure);
  return `<div class="recipe-packet culinary-form"><header class="recipe-packet-header"><p class="recipe-pathway">GCSD Culinary Pathway · Advanced Culinary</p><h2>${escapeHtml(recipe.name)}</h2><p class="recipe-meta-row">${escapeHtml([recipe.yield && `Yield: ${recipe.yield}`, recipe.portion && `Portion: ${recipe.portion}`].filter(Boolean).join(" · ") || "Yield / portion on packet")}</p></header><p class="recipe-allergens"><strong>Allergens:</strong> ${escapeHtml(recipe.allergens || "See teacher-approved packet.")}</p><section class="recipe-ingredients"><h3>Ingredients</h3><ul>${ingredients.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ul></section><section class="recipe-equipment"><h3>Equipment</h3><ul>${equipment.map(line => `<li>${escapeHtml(line)}</li>`).join("") || "<li>See station card.</li>"}</ul></section><section class="recipe-procedure"><h3>Procedure</h3><ol>${procedure.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ol></section>${includeActions ? `<div class="form-actions"><button class="button primary" type="button" data-print-library-recipe>Print recipe</button><button class="button secondary" type="button" data-close-modal="recipeDialog">Close</button></div>` : ""}</div>`;
}
function openLibraryRecipe(id) {
  const recipe = libraryEntries().find(item => String(item.id) === String(id));
  const dialog = $("#recipeDialog");
  if (!recipe || !dialog) return;
  $("#recipeDialogContent").innerHTML = `<div class="modal-hero"><p class="eyebrow">Approved library recipe</p><h2>${escapeHtml(recipe.name)}</h2><p>Culinary pathway production packet</p></div><div class="modal-body">${recipePacketHtml(recipe)}</div>`;
  $("[data-print-library-recipe]", $("#recipeDialogContent"))?.addEventListener("click", () => { $("#printArea").innerHTML = recipePacketHtml(recipe, false); window.print(); });
  $("[data-close-modal]", $("#recipeDialogContent"))?.addEventListener("click", () => dialog.close());
  dialog.showModal();
}
function useSourceRecipe(recipeId) {
  const recipe = sourceCatalog.recipes.find(item => String(item.id) === String(recipeId));
  if (!recipe) return;
  const openCandidate = [1, 2, 3].find(number => !$(`[data-candidate="${number}-0"]`)?.value) || 1;
  $(`[data-candidate="${openCandidate}-0"]`).value = recipe.name;
  $(`[data-candidate="${openCandidate}-1"]`).value = `Course source ${recipe.sourceImages}`;
  $(`[data-candidate="${openCandidate}-2"]`).value = `${recipe.eventUses}; ${recipe.courseRoute}`;
  $(`[data-candidate="${openCandidate}-3"]`).value = `Captured yield: ${recipe.capturedYield || "verify from source"}. Ingredients, procedure, equipment, allergens, and supplier pricing must be checked before production approval.`;
  $("#recipeName").value ||= recipe.name; $("#recipeSearchTerms").value ||= recipe.name;
  $("#recipeMessage").textContent = `${recipe.name} was added as Possibility ${openCandidate}. It is a research candidate, not an approved production recipe.`;
  updateRecipeSummary(); $(".recipe-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function initializeSourceControls() {
  const select = $("#sourceRecipeCategory");
  const categories = [...new Set(libraryEntries().map(recipe => recipe.category).filter(Boolean))].sort();
  select.innerHTML = `<option value="">All categories</option>${categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
  const type = $("#referenceType");
  type.innerHTML = `<option value="">All families</option>${[...new Set(sourceCatalog.references.map(reference => reference.type).filter(Boolean))].sort().map(item => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}`;
  renderSourceBank();
}

function actionableRecipeSubmissions() {
  const latestByThread = new Map();
  [...recipeSubmissions].sort((a, b) => Number(b.revision || 1) - Number(a.revision || 1) || String(b.submittedAt).localeCompare(String(a.submittedAt))).forEach(item => { const key = item.threadId || item.id; if (!latestByThread.has(key)) latestByThread.set(key, item); });
  return [...latestByThread.values()].filter(item => ["Returned for revision", "Awaiting review", "Declined", "Approved"].includes(item.status));
}
function openReturnedRecipe(submissionId, scrollToDraft = true) {
  const submission = recipeSubmissions.find(item => item.id === submissionId) || actionableRecipeSubmissions().find(item => item.id === submissionId);
  if (!submission) return;
  showView("recipes");
  if (submission.eventId && liveRecipeEvents.some(event => String(event.id) === String(submission.eventId))) { $("#recipeExperience").value = String(submission.eventId); localStorage.setItem("advancedRecipeEvent", String(submission.eventId)); }
  loadRecipeExperience($("#recipeExperience").value);
  if (scrollToDraft) requestAnimationFrame(() => ($("#recipeReviewStatus") || $(".recipe-workspace"))?.scrollIntoView({ behavior: "smooth", block: "start" }));
}
function renderRecipeActionInbox(selector, homeOnlyReturned = false) {
  const host = $(selector); if (!host) return;
  const items = actionableRecipeSubmissions().filter(item => !homeOnlyReturned || item.status === "Returned for revision");
  host.hidden = !items.length; if (!items.length) { host.innerHTML = ""; return; }
  host.innerHTML = items.map(item => `<article class="recipe-action-card" data-status="${escapeHtml(String(item.status).toLowerCase().replaceAll(" ", "-"))}"><strong>${escapeHtml(item.status)} · ${escapeHtml(item.name)}</strong><p>${escapeHtml(item.eventName || "Event not identified")} · revision ${Number(item.revision || 1)}${item.reviewNote ? ` · Teacher feedback: ${escapeHtml(item.reviewNote)}` : ""}</p><button class="button ${item.status === "Returned for revision" ? "primary" : "secondary"}" type="button" data-open-recipe-submission="${escapeHtml(item.id)}">${item.status === "Returned for revision" ? "Open and revise →" : "Open recipe →"}</button></article>`).join("");
  $$("[data-open-recipe-submission]", host).forEach(button => button.addEventListener("click", () => openReturnedRecipe(button.dataset.openRecipeSubmission)));
}
function renderRecipeEventOptions() {
  const select = $("#recipeExperience"), returned = actionableRecipeSubmissions().find(item => item.status === "Returned for revision");
  const previous = returned?.eventId || select.value || localStorage.getItem("advancedRecipeEvent") || "";
  select.innerHTML = liveRecipeEvents.length ? liveRecipeEvents.map(event => `<option value="${event.id}">${escapeHtml(event.name)} · ${escapeHtml(event.serviceDate || "Date pending")}</option>`).join("") : '<option value="">No published Event Orders available</option>';
  if (liveRecipeEvents.some(event => String(event.id) === String(previous))) select.value = String(previous);
  updateRecipeEventSummary();
}
function updateRecipeEventSummary() {
  const summary = $("#recipeEventSummary"); if (!summary) return;
  const event = liveRecipeEvents.find(item => String(item.id) === String($("#recipeExperience").value));
  summary.textContent = event ? [event.customer, event.guestCount != null ? `${event.guestCount} guests` : null, event.serviceFormat, event.serviceDate, event.budget ? `Budget ${event.budget}` : null].filter(Boolean).join(" · ") || `${event.name} is selected. Event details stay on the Event Order.` : "Choose the published Event Order this recipe supports. Guest count, budget, service details, and allergen controls already live on that order.";
}
function renderRecipeWorkspace() {
  renderRecipeEventOptions();
  $("#candidateGrid").innerHTML = [1, 2, 3].map(number => `<article class="candidate-card"><h3>Possibility ${number}</h3>${candidateFields.map((field, index) => `<label>${field}${index > 1 ? `<textarea rows="3" data-candidate="${number}-${index}"></textarea>` : `<input data-candidate="${number}-${index}" ${index === 1 ? 'type="url"' : ""} />`}</label>`).join("")}</article>`).join("");
  loadRecipeExperience($("#recipeExperience").value);
}
function recipeStorage() { try { return JSON.parse(localStorage.getItem("advancedRecipeStudioV3") || "{}"); } catch { return {}; } }
function collectRecipeData() {
  const fields = ["recipeSearchTerms", "recipeSelection", "recipeApproval", "recipeTestNotes", "recipeName", "recipeYield", "recipePortion", "recipeIngredients", "recipeEquipment", "recipeProcedure", "recipeAllergens"];
  const data = Object.fromEntries(fields.map(id => [id, $("#" + id).value])); data.candidates = {}; $$("[data-candidate]").forEach(field => data.candidates[field.dataset.candidate] = field.value);
  const latest = latestRecipeSubmission($("#recipeExperience").value);
  if (latest?.status === "Returned for revision") { data.parentSubmissionId = latest.id; data.threadId = latest.threadId || latest.id; data.revision = Number(latest.revision || 1) + 1; }
  return data;
}
function fillRecipeData(data = {}) { ["recipeSearchTerms", "recipeSelection", "recipeTestNotes", "recipeName", "recipeYield", "recipePortion", "recipeIngredients", "recipeEquipment", "recipeProcedure", "recipeAllergens"].forEach(id => $("#" + id).value = data[id] || ""); $("#recipeApproval").value = data.recipeApproval || "Researching"; $$("[data-candidate]").forEach(field => field.value = (data.candidates || {})[field.dataset.candidate] || ""); updateRecipeSummary(); updateRecipeEventSummary(); }
function latestRecipeSubmission(eventId) { return recipeSubmissions.filter(item => String(item.eventId) === String(eventId)).sort((a, b) => Number(b.revision || 1) - Number(a.revision || 1) || String(b.submittedAt).localeCompare(String(a.submittedAt)))[0] || null; }
function loadRecipeExperience(id) {
  const saved = recipeStorage()[id], returned = latestRecipeSubmission(id);
  const recovered = returned ? { recipeName: returned.name, recipeYield: returned.yield, recipePortion: returned.portion, recipeIngredients: (returned.ingredients || []).join("\n"), recipeEquipment: (returned.equipment || []).join("\n"), recipeProcedure: (returned.procedure || []).join("\n"), recipeAllergens: returned.allergens, recipeTestNotes: returned.testNotes || saved?.recipeTestNotes || "", recipeApproval: returned.status === "Approved" ? "Approved for production" : returned.status === "Awaiting review" ? "Submitted for teacher review" : returned.status } : {};
  fillRecipeData(returned?.status === "Returned for revision" ? { ...(saved || {}), ...recovered, candidates: saved?.candidates || {} } : (saved || recovered));
  $("#recipeMessage").textContent = returned?.status === "Returned for revision" ? "Teacher returned this recipe. Review the feedback above, revise the draft, and submit a new revision." : saved ? "Saved work loaded for this event." : "No saved work yet for this event.";
  renderStudentReviewStatus(); renderRecipeActionInbox("#recipeActionInbox");
}
function setRecipeLocked(locked) { $$("#recipeForm input, #recipeForm textarea, #recipeForm select, #recipeForm button").forEach(control => { if (control.id === "recipeExperience" || control.id === "copyRecipe") return; control.disabled = locked; }); }
function renderStudentReviewStatus() {
  const status = $("#recipeReviewStatus"), submission = latestRecipeSubmission($("#recipeExperience").value);
  if (!submission) { status.dataset.status = "draft"; status.innerHTML = "<strong>Draft</strong><p>Your saved work stays on this device until you submit it for teacher review.</p>"; setRecipeLocked(false); return; }
  const canRevise = submission.status === "Returned for revision", locked = ["Awaiting review", "Approved", "Declined", "Revised and resubmitted"].includes(submission.status);
  const history = recipeSubmissions.filter(item => (item.threadId || item.id) === (submission.threadId || submission.id)).sort((a, b) => Number(a.revision || 1) - Number(b.revision || 1));
  status.dataset.status = submission.status.toLowerCase().replaceAll(" ", "-");
  status.innerHTML = `<strong>${escapeHtml(submission.status)} · ${escapeHtml(submission.name)} · revision ${Number(submission.revision || 1)}</strong><p>${submission.reviewNote ? `<b>Teacher feedback:</b> ${escapeHtml(submission.reviewNote)}` : submission.status === "Awaiting review" ? "This submitted version is locked while your teacher reviews it." : submission.status === "Approved" ? "This version is now in the approved recipe library." : "No teacher note has been added yet."}</p>${canRevise ? "<p>Edit the draft below and submit a new revision. The earlier version and feedback remain in its history.</p>" : ""}${history.length > 1 ? `<p><b>History:</b> ${history.map(item => `revision ${Number(item.revision || 1)} — ${escapeHtml(item.status)}`).join("; ")}</p>` : ""}`;
  setRecipeLocked(locked); $("#recipeApproval").value = submission.status === "Approved" ? "Approved for production" : submission.status === "Awaiting review" ? "Submitted for teacher review" : submission.status;
}
async function loadRecipeReviewData() {
  const [eventResponse, submissionResponse] = await Promise.all([fetch("/api/student/events"), fetch("/api/recipe-submissions")]);
  if (eventResponse.ok) liveRecipeEvents = (await eventResponse.json()).events || [];
  if (submissionResponse.ok) recipeSubmissions = (await submissionResponse.json()).submissions || [];
  renderRecipeEventOptions(); loadRecipeExperience($("#recipeExperience").value); renderRecipeActionInbox("#recipeActionInbox"); renderRecipeActionInbox("#homeRecipeActions", true); if ($(".view.active")?.dataset.viewPanel === "today") renderHome();
}
function recipeSummaryText() {
  const data = collectRecipeData(), liveEvent = liveRecipeEvents.find(item => String(item.id) === $("#recipeExperience").value);
  const possibilities = [1, 2, 3].map(number => `Possibility ${number}: ${data.candidates[`${number}-0`] || "Not entered"}\nSource: ${data.candidates[`${number}-1`] || "No source"}\nFit: ${data.candidates[`${number}-2`] || "No rationale"}\nFeasibility: ${data.candidates[`${number}-3`] || "No concerns recorded"}`).join("\n\n");
  return `${liveEvent?.name || "Event not selected"}\n\nEVENT\nPublished Event Order: ${liveEvent ? `${liveEvent.name}${liveEvent.customer ? ` · ${liveEvent.customer}` : ""}${liveEvent.guestCount != null ? ` · ${liveEvent.guestCount} guests` : ""}` : "Not selected"}\n\nRESEARCH\n${possibilities}\n\nTEST AND APPROVAL\nSelection: ${data.recipeSelection || "Not selected"}\nStatus: ${data.recipeApproval || "Researching"}\nTest / revision / quality notes: ${data.recipeTestNotes || "Not entered"}\n\nSTANDARDIZED RECIPE DRAFT\nRecipe: ${data.recipeName || "Not entered"}\nYield: ${data.recipeYield || "Not entered"}\nPortion / package: ${data.recipePortion || "Not entered"}\nIngredients:\n${data.recipeIngredients || "Not entered"}\nEquipment:\n${data.recipeEquipment || "Not entered"}\nProcedure:\n${data.recipeProcedure || "Not entered"}\nAllergens and controls: ${data.recipeAllergens || "Not entered"}`;
}
function updateRecipeSummary() { $("#recipeSummary").textContent = recipeSummaryText(); }
async function copyText(text, target) { try { await navigator.clipboard.writeText(text); target.textContent = "Copied."; } catch { const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); target.textContent = "Copied."; } }
function bindRecipeEvents() {
  $("#recipeExperience").addEventListener("change", event => { localStorage.setItem("advancedRecipeEvent", event.target.value); updateRecipeEventSummary(); loadRecipeExperience(event.target.value); });
  $("#recipeForm").addEventListener("input", updateRecipeSummary);
  $("#recipeForm").addEventListener("submit", event => { event.preventDefault(); const store = recipeStorage(); store[$("#recipeExperience").value] = collectRecipeData(); localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store)); $("#recipeMessage").textContent = "Saved on this device for this event."; updateRecipeSummary(); });
  $("#copyRecipe").addEventListener("click", () => copyText(recipeSummaryText(), $("#recipeMessage")));
  $("#submitRecipeForReview").addEventListener("click", async () => {
    const message = $("#recipeMessage"), data = collectRecipeData(), selectedId = $("#recipeExperience")?.value || "", event = liveRecipeEvents.find(item => String(item.id) === String(selectedId));
    if (!selectedId || !event) { message.textContent = "Choose a published Event Order in the Event dropdown before submitting."; message.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    if (!String(data.recipeName || "").trim() || !String(data.recipeIngredients || "").trim() || !String(data.recipeProcedure || "").trim()) { message.textContent = "Add a recipe title, ingredient list, and procedure before submitting."; message.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    message.textContent = "Submitting to the teacher review queue…";
    const sources = [1, 2, 3].map(number => [data.candidates[`${number}-0`], data.candidates[`${number}-1`]].filter(Boolean).join(": ")).filter(Boolean);
    try {
      const response = await fetch("/api/recipe-submissions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: data.recipeName, yield: data.recipeYield, portion: data.recipePortion, ingredients: data.recipeIngredients, equipment: data.recipeEquipment, procedure: data.recipeProcedure, eventId: event.id, eventName: event.name, parentSubmissionId: data.parentSubmissionId, threadId: data.threadId, revision: data.revision, allergens: data.recipeAllergens, sourceNotes: sources.join("\n"), testNotes: data.recipeTestNotes }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) { message.textContent = result.error || "Recipe could not be submitted."; message.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
      data.recipeApproval = "Submitted for teacher review"; $("#recipeApproval").value = data.recipeApproval;
      const store = recipeStorage(); store[$("#recipeExperience").value] = data; localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store));
      message.textContent = "Submitted to the teacher recipe approval queue. Refresh Teacher → Menu to see it awaiting review."; updateRecipeSummary(); await loadRecipeReviewData(); message.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch { message.textContent = "Submission failed. Check your connection and try again."; message.scrollIntoView({ behavior: "smooth", block: "center" }); }
  });
  $("#clearRecipe").addEventListener("click", () => { if (!window.confirm("Clear the Recipe Studio work saved for this event?")) return; const store = recipeStorage(); delete store[$("#recipeExperience").value]; localStorage.setItem("advancedRecipeStudioV3", JSON.stringify(store)); fillRecipeData({}); $("#recipeMessage").textContent = "This event was cleared."; });
  $("#webRecipeSearch").addEventListener("click", () => window.open(`https://www.google.com/search?q=${encodeURIComponent($("#recipeSearchTerms").value.trim() || "professional recipe")}`, "_blank", "noopener"));
}
function showRecipeStatusUnavailable() { $("#recipeReviewStatus").innerHTML = "<strong>Status unavailable</strong><p>Saved work is still available on this device. Refresh to reconnect to the review queue.</p>"; }
function bindDynamicButtons(root = document) { $$("[data-view-target]", root).forEach(button => { if (button.dataset.bound) return; button.dataset.bound = "true"; button.addEventListener("click", () => { if (button.dataset.scrollLive != null) return; showView(button.dataset.viewTarget); }); }); }

async function init() {
  await Promise.all([loadSourceCatalog().catch(() => { sourceCatalog = { recipes: [], references: [], statusNote: "The source catalog is temporarily unavailable." }; }), loadVocabulary().catch(() => { vocabulary = { foundations: [], advancedTerms: [] }; }), loadApprovedLibrary()]);
  try { renderHome(); renderLearning(); renderReferences(); renderRecipeWorkspace(); initializeSourceControls(); bindRecipeEvents(); } catch (error) { console.error("Student app initialization error:", error); }
  bindDynamicButtons(); loadRecipeReviewData().catch(showRecipeStatusUnavailable);
  $("#menuButton")?.addEventListener("click", () => { const open = $("#primaryNav")?.classList.toggle("open"); $("#menuButton")?.setAttribute("aria-expanded", String(Boolean(open))); });
  $("#continueWork")?.addEventListener("click", () => { const packet = $("#liveEventOrder"); if (packet && !packet.hidden) { packet.scrollIntoView({ behavior: "smooth", block: "start" }); } else showView("learning"); });
  document.addEventListener("click", event => { const trigger = event.target.closest("[data-scroll-live]"); if (!trigger) return; showView("today"); const packet = $("#liveEventOrder"), status = $("#deskStatus"); (packet && !packet.hidden ? packet : status)?.scrollIntoView({ behavior: "smooth", block: "start" }); });
  $("#learningSearch")?.addEventListener("input", event => renderLearning(event.target.value));
  const updateSourceBank = () => renderSourceBank($("#sourceRecipeSearch")?.value || "", $("#sourceRecipeCategory")?.value || "", $("#sourceRecipeUse")?.value || "");
  $("#sourceRecipeSearch")?.addEventListener("input", updateSourceBank); $("#sourceRecipeCategory")?.addEventListener("change", updateSourceBank); $("#sourceRecipeUse")?.addEventListener("change", updateSourceBank);
  const updateReferences = () => renderReferences($("#referenceSearch")?.value || "", $("#referenceType")?.value || "");
  $("#referenceSearch")?.addEventListener("input", updateReferences); $("#referenceType")?.addEventListener("change", updateReferences);
  $$("[data-ref-mode]").forEach(button => button.addEventListener("click", () => { referenceMode = button.dataset.refMode; renderReferences($("#referenceSearch")?.value || "", $("#referenceType")?.value || ""); }));
  $$("[data-close-modal]").forEach(button => button.addEventListener("click", () => $("#" + button.dataset.closeModal)?.close()));
  $("#recipeDialog")?.addEventListener("click", event => { if (event.target === $("#recipeDialog")) $("#recipeDialog").close(); });
  $("#vocabDialog")?.addEventListener("click", event => { if (event.target === $("#vocabDialog")) $("#vocabDialog").close(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { $("#recipeDialog")?.close(); $("#vocabDialog")?.close(); } });
  window.addEventListener("gcsd:live-events", () => {});
}
init();

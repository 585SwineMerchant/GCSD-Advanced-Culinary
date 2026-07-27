const experiences = [
  {
    id: 1,
    short: "Kitchen Launch",
    title: "Professional Kitchen Launch & Hors d’Oeuvre Reception",
    timing: "September–October",
    focus: "Readiness, station systems, consistent execution",
    challenge: "Produce and serve safe, consistent, visually appealing small bites that are ready at the promised service time.",
    learning: "Safety reverification, mise en place, garde manger, presentation, professional communication, service timing.",
    growth: "Teacher-framed menu and assigned roles establish the operating habits required for later independence.",
    evidence: ["Readiness verification", "Station and production plan", "Meaningful cooking evidence", "Quality record", "Individual reflection"],
    gradient: "linear-gradient(135deg,#285548,#18352d)"
  },
  {
    id: 2,
    short: "Pop-Up Bakery",
    title: "Preorder Pop-Up Bakery",
    timing: "November–December",
    focus: "Scaling, costing, scheduling, packaging, fulfillment",
    challenge: "Convert known customer demand into consistent products, accurate orders, responsible cost, and on-time fulfillment.",
    learning: "Baking methods, formula scaling, yield, cost, batch scheduling, packaging, labeling, order accuracy.",
    growth: "Students coordinate multiple batches, shared equipment, cooling, packaging, labeling, and a fixed fulfillment deadline.",
    evidence: ["Scaled formula", "Cost and yield record", "Production schedule", "Fulfillment record", "Planned-versus-actual review"],
    gradient: "linear-gradient(135deg,#a65a2e,#6f2d1c)"
  },
  {
    id: 3,
    short: "Seasonal Lunch",
    title: "Seasonal Soup, Sauce & Lunch Service",
    timing: "January–February",
    focus: "Menu balance, client constraints, holding, delivery",
    challenge: "Build and deliver a cohesive meal whose components meet a defined recipient’s needs, budget, and schedule.",
    learning: "Stocks, soups, sauces, vegetables, starches, salads, sandwiches or pasta, holding, transport.",
    growth: "Students make more menu decisions and coordinate components that finish, hold, travel, and serve differently.",
    evidence: ["Client interpretation", "Menu rationale", "Yield and cost work", "Holding plan", "Client feedback"],
    gradient: "linear-gradient(135deg,#856b2b,#4c5a2f)"
  },
  {
    id: 4,
    short: "Fast-Casual Pop-Up",
    title: "Fast-Casual Pop-Up: Pizza or Sandwich Shop",
    timing: "February–March",
    focus: "Order flow, customer interaction, speed, accuracy",
    challenge: "Deliver customized food quickly without sacrificing safety, consistency, hospitality, or order accuracy.",
    learning: "Batch production, tickets, station flow, replenishment, hospitality, service recovery, demand and waste.",
    growth: "Students manage demand and communication in real time while keeping a limited menu consistent.",
    evidence: ["Menu communication", "Order system", "Line-flow evidence", "Accuracy data", "Waste and service analysis"],
    gradient: "linear-gradient(135deg,#b04a32,#7a2d23)"
  },
  {
    id: 5,
    short: "Client Catering",
    title: "Protein-Centered Client Catering",
    timing: "March–April",
    focus: "Fabrication, client communication, leadership",
    challenge: "Match a protein to the correct fabrication and cooking method while coordinating a complete catered meal.",
    learning: "Poultry, meat or seafood, fabrication, yield, doneness, sauces, sides, catering, rotating leadership.",
    growth: "The class manages a more demanding menu, fixed client deadline, purchasing decisions, leadership rotations, and coordinated service.",
    evidence: ["Client clarification", "Costed menu", "Fabrication and cooking evidence", "Leadership evidence", "Client evaluation"],
    gradient: "linear-gradient(135deg,#6f3f2d,#33251f)"
  },
  {
    id: 6,
    short: "Operations Capstone",
    title: "Breakfast / Brunch Operations Capstone",
    timing: "May–June",
    focus: "Full-cycle planning, leadership, service, closeout",
    challenge: "Operate the complete client-centered production cycle with increasing student ownership and individual Gateway 4 evidence.",
    learning: "Integrated menu work, production systems, leadership, quality, hospitality, evaluation, improvement.",
    growth: "Students assume the greatest feasible responsibility while the teacher maintains safety, approval, and assessment controls.",
    evidence: ["Full planning contribution", "Required cooking performance", "Professional-practice evidence", "Operating data", "Capstone reflection"],
    gradient: "linear-gradient(135deg,#263f50,#182833)"
  }
];

const practices = [
  {
    id: "readiness",
    type: "Readiness check",
    title: "Advanced kitchen reverification",
    description: "Demonstrate uniform, hygiene, handwashing, allergen awareness, knife and equipment safety, station setup, and closing expectations.",
    next: "Teacher verifies readiness before independent production."
  },
  {
    id: "demo",
    type: "Demonstration + focused lab",
    title: "Small-bite construction and presentation",
    description: "Observe portioning, structural stability, garnish restraint, service temperature, and efficient finishing. Practice one controlled product.",
    next: "Complete the product evaluation after the lab."
  },
  {
    id: "calibration",
    type: "Team calibration",
    title: "Define the quality standard",
    description: "Compare test portions and agree on observable standards for flavor, texture, appearance, portion, temperature, and consistency.",
    next: "Record the approved standard for the production packet."
  }
];

const planningSteps = [
  {title:"Confirm the event brief", detail:"Read the recipient, count, timing, menu boundaries, service conditions, and restrictions.", scope:"Class + teacher", format:"Digital or projected", approval:true, tool:"brief"},
  {title:"Research and propose a product", detail:"Use the customer brief, completed/current learning, and three credible recipe possibilities.", scope:"Individual or station", format:"Digital", approval:true, view:"recipes"},
  {title:"Standardize the approved recipe", detail:"Record the tested yield, method, adaptations, quality standard, allergens, holding, and service notes.", scope:"Station", format:"Digital → print", approval:true, tool:"recipe"},
  {title:"Build the station production plan", detail:"Assign meaningful cooking work, list equipment and mise en place, sequence production, and identify controls.", scope:"Station", format:"Digital → print", approval:true, tool:"production"},
  {title:"Calibrate quality and service", detail:"Define release standards, checkpoints, corrective actions, service responsibilities, and closing work.", scope:"Station + class", format:"Print for kitchen", approval:true, tool:"quality"}
];

const toolDefinitions = {
  brief: {
    letter:"A",
    name:"Customer / Event Brief",
    used:"Brief",
    owner:"Class and teacher",
    timing:"Before recipe research",
    fields:["Recipient / audience","Event or occasion","Date and service window","Guest / order count","Budget or cost boundary","Dietary and allergen needs","Service / packaging conditions","Menu boundaries","Approval notes"]
  },
  recipe: {
    letter:"B",
    name:"Standardized Recipe Approval Record",
    used:"Plan",
    owner:"Station",
    timing:"After testing; before production",
    fields:["Product and source","Approved yield and portion","Ingredients / quantities","Method and critical controls","Allergen controls","Equipment / batch limits","Holding / packaging / service","Quality standard","Revision and approval"]
  },
  production: {
    letter:"C",
    name:"Station Production Plan",
    used:"Plan + Produce",
    owner:"Station with individual assignments",
    timing:"Approved before production; carried in kitchen",
    fields:["Student / station / experience","Version and date","Products and quantities","Meaningful cooking assignment by student","Mise en place","Equipment","Production timeline","Safety / temperature controls","Communication checkpoints","Closing responsibilities"]
  },
  quality: {
    letter:"D",
    name:"Quality, Service & Closeout Record",
    used:"Practice + Produce + Reflect",
    owner:"Station and assigned quality lead",
    timing:"Define before production; complete during and after service",
    fields:["Approved quality standard","Calibration result","Release checkpoints","Corrective action","Service count / accuracy","Waste / variance","Recipient feedback","Closing verification","Improvement for next time"]
  }
};

const chapters = [
  {
    id:"orientation",
    title:"How Advanced Culinary Works",
    kicker:"Course orientation",
    summary:"Major experiences form the year’s operational spine. Demonstrations, ingredient studies, focused lessons, recipe trials, and smaller labs build the capacity needed for the next experience.",
    sections:[
      ["The repeated rhythm","Understand the brief. Learn and practice. Plan the work. Produce and serve. Reflect and preserve evidence."],
      ["What changes from Culinary 1 & 2","A recipient or operating need now creates the challenge. Students research and adapt recipes, coordinate real constraints, make decisions, and show individual performance within team production."],
      ["What does not change","Safety, sanitation, professional conduct, accurate technique, honest reporting, and product quality remain non-negotiable."]
    ],
    callout:"Return to Current Experience whenever you are unsure what to do next."
  },
  {
    id:"station",
    title:"Station Systems & Professional Practice",
    kicker:"Before production",
    summary:"A station is ready when people, ingredients, equipment, information, timing, safety controls, and closing responsibilities are visible before work begins.",
    sections:[
      ["Mise en place","List ingredients by form and quantity, gather only required equipment, identify shared equipment, and confirm the first three actions before starting."],
      ["Communication","Report status, risk, delay, shortage, quality concern, or needed decision early. Use specific language: what happened, what it affects, and what action is proposed."],
      ["Individual responsibility","Rotating leadership roles organize the work. They do not remove any student’s required meaningful cooking or production contribution."]
    ],
    callout:"If the plan depends on everyone simply remembering what to do, the plan is not finished."
  },
  {
    id:"client",
    title:"Client & Recipient Interpretation",
    kicker:"Before menu decisions",
    summary:"A request becomes a usable brief only after the team clarifies audience, quantity, budget, restrictions, timing, equipment, packaging, service, and success criteria.",
    sections:[
      ["Clarify before promising","Separate confirmed requirements from preferences and assumptions. Ask which constraint matters most when all requests cannot be met."],
      ["Flexible service models","Arcadia and Olympia may use different approved recipients or service formats. Shared learning, planning, assessment, and evidence remain comparable."],
      ["Professional boundaries","Students do not promise prices, quantities, menu items, dates, or accommodations that the teacher has not approved."]
    ],
    callout:"The customer’s request guides the work; safety, capacity, learning goals, and approval determine what the class can promise."
  },
  {
    id:"recipe",
    title:"Recipe Research, Adaptation & Scaling",
    kicker:"Recipe Studio",
    summary:"A credible recipe is a starting point. Approval depends on fit: recipient, technique, yield, cost, equipment, time, allergens, holding, service, readiness, and quality.",
    sections:[
      ["Research","Compare at least three plausible starting points. Record the source and explain why each one does or does not fit the brief."],
      ["Adapt deliberately","Record changes to ingredients, flavor, method, format, yield, portion, equipment, timing, packaging, and service. Test unfamiliar or high-risk changes."],
      ["Scale responsibly","A numerical conversion factor does not prove that a batch will work. Check mixer, pan, oven, cooling, holding, and student-capacity limits before approving batch size."]
    ],
    callout:"Approve one reproducible production version. Preserve what changed and why."
  },
  {
    id:"safety",
    title:"Safety, Allergens & Critical Controls",
    kicker:"Every phase",
    summary:"Safety violations are corrected immediately. Serious risk may require stop/restart or targeted reassessment even when the final product appears acceptable.",
    sections:[
      ["Allergen control","Confirm the actual restriction, ingredient labels, cross-contact risks, tools, surfaces, storage, service, and communication. Never make an unverified claim."],
      ["Temperature and time","Identify the product’s critical controls before production. Record required measurements at the point where action can still be taken."],
      ["Stop conditions","Unsafe food, serious equipment misuse, dishonest reporting, uncontrolled allergens, or work unfit for service requires teacher intervention."]
    ],
    callout:"A successful event never cancels a critical safety failure."
  },
  {
    id:"quality",
    title:"Quality Control, Holding & Service",
    kicker:"Practice through service",
    summary:"Quality becomes manageable when the team defines observable standards before production and checks them before the product reaches the recipient.",
    sections:[
      ["Define the standard","Specify flavor, texture, appearance, portion, temperature, consistency, packaging, and service-readiness in observable terms."],
      ["Calibrate","Compare practice portions, select the approved target, and identify acceptable variation. Photograph or record the target when useful."],
      ["Correct early","Decide what can be adjusted, reworked, held, replaced, or stopped. Never send a known failure forward because the deadline is close."]
    ],
    callout:"Quality control is a production responsibility, not a final inspection performed after correction is impossible."
  },
  {
    id:"evidence",
    title:"Portfolio Evidence & Reflection",
    kicker:"After meaningful work",
    summary:"The portfolio is the curated evidence base for graduation and professional use. It is not a storage bin for every worksheet.",
    sections:[
      ["Practice evidence","Notes and routine guided practice usually stay in class. Preserve selected trials when they clearly show readiness, growth, or a significant revision."],
      ["Major-experience evidence","Each experience should contribute limited, useful evidence of planning, meaningful cooking, professional practice, product or service results, feedback, and reflection."],
      ["Evidence-based reflection","Name the responsibility, point to evidence, explain a result, and identify a specific next improvement. Avoid unsupported statements such as “it went well.”"]
    ],
    callout:"Team success never replaces evidence of each student’s own performance."
  }
];

const staffQuestions = [
  {
    title:"Experience anchors",
    questions:["Which events are reliable annual anchors?","Which are opportunity-dependent?","Which event should serve as the formal Advanced Culinary / Gateway 4 capstone?"]
  },
  {
    title:"Actual student routine",
    questions:["What sequence does Jason currently use within a Cottage event?","What smaller demos, technique lessons, and labs normally surround each event?","What must a student physically carry in the kitchen?"]
  },
  {
    title:"Existing documents",
    questions:["Which forms are already in use?","Who completes each form: individual, station, class, or teacher?","Which forms are print, digital, graded, approved, or archived?"]
  },
  {
    title:"Recipes",
    questions:["How are recipes proposed, tested, approved, and stored now?","Which sources are preferred?","Who owns the final standardized production version?"]
  },
  {
    title:"Roles and evidence",
    questions:["Which rotating roles already exist?","How is every student’s meaningful cooking documented?","Which evidence is required for each major experience and where is it submitted?"]
  },
  {
    title:"Local implementation",
    questions:["What can Arcadia run through The Cottage or approved sales?","What equivalent formats are realistic at Olympia?","Which dates, clients, quantities, payments, and service details must remain teacher-confirmed?"]
  }
];

const techniques = ["Safety and sanitation","Mise en place","Knife / fabrication","Garde manger","Baking / pastry","Stocks / soups / sauces","Vegetables / starches","Protein cookery","Menu balance","Scaling / costing","Holding / packaging","Hospitality / service"];
const candidateFields = ["Product or concept","Source URL / book / chef","Why it fits the brief","Feasibility concerns"];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}

function showView(name) {
  $$("[data-view-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === name));
  $$(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.viewTarget === name));
  $("#primaryNav").classList.remove("open");
  $("#menuButton").setAttribute("aria-expanded", "false");
  window.scrollTo({top:0, behavior:"smooth"});
}

function openPhase(name) {
  const phaseLabels = {brief:"Understand the Brief", practice:"Learn & Practice", plan:"Plan the Work", produce:"Produce & Serve", reflect:"Reflect & Submit"};
  const nextActions = {brief:"Read the event brief", practice:"Complete the practice-lab evaluation", plan:"Open the next assigned planning step", produce:"Use the approved production packet", reflect:"Build your portfolio reflection"};
  $$(".phase-tab").forEach(tab => {
    const active = tab.dataset.phase === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  $$("[data-phase-panel]").forEach(panel => {
    const active = panel.dataset.phasePanel === name;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  $("#currentPhaseName").textContent = phaseLabels[name];
  $("#nextActionText").textContent = nextActions[name];
  localStorage.setItem("advancedCurrentPhase", name);
  $(".workflow-shell").scrollIntoView({behavior:"smooth", block:"start"});
}

function renderPractices() {
  const saved = JSON.parse(localStorage.getItem("advancedPracticeChecks") || "{}");
  $("#practiceList").innerHTML = practices.map(item => `
    <article class="practice-card">
      <header><span class="type">${item.type}</span><span>${saved[item.id] ? "Complete" : "In progress"}</span></header>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <label><input type="checkbox" data-practice-check="${item.id}" ${saved[item.id] ? "checked" : ""} /> ${item.next}</label>
    </article>`).join("");
  $$("[data-practice-check]").forEach(box => box.addEventListener("change", () => {
    const record = {};
    $$("[data-practice-check]").forEach(item => record[item.dataset.practiceCheck] = item.checked);
    localStorage.setItem("advancedPracticeChecks", JSON.stringify(record));
    renderPractices();
  }));
}

function renderPlanning() {
  $("#planningSequence").innerHTML = planningSteps.map((step, index) => `
    <article class="action-step">
      <span class="action-number">${index + 1}</span>
      <div>
        <h3>${step.title}</h3>
        <p>${step.detail}</p>
        <div class="step-meta">
          <span class="meta-pill">${step.scope}</span>
          <span class="meta-pill">${step.format}</span>
          ${step.approval ? '<span class="meta-pill approval">Teacher approval</span>' : ""}
        </div>
      </div>
      <button class="button secondary" ${step.view ? `data-view-target="${step.view}"` : `data-tool="${step.tool}"`}>${step.view ? "Open Recipe Studio" : "Open tool"}</button>
    </article>`).join("");
  bindDynamicButtons($("#planningSequence"));
}

function renderExperiences() {
  $("#experienceGrid").innerHTML = experiences.map(exp => `
    <article class="experience-card ${exp.id === 1 ? "current" : ""}">
      <div class="experience-photo" style="--card-gradient:${exp.gradient}"><span>0${exp.id}</span></div>
      <div class="experience-body">
        <div class="experience-meta">
          <span class="pill">${exp.timing}</span>
          ${exp.id === 1 ? '<span class="pill current">Active prototype</span>' : '<span class="pill">Course arc</span>'}
        </div>
        <h2>${exp.title}</h2>
        <p><strong>${exp.focus}</strong></p>
        <p>${exp.challenge}</p>
        <button class="text-link" data-experience="${exp.id}">View experience →</button>
      </div>
    </article>`).join("");
  $$("[data-experience]").forEach(button => button.addEventListener("click", () => openExperience(Number(button.dataset.experience))));
}

function openExperience(id) {
  const exp = experiences.find(item => item.id === id);
  $("#experienceDialogContent").innerHTML = `
    <div class="modal-hero">
      <p class="eyebrow">Experience ${exp.id} · ${exp.timing}</p>
      <h2>${exp.title}</h2>
      <p>${exp.focus}</p>
    </div>
    <div class="modal-body">
      <div class="modal-grid">
        <article class="modal-block wide"><h3>Performance challenge</h3><p>${exp.challenge}</p></article>
        <article class="modal-block"><h3>Technical learning</h3><p>${exp.learning}</p></article>
        <article class="modal-block"><h3>Operational growth</h3><p>${exp.growth}</p></article>
        <article class="modal-block wide"><h3>Likely evidence</h3><ul>${exp.evidence.map(item => `<li>${item}</li>`).join("")}</ul></article>
      </div>
      ${id === 1 ? '<button class="button primary" data-go-current>Open active workspace</button>' : '<p class="chapter-callout">Operational details remain intentionally provisional until department review confirms the actual event, student routine, tools, and evidence.</p>'}
    </div>`;
  $("#experienceDialog").showModal();
  const goCurrent = $("[data-go-current]");
  if (goCurrent) goCurrent.addEventListener("click", () => { $("#experienceDialog").close(); showView("current"); });
}

function toolFormHtml(tool) {
  return `
    <div class="modal-hero">
      <p class="eyebrow">Production Tool ${tool.letter} · Used during ${tool.used}</p>
      <h2>${tool.name}</h2>
      <p>${tool.owner} · ${tool.timing}</p>
    </div>
    <div class="modal-body">
      <div class="tool-identifiers">
        <label>Student / team<input /></label>
        <label>Experience<input value="1 — Kitchen Launch" /></label>
        <label>Date<input type="date" /></label>
        <label>Version<input placeholder="Draft / approved" /></label>
      </div>
      <div class="tool-form">
        ${tool.fields.map(field => `<label>${field}<textarea rows="${field.length > 28 ? 3 : 2}"></textarea></label>`).join("")}
      </div>
      <div class="form-actions">
        <button class="button primary" type="button" data-print-tool="${tool.letter}">Print this form only</button>
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
  $("#printArea").innerHTML = `
    <div class="print-header">
      <div><h1>Advanced Culinary</h1><p>Production Tool ${tool.letter}: ${tool.name}</p></div>
      <div><p>Student / team: ____________________</p><p>Experience: ______ Date: ______ Version: ______</p></div>
    </div>
    <p><strong>Owner:</strong> ${tool.owner} &nbsp; <strong>Use:</strong> ${tool.timing}</p>
    <div class="print-grid">
      ${tool.fields.map((field,index) => `<section class="print-box ${index === tool.fields.length - 1 ? "wide" : ""}"><strong>${field}</strong><div class="print-lines"></div></section>`).join("")}
      <section class="print-box wide"><strong>Teacher approval / status</strong><p>☐ Continue &nbsp; ☐ Revise &nbsp; ☐ Reassess &nbsp; Signature: ____________________ Date: ______</p></section>
    </div>`;
  window.print();
}

function printProductionPacket() {
  $("#printArea").innerHTML = `
    <div class="print-header">
      <div><h1>Kitchen Launch Production Packet</h1><p>Experience 1 · Advanced Culinary</p></div>
      <div><p>Station: ____________________</p><p>Date: ______ Version: ______ Teacher approval: ______</p></div>
    </div>
    <div class="print-grid">
      <section class="print-box wide"><h2>Approved product and recipe version</h2><div class="print-lines"></div></section>
      <section class="print-box"><h3>Meaningful cooking assignments</h3><div class="print-lines"></div></section>
      <section class="print-box"><h3>Mise en place and equipment</h3><div class="print-lines"></div></section>
      <section class="print-box wide"><h3>Production timeline and checkpoints</h3><div class="print-lines"></div></section>
      <section class="print-box"><h3>Safety / temperature controls</h3><div class="print-lines"></div></section>
      <section class="print-box"><h3>Approved quality standard</h3><div class="print-lines"></div></section>
      <section class="print-box"><h3>Service / release record</h3><div class="print-lines"></div></section>
      <section class="print-box"><h3>Closing / variance / waste</h3><div class="print-lines"></div></section>
    </div>`;
  window.print();
}

function renderToolMap() {
  $("#toolMap").innerHTML = Object.values(toolDefinitions).map(tool => `
    <article class="tool-card">
      <span class="tool-letter">${tool.letter}</span>
      <h3>${tool.name}</h3>
      <p><strong>Owner:</strong> ${tool.owner}<br><strong>When:</strong> ${tool.timing}</p>
      <button class="text-link" data-tool="${Object.keys(toolDefinitions).find(key => toolDefinitions[key] === tool)}">Preview form →</button>
    </article>`).join("");
  bindDynamicButtons($("#toolMap"));
}

let activeChapter = 0;
function renderReference(search = "") {
  const term = search.trim().toLowerCase();
  const matches = chapters.map((chapter,index) => ({chapter,index})).filter(({chapter}) => JSON.stringify(chapter).toLowerCase().includes(term));
  $("#chapterNav").innerHTML = matches.length ? matches.map(({chapter,index}) => `<button class="${activeChapter === index ? "active" : ""}" data-chapter="${index}">${chapter.title}</button>`).join("") : '<p class="field-help">No matching reference chapters.</p>';
  if (!matches.length) {
    $("#chapterReader").innerHTML = "<h2>No results</h2><p>Try a broader term or return to the Current Experience.</p>";
    return;
  }
  if (!matches.some(match => match.index === activeChapter)) activeChapter = matches[0].index;
  const chapter = chapters[activeChapter];
  $("#chapterReader").innerHTML = `
    <p class="chapter-kicker">${chapter.kicker}</p>
    <h2>${chapter.title}</h2>
    <p>${chapter.summary}</p>
    ${chapter.sections.map(([heading,body]) => `<h3>${heading}</h3><p>${body}</p>`).join("")}
    <p class="chapter-callout"><strong>Use it:</strong> ${chapter.callout}</p>`;
  $$("[data-chapter]").forEach(button => button.addEventListener("click", () => {
    activeChapter = Number(button.dataset.chapter);
    renderReference($("#referenceSearch").value);
  }));
}

function openReference(id) {
  const index = chapters.findIndex(chapter => chapter.id === id);
  activeChapter = index < 0 ? 0 : index;
  $("#referenceSearch").value = "";
  renderReference();
  showView("reference");
}

function renderStaffReview() {
  $("#staffReview").innerHTML = staffQuestions.map(group => `
    <article class="staff-card">
      <h2>${group.title}</h2>
      <ol>${group.questions.map(question => `<li>${question}</li>`).join("")}</ol>
    </article>`).join("");
}

function renderRecipeWorkspace() {
  $("#recipeExperience").innerHTML = experiences.map(exp => `<option value="${exp.id}">${exp.id}. ${exp.short}</option>`).join("");
  $("#techniqueChoices").innerHTML = techniques.map((technique,index) => `<label><input type="checkbox" data-technique="${index}" /> ${technique}</label>`).join("");
  $("#candidateGrid").innerHTML = [1,2,3].map(number => `
    <article class="candidate-card">
      <h3>Possibility ${number}</h3>
      ${candidateFields.map((field,index) => `<label>${field}${index === 2 || index === 3 ? `<textarea rows="3" data-candidate="${number}-${index}"></textarea>` : `<input data-candidate="${number}-${index}" ${index === 1 ? 'type="url"' : ""} />`}</label>`).join("")}
    </article>`).join("");
  $("#recipeExperience").value = "1";
  loadRecipeExperience("1");
}

function recipeStorage() {
  return JSON.parse(localStorage.getItem("advancedRecipeStudioV2") || "{}");
}

function collectRecipeData() {
  const fields = ["recipeOccasion","recipeCount","recipeBudget","recipeService","recipeTime","recipeNeeds","recipeCourseConnection","recipeSearchTerms","recipeSelection","recipeApproval","recipeTestNotes"];
  const data = Object.fromEntries(fields.map(id => [id, $("#" + id).value]));
  data.techniques = $$("[data-technique]").filter(box => box.checked).map(box => box.dataset.technique);
  data.candidates = {};
  $$("[data-candidate]").forEach(field => data.candidates[field.dataset.candidate] = field.value);
  return data;
}

function fillRecipeData(data = {}) {
  ["recipeOccasion","recipeCount","recipeBudget","recipeService","recipeTime","recipeNeeds","recipeCourseConnection","recipeSearchTerms","recipeSelection","recipeTestNotes"].forEach(id => $("#" + id).value = data[id] || "");
  $("#recipeApproval").value = data.recipeApproval || "Researching";
  $$("[data-technique]").forEach(box => box.checked = (data.techniques || []).includes(box.dataset.technique));
  $$("[data-candidate]").forEach(field => field.value = (data.candidates || {})[field.dataset.candidate] || "");
  updateRecipeSummary();
}

function loadRecipeExperience(id) {
  fillRecipeData(recipeStorage()[id] || {});
  $("#recipeMessage").textContent = recipeStorage()[id] ? "Saved work loaded for this experience." : "No saved work yet for this experience.";
}

function recipeSummaryText() {
  const data = collectRecipeData();
  const exp = experiences.find(item => String(item.id) === $("#recipeExperience").value);
  const selectedTechniques = data.techniques.map(index => techniques[Number(index)]).join(", ") || "Not selected";
  const possibilities = [1,2,3].map(number => {
    const product = data.candidates[`${number}-0`] || "Not entered";
    const source = data.candidates[`${number}-1`] || "No source";
    const fit = data.candidates[`${number}-2`] || "No rationale";
    const concerns = data.candidates[`${number}-3`] || "No concerns recorded";
    return `Possibility ${number}: ${product}\nSource: ${source}\nFit: ${fit}\nFeasibility: ${concerns}`;
  }).join("\n\n");
  return `${exp.title}

CUSTOMER / PRODUCTION BRIEF
Occasion or recipient: ${data.recipeOccasion || "Not entered"}
Count: ${data.recipeCount || "Not entered"}
Budget: ${data.recipeBudget || "Not entered"}
Service / packaging: ${data.recipeService || "Not entered"}
Production time: ${data.recipeTime || "Not entered"}
Preferences, dietary needs, and allergens: ${data.recipeNeeds || "Not entered"}

COURSE CONNECTIONS
Selected learning: ${selectedTechniques}
Current unit / stretch: ${data.recipeCourseConnection || "Not entered"}

RESEARCH
${possibilities}

SELECTION AND TEST
Selection: ${data.recipeSelection || "Not selected"}
Status: ${data.recipeApproval || "Researching"}
Test / adaptation / quality notes: ${data.recipeTestNotes || "Not entered"}`;
}

function updateRecipeSummary() {
  $("#recipeSummary").textContent = recipeSummaryText();
}

async function copyText(text, messageTarget) {
  try {
    await navigator.clipboard.writeText(text);
    if (messageTarget) messageTarget.textContent = "Copied.";
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    if (messageTarget) messageTarget.textContent = "Copied.";
  }
}

function bindRecipeEvents() {
  $("#recipeExperience").addEventListener("change", event => loadRecipeExperience(event.target.value));
  $("#recipeForm").addEventListener("input", updateRecipeSummary);
  $("#recipeForm").addEventListener("submit", event => {
    event.preventDefault();
    const store = recipeStorage();
    store[$("#recipeExperience").value] = collectRecipeData();
    localStorage.setItem("advancedRecipeStudioV2", JSON.stringify(store));
    $("#recipeMessage").textContent = "Saved on this device for this experience.";
    updateRecipeSummary();
  });
  $("#copyRecipe").addEventListener("click", () => copyText(recipeSummaryText(), $("#recipeMessage")));
  $("#clearRecipe").addEventListener("click", () => {
    if (!window.confirm("Clear the Recipe Studio work saved for this experience?")) return;
    const store = recipeStorage();
    delete store[$("#recipeExperience").value];
    localStorage.setItem("advancedRecipeStudioV2", JSON.stringify(store));
    fillRecipeData({});
    $("#recipeMessage").textContent = "This experience was cleared.";
  });
  $("#webRecipeSearch").addEventListener("click", () => {
    const query = $("#recipeSearchTerms").value.trim() || [$("#recipeOccasion").value, $("#recipeNeeds").value, $("#recipeCourseConnection").value, "recipe"].filter(Boolean).join(" ");
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query || "professional recipe")}`, "_blank", "noopener");
  });
}

function reflectionText() {
  const responsibility = $("#reflectionResponsibility").value.trim();
  const evidence = $("#reflectionEvidence").value.trim();
  const result = $("#reflectionResult").value.trim();
  const next = $("#reflectionNext").value.trim();
  if (!(responsibility || evidence || result || next)) return "Complete the fields to build a useful evidence-based reflection.";
  return `During the Professional Kitchen Launch, I was responsible for ${responsibility || "[describe your responsibility]"}. Evidence of my work includes ${evidence || "[identify specific evidence]"}. The result was ${result || "[explain the result or feedback]"}. Based on that evidence, my next improvement is to ${next || "[name a specific next action]"}.`;
}

function loadReflection() {
  const data = JSON.parse(localStorage.getItem("advancedReflectionExp1") || "{}");
  $("#reflectionResponsibility").value = data.responsibility || "";
  $("#reflectionEvidence").value = data.evidence || "";
  $("#reflectionResult").value = data.result || "";
  $("#reflectionNext").value = data.next || "";
  $("#reflectionOutput").textContent = reflectionText();
}

function bindReflection() {
  $("#reflectionForm").addEventListener("submit", event => {
    event.preventDefault();
    localStorage.setItem("advancedReflectionExp1", JSON.stringify({
      responsibility:$("#reflectionResponsibility").value,
      evidence:$("#reflectionEvidence").value,
      result:$("#reflectionResult").value,
      next:$("#reflectionNext").value
    }));
    $("#reflectionOutput").textContent = reflectionText();
    $("#reflectionMessage").textContent = "Reflection saved on this device.";
  });
  $("#reflectionForm").addEventListener("input", () => $("#reflectionOutput").textContent = reflectionText());
  $("#copyReflection").addEventListener("click", () => copyText(reflectionText(), $("#reflectionMessage")));
}

function bindDynamicButtons(root = document) {
  $$("[data-view-target]", root).forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => showView(button.dataset.viewTarget));
  });
  $$("[data-tool]", root).forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => openTool(button.dataset.tool));
  });
}

function init() {
  bindDynamicButtons();
  $("#menuButton").addEventListener("click", () => {
    const open = $("#primaryNav").classList.toggle("open");
    $("#menuButton").setAttribute("aria-expanded", String(open));
  });
  $$(".phase-tab").forEach(tab => tab.addEventListener("click", () => openPhase(tab.dataset.phase)));
  $$("[data-open-phase]").forEach(button => button.addEventListener("click", () => openPhase(button.dataset.openPhase)));
  $$("[data-reference]").forEach(button => button.addEventListener("click", event => {
    event.stopImmediatePropagation();
    openReference(button.dataset.reference);
  }));
  $$("[data-close-modal]").forEach(button => button.addEventListener("click", () => $("#" + button.dataset.closeModal).close()));
  ["experienceDialog","toolDialog"].forEach(id => $("#" + id).addEventListener("click", event => {
    if (event.target === $("#" + id)) $("#" + id).close();
  }));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") $$("dialog[open]").forEach(dialog => dialog.close());
  });

  renderPractices();
  renderPlanning();
  renderExperiences();
  renderRecipeWorkspace();
  bindRecipeEvents();
  renderReference();
  $("#referenceSearch").addEventListener("input", event => renderReference(event.target.value));
  renderToolMap();
  renderStaffReview();
  bindReflection();
  loadReflection();
  $("#printPacket").addEventListener("click", printProductionPacket);

  const savedPhase = localStorage.getItem("advancedCurrentPhase");
  if (savedPhase && ["brief","practice","plan","produce","reflect"].includes(savedPhase)) {
    // Restore state without moving the page during initial load.
    $$(".phase-tab").forEach(tab => {
      const active = tab.dataset.phase === savedPhase;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    $$("[data-phase-panel]").forEach(panel => {
      const active = panel.dataset.phasePanel === savedPhase;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
    const phaseLabels = {brief:"Understand the Brief", practice:"Learn & Practice", plan:"Plan the Work", produce:"Produce & Serve", reflect:"Reflect & Submit"};
    const nextActions = {brief:"Read the event brief", practice:"Complete the practice-lab evaluation", plan:"Open the next assigned planning step", produce:"Use the approved production packet", reflect:"Build your portfolio reflection"};
    $("#currentPhaseName").textContent = phaseLabels[savedPhase];
    $("#nextActionText").textContent = nextActions[savedPhase];
  }
}

init();

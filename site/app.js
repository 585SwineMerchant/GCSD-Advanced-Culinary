const experiences = [
  {
    id: 1,
    title: "Professional Kitchen Launch & Hors d’Oeuvre Reception",
    short: "Kitchen Launch",
    timing: "September–October",
    wbl: "conditional",
    focus: "Reverification, assigned roles, consistent execution",
    essential: "How does a culinary team translate professional standards into a coordinated guest experience?",
    purpose: "Reverify advanced-kitchen readiness while producing and serving consistent small bites for an authentic or internal school audience.",
    responsibility: "Teacher-framed menu and assigned brigade roles. Students build station plans, calibrate product quality, execute service, and complete individual debrief evidence.",
    complexity: "The event is tightly framed so the class can prove that safety, communication, station organization, and quality are reliable before greater independence is granted.",
    recipeChallenge: "Select or adapt small-bite recipes that can be produced consistently, portioned accurately, finished close to service, and presented within the available equipment and labor.",
    planning: ["Audience and event brief", "Approved menu and product specifications", "Station and equipment plan", "Practice batch and quality calibration", "Service and debrief plan"],
    anchors: ["Kitchen safety and sanitation", "Mise en place and station systems", "Garde manger and presentation", "Professional communication", "Service timing"],
    arcadia: "The Cottage opening reception, CTE showcase reception, or another approved client event.",
    olympia: "Invited-staff reception, pathway showcase, or internal building client service using the same planning process and rubric.",
    evidence: ["Safety and sanitation reverification", "Station and production plan", "Consistent product standard", "Service and individual reflection"],
    standard: "Produce a safe, consistent, visually appealing small-bite reception that is fully ready at the promised service time.",
    review: ["Name the actual opening audience or event.", "Confirm menu-choice boundaries and existing brigade roles.", "Identify current forms, recipes, and service expectations."],
    gradient: "linear-gradient(135deg,#1e584b,#17372f)"
  },
  {
    id: 2,
    title: "Preorder Pop-Up Bakery",
    short: "Pop-Up Bakery",
    timing: "November–December",
    wbl: "strong",
    focus: "Scaling, costing, scheduling, packaging, fulfillment",
    essential: "How do bakers convert customer demand into consistent, accurate, and financially responsible production?",
    purpose: "Operate a limited-menu bakery driven by known customer demand and a fixed fulfillment deadline.",
    responsibility: "Students scale formulas, calculate yield and cost, schedule shared equipment, control batches, package and label accurately, and review waste and fulfillment data.",
    complexity: "The class responds to known orders. Equipment, cooling, packaging, labeling, and fulfillment must be coordinated across multiple batches and deadlines.",
    recipeChallenge: "Adapt bakery formulas for batch size, equipment capacity, customer quantity, packaging, shelf life, labeling, and consistent finished weight or count.",
    planning: ["Approved product list", "Preorder and communication plan", "Scaled formulas and cost sheet", "Shared-equipment production schedule", "Packaging, labeling, and fulfillment tracker"],
    anchors: ["Baking methods", "Formula scaling", "Yield and cost", "Batch scheduling", "Packaging and order accuracy"],
    arcadia: "Formal Cottage preorder bakery or approved bake sale with customer orders.",
    olympia: "Approved staff preorder/distribution, no-cost order service with real recipients, or another building-authorized bakery service.",
    evidence: ["Scaled recipe and cost record", "Production and equipment schedule", "Packaging and order tracker", "Planned-versus-actual review"],
    standard: "Fulfill every approved preorder accurately, safely, consistently, and on time while controlling cost and waste.",
    review: ["Confirm proven products, order volume, and capacity.", "Confirm pricing, payment, packaging, labeling, and pickup procedures.", "Identify the preorder tool and financial record currently used."],
    gradient: "linear-gradient(135deg,#a65a2e,#6f2d1c)"
  },
  {
    id: 3,
    title: "Seasonal Soup, Sauce & Lunch Service",
    short: "Seasonal Lunch",
    timing: "January–February",
    wbl: "conditional",
    focus: "Menu pairing, client constraints, holding and delivery",
    essential: "How do cooks build a balanced menu in which every component supports the guest and the main item?",
    purpose: "Integrate stocks, soups, sauces, vegetables, starches, salads, sandwiches, or pasta into a cohesive meal.",
    responsibility: "Teams make menu decisions within dietary, budget, quantity, holding, packaging, and delivery constraints.",
    complexity: "Students make more menu decisions and must coordinate several components that finish, hold, travel, and serve differently.",
    recipeChallenge: "Build a coordinated set of recipes whose yields, flavors, textures, dietary profile, holding needs, and service format work together as one meal.",
    planning: ["Client brief and dietary constraints", "Menu proposal and pairing rationale", "Yield, cost, and purchasing plan", "Holding and transport plan", "Delivery/service and feedback plan"],
    anchors: ["Stocks, soups, and sauces", "Vegetables and starches", "Salads, sandwiches, or pasta", "Menu balance and nutrition", "Holding and transport"],
    arcadia: "Cottage lunch, meeting catering, or approved drop-off meal.",
    olympia: "Internal department/staff client, hosted tasting, or building service with equivalent client communication and evidence.",
    evidence: ["Client brief and menu proposal", "Yield and cost calculations", "Holding and delivery plan", "Client feedback and technical reflection"],
    standard: "Create and deliver a cohesive, technically sound lunch menu that meets a defined client’s needs, budget, and schedule.",
    review: ["Identify a reliable winter client or event.", "Confirm which technical components must appear in the menu.", "Inventory holding, transport, and delivery equipment at both buildings."],
    gradient: "linear-gradient(135deg,#856b2b,#4c5a2f)"
  },
  {
    id: 4,
    title: "Fast-Casual Pop-Up: Pizza or Sandwich Shop",
    short: "Fast-Casual Pop-Up",
    timing: "February–March",
    wbl: "strong",
    focus: "Order flow, customer interaction, speed and accuracy",
    essential: "How can a culinary team deliver customized food quickly without sacrificing safety, consistency, or hospitality?",
    purpose: "Run a limited-menu fast-casual service with real-time order flow, batch production, hospitality, and service recovery.",
    responsibility: "Students help shape the menu and order system, estimate demand, manage line flow, fulfill orders, and respond professionally to customer or fulfillment problems.",
    complexity: "Students manage demand and communication in real time. Order accuracy, replenishment, customer flow, and service recovery become visible performance requirements.",
    recipeChallenge: "Create a limited set of recipes and components that can be prepped efficiently, customized safely, replenished in batches, and finished consistently during a short service window.",
    planning: ["Concept, audience, and limited menu", "Demand estimate and prep levels", "Order or ticket system", "Station layout and replenishment plan", "Service-recovery and waste review"],
    anchors: ["Pizza, sandwiches, or fast-casual production", "Batch cooking", "Tickets and order flow", "Hospitality", "Marketing and demand"],
    arcadia: "Titan/Cottage pizzeria, luncheon, student sale, or preorder fast-casual pop-up.",
    olympia: "Preorder pickup, internal staff/student service, or simulated fast-casual operation with real recipients and common evidence.",
    evidence: ["Menu and customer communication", "Order/ticket system", "Line-flow and service evidence", "Throughput, accuracy, and waste analysis"],
    standard: "Deliver accurate, high-quality orders within a defined service window while managing customer flow and team communication.",
    review: ["Confirm whether the anchor is pizza, sandwiches, luncheon, or opportunity-based.", "Confirm customer, sales, order, and payment permissions.", "Set a realistic service window and production volume."],
    gradient: "linear-gradient(135deg,#b04a32,#7a2d23)"
  },
  {
    id: 5,
    title: "Protein-Centered Client Catering",
    short: "Client Catering",
    timing: "March–April",
    wbl: "strong",
    focus: "Fabrication, client communication, leadership and service",
    essential: "How do culinary professionals choose and control the best method for a protein while coordinating a complete catered meal?",
    purpose: "Respond to a client need with a menu featuring poultry, meat, or seafood and appropriate sauce, vegetable, and starch components.",
    responsibility: "Students clarify the client request, propose and cost a feasible menu, assume rotating leadership, complete required cooking work, and deliver under a fixed deadline.",
    complexity: "The class manages a more technically demanding menu, a fixed client deadline, purchasing and yield decisions, leadership rotations, and coordinated service.",
    recipeChallenge: "Match the protein and cut to the correct fabrication and cooking method, then adapt the supporting recipes so the full meal finishes, holds, portions, and serves together.",
    planning: ["Client clarification", "Protein and method selection", "Costed menu and purchasing specifications", "Fabrication and production plan", "Leadership, service, and client evaluation"],
    anchors: ["Poultry, meat, or seafood", "Fabrication and yield", "Cooking method and doneness", "Sauce and side coordination", "Leadership and catering"],
    arcadia: "Formal Cottage contract, advisory event, district meeting, or another approved catering opportunity.",
    olympia: "Approved internal client, partner service, or noncommercial client-event equivalent using the same client brief, rubric, and evidence.",
    evidence: ["Client clarification and proposal", "Fabrication and safety evidence", "Costed production plan", "Leadership, service, and client evaluation"],
    standard: "Deliver a safe, tender, consistent protein-centered meal that meets client expectations for menu, volume, budget, and timing.",
    review: ["Identify reliable clients and realistic proteins.", "Confirm fabrication scope, budget, and equipment limits.", "Confirm rotating leadership roles and individual evidence."],
    gradient: "linear-gradient(135deg,#485a3c,#243a32)"
  },
  {
    id: 6,
    title: "Teacher Appreciation Breakfast/Brunch — Operations Capstone",
    short: "Operations Capstone",
    timing: "May–June",
    wbl: "strong",
    focus: "Full-cycle planning, leadership, technical performance and evaluation",
    essential: "How does a culinary team manage an entire foodservice experience from client need through evaluation?",
    purpose: "Complete the advanced course through a full-cycle breakfast, brunch, appreciation service, or comparable client event.",
    responsibility: "Students manage the event cycle with the greatest available autonomy while every student completes required cooking work and identifiable individual evidence.",
    complexity: "Students manage the complete event system: client, menu, recipes, cost, purchasing, staffing, production, service, feedback, and final evidence.",
    recipeChallenge: "Build and approve a balanced menu whose egg, dairy, breakfast, bakery, hot, and cold components can be executed reliably at the planned volume and service time.",
    planning: ["Client and capstone brief", "Balanced menu and recipe-development package", "Cost, procurement, and operations plan", "Leadership and contingency plan", "Final service, evaluation, and Gateway 4 record"],
    anchors: ["Eggs and dairy", "Breakfast/brunch cookery", "Menu balance", "Operations leadership", "Final evaluation"],
    arcadia: "Teacher Appreciation breakfast/brunch or final Cottage client event.",
    olympia: "Teacher/staff appreciation service or another building-approved final client event with the same rubric and evidence requirements.",
    evidence: ["Complete client and event plan", "Operational leadership and cooking contribution", "Technical and product-quality evidence", "Final feedback, reflection, and Gateway 4 record"],
    standard: "Plan and deliver a complete client-centered event that demonstrates technical competence, leadership, service, and operational control.",
    review: ["Confirm the final client and event format.", "Define the level of student decision-making and autonomy.", "Confirm the final performance-assessment and Gateway 4 process."],
    gradient: "linear-gradient(135deg,#8e4c29,#263e35)"
  }
];

const cycle = [
  ["01","Request","Identify the recipient, purpose, count, date, budget, service format, restrictions, and approval authority."],
  ["02","Clarification","Ask the questions that prevent assumptions from becoming production failures."],
  ["03","Proposal","Recommend a menu or product that fits the learning target and the actual operating conditions."],
  ["04","Planning","Standardize recipes, calculate yield and cost, assign roles, schedule equipment, and backward-plan from service."],
  ["05","Production","Execute the approved plan while protecting safety, quality, communication, and resource use."],
  ["06","Quality Control","Inspect against a defined standard, report variance, and make the smallest responsible correction."],
  ["07","Delivery / Service","Package, hold, transport, release, and serve the product accurately and professionally."],
  ["08","Debrief / Revision","Study evidence, feedback, cost, waste, and individual performance before the next experience."]
];

const systems = [
  ["◎","Client System","The team knows who the recipient is, what was promised, who can approve changes, and how communication will be documented."],
  ["✎","Recipe System","Recipes are researched, adapted, tested, scaled, standardized, approved, and preserved with revision notes."],
  ["$","Resource System","Purchasing, inventory, edible yield, package size, labor capacity, cost, and avoidable waste inform decisions."],
  ["↳","Production System","Stations, equipment, dependencies, deadlines, critical controls, service, cleanup, and contingencies are coordinated."],
  ["✓","Quality System","Safety, flavor, texture, appearance, portion, temperature, consistency, packaging, and timing are defined and inspected."],
  ["◇","Service & Evidence","The product reaches the recipient correctly, feedback is captured, and every student preserves identifiable evidence."]
];

const evidencePillars = [
  ["01","Planning","Client clarification, menu reasoning, recipe decisions, calculations, production documents, and risk controls."],
  ["02","Production","Meaningful cooking work, safety, technical execution, station organization, timing, and judgment."],
  ["03","Professional Practice","Attendance, preparation, communication, teamwork, leadership, reliability, service, and response to correction."],
  ["04","Reflection & Revision","Client or audience feedback, operational data, self-evaluation, corrective action, and targeted improvement."]
];

const recipePipeline = [
  ["01","Clarify the need","Start with the recipient, purpose, quantity, restrictions, budget, schedule, service, and learning target."],
  ["02","Research options","Compare credible recipes and methods rather than selecting the first attractive result."],
  ["03","Screen feasibility","Check equipment, labor, student readiness, batch size, cost, holding, packaging, and transport."],
  ["04","Adapt deliberately","Record ingredient, method, format, quantity, flavor, dietary, service, and equipment changes."],
  ["05","Scale and cost","Calculate conversion factor, package quantities, edible yield, total cost, portion cost, and expected inventory."],
  ["06","Test and calibrate","Practice unfamiliar steps, identify failure points, and define the acceptable product standard."],
  ["07","Approve one version","Release a standardized production recipe with clear yield, method, controls, and revision date."],
  ["08","Evaluate and archive","Compare plan with result, document revisions, add photos and event notes, and decide whether the recipe should be reused."]
];

const gateway = [
  ["Safety & Sanitation","Reliable practice under complex production conditions; critical controls are verified rather than assumed."],
  ["Technical Execution","Methods, doneness, texture, flavor, consistency, presentation, and recipe standards are demonstrated."],
  ["Operations & Professionalism","Planning, communication, organization, leadership, cost/resource use, service, and reliability are visible."],
  ["Individual Evidence","The student’s own planning, cooking, observation, feedback, reflection, and any targeted reassessment are documented."]
];

const chapters = [
  {title:"1. Moving from Foundations to Professional Practice", summary:"What changes when work has a real recipient, deadline, and professional standard.", content:`<p class="chapter-kicker">The transition</p><h2>Moving from Foundations to Professional Practice</h2><p>Culinary Arts 1 & 2 builds the shared language and foundational habits of the kitchen. Advanced Culinary asks you to use those habits under greater responsibility. You may be producing for a client, school event, preorder, pop-up, catered service, or another approved recipient.</p><div class="chapter-callout"><strong>The Advanced Culinary question:</strong> Can you plan, produce, communicate, adjust, and deliver this responsibly for someone else?</div><h3>What changes</h3><ul><li>Work begins with a recipient or operating need.</li><li>Recipes may need to be researched, adapted, tested, scaled, costed, and approved.</li><li>Quality includes accuracy, timing, service, cost, communication, and reliability—not taste alone.</li><li>Team production still requires identifiable individual evidence.</li><li>Responsibility increases only as readiness is demonstrated.</li></ul>`},
  {title:"2. The Advanced Culinary Standard", summary:"Technical skill, judgment, reliability, and professional conduct work together.", content:`<p class="chapter-kicker">Performance standard</p><h2>The Advanced Culinary Standard</h2><p>Professional performance combines technical skill with judgment and reliability. A strong product does not excuse unsafe work, poor communication, missed deadlines, careless waste, or failure to meet the agreed expectation.</p><h3>A complete standard includes</h3><ul><li>Safety and sanitation</li><li>Technical execution and product quality</li><li>Station organization and time management</li><li>Communication and teamwork</li><li>Resource and cost control</li><li>Client or guest experience</li><li>Reflection and corrective action</li></ul>`},
  {title:"3. Safety and Sanitation Reverification", summary:"Advanced students prove that foundational safety remains reliable under pressure.", content:`<p class="chapter-kicker">Critical competence</p><h2>Safety and Sanitation Reverification</h2><p>Advanced students do not graduate from foundational safety. Before client-centered production begins, the instructor may reverify personal hygiene, allergen controls, time and temperature, knife and equipment safety, receiving and storage, cleaning, sanitizing, and closing procedures.</p><div class="chapter-callout"><strong>Stop work and report:</strong> any condition that could harm a person, compromise food safety, create an allergen risk, damage equipment, or make a product unfit for service.</div>`},
  {title:"4. Authentic Production and The Cottage", summary:"One district concept with locally flexible service models.", content:`<p class="chapter-kicker">Purpose before format</p><h2>Authentic Production and The Cottage</h2><p>The districtwide instructional concept is authentic production: students respond to a real or realistic need, plan the work, produce to a defined standard, serve or deliver responsibly, and use evidence to improve.</p><h3>Arcadia</h3><p>The Cottage is Arcadia’s local school-based-enterprise identity and may include approved catering, preorders, sales, pop-ups, and client service.</p><h3>Olympia</h3><p>Olympia may meet the same outcomes through internal clients, staff or building service, hosted tastings, preorder distribution, community service, or another approved equivalent. Different format does not mean weaker learning when the professional problem and evidence are comparable.</p>`},
  {title:"5. The Client-Centered Production Cycle", summary:"A repeatable eight-stage process from request through revision.", content:`<p class="chapter-kicker">The shared workflow</p><h2>The Client-Centered Production Cycle</h2><ol>${cycle.map(item=>`<li><strong>${item[1]}:</strong> ${item[2]}</li>`).join("")}</ol><div class="chapter-callout">Approval is based first on instructional value and then on operational feasibility. A request is not automatically worthwhile merely because someone asked for it.</div>`},
  {title:"6. Receiving and Clarifying a Request", summary:"Many apparent cooking failures begin as communication failures.", content:`<p class="chapter-kicker">Listen before proposing</p><h2>Receiving and Clarifying a Request</h2><p>“Lunch for 40” is not enough information. Confirm the recipient, decision-maker, event purpose, count confidence, deadline, locations, dietary restrictions, allergens, cultural expectations, budget, funding, equipment, packaging, cleanup, and approval process.</p><h3>Professional habit</h3><p>Document changes. A verbal change can affect cost, yield, allergens, quality, timing, and the ability to deliver what was promised.</p>`},
  {title:"7. Menu Development and Feasibility", summary:"The strongest menu is the best option the team can execute consistently under the actual conditions.", content:`<p class="chapter-kicker">Creative and realistic</p><h2>Menu Development and Feasibility</h2><p>A professional menu survives a feasibility check. Consider the learning target, audience, dietary needs, ingredients, equipment, time, staffing, budget, quantity, holding, transport, packaging, service, cleanup, and likely failure points.</p><div class="chapter-callout">Complicated is not automatically advanced. Advanced work shows sound judgment, control, consistency, and responsibility.</div>`},
  {title:"8. Recipe Development, Scaling, Yield, and Cost", summary:"Recipes are adapted to meet the production need and then standardized for reliable use.", content:`<p class="chapter-kicker">Build the production version</p><h2>Recipe Development, Scaling, Yield, and Cost</h2><p>Advanced Culinary recipes may begin with a professional text, credible published recipe, chef reference, existing program formula, or prior event record. The team records the source, evaluates feasibility, adapts deliberately, tests important changes, and approves one standardized version.</p><h3>Core calculations</h3><ul><li>Conversion factor = desired yield ÷ original yield</li><li>New quantity = original quantity × conversion factor</li><li>Yield percentage = edible portion ÷ as-purchased quantity × 100</li><li>Cost per portion = total recipe cost ÷ portions produced</li></ul><h3>Do not scale blindly</h3><p>Large batches may require changes to equipment, mixing, pan depth, cooking time, cooling, holding, and quality-control procedures.</p>`},
  {title:"9. Production Planning and Station Systems", summary:"Turn the menu into coordinated action before the team begins.", content:`<p class="chapter-kicker">Backward plan from service</p><h2>Production Planning and Station Systems</h2><p>A production plan identifies standardized recipes, scaled yields, ingredients, supplies, receiving and storage, equipment, station assignments, backward-planned deadlines, critical controls, packaging, service, cleanup, and contingencies.</p><div class="chapter-callout">A plan that lists tasks but does not show timing, dependencies, and checkpoints is not yet an operating plan.</div>`},
  {title:"10. Roles, Communication, and Professional Conduct", summary:"Roles organize the work; they do not establish personal importance.", content:`<p class="chapter-kicker">Team operation</p><h2>Roles, Communication, and Professional Conduct</h2><p>Every student contributes to production, protects the whole operation, and communicates across stations. Leadership roles do not remove the requirement for meaningful cooking or production work.</p><h3>Brief professional communication</h3><p>State the task, status, risk, and next action. Example: “The sauce is below planned yield. Flavor is correct. I need approval to adjust the batch.”</p>`},
  {title:"11. Quality Control and Corrective Action", summary:"Define the standard, inspect the work, and correct early.", content:`<p class="chapter-kicker">Inspect what you expect</p><h2>Quality Control and Corrective Action</h2><p>Quality should be defined before production begins. Use observable standards for safety, flavor, texture, appearance, portion, temperature, consistency, packaging, and readiness time.</p><h3>Corrective action</h3><p>Identify the problem, protect safety, determine the cause, choose the smallest responsible correction, communicate the change, and record what matters for later review.</p>`},
  {title:"12. Packaging, Service, and Customer Experience", summary:"Production is not complete until the product reaches the recipient properly.", content:`<p class="chapter-kicker">Finish the full job</p><h2>Packaging, Service, and Customer Experience</h2><p>Confirm portion, container, label, allergen information, holding temperature, transport, pickup or service time, utensils, signage, guest communication, cleanup, and final release authority.</p><div class="chapter-callout">Customer service never overrides food safety, allergen control, or honest communication about what the team can provide.</div>`},
  {title:"13. Evidence, Assessment, and Reassessment", summary:"Experiences provide evidence; competencies determine progression.", content:`<p class="chapter-kicker">What the evidence shows</p><h2>Evidence, Assessment, and Reassessment</h2><p>Students are assessed on what they demonstrate during planning, production, service, and reflection—not merely on whether the team completed an event.</p><h3>Individual evidence</h3><ul><li>A documented planning responsibility</li><li>Meaningful cooking or production work</li><li>Instructor observation of safety, technique, organization, communication, and judgment</li><li>An individual reflection tied to evidence and a specific improvement</li></ul><h3>Reassessment</h3><p>Reassessment follows feedback, reflection, additional practice, and remediation. It targets the unmet competency rather than requiring unrelated work to be repeated.</p>`},
  {title:"14. Six Major Experiences", summary:"Distinct technical emphases and increasing operational complexity.", content:`<p class="chapter-kicker">Course arc</p><h2>Six Major Experiences</h2><p>The six experiences are the operating spine of Advanced Culinary. Exact clients, dates, menu limits, sales procedures, quantities, and local service models require department approval.</p><ol>${experiences.map(e=>`<li><strong>${e.title}</strong> — ${e.focus}.</li>`).join("")}</ol><div class="chapter-callout">The service model may vary by building, but the technical focus, planning process, rubric, and evidence expectations remain comparable.</div>`},
  {title:"15. Student Tools and Forms", summary:"Use the form that supports a real decision or preserves required evidence.", content:`<p class="chapter-kicker">Paperwork documents learning</p><h2>Student Tools and Forms</h2><p>Forms should be completed while decisions are being made rather than reconstructed after the event. The production-tools section includes the request brief, feasibility check, production plan, debrief, recipe-development and costing record, order tracker, role record, quality log, cost and waste review, audience feedback, and Gateway 4 evidence record.</p>`},
  {title:"16. Department Review and Local Implementation", summary:"What still requires Jason, Linda, and team validation.", content:`<p class="chapter-kicker">Working draft status</p><h2>Department Review and Local Implementation</h2><p>The instructional arc can be developed before every operational detail is known. Department review should confirm recurring clients, event windows, kitchen capacity, recipe resources, sales and payment permissions, packaging, transport, role systems, individual evidence, final assessment, and local Arcadia/Olympia variations.</p><div class="chapter-callout">The goal is not to redesign successful practice. The goal is to make the existing strengths visible, consistent, teachable, and easier to improve.</div>`},
  {title:"Appendix A. Quick References", summary:"Fast reminders for production readiness and common event risks.", content:`<p class="chapter-kicker">Quick reference</p><h2>Common Warning Signs</h2><ul><li>No one can state the confirmed count, deadline, recipient, or approval status.</li><li>The recipe yield or package size does not match the production target.</li><li>Multiple stations expect the same equipment at the same time.</li><li>An allergen, substitution, or change is known verbally but not documented.</li><li>The product has no defined standard beyond “looks good.”</li><li>Packaging, holding, transport, or service is being invented after production finishes.</li><li>A leadership role has no required cooking contribution or individual evidence.</li></ul>`}
];

const tools = [
  {letter:"A", title:"Client / Recipient Request Brief", description:"Clarify the purpose, recipient, count, deadline, dietary needs, budget, service format, and approval contact.", fields:["Recipient / client contact","Purpose or event","Confirmed count and confidence","Date and service window","Location and service format","Dietary restrictions and allergens","Budget / funding / price","Approvals and change authority"]},
  {letter:"B", title:"Menu Feasibility Check", description:"Test whether an idea is educationally valuable and operationally realistic.", fields:["Proposed menu / product","Technical learning target","Time and equipment capacity","Staffing and student readiness","Holding / transport / service","Cost and inventory","Major risks","Decision and required revisions"]},
  {letter:"C", title:"Recipe Development & Approval Record", description:"Document the source, adaptations, testing, scaling, quality standard, and approved production version.", fields:["Client / recipient need","Proposed product","Starting source / reference","Original and desired yield","Dietary / allergen constraints","Ingredient / method adaptations","Testing results","Quality standard","Approval and revision date"]},
  {letter:"D", title:"Production Plan", description:"Backward-plan recipes, stations, equipment, deadlines, critical controls, service, and cleanup.", fields:["Approved recipes and yields","Ingredient / supply list","Equipment schedule","Station assignments","Backward-planned timeline","Safety / allergen controls","Quality checkpoints","Packaging / service / cleanup","Contingencies"]},
  {letter:"E", title:"Event Debrief", description:"Turn event evidence into a specific operational and individual improvement.", fields:["What was promised?","What actually happened?","Strongest evidence","Problem or variance","Cause","Corrective action","Client / audience feedback","Specific next improvement"]},
  {letter:"F", title:"Recipe Scaling, Yield & Costing", description:"Show the calculations behind production quantity, purchasing, and cost.", fields:["Original yield","Desired yield","Conversion factor","Scaled ingredient quantities","Package size and unit price","Number of packages","Expected leftover inventory","Planned total and portion cost","Actual use / cost"]},
  {letter:"G", title:"Preorder / Order Fulfillment Tracker", description:"Keep customer demand, product quantities, payment status, packaging, and pickup accurate.", fields:["Order / customer","Product and quantity","Dietary / allergen notes","Payment or approval status","Package / label","Fulfillment check","Pickup / delivery status","Correction or follow-up"]},
  {letter:"H", title:"Role Rotation & Required Cooking Participation", description:"Show both operational leadership and each student’s meaningful production contribution.", fields:["Student","Planning responsibility","Leadership / service role","Required cooking task","Instructor observation","Evidence saved","Follow-up needed"]},
  {letter:"I", title:"Quality Control & Corrective Action Log", description:"Record a quality or safety concern, the decision made, and the result.", fields:["Time / station","Expected standard","Observed variance","Safety impact","Immediate action","Approval / communication","Result","Prevention next time"]},
  {letter:"J", title:"Planned vs. Actual Cost & Waste Review", description:"Analyze purchasing, usage, leftovers, avoidable waste, and operational decisions.", fields:["Planned quantity / cost","Actual quantity / cost","Usable leftovers","Avoidable waste","Reason for variance","Inventory returned","Decision for next event"]},
  {letter:"K", title:"Client / Audience Feedback", description:"Gather useful feedback about accuracy, quality, service, and whether the need was met.", fields:["Recipient / event","Product or service received","What met expectations","What could improve","Accuracy and timing","Quality and presentation","Service / communication","Permission to use feedback as evidence"]},
  {letter:"L", title:"Individual Evidence & Gateway 4 Record", description:"Connect personal planning, cooking, professional performance, feedback, and reflection to Gateway 4.", fields:["Experience","Planning evidence","Cooking / production evidence","Safety and sanitation","Technical execution","Organization / communication","Client / audience evidence","Reflection and next step","Completion / reassessment decision"]}
];

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

function showView(view) {
  $$(".view").forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === view));
  $$(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.view === view));
  $("#primaryNav").classList.remove("open");
  $("#menuButton").setAttribute("aria-expanded", "false");
  window.scrollTo({top:0, behavior:"smooth"});
}

$$(".nav-link").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
$$('[data-jump]').forEach(button => button.addEventListener("click", () => showView(button.dataset.jump)));
$("#menuButton").addEventListener("click", () => {
  const nav = $("#primaryNav");
  const open = nav.classList.toggle("open");
  $("#menuButton").setAttribute("aria-expanded", String(open));
});

function renderProgression() {
  $("#homeProgression").innerHTML = experiences.map(e => `<article class="progress-step" style="--level:${e.id}"><span class="step-number">${e.id}</span><h3>${e.short}</h3><p>${e.focus}</p><small>${e.timing}</small></article>`).join("");
}

function renderCycle() {
  $("#cycleGrid").innerHTML = cycle.map(item => `<article class="cycle-card"><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></article>`).join("");
  $("#systemGrid").innerHTML = systems.map(item => `<article class="system-card"><div class="icon">${item[0]}</div><h3>${item[1]}</h3><p>${item[2]}</p></article>`).join("");
  $("#evidencePillars").innerHTML = evidencePillars.map(item => `<article class="pillar"><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></article>`).join("");
  $("#recipePipeline").innerHTML = recipePipeline.map(item => `<article class="pipeline-card"><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></article>`).join("");
  $("#gatewayGrid").innerHTML = gateway.map(item => `<article class="gateway-card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("");
}

let currentFilter = "all";
function renderExperiences() {
  const visible = experiences.filter(e => currentFilter === "all" || e.wbl === currentFilter);
  $("#experienceGrid").innerHTML = visible.map(e => `<article class="experience-card"><div class="experience-photo" style="--card-gradient:${e.gradient}"><span>0${e.id}</span></div><div class="experience-body"><div class="experience-meta"><span class="pill">${e.timing}</span><span class="pill wbl">${e.wbl === "strong" ? "Strong WBL candidate" : "Conditional WBL"}</span></div><h3>${e.title}</h3><p>${e.purpose}</p><button data-experience="${e.id}">Open station card →</button></div></article>`).join("");
  $$('[data-experience]').forEach(button => button.addEventListener("click", () => openExperience(Number(button.dataset.experience))));
}

function list(items){ return `<ul>${items.map(item=>`<li>${item}</li>`).join("")}</ul>`; }
function openExperience(id) {
  const e = experiences.find(item => item.id === id);
  $("#dialogContent").innerHTML = `<div class="dialog-hero"><p class="eyebrow">Experience ${e.id} · ${e.timing}</p><h2>${e.title}</h2><p>${e.focus}</p></div><div class="dialog-body"><div class="dialog-grid"><section class="dialog-block wide"><h3>Essential question</h3><p>${e.essential}</p></section><section class="dialog-block wide"><h3>Performance challenge</h3><p>${e.standard}</p></section><section class="dialog-block"><h3>Technical purpose</h3><p>${e.purpose}</p></section><section class="dialog-block"><h3>Operational growth</h3><p>${e.complexity}</p></section><section class="dialog-block wide"><h3>Recipe-development challenge</h3><p>${e.recipeChallenge}</p></section><section class="dialog-block"><h3>Technical anchors</h3>${list(e.anchors)}</section><section class="dialog-block"><h3>Planning package</h3>${list(e.planning)}</section><section class="dialog-block"><h3>Arcadia possibility</h3><p>${e.arcadia}</p></section><section class="dialog-block"><h3>Olympia equivalent</h3><p>${e.olympia}</p></section><section class="dialog-block wide"><h3>Required individual and team evidence</h3>${list(e.evidence)}</section><section class="dialog-block wide"><h3>Department-review questions</h3>${list(e.review)}</section></div></div>`;
  $("#experienceDialog").showModal();
}
$("#dialogClose").addEventListener("click", () => $("#experienceDialog").close());
$("#experienceDialog").addEventListener("click", event => { if (event.target === $("#experienceDialog")) $("#experienceDialog").close(); });
$$('.filter').forEach(button => button.addEventListener("click", () => {
  currentFilter = button.dataset.filter;
  $$('.filter').forEach(b => b.classList.toggle("active", b === button));
  renderExperiences();
}));

let activeChapter = 0;
function renderManual(filter="") {
  const query = filter.trim().toLowerCase();
  const matched = chapters.map((c,index)=>({c,index})).filter(({c}) => !query || `${c.title} ${c.summary} ${c.content}`.toLowerCase().includes(query));
  if (matched.length && !matched.some(item=>item.index===activeChapter)) activeChapter = matched[0].index;
  $("#chapterNav").innerHTML = matched.length ? matched.map(({c,index}) => `<button class="${index===activeChapter?'active':''}" data-chapter="${index}">${c.title}</button>`).join("") : `<div class="no-results">No chapter matches that search.</div>`;
  $("#chapterReader").innerHTML = matched.length ? chapters[activeChapter].content : `<div class="no-results"><h2>No results</h2><p>Try a broader term such as safety, recipe, cost, client, quality, or evidence.</p></div>`;
  $$('[data-chapter]').forEach(button => button.addEventListener("click", () => { activeChapter=Number(button.dataset.chapter); renderManual($("#manualSearch").value); }));
}
$("#manualSearch").addEventListener("input", event => renderManual(event.target.value));

function renderTools() {
  $("#toolGrid").innerHTML = tools.map(tool => `<article class="tool-card"><span class="tool-letter">${tool.letter}</span><h3>${tool.title}</h3><p>${tool.description}</p><button data-tool="${tool.letter}">Preview printable form →</button></article>`).join("");
  $$('[data-tool]').forEach(button => button.addEventListener("click", () => openTool(button.dataset.tool)));
}
function openTool(letter) {
  const tool = tools.find(item => item.letter === letter);
  $("#toolDialogContent").innerHTML = `<div class="dialog-hero"><p class="eyebrow">Production Tool ${tool.letter}</p><h2>${tool.title}</h2><p>${tool.description}</p></div><div class="dialog-body"><form class="tool-form">${tool.fields.map((field,index)=>`<label>${field}${index % 3 === 1 ? `<textarea rows="3"></textarea>` : `<input type="text" />`}</label>`).join("")}</form><div class="tool-actions"><button class="button primary" type="button" onclick="window.print()">Print blank form</button><button class="button secondary" type="button" data-close-tool>Close</button></div></div>`;
  $("#toolDialog").showModal();
  $('[data-close-tool]').addEventListener('click',()=>$("#toolDialog").close());
}
$("#toolDialogClose").addEventListener("click", () => $("#toolDialog").close());
$("#toolDialog").addEventListener("click", event => { if (event.target === $("#toolDialog")) $("#toolDialog").close(); });

function populateExperienceSelects() {
  const options = experiences.map(e=>`<option value="${e.id}">Experience ${e.id}: ${e.short}</option>`).join("");
  $("#recipeExperience").innerHTML = options;
  $("#reflectionExperience").innerHTML = options;
}

const recipeFields = ["recipeExperience","recipeNeed","recipeProduct","recipeSource","originalYield","desiredYield","recipeAllergens","recipeAdaptations","recipeQuality","recipeTesting"];
function recipeData() {
  return Object.fromEntries(recipeFields.map(id=>[id,$(`#${id}`).value]));
}
function updateConversion() {
  const original = Number($("#originalYield").value);
  const desired = Number($("#desiredYield").value);
  const factor = original > 0 && desired > 0 ? desired / original : null;
  $("#conversionFactor").textContent = factor ? factor.toFixed(3) : "—";
  renderRecipeSummary();
}
function renderRecipeSummary() {
  const data = recipeData();
  const exp = experiences.find(e=>String(e.id)===String(data.recipeExperience));
  const original = Number(data.originalYield), desired = Number(data.desiredYield);
  const factor = original > 0 && desired > 0 ? (desired/original).toFixed(3) : "Not calculated";
  const row = (label,value)=>`<div><strong>${label}</strong><span>${value || "Not entered"}</span></div>`;
  $("#recipeSummary").innerHTML = `<div class="recipe-summary-card">${row("Experience",exp?.title)}${row("Client need",data.recipeNeed)}${row("Product",data.recipeProduct)}${row("Starting source",data.recipeSource)}${row("Yield",original && desired ? `${original} → ${desired}; factor ${factor}` : "Not calculated")}${row("Dietary / allergen constraints",data.recipeAllergens)}${row("Adaptations",data.recipeAdaptations)}${row("Quality standard",data.recipeQuality)}${row("Testing / approval",data.recipeTesting)}</div>`;
}
recipeFields.forEach(id=>$("#"+id).addEventListener("input", id==="originalYield"||id==="desiredYield" ? updateConversion : renderRecipeSummary));
$("#recipeForm").addEventListener("submit", event => {
  event.preventDefault();
  localStorage.setItem("advancedCulinaryRecipeBrief",JSON.stringify(recipeData()));
  $("#recipeSaveMessage").textContent="Working recipe brief saved on this device.";
  setTimeout(()=>$("#recipeSaveMessage").textContent="",2500);
});
$("#clearRecipe").addEventListener("click",()=>{
  $("#recipeForm").reset(); localStorage.removeItem("advancedCulinaryRecipeBrief"); updateConversion();
});
$("#copyRecipeSummary").addEventListener("click",async()=>{
  const text=$("#recipeSummary").innerText;
  try{await navigator.clipboard.writeText(text);$("#recipeSaveMessage").textContent="Summary copied.";}catch{$("#recipeSaveMessage").textContent="Copy was not available; select the summary manually.";}
});
function loadRecipeBrief(){
  const saved=JSON.parse(localStorage.getItem("advancedCulinaryRecipeBrief")||"null");
  if(saved) recipeFields.forEach(id=>{if(saved[id]!==undefined) $("#"+id).value=saved[id];});
  updateConversion();
}

function renderEvidenceRecords() {
  const saved = JSON.parse(localStorage.getItem("advancedCulinaryEvidence") || "{}");
  $("#experienceRecords").innerHTML = experiences.map(e => {
    const s=saved[e.id]||{};
    return `<article class="record" data-record="${e.id}"><h3>${e.id}. ${e.short}</h3><p>${e.focus}</p><div class="checks">${["Planning","Cooking","Professional practice","Service / client","Reflection"].map((label,index)=>{const key=["planning","cooking","professional","service","reflection"][index];return `<label><input type="checkbox" data-check="${key}" ${s[key]?"checked":""}/> ${label}</label>`;}).join("")}</div><textarea rows="2" data-note placeholder="My strongest evidence or next required evidence...">${s.note||""}</textarea></article>`;
  }).join("");
  $$('.record input,.record textarea').forEach(element => element.addEventListener('change',saveEvidence));
}
function saveEvidence(){
  const data={};
  $$('.record').forEach(record=>{
    const item={note:$('[data-note]',record).value};
    $$('[data-check]',record).forEach(check=>item[check.dataset.check]=check.checked);
    data[record.dataset.record]=item;
  });
  localStorage.setItem("advancedCulinaryEvidence",JSON.stringify(data));
}
$("#clearEvidence").addEventListener("click",()=>{if(confirm("Clear the saved evidence record from this device?")){localStorage.removeItem("advancedCulinaryEvidence");renderEvidenceRecords();}});
$("#saveProfile").addEventListener("click",()=>{
  localStorage.setItem("advancedCulinaryProfile",JSON.stringify({name:$("#studentName").value,section:$("#studentSection").value,year:$("#studentYear").value}));
  $("#saveMessage").textContent="Profile saved on this device.";setTimeout(()=>$("#saveMessage").textContent="",2500);
});
function loadProfile(){
  const p=JSON.parse(localStorage.getItem("advancedCulinaryProfile")||"null");
  if(p){$("#studentName").value=p.name||"";$("#studentSection").value=p.section||"";$("#studentYear").value=p.year||"";}
}
$("#buildReflection").addEventListener("click",()=>{
  const exp=experiences.find(e=>String(e.id)===$("#reflectionExperience").value);
  const responsibility=$("#reflectionResponsibility").value.trim();
  const evidence=$("#reflectionEvidence").value.trim();
  const result=$("#reflectionResult").value.trim();
  const next=$("#reflectionNext").value.trim();
  $("#reflectionOutput").textContent = responsibility && evidence && result && next ? `During ${exp.title}, I was responsible for ${responsibility}. Evidence of my performance includes ${evidence}. The result or feedback showed ${result}. In my next experience, I will ${next}.` : "Complete all four reflection fields to build a useful evidence-based reflection.";
});

function init(){
  renderProgression();
  renderCycle();
  renderExperiences();
  renderManual();
  renderTools();
  populateExperienceSelects();
  loadRecipeBrief();
  renderEvidenceRecords();
  loadProfile();
}
init();

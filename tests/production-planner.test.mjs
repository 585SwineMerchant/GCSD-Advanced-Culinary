import test from "node:test";
import assert from "node:assert/strict";
import { PATHWAY_RECIPES } from "../worker/pathway-recipes.js";
import { buildEventProductionTasks, buildProductionTasks, productionUnit, scalingPlan } from "../site/teacher/production-planner.js";

const sections = [
  { id: "kevin-advanced-p3", course: "Advanced Culinary Arts", active: true },
  { id: "carlson-advanced-p4", course: "Advanced Culinary Arts", active: true },
  { id: "carlson-advanced-p5", course: "Advanced Culinary Arts", active: true, requiresRotationConfirmation: true, allowedPeriods: [5, 6] },
  { id: "km", course: "Kitchen & Restaurant Management", active: true }
];
const cinnamonRolls = {
  id: "menu-cinnamon", name: "Cinnamon Rolls", required: 40, yield: 16, portion: "1 cinnamon roll",
  ingredients: [{ name: "AP flour" }, { name: "yeast" }],
  equipment: ["Digital scale", "Stand mixer with dough hook", "Stand mixer with paddle", "Mixing bowls", "Bench scraper", "Rolling pin", "Chef's knife or unflavored dental floss", "Sheet pans", "Parchment paper", "Pastry brush", "Proofing space", "Oven", "Instant-read thermometer", "Cooling racks", "Whisk"],
  procedure: [
    "Cream filling ingredients together in stand mixer for 10-15 minutes until pale.",
    "Mix dough ingredients on medium speed with hook attachment until smooth mass forms.",
    "Roll dough into ¼-inch thick rectangle, spread filling leaving 1 inch at top edge, roll tightly into a log, and slice into 16 rolls.",
    "Place in greased pan, egg wash, and bake at 375-400°F until center reaches 195°F. Drizzle with glaze once cooled."
  ]
};
const cookies = {
  id: "menu-cookies", name: "Chocolate Chip Cookies", required: 80, yield: 28, portion: "1 cookie",
  ingredients: [{ name: "AP flour" }, { name: "butter" }],
  equipment: ["Mixer", "Sheet pans", "Oven"],
  procedure: [
    "Cream butter and sugar, add eggs, mix in dry ingredients and chips.",
    "Scoop and bake until golden."
  ]
};
const event = { serviceDate: "2026-09-24", serviceTime: "07:30", requirements: "Delivery and setup must be complete before 7:15 a.m." };

test("production units use the approved recipe unit instead of generic portions", () => {
  assert.equal(productionUnit(cinnamonRolls), "cinnamon rolls");
});

test("Cinnamon Rolls keeps only schedule-worthy stages plus handoff", () => {
  const tasks = buildProductionTasks(cinnamonRolls, 0, event, sections);
  assert.deepEqual(tasks.map(task => task.name), [
    "Cinnamon Rolls — Prepare filling",
    "Cinnamon Rolls — Mix dough and bulk ferment",
    "Cinnamon Rolls — Shape and overnight chill",
    "Cinnamon Rolls — Final proof, bake, and finish",
    "Cinnamon Rolls — Final yield and handoff"
  ]);
  assert.match(tasks[0].detail, /^3 batches/);
  assert.match(tasks[0].detail, /production sheet/i);
  assert.match(tasks.at(-1).detail, /48 gross cinnamon rolls/);
  assert.match(tasks.at(-1).detail, /40 reserved for service/);
  assert.equal(tasks.at(-1).deadline, "07:15");
  assert.equal(tasks.at(-1).outputRecord, true);
  assert.equal(tasks.slice(0, -1).every(task => task.outputRecord === false), true);
  assert.match(tasks.find(task => /overnight chill/i.test(task.name)).day, /Sep 23/);
  assert.match(tasks.find(task => /Final proof, bake/i.test(task.name)).day, /Sep 24/);
});

test("simple bakery items collapse to one produce task plus handoff", () => {
  const tasks = buildProductionTasks(cookies, 1, event, sections);
  assert.deepEqual(tasks.map(task => task.name), [
    "Chocolate Chip Cookies — Produce",
    "Chocolate Chip Cookies — Final yield and handoff"
  ]);
});

test("100 required rolls at 16 per batch produces seven whole batches and planned surplus", () => {
  const scale = scalingPlan({ ...cinnamonRolls, required: 100 });
  assert.deepEqual(scale, {
    requestedServiceQuantity: 100,
    recipeYieldPerBatch: 16,
    requiredBatches: 7,
    grossPlannedOutput: 112,
    reservedForService: 100,
    plannedSurplus: 12
  });
  const tasks = buildProductionTasks({ ...cinnamonRolls, required: 100 }, 0, event, sections);
  assert.equal(tasks[0].plannedQuantity, 7);
  assert.equal(tasks[0].plannedUnit, "batches");
  assert.equal(tasks.at(-1).plannedQuantity, 112);
  assert.match(tasks.at(-1).detail, /112 gross cinnamon rolls/);
  assert.match(tasks.at(-1).detail, /100 reserved for service/);
  assert.match(tasks.at(-1).detail, /12 planned surplus/);
});

test("temperature, equipment, quality controls, and dependencies carry into tasks", () => {
  const tasks = buildProductionTasks(cinnamonRolls, 0, event, sections);
  const finish = tasks.find(task => task.name.endsWith("— Final proof, bake, and finish"));
  assert.ok(finish.equipment.length);
  assert.match(finish.dependency, /overnight chill/i);
  assert.equal(tasks.filter(task => task.outputRecord).length, 1);
});

test("regeneration preserves teacher assignments and progress through stable plan keys", () => {
  const first = buildProductionTasks(cinnamonRolls, 0, event, sections);
  first[1].section = "carlson-advanced-p4"; first[1].team = "Dough team"; first[1].progress = { status: "In progress", quantity: 3 };
  const second = buildProductionTasks(cinnamonRolls, 0, event, sections, first);
  assert.equal(second[1].id, first[1].id);
  assert.equal(second[1].section, "carlson-advanced-p4");
  assert.equal(second[1].team, "Dough team");
  assert.equal(second[1].progress.status, "In progress");
});

test("generated defaults skip unconfirmed split sections", () => {
  const tasks = buildProductionTasks(cookies, 2, event, sections);
  assert.equal(tasks.every(task => task.section !== "carlson-advanced-p5"), true);
});

test("the complete pathway library generates compact production work", () => {
  const menu = PATHWAY_RECIPES.map((recipe, index) => ({ ...structuredClone(recipe), id: `menu-${index}`, required: Number(recipe.yield) * 3 }));
  const tasks = buildEventProductionTasks({ ...event, menu, tasks: [] }, sections);
  const planKeys = new Set(tasks.map(task => task.planKey));
  assert.equal(planKeys.size, tasks.length);
  assert.equal(tasks.every(task => task.detail && task.day && task.deadline && task.section && task.dependency), true);
  assert.equal(tasks.every(task => Array.isArray(task.qualityControls) && Array.isArray(task.equipment)), true);
  assert.equal(tasks.filter(task => task.outputRecord).length, PATHWAY_RECIPES.length);
  assert.ok(tasks.length <= PATHWAY_RECIPES.length * 5);
  assert.ok(tasks.length >= PATHWAY_RECIPES.length * 2);
});

test("evening service schedules final production on service day while morning delivery remains advance production", () => {
  const evening = buildProductionTasks(cinnamonRolls, 0, { ...event, serviceTime: "17:30", requirements: "Deliver hot food ready for service." }, sections);
  assert.match(evening.at(-2).day, /Sep 24 · service-day production/);
  assert.match(evening.at(-1).day, /Sep 24 · service handoff/);
  const morning = buildProductionTasks(cinnamonRolls, 0, event, sections);
  assert.match(morning[0].day, /Sep 23 · advance production/);
  assert.match(morning.at(-2).day, /Sep 24 · service-day production/);
});

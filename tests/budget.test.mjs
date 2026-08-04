import test from "node:test";
import assert from "node:assert/strict";
import {
  ALLOTMENT_TEMPLATES,
  buildDefaultPots,
  canViewPot,
  defaultBucketForEvent,
  ensureBudgetState,
  potRemaining,
  potSpent,
  potTotals,
  schoolYearQuarter,
  syncCloseoutSpend,
  visiblePots
} from "../site/shared/budget.js";

const sections = [
  { id: "kevin-culinary-p1", name: "McCann Intro - Period 1", teacher: "Kevin McCann", course: "Culinary Arts & Nutrition I", active: true },
  { id: "carlson-culinary-p1", name: "Carlson Intro - Period 1/2", teacher: "Jason Carlson", course: "Culinary Arts & Nutrition I", active: true },
  { id: "kevin-advanced-p3", name: "McCann Advanced - Period 3", teacher: "Kevin McCann", course: "Advanced Culinary Arts", active: true },
  { id: "km", name: "Carlson Kitchen Management - Period 6", teacher: "Jason Carlson", course: "Kitchen & Restaurant Management", active: true }
];

test("default pots keep Advanced SBE, Kitchen Management, and each CA section independent", () => {
  const pots = buildDefaultPots(sections);
  assert.equal(pots.filter(pot => pot.kind === "advanced-sbe").length, 1);
  assert.equal(pots.filter(pot => pot.kind === "kitchen-management").length, 1);
  assert.equal(pots.filter(pot => pot.kind === "ca-section").length, 2);
  assert.equal(pots.find(pot => pot.id === "advanced-sbe").allotments.food, ALLOTMENT_TEMPLATES["advanced-sbe"].food);
  assert.equal(pots.find(pot => pot.id === "kitchen-management").allotments.popup, 1440);
  assert.equal(pots.find(pot => pot.id === "ca:kevin-culinary-p1").allotments.food, 952);
});

test("CA pots are private to the assigned teacher; Advanced is shared", () => {
  const budget = ensureBudgetState(null, sections, "2025–2026");
  const kevin = visiblePots(budget, "Kevin McCann", "teacher").map(pot => pot.id);
  const carlson = visiblePots(budget, "Jason Carlson", "teacher").map(pot => pot.id);
  assert.ok(kevin.includes("advanced-sbe"));
  assert.ok(carlson.includes("advanced-sbe"));
  assert.ok(kevin.includes("ca:kevin-culinary-p1"));
  assert.ok(!kevin.includes("ca:carlson-culinary-p1"));
  assert.ok(carlson.includes("ca:carlson-culinary-p1"));
  assert.ok(carlson.includes("kitchen-management"));
  assert.ok(!kevin.includes("kitchen-management"));
  assert.equal(canViewPot(budget.pots.find(pot => pot.id === "advanced-sbe"), "Linda", "teacher"), true);
});

test("ledger spend reduces remaining balances without mixing pots", () => {
  const budget = ensureBudgetState(null, sections, "2025–2026");
  budget.ledger.push({
    id: "led-1",
    potId: "advanced-sbe",
    bucket: "food",
    amount: 100,
    date: "2025-10-01",
    voided: false
  });
  budget.ledger.push({
    id: "led-2",
    potId: "kitchen-management",
    bucket: "food",
    amount: 50,
    date: "2025-10-02",
    voided: false
  });
  const advanced = budget.pots.find(pot => pot.id === "advanced-sbe");
  const km = budget.pots.find(pot => pot.id === "kitchen-management");
  assert.equal(potSpent(budget, "advanced-sbe", "food"), 100);
  assert.equal(potRemaining(budget, advanced, "food"), 1100);
  assert.equal(potRemaining(budget, km, "food"), 1150);
  assert.equal(potTotals(budget, advanced).spent, 100);
});

test("closeout sync posts once and updates the same event entry", () => {
  const budget = ensureBudgetState(null, sections, "2025–2026");
  const event = { id: "evt-9", name: "Welcome Breakfast", type: "Catering", serviceDate: "2025-09-24" };
  const first = syncCloseoutSpend(budget, event, { amount: 220, createdBy: "Kevin McCann" });
  assert.equal(first.entry.amount, 220);
  assert.equal(first.entry.bucket, "food");
  assert.equal(budget.ledger.length, 1);
  const second = syncCloseoutSpend(budget, event, { amount: 240, bucket: "popup", createdBy: "Jason Carlson" });
  assert.equal(budget.ledger.length, 1);
  assert.equal(second.updated, true);
  assert.equal(second.entry.amount, 240);
  assert.equal(second.entry.bucket, "popup");
  assert.equal(defaultBucketForEvent({ type: "Pop-up" }), "popup");
});

test("school-year quarters follow Sep instructional calendar", () => {
  assert.equal(schoolYearQuarter("2025-09-15"), 1);
  assert.equal(schoolYearQuarter("2025-12-10"), 2);
  assert.equal(schoolYearQuarter("2026-03-01"), 3);
  assert.equal(schoolYearQuarter("2026-07-01"), 4);
});

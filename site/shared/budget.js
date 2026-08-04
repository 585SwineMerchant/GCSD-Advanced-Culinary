/** Budget tracker model for Culinary pathway allotments and spend ledger. */

export const BUDGET_BUCKETS = ["food", "nonfood", "popup"];

export const BUCKET_LABELS = {
  food: "Food (labs / production)",
  nonfood: "Non-food",
  popup: "Pop-ups / WBL"
};

/** Allotments from ADV budget projections PDF (per independent source). */
export const ALLOTMENT_TEMPLATES = {
  "ca-section": {
    food: 952,
    nonfood: 400,
    popup: 0,
    quarterly: { nonfood: 100, popup: 0 }
  },
  "advanced-sbe": {
    food: 1200,
    nonfood: 400,
    popup: 1440,
    quarterly: { nonfood: 100, popup: 360 }
  },
  "kitchen-management": {
    food: 1200,
    nonfood: 400,
    popup: 1440,
    quarterly: { nonfood: 100, popup: 360 }
  }
};

export const POPUP_EVENT_TARGET = {
  total: 360,
  food: 300,
  overhead: 60,
  grossRevenue: 900,
  foodCostPercent: 0.33
};

export function isIntroCulinarySection(section) {
  return section?.active !== false && String(section?.course || "").includes("Culinary Arts & Nutrition");
}

export function isKitchenManagementSection(section) {
  return section?.active !== false && String(section?.course || "").includes("Kitchen");
}

export function emptyBudget(schoolYear) {
  return {
    schoolYear,
    pots: [],
    ledger: [],
    popupEvents: []
  };
}

function potIdForSection(section) {
  if (isKitchenManagementSection(section)) return "kitchen-management";
  if (isIntroCulinarySection(section)) return `ca:${section.id}`;
  return null;
}

export function buildDefaultPots(sections = []) {
  const pots = [
    {
      id: "advanced-sbe",
      kind: "advanced-sbe",
      label: "Advanced Culinary SBE",
      description: "Shared base funding and pop-ups for all Advanced Culinary sections (McCann + Carlson).",
      sectionId: null,
      teacher: null,
      allotments: { ...ALLOTMENT_TEMPLATES["advanced-sbe"] },
      quarterly: { ...ALLOTMENT_TEMPLATES["advanced-sbe"].quarterly }
    },
    {
      id: "kitchen-management",
      kind: "kitchen-management",
      label: "Kitchen Management",
      description: "Independent Kitchen Management allotment. Kept separate from Advanced SBE (e.g. future capstone).",
      sectionId: "km",
      teacher: "Jason Carlson",
      allotments: { ...ALLOTMENT_TEMPLATES["kitchen-management"] },
      quarterly: { ...ALLOTMENT_TEMPLATES["kitchen-management"].quarterly }
    }
  ];

  for (const section of sections) {
    if (!isIntroCulinarySection(section)) continue;
    const template = ALLOTMENT_TEMPLATES["ca-section"];
    pots.push({
      id: potIdForSection(section),
      kind: "ca-section",
      label: section.name || section.provisionalLabel || section.id,
      description: `Independent Culinary 1–2 allotment for ${section.teacher || "assigned teacher"}.`,
      sectionId: section.id,
      teacher: section.teacher || "",
      allotments: { food: template.food, nonfood: template.nonfood, popup: template.popup },
      quarterly: { ...template.quarterly }
    });
  }

  return pots;
}

/**
 * Ensure budget exists for the school year and pots match current intro sections.
 * Preserves ledger and custom allotment overrides on existing pots.
 */
export function ensureBudgetState(budget, sections = [], schoolYear) {
  const year = schoolYear || budget?.schoolYear;
  const next = budget && typeof budget === "object" ? budget : emptyBudget(year);
  next.schoolYear = year || next.schoolYear || "";
  next.ledger = Array.isArray(next.ledger) ? next.ledger : [];
  next.popupEvents = Array.isArray(next.popupEvents) ? next.popupEvents : [];

  const defaults = buildDefaultPots(sections);
  const byId = new Map((next.pots || []).map(pot => [pot.id, pot]));
  next.pots = defaults.map(fallback => {
    const existing = byId.get(fallback.id);
    if (!existing) return fallback;
    return {
      ...fallback,
      ...existing,
      id: fallback.id,
      kind: fallback.kind,
      sectionId: fallback.sectionId,
      teacher: fallback.teacher ?? existing.teacher,
      label: existing.label || fallback.label,
      description: existing.description || fallback.description,
      allotments: {
        food: Number(existing.allotments?.food ?? fallback.allotments.food),
        nonfood: Number(existing.allotments?.nonfood ?? fallback.allotments.nonfood),
        popup: Number(existing.allotments?.popup ?? fallback.allotments.popup)
      },
      quarterly: {
        nonfood: Number(existing.quarterly?.nonfood ?? fallback.quarterly.nonfood),
        popup: Number(existing.quarterly?.popup ?? fallback.quarterly.popup)
      }
    };
  });

  return next;
}

export function potSpent(budget, potId, bucket) {
  const entries = (budget?.ledger || []).filter(entry => entry.potId === potId && (!bucket || entry.bucket === bucket) && !entry.voided);
  return entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
}

export function potAllotment(pot, bucket) {
  return Number(pot?.allotments?.[bucket] || 0);
}

export function potRemaining(budget, pot, bucket) {
  return potAllotment(pot, bucket) - potSpent(budget, pot.id, bucket);
}

export function potTotals(budget, pot) {
  const buckets = BUDGET_BUCKETS.filter(bucket => potAllotment(pot, bucket) > 0 || potSpent(budget, pot.id, bucket) > 0);
  const allotted = buckets.reduce((sum, bucket) => sum + potAllotment(pot, bucket), 0);
  const spent = buckets.reduce((sum, bucket) => sum + potSpent(budget, pot.id, bucket), 0);
  return {
    buckets: buckets.map(bucket => {
      const allotment = potAllotment(pot, bucket);
      const used = potSpent(budget, pot.id, bucket);
      return {
        bucket,
        label: BUCKET_LABELS[bucket],
        allotment,
        spent: used,
        remaining: allotment - used,
        percent: allotment > 0 ? used / allotment : (used > 0 ? 1 : 0)
      };
    }),
    allotted,
    spent,
    remaining: allotted - spent,
    percent: allotted > 0 ? spent / allotted : (spent > 0 ? 1 : 0)
  };
}

/** School-year quarter 1–4 from an ISO date (Sep–Nov=1, Dec–Feb=2, Mar–May=3, Jun–Aug=4). */
export function schoolYearQuarter(iso, schoolYearLabel) {
  if (!iso) return null;
  const date = new Date(`${String(iso).slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  const month = date.getMonth(); // 0-based
  if (month >= 8 && month <= 10) return 1; // Sep–Nov
  if (month === 11 || month <= 1) return 2; // Dec–Feb
  if (month >= 2 && month <= 4) return 3; // Mar–May
  return 4; // Jun–Aug
}

export function quarterlySpent(budget, potId, bucket, quarter, schoolYear) {
  return (budget?.ledger || [])
    .filter(entry => {
      if (entry.voided || entry.potId !== potId || entry.bucket !== bucket) return false;
      return schoolYearQuarter(entry.date, schoolYear) === quarter;
    })
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
}

export function canViewPot(pot, viewerName, role = "teacher") {
  if (role === "admin") return true;
  if (!pot) return false;
  if (pot.kind === "advanced-sbe") return true;
  if (pot.kind === "kitchen-management") {
    return !pot.teacher || pot.teacher === viewerName || role === "admin";
  }
  if (pot.kind === "ca-section") {
    return pot.teacher === viewerName;
  }
  return false;
}

export function visiblePots(budget, viewerName, role = "teacher") {
  return (budget?.pots || []).filter(pot => canViewPot(pot, viewerName, role));
}

export function defaultBucketForEvent(event) {
  const type = String(event?.type || "").toLowerCase();
  if (type.includes("pop")) return "popup";
  return "food";
}

export function defaultPotIdForEvent(event) {
  const type = String(event?.type || "").toLowerCase();
  if (type.includes("pop")) return "advanced-sbe";
  return "advanced-sbe";
}

export function makeLedgerEntry({
  potId,
  bucket,
  amount,
  date,
  note = "",
  eventId = null,
  source = "manual",
  createdBy = "Teacher"
}) {
  return {
    id: `led-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    potId,
    bucket,
    amount: Math.round(Number(amount) * 100) / 100,
    date: String(date || new Date().toISOString().slice(0, 10)).slice(0, 10),
    note: String(note || "").trim(),
    eventId: eventId || null,
    source,
    voided: false,
    createdBy,
    createdAt: new Date().toISOString()
  };
}

/** Post closeout actual cost once per event (idempotent by eventId + source). */
export function syncCloseoutSpend(budget, event, {
  potId,
  bucket,
  amount,
  createdBy,
  skip = false
} = {}) {
  if (!budget || !event?.id) return { budget, entry: null, skipped: true };
  budget.ledger = Array.isArray(budget.ledger) ? budget.ledger : [];

  const existing = budget.ledger.find(entry => entry.eventId === event.id && entry.source === "closeout" && !entry.voided);
  if (skip) {
    if (existing) existing.voided = true;
    return { budget, entry: null, skipped: true };
  }

  const value = amount != null ? Number(amount) : null;
  if (value == null || Number.isNaN(value) || value < 0) return { budget, entry: existing || null, skipped: true };

  const targetPot = potId || defaultPotIdForEvent(event);
  const targetBucket = bucket || defaultBucketForEvent(event);
  const note = `Closeout: ${event.name || event.id}`;
  const date = (event.serviceDate || event.completedAt || new Date().toISOString()).slice(0, 10);

  if (existing) {
    existing.potId = targetPot;
    existing.bucket = targetBucket;
    existing.amount = Math.round(value * 100) / 100;
    existing.date = date;
    existing.note = note;
    existing.createdBy = createdBy || existing.createdBy;
    return { budget, entry: existing, skipped: false, updated: true };
  }

  const entry = makeLedgerEntry({
    potId: targetPot,
    bucket: targetBucket,
    amount: value,
    date,
    note,
    eventId: event.id,
    source: "closeout",
    createdBy: createdBy || "Teacher"
  });
  budget.ledger.unshift(entry);
  return { budget, entry, skipped: false, updated: false };
}

export function makePopupEvent({
  name,
  date,
  potId = "advanced-sbe",
  eventId = null,
  actualFood = 0,
  actualOverhead = 0,
  revenue = 0,
  createdBy = "Teacher"
} = {}) {
  return {
    id: `pop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    potId,
    name: String(name || "Pop-up event").trim(),
    date: String(date || new Date().toISOString().slice(0, 10)).slice(0, 10),
    eventId: eventId || null,
    budgeted: POPUP_EVENT_TARGET.total,
    foodBudget: POPUP_EVENT_TARGET.food,
    overheadBudget: POPUP_EVENT_TARGET.overhead,
    targetRevenue: POPUP_EVENT_TARGET.grossRevenue,
    actualFood: Number(actualFood) || 0,
    actualOverhead: Number(actualOverhead) || 0,
    revenue: Number(revenue) || 0,
    createdBy,
    createdAt: new Date().toISOString()
  };
}

export function popupScorecard(popup) {
  const food = Number(popup.actualFood || 0);
  const overhead = Number(popup.actualOverhead || 0);
  const revenue = Number(popup.revenue || 0);
  const cost = food + overhead;
  return {
    cost,
    remainingVsBudget: POPUP_EVENT_TARGET.total - cost,
    foodCostPercent: revenue > 0 ? food / revenue : null,
    revenueGap: POPUP_EVENT_TARGET.grossRevenue - revenue,
    onFoodCostTarget: revenue > 0 ? food / revenue <= POPUP_EVENT_TARGET.foodCostPercent + 0.01 : null
  };
}

export function formatMoney(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return "—";
  return number.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export function paceStatus(percent) {
  if (percent >= 1) return "over";
  if (percent >= 0.85) return "watch";
  return "ok";
}

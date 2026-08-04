import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const temp = process.env.TEMP || process.env.TMPDIR || "/tmp";
const page = fs.readFileSync(path.join(temp, "ca12-page.tsx"), "utf8");
const unit = fs.readFileSync(path.join(temp, "unit-content.ts"), "utf8");

const match = page.match(/const glossary:Record<string,string>=\{([\s\S]*?)\n\};/);
if (!match) throw new Error("glossary not found");

const entries = [];
const re = /"([^"]+)":\s*"((?:\\.|[^"\\])*)"/g;
let hit;
while ((hit = re.exec(match[1]))) {
  entries.push({
    term: hit[1],
    definition: hit[2].replace(/\\"/g, '"').replace(/\\n/g, "\n"),
    level: "Culinary 1-2"
  });
}

const byUnit = [];
const ure = /id:\s*(\d+)[\s\S]*?title:\s*"([^"]+)"[\s\S]*?vocabulary:\s*\[([^\]]*)\]/g;
let u;
while ((u = ure.exec(unit))) {
  byUnit.push({
    unit: Number(u[1]),
    title: u[2],
    terms: [...u[3].matchAll(/"([^"]+)"/g)].map(t => t[1])
  });
}

const advancedTerms = [
  { term: "Event Order", definition: "The published chef packet that states the accepted customer commitment, menu, allergens, quantities, schedule, and station plan.", level: "Advanced" },
  { term: "client commitment", definition: "What the department has promised after acceptance—product, quantity, quality, packaging, and deadline that students must protect.", level: "Advanced" },
  { term: "station update", definition: "A short production report sent from a student station card to the chef: status, yield, waste, issues, and recovery.", level: "Advanced" },
  { term: "complete closeout", definition: "Finishing delivery, records, dishes, sanitation, storage, and station restoration so the event is truly done.", level: "Advanced" },
  { term: "professional recovery", definition: "Owning a failure, diagnosing it with the instructor, and correcting only after approval—separate from the original technical result.", level: "Advanced" },
  { term: "simple catering", definition: "A smaller published catering job used to build technique and standards between the major assessment experiences.", level: "Advanced" },
  { term: "comprehensive assessment", definition: "One of the six major Advanced Culinary experiences that evaluates full-cycle readiness and production.", level: "Advanced" },
  { term: "standardized recipe", definition: "The teacher-approved production version with yield, portion, ingredients, procedure, allergens, and quality standard for an event.", level: "Advanced" },
  { term: "holding", definition: "Keeping finished or staged food at a safe temperature and quality until service or handoff.", level: "Advanced" },
  { term: "allocation", definition: "The quantity and unit assigned to your section or team for a menu item on the Event Order.", level: "Advanced" }
];

const out = {
  source: "GCSD Culinary 1 & 2 Field Manual + Advanced Culinary operating terms",
  note: "Foundational Culinary 1 & 2 vocabulary carried forward. Advanced terms extend the glossary for this course.",
  foundations: entries,
  byUnit,
  advancedTerms
};

const dest = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../site/data/vocabulary.json");
fs.writeFileSync(dest, `${JSON.stringify(out, null, 2)}\n`);
console.log(`Wrote ${entries.length} foundation + ${advancedTerms.length} advanced terms to ${dest}`);

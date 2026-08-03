import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile(new URL("../site/data/advanced-recipe-source-catalog.json", import.meta.url), "utf8"));
const studentPage = await readFile(new URL("../site/index.html", import.meta.url), "utf8");
const studentApp = await readFile(new URL("../site/app.js", import.meta.url), "utf8");

test("all catalogued course recipes and instructional references are present", () => {
  assert.equal(catalog.sourceImageCount, 177);
  assert.equal(catalog.recipes.length, 171);
  assert.equal(catalog.references.length, 45);
  assert.equal(new Set(catalog.recipes.map(recipe => recipe.id)).size, 171);
  assert.equal(new Set(catalog.references.map(reference => reference.id)).size, 45);
  assert.ok(catalog.recipes.some(recipe => recipe.name === "Cranberry Orange Muffins" && recipe.capturedYield === "1 dozen"));
  assert.ok(catalog.references.some(reference => reference.topic === "Recipe conversion factor"));
});

test("source recipes remain research candidates until production standardization", () => {
  assert.equal(catalog.recipes.every(recipe => recipe.databaseStatus === "Ready for structured transcription"), true);
  assert.match(catalog.statusNote, /teacher-approved/i);
  assert.match(studentPage, /Advanced Culinary source bank/);
  assert.match(studentPage, /production recipe only after transcription, testing, supplier matching, and teacher approval/);
  assert.match(studentApp, /source candidate, not an approved production recipe/);
});

test("technical references are connected to learning and quick reference", () => {
  assert.match(studentPage, /Find a method, calculation, or production standard/);
  assert.match(studentApp, /Course quick references/);
  assert.match(studentApp, /Use in Advanced/);
});

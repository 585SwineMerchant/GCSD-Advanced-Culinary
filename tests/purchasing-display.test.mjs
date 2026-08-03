import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const teacherPage = await readFile(new URL("../site/teacher/index.html", import.meta.url), "utf8");
const teacherOperations = await readFile(new URL("../site/teacher/teacher-operations.js", import.meta.url), "utf8");

test("teacher purchasing tables use shelf-package language instead of internal pack conversions", () => {
  assert.doesNotMatch(teacherPage, /<th>Purchase pack<\/th>/);
  assert.match(teacherPage, /<th>Wegmans product \/ package<\/th>/);
  assert.match(teacherPage, /<th>What to buy<\/th>/);
  assert.match(teacherPage, /actual Wegmans shelf package/);
  assert.doesNotMatch(teacherOperations, /data-ingredient-field="packSize"/);
  assert.match(teacherOperations, /View Wegmans item/);
  assert.match(teacherOperations, /packageDisplay/);
  assert.match(teacherOperations, /Wegmans pricing: \$\{matched\} of \$\{ingredients\.length\} ingredient lines matched/);
  assert.match(teacherOperations, /Return for revision or add a supplier record before production/);
});

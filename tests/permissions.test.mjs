import test from "node:test";
import assert from "node:assert/strict";
import { canEditEvent, validateTeacherChange } from "../worker/index.js";

const event = { id: "evt-1", name: "Service", owner: "Jason Carlson", collaborators: ["Kevin McCann"], version: 1, publishedAt: "2026-01-01", stage: "Published" };
const state = value => ({ requests: [], events: [structuredClone(value)] });

test("owner, collaborator, and admin edit boundaries", () => {
  assert.equal(canEditEvent({ role: "teacher", display_name: "Jason Carlson" }, event), true);
  assert.equal(canEditEvent({ role: "teacher", display_name: "Kevin McCann" }, event), true);
  assert.equal(canEditEvent({ role: "teacher", display_name: "Linda" }, event), false);
  assert.equal(canEditEvent({ role: "admin", display_name: "Kevin McCann" }, event), true);
});

test("viewer cannot alter an event", () => {
  const next = state(event); next.events[0].name = "Changed";
  assert.match(validateTeacherChange({ role: "teacher", display_name: "Linda" }, state(event), next), /do not have edit access/);
});

test("collaborator cannot publish a controlling revision", () => {
  const next = state(event); next.events[0].version = 2; next.events[0].publishedAt = "2026-01-02";
  assert.match(validateTeacherChange({ role: "teacher", display_name: "Kevin McCann" }, state(event), next), /Only the Event Order owner/);
});

test("owner can publish and admin can transfer ownership", () => {
  const published = state(event); published.events[0].version = 2;
  assert.equal(validateTeacherChange({ role: "teacher", display_name: "Jason Carlson" }, state(event), published), null);
  const transferred = state(event); transferred.events[0].owner = "Kevin McCann";
  assert.equal(validateTeacherChange({ role: "admin", display_name: "Kevin McCann" }, state(event), transferred), null);
});

test("teacher cannot delete an Event Order", () => {
  assert.match(validateTeacherChange({ role: "teacher", display_name: "Jason Carlson" }, state(event), { requests: [], events: [] }), /administrator/);
});

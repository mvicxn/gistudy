import assert from "node:assert/strict";
import { test } from "vitest";
import type { MasteryEvent } from "@/domain/experience";
import { computeMastery, MASTERY_THRESHOLD } from "@/engine/mastery";

function event(type: MasteryEvent["type"], result: MasteryEvent["result"] = "success"): MasteryEvent {
  return {
    id: `${type}`,
    conceptId: "conc-fundacao",
    type,
    result,
    timestamp: "2026-09-22T00:00:00.000Z",
    source: "test",
  };
}

test("mastery é recalculável a partir dos eventos", () => {
  const events = [event("exposure"), event("practice"), event("correct"), event("teach_back"), event("boss")];
  const score = computeMastery(events, "conc-fundacao");
  assert.equal(score, 100);
  assert.ok(score >= MASTERY_THRESHOLD);
});

test("falha não conta como domínio", () => {
  const score = computeMastery([event("practice", "fail")], "conc-fundacao");
  assert.equal(score, 0);
});

test("quase vale metade", () => {
  const score = computeMastery([event("practice", "almost")], "conc-fundacao");
  assert.equal(score, 10);
});

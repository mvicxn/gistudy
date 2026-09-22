import assert from "node:assert/strict";
import { test } from "vitest";
import { XP_RULES } from "@/config/xp-rules";
import { grantXp, totalXp } from "@/engine/xp";

test("XP vem das regras centrais, não de literais espalhados", () => {
  const grant = grantXp("lessonComplete", "aula-portao", "2026-09-22T00:00:00.000Z");
  assert.equal(grant.amount, XP_RULES.lessonComplete);
});

test("total soma as concessões", () => {
  const grants = [
    grantXp("lessonComplete", "a", "t"),
    grantXp("chapterComplete", "b", "t"),
  ];
  assert.equal(totalXp(grants), XP_RULES.lessonComplete + XP_RULES.chapterComplete);
});

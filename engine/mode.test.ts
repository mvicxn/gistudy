import assert from "node:assert/strict";
import { test } from "vitest";
import { STUDY_MODE_CONFIG } from "@/config/study-mode";
import { resolveStudyMode } from "@/engine/mode";

test("dentro da janela usa EXAM_URGENCY_MODE da configuração", () => {
  const mode = resolveStudyMode(new Date("2026-09-22T10:00:00-03:00"));
  assert.equal(mode.mode, "EXAM_URGENCY_MODE");
  assert.equal(mode.targetAssessmentId, STUDY_MODE_CONFIG.targetAssessmentId);
});

test("fora da janela volta para NORMAL_MODE", () => {
  const mode = resolveStudyMode(new Date("2026-10-01T10:00:00-03:00"));
  assert.equal(mode.mode, "NORMAL_MODE");
});

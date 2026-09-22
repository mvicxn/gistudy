import assert from "node:assert/strict";
import { test } from "vitest";
import { emptyProgress } from "@/domain/experience";
import { mockPedagogy } from "@/content/mock/reino";
import { pilotPedagogy } from "@/content/pilot/relogio-da-ferida";
import { XP_RULES } from "@/config/xp-rules";
import { applyAction } from "@/engine/apply-action";
import { resolveAllChapterStates } from "@/engine/progression";
import { computeMastery } from "@/engine/mastery";

function run(snapshot = emptyProgress()) {
  return (action: Parameters<typeof applyAction>[2]) => {
    const result = applyAction(snapshot, mockPedagogy, action, new Date("2026-09-22T12:00:00.000Z"));
    snapshot = result.snapshot;
    return result;
  };
}

test("fluxo mock completa o Portão, concede XP e libera a Floresta", () => {
  const act = run();
  act({ type: "START_LESSON", lessonId: "aula-portao" });
  act({ type: "COMPLETE_LESSON", lessonId: "aula-portao" });
  act({ type: "ANSWER_CHALLENGE", challengeId: "desafio-portao", result: "success" });
  act({ type: "COMPLETE_TEACH_BACK", teachBackId: "teach-portao", result: "success" });
  const done = act({ type: "COMPLETE_BOSS", bossId: "boss-portao", result: "success" });

  assert.equal(done.snapshot.chapters["cap-portao"].state, "MASTERED");
  assert.equal(
    done.snapshot.user.xp,
    XP_RULES.lessonComplete +
      XP_RULES.miniChallengeCorrect +
      XP_RULES.teachBackComplete +
      XP_RULES.bossComplete +
      XP_RULES.chapterComplete,
  );
  assert.ok(done.snapshot.flowers.some((flower) => flower.chapterId === "cap-portao" && flower.state === "bloomed"));
  assert.ok(done.events.some((event) => event.type === "CHAPTER_COMPLETED"));

  const states = resolveAllChapterStates(mockPedagogy.chapters, done.snapshot);
  assert.equal(states["cap-floresta"], "AVAILABLE");
  assert.ok(computeMastery(done.snapshot.masteryEvents, "conc-fundacao") >= 80);
});

test("capítulo locked permanece locked até o anterior fechar", () => {
  const snapshot = emptyProgress();
  const states = resolveAllChapterStates(mockPedagogy.chapters, snapshot);
  assert.equal(states["cap-torre"], "LOCKED");
});

test("fluxo piloto percorre o molde e soma XP canônico, separado de mastery", () => {
  let snapshot = emptyProgress();
  const act = (action: Parameters<typeof applyAction>[2]) => {
    const result = applyAction(snapshot, pilotPedagogy, action, new Date("2026-09-22T12:00:00.000Z"));
    snapshot = result.snapshot;
    return result;
  };

  act({ type: "START_LESSON", lessonId: "aula-cicatrizacao-01" });
  assert.equal(snapshot.chapters["cicatrizacao-01"].currentStep, "objective");

  for (const step of [
    "objective",
    "what",
    "whyExists",
    "how",
    "figure",
    "analogy",
    "whyMatters",
    "application",
    "mistakes",
  ] as const) {
    act({ type: "COMPLETE_SEGMENT", lessonId: "aula-cicatrizacao-01", step });
  }

  act({ type: "ANSWER_CHALLENGE", challengeId: "desafio-cicatrizacao-01", result: "success" });
  act({ type: "COMPLETE_TEACH_BACK", teachBackId: "teach-cicatrizacao-01", result: "success" });
  assert.equal(snapshot.chapters["cicatrizacao-01"].currentStep, "mastery");
  act({ type: "COMPLETE_SEGMENT", lessonId: "aula-cicatrizacao-01", step: "mastery" });
  const done = act({ type: "COMPLETE_BOSS", bossId: "boss-cicatrizacao-01", result: "success" });

  assert.equal(
    done.snapshot.user.xp,
    XP_RULES.explanationComplete +
      XP_RULES.figureComplete +
      XP_RULES.analogyComplete +
      XP_RULES.clinicalComplete +
      XP_RULES.commonMistakesComplete +
      XP_RULES.miniChallengeCorrect +
      XP_RULES.teachBackComplete +
      XP_RULES.bossComplete +
      XP_RULES.chapterComplete,
  );
  assert.notEqual(computeMastery(done.snapshot.masteryEvents, "conc-coagulacao"), done.snapshot.user.xp);
  assert.ok(computeMastery(done.snapshot.masteryEvents, "conc-coagulacao") >= 80);
  assert.ok(done.snapshot.chapters["cicatrizacao-01"].state === "COMPLETED" || done.snapshot.chapters["cicatrizacao-01"].state === "MASTERED");
});


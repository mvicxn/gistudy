import assert from "node:assert/strict";
import { test } from "vitest";
import { emptyProgress } from "@/domain/experience";
import { mockPedagogy } from "@/content/mock/reino";
import { nextAvailableChapter, resolveAllChapterStates } from "@/engine/progression";

test("primeiro capítulo começa disponível e os seguintes bloqueados", () => {
  const snapshot = emptyProgress();
  const states = resolveAllChapterStates(mockPedagogy.chapters, snapshot);
  assert.equal(states["cap-portao"], "AVAILABLE");
  assert.equal(states["cap-floresta"], "LOCKED");
  assert.equal(states["cap-torre"], "LOCKED");
});

test("concluir um capítulo libera o próximo", () => {
  const snapshot = emptyProgress();
  snapshot.chapters["cap-portao"] = { chapterId: "cap-portao", state: "COMPLETED" };
  const states = resolveAllChapterStates(mockPedagogy.chapters, snapshot);
  assert.equal(states["cap-floresta"], "AVAILABLE");
  assert.equal(states["cap-torre"], "LOCKED");
});

test("próximo capítulo é o primeiro aberto", () => {
  const snapshot = emptyProgress();
  const next = nextAvailableChapter(mockPedagogy.chapters, snapshot);
  assert.equal(next?.id, "cap-portao");
});

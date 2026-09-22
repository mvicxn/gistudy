import type { Chapter } from "@/domain/pedagogy";
import type { ChapterProgress, ChapterState, ProgressSnapshot } from "@/domain/experience";
import { averageMastery, MASTERY_THRESHOLD } from "@/engine/mastery";

export function orderedChapters(chapters: Chapter[]) {
  return [...chapters].sort((a, b) => a.order - b.order);
}

export function resolveChapterState(
  chapter: Chapter,
  snapshot: ProgressSnapshot,
  previous?: Chapter,
): ChapterState {
  const stored = snapshot.chapters[chapter.id]?.state;
  if (stored === "COMPLETED" || stored === "MASTERED" || stored === "IN_PROGRESS") {
    return stored;
  }

  if (previous) {
    const prevState = snapshot.chapters[previous.id]?.state;
    if (prevState !== "COMPLETED" && prevState !== "MASTERED") return "LOCKED";
  }

  return stored ?? "AVAILABLE";
}

export function resolveAllChapterStates(chapters: Chapter[], snapshot: ProgressSnapshot) {
  const ordered = orderedChapters(chapters);
  const states: Record<string, ChapterState> = {};
  ordered.forEach((chapter, index) => {
    states[chapter.id] = resolveChapterState(chapter, snapshot, ordered[index - 1]);
  });
  return states;
}

export function nextAvailableChapter(chapters: Chapter[], snapshot: ProgressSnapshot) {
  const states = resolveAllChapterStates(chapters, snapshot);
  return orderedChapters(chapters).find((chapter) => {
    const state = states[chapter.id];
    return state === "AVAILABLE" || state === "IN_PROGRESS";
  });
}

export function isChapterOpen(state: ChapterState) {
  return state !== "LOCKED";
}

export function markChapterProgress(
  snapshot: ProgressSnapshot,
  chapter: Chapter,
  patch: Partial<ChapterProgress>,
): ChapterProgress {
  const current = snapshot.chapters[chapter.id] ?? {
    chapterId: chapter.id,
    state: "AVAILABLE",
  };
  return { ...current, ...patch };
}

export function completionState(snapshot: ProgressSnapshot, chapter: Chapter): ChapterState {
  const mastery = averageMastery(snapshot.masteryEvents, chapter.conceptIds);
  return mastery >= MASTERY_THRESHOLD ? "MASTERED" : "COMPLETED";
}

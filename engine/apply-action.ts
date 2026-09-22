import type { DomainEvent } from "@/domain/events";
import type {
  LessonStep,
  MasteryEvent,
  MasteryResult,
  ProgressSnapshot,
} from "@/domain/experience";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import { emptyProgress } from "@/domain/experience";
import { nextId } from "@/engine/ids";
import { completionState, markChapterProgress } from "@/engine/progression";
import { upsertFlower } from "@/engine/garden";
import { grantXp, totalXp } from "@/engine/xp";
import type { XpRule } from "@/config/xp-rules";
import { firstStep, nextStep, STEP_XP } from "@/engine/lesson-flow";

export type StudyAction =
  | { type: "START_LESSON"; lessonId: string }
  | { type: "COMPLETE_LESSON"; lessonId: string }
  | { type: "COMPLETE_SEGMENT"; lessonId: string; step: LessonStep }
  | { type: "ANSWER_CHALLENGE"; challengeId: string; result: MasteryResult }
  | { type: "COMPLETE_TEACH_BACK"; teachBackId: string; result: MasteryResult }
  | { type: "COMPLETE_BOSS"; bossId: string; result: MasteryResult }
  | { type: "COMPLETE_REVIEW"; reviewId: string }
  | { type: "COMPLETE_EXAM"; assessmentId: string }
  | { type: "RESET" };

export type ApplyResult = {
  snapshot: ProgressSnapshot;
  events: DomainEvent[];
};

function emit(
  events: DomainEvent[],
  type: DomainEvent["type"],
  at: string,
  payload: DomainEvent["payload"],
) {
  events.push({ type, at, payload });
}

function addMastery(
  snapshot: ProgressSnapshot,
  domainEvents: DomainEvent[],
  conceptIds: string[],
  type: MasteryEvent["type"],
  result: MasteryResult,
  at: string,
  source: string,
) {
  const created = conceptIds.map((conceptId) => ({
    id: nextId("mst"),
    conceptId,
    type,
    result,
    timestamp: at,
    source,
  }));
  snapshot.masteryEvents = [...snapshot.masteryEvents, ...created];
  emit(domainEvents, "MASTERY_UPDATED", at, { source, count: created.length });
}

function addXp(snapshot: ProgressSnapshot, events: DomainEvent[], rule: XpRule, reason: string, at: string) {
  const grant = grantXp(rule, reason, at);
  snapshot.xpGrants = [...snapshot.xpGrants, grant];
  snapshot.user = { ...snapshot.user, xp: totalXp(snapshot.xpGrants), lastActiveAt: at };
  emit(events, "XP_GRANTED", at, { rule, amount: grant.amount });
}

function unlockAchievement(snapshot: ProgressSnapshot, events: DomainEvent[], id: string, at: string) {
  if (snapshot.achievements.some((item) => item.id === id)) return;
  snapshot.achievements = [...snapshot.achievements, { id, unlockedAt: at }];
  emit(events, "ACHIEVEMENT_UNLOCKED", at, { id });
}

function setStep(snapshot: ProgressSnapshot, chapterId: string, chapter: Parameters<typeof markChapterProgress>[1], step: LessonStep, at: string) {
  snapshot.chapters = {
    ...snapshot.chapters,
    [chapterId]: markChapterProgress(snapshot, chapter, {
      state: "IN_PROGRESS",
      currentStep: step,
      startedAt: snapshot.chapters[chapterId]?.startedAt ?? at,
    }),
  };
}

export function applyAction(
  snapshot: ProgressSnapshot,
  catalog: PedagogyCatalog,
  action: StudyAction,
  now = new Date(),
): ApplyResult {
  if (action.type === "RESET") {
    return { snapshot: emptyProgress(snapshot.user.userId), events: [] };
  }

  const next: ProgressSnapshot = {
    ...snapshot,
    chapters: { ...snapshot.chapters },
    masteryEvents: [...snapshot.masteryEvents],
    xpGrants: [...snapshot.xpGrants],
    flowers: [...snapshot.flowers],
    gems: [...snapshot.gems],
    achievements: [...snapshot.achievements],
    completedLessonIds: [...snapshot.completedLessonIds],
    completedChallengeIds: [...snapshot.completedChallengeIds],
    completedTeachBackIds: [...snapshot.completedTeachBackIds],
    completedBossIds: [...snapshot.completedBossIds],
    completedReviewIds: [...snapshot.completedReviewIds],
    completedAssessmentIds: [...snapshot.completedAssessmentIds],
    user: { ...snapshot.user },
  };
  const events: DomainEvent[] = [];
  const at = now.toISOString();

  if (action.type === "START_LESSON") {
    const lesson = catalog.lessons.find((item) => item.id === action.lessonId);
    const chapter = catalog.chapters.find((item) => item.id === lesson?.chapterId);
    if (!lesson || !chapter) return { snapshot, events };
    const existing = snapshot.chapters[chapter.id];
    if (existing?.state === "COMPLETED" || existing?.state === "MASTERED") {
      return { snapshot, events };
    }
    if (existing?.state === "IN_PROGRESS" && existing.currentStep) {
      return { snapshot, events };
    }
    setStep(next, chapter.id, chapter, existing?.currentStep ?? firstStep(lesson), at);
    emit(events, "LESSON_STARTED", at, { lessonId: lesson.id, chapterId: chapter.id });
    return { snapshot: next, events };
  }

  if (action.type === "COMPLETE_SEGMENT") {
    const lesson = catalog.lessons.find((item) => item.id === action.lessonId);
    const chapter = catalog.chapters.find((item) => item.id === lesson?.chapterId);
    if (!lesson || !chapter) return { snapshot, events };
    const current = snapshot.chapters[chapter.id]?.currentStep;
    if (current && current !== action.step) return { snapshot, events };

    const rule = STEP_XP[action.step];
    const grantReason = `${lesson.id}:${action.step}`;
    if (rule && !next.xpGrants.some((grant) => grant.reason === grantReason)) {
      addXp(next, events, rule, grantReason, at);
    }

    if (action.step === "how" && !next.completedLessonIds.includes(lesson.id)) {
      next.completedLessonIds.push(lesson.id);
      addMastery(next, events, lesson.conceptIds, "exposure", "success", at, lesson.id);
      emit(events, "LESSON_COMPLETED", at, { lessonId: lesson.id });
    }

    if (action.step === "mistakes") {
      next.flowers = upsertFlower(next, { id: `plot_${chapter.id}`, chapterId: chapter.id, state: "growing" });
      emit(events, "FLOWER_GROWN", at, { chapterId: chapter.id, state: "growing" });
    }

    const following = nextStep(lesson, action.step);
    if (following) setStep(next, chapter.id, chapter, following, at);
    return { snapshot: next, events };
  }

  if (action.type === "COMPLETE_LESSON") {
    const lesson = catalog.lessons.find((item) => item.id === action.lessonId);
    const chapter = catalog.chapters.find((item) => item.id === lesson?.chapterId);
    if (!lesson || !chapter) return { snapshot, events };
    if (!next.completedLessonIds.includes(lesson.id)) {
      next.completedLessonIds.push(lesson.id);
      addXp(next, events, "lessonComplete", lesson.id, at);
      addMastery(next, events, lesson.conceptIds, "exposure", "success", at, lesson.id);
    }
    setStep(next, chapter.id, chapter, "challenge", at);
    next.flowers = upsertFlower(next, { id: `plot_${chapter.id}`, chapterId: chapter.id, state: "growing" });
    emit(events, "LESSON_COMPLETED", at, { lessonId: lesson.id });
    emit(events, "FLOWER_GROWN", at, { chapterId: chapter.id, state: "growing" });
    return { snapshot: next, events };
  }

  if (action.type === "ANSWER_CHALLENGE") {
    const challenge = catalog.challenges.find((item) => item.id === action.challengeId);
    const chapter = catalog.chapters.find((item) => item.id === challenge?.chapterId);
    if (!challenge || !chapter) return { snapshot, events };
    const hadMiss = snapshot.masteryEvents.some(
      (event) => event.source === challenge.id && event.result !== "success",
    );
    addMastery(next, events, challenge.conceptIds, "practice", action.result, at, challenge.id);
    if (action.result === "success") {
      addMastery(next, events, challenge.conceptIds, "correct", "success", at, challenge.id);
      if (!next.completedChallengeIds.includes(challenge.id)) {
        next.completedChallengeIds.push(challenge.id);
        addXp(
          next,
          events,
          hadMiss ? "miniChallengeRetry" : "miniChallengeCorrect",
          challenge.id,
          at,
        );
      }
      const lesson = catalog.lessons.find((item) => item.id === chapter.lessonId);
      const following = nextStep(lesson, "challenge") ?? "teachback";
      setStep(next, chapter.id, chapter, following, at);
    }
    emit(events, "CHALLENGE_ANSWERED", at, { challengeId: challenge.id, result: action.result });
    return { snapshot: next, events };
  }

  if (action.type === "COMPLETE_TEACH_BACK") {
    const teachBack = catalog.teachBacks.find((item) => item.id === action.teachBackId);
    const chapter = catalog.chapters.find((item) => item.id === teachBack?.chapterId);
    if (!teachBack || !chapter) return { snapshot, events };
    addMastery(next, events, teachBack.conceptIds, "teach_back", action.result, at, teachBack.id);
    emit(events, "TEACH_BACK_COMPLETED", at, { teachBackId: teachBack.id });
    if (action.result !== "success") return { snapshot: next, events };

    if (!next.completedTeachBackIds.includes(teachBack.id)) {
      next.completedTeachBackIds.push(teachBack.id);
      const hadMiss = snapshot.masteryEvents.some(
        (event) => event.source === teachBack.id && event.result !== "success",
      );
      addXp(next, events, hadMiss ? "teachBackAdjust" : "teachBackComplete", teachBack.id, at);
    }
    const lesson = catalog.lessons.find((item) => item.id === chapter.lessonId);
    setStep(next, chapter.id, chapter, nextStep(lesson, "teachback") ?? "boss", at);
    return { snapshot: next, events };
  }

  if (action.type === "COMPLETE_BOSS") {
    const boss = catalog.bosses.find((item) => item.id === action.bossId);
    const chapter = catalog.chapters.find((item) => item.id === boss?.chapterId);
    if (!boss || !chapter) return { snapshot, events };
    addMastery(next, events, boss.conceptIds, "boss", action.result, at, boss.id);
    emit(events, "BOSS_COMPLETED", at, { bossId: boss.id, result: action.result });
    if (action.result !== "success") return { snapshot: next, events };

    if (!next.completedBossIds.includes(boss.id)) {
      next.completedBossIds.push(boss.id);
      addXp(next, events, "bossComplete", boss.id, at);
      addXp(next, events, "chapterComplete", chapter.id, at);
    }
    const state = completionState(next, chapter);
    next.chapters[chapter.id] = markChapterProgress(next, chapter, {
      state,
      currentStep: "reward",
      completedAt: at,
    });
    next.flowers = upsertFlower(next, { id: `plot_${chapter.id}`, chapterId: chapter.id, state: "bloomed" });
    next.gems = [...next.gems, { id: nextId("gem"), source: chapter.id, earnedAt: at }];
    next.user = { ...next.user, streak: next.user.streak + 1, lastActiveAt: at };
    unlockAchievement(next, events, "first-chapter", at);
    unlockAchievement(next, events, "first-flower", at);
    emit(events, "CHAPTER_COMPLETED", at, { chapterId: chapter.id, state });
    emit(events, "FLOWER_GROWN", at, { chapterId: chapter.id, state: "bloomed" });
    return { snapshot: next, events };
  }

  if (action.type === "COMPLETE_REVIEW") {
    const review = catalog.reviews.find((item) => item.id === action.reviewId);
    if (!review) return { snapshot, events };
    if (!next.completedReviewIds.includes(review.id)) {
      next.completedReviewIds.push(review.id);
      addXp(next, events, "reviewComplete", review.id, at);
      addMastery(next, events, review.conceptIds, "review", "success", at, review.id);
    }
    emit(events, "REVIEW_COMPLETED", at, { reviewId: review.id });
    return { snapshot: next, events };
  }

  if (action.type === "COMPLETE_EXAM") {
    const assessment = catalog.assessments.find((item) => item.id === action.assessmentId);
    if (!assessment) return { snapshot, events };
    if (!next.completedAssessmentIds.includes(assessment.id)) {
      next.completedAssessmentIds.push(assessment.id);
      addXp(next, events, "examComplete", assessment.id, at);
      addMastery(next, events, assessment.conceptIds, "review", "success", at, assessment.id);
    }
    emit(events, "EXAM_COMPLETED", at, { assessmentId: assessment.id });
    return { snapshot: next, events };
  }

  return { snapshot, events };
}

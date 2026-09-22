export type ChapterState =
  | "LOCKED"
  | "AVAILABLE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "MASTERED";

export type LessonStep =
  | "lesson"
  | "objective"
  | "what"
  | "whyExists"
  | "how"
  | "figure"
  | "analogy"
  | "whyMatters"
  | "application"
  | "mistakes"
  | "challenge"
  | "teachback"
  | "mastery"
  | "boss"
  | "reward";

export type UserProgress = {
  userId: string;
  xp: number;
  streak: number;
  lastActiveAt?: string;
};

export type ChapterProgress = {
  chapterId: string;
  state: ChapterState;
  currentStep?: LessonStep;
  startedAt?: string;
  completedAt?: string;
};

export type MasteryEventType =
  | "exposure"
  | "practice"
  | "correct"
  | "teach_back"
  | "review"
  | "boss";

export type MasteryResult = "success" | "almost" | "fail";

export type MasteryEvent = {
  id: string;
  conceptId: string;
  type: MasteryEventType;
  result: MasteryResult;
  timestamp: string;
  source: string;
};

export type XpGrant = {
  id: string;
  rule: string;
  amount: number;
  timestamp: string;
  reason: string;
};

export type FlowerState = "empty" | "growing" | "bloomed";

export type Flower = {
  id: string;
  chapterId: string;
  state: FlowerState;
};

export type Gem = {
  id: string;
  source: string;
  earnedAt: string;
};

export type Achievement = {
  id: string;
  unlockedAt: string;
};

export type CalendarEventKind = "study" | "review" | "exam";

export type CalendarEvent = {
  id: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  kind: CalendarEventKind;
  href?: string;
};

export type StudyModeName = "NORMAL_MODE" | "EXAM_URGENCY_MODE";

export type StudyMode = {
  mode: StudyModeName;
  startsAt?: string;
  endsAt?: string;
  targetAssessmentId?: string;
};

export type ProgressSnapshot = {
  version: 1;
  user: UserProgress;
  chapters: Record<string, ChapterProgress>;
  masteryEvents: MasteryEvent[];
  xpGrants: XpGrant[];
  flowers: Flower[];
  gems: Gem[];
  achievements: Achievement[];
  completedLessonIds: string[];
  completedChallengeIds: string[];
  completedTeachBackIds: string[];
  completedBossIds: string[];
  completedReviewIds: string[];
  completedAssessmentIds: string[];
};

export function emptyProgress(userId = "giovana"): ProgressSnapshot {
  return {
    version: 1,
    user: { userId, xp: 0, streak: 0 },
    chapters: {},
    masteryEvents: [],
    xpGrants: [],
    flowers: [],
    gems: [],
    achievements: [],
    completedLessonIds: [],
    completedChallengeIds: [],
    completedTeachBackIds: [],
    completedBossIds: [],
    completedReviewIds: [],
    completedAssessmentIds: [],
  };
}

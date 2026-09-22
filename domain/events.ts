export const DOMAIN_EVENTS = [
  "LESSON_STARTED",
  "LESSON_COMPLETED",
  "CHALLENGE_ANSWERED",
  "TEACH_BACK_COMPLETED",
  "BOSS_COMPLETED",
  "CHAPTER_COMPLETED",
  "MASTERY_UPDATED",
  "XP_GRANTED",
  "FLOWER_GROWN",
  "ACHIEVEMENT_UNLOCKED",
  "REVIEW_COMPLETED",
  "EXAM_COMPLETED",
] as const;

export type DomainEventType = (typeof DOMAIN_EVENTS)[number];

export type DomainEvent = {
  type: DomainEventType;
  at: string;
  payload: Record<string, string | number | boolean>;
};

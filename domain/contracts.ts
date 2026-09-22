/**
 * Contratos estáveis do frontend.
 * A UI conhece somente estes tipos — nunca PPTX, parser, OCR ou prompt.
 */

export type { SourceRef } from "@/domain/source";
export type { Concept, Topic } from "@/domain/normalized";
export type {
  Subject,
  Module,
  Chapter,
  Lesson,
  Mission,
  MicroChallenge as Challenge,
  ChapterBoss as Boss,
  Review,
  Assessment,
  TeachBack,
} from "@/domain/pedagogy";
export type { EpistemicKind, ClinicalApplicationType, LessonBody } from "@/domain/epistemic";
export type { PedagogyPipelineStep, BossLevel } from "@/domain/mold";
export type {
  ChapterState,
  LessonStep,
  UserProgress,
  ChapterProgress,
  ProgressSnapshot,
  StudyMode,
  StudyModeName,
  CalendarEvent,
  Flower,
  Gem,
  Achievement,
} from "@/domain/experience";

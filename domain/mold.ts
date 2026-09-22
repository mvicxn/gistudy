import type { LessonStep } from "@/domain/experience";
import type { EpistemicKind } from "@/domain/epistemic";

/**
 * Molde pedagógico oficial do MM Study (F5A.2).
 * Uma arquitetura. Não reinventar por capítulo.
 *
 * SOURCE → NORMALIZED → PEDAGOGY (aula) → BOSS → REWARD
 */
export const PEDAGOGY_PIPELINE = [
  "mission",
  "objective",
  "what",
  "whyExists",
  "how",
  "figure",
  "analogy",
  "whyMatters",
  "application",
  "mistakes",
  "challenge",
  "teachback",
  "mastery",
  "boss",
  "reward",
] as const;

export type PedagogyPipelineStep = (typeof PEDAGOGY_PIPELINE)[number];

/** Passos da aula na EXPERIÊNCIA (missão vive na tela do capítulo). */
export const LESSON_MOLD_STEPS: LessonStep[] = [
  "objective",
  "what",
  "whyExists",
  "how",
  "figure",
  "analogy",
  "whyMatters",
  "application",
  "mistakes",
  "challenge",
  "teachback",
  "mastery",
];

export const CHAPTER_CLOSE_STEPS: LessonStep[] = ["boss", "reward"];

export const FULL_LESSON_FLOW: LessonStep[] = [...LESSON_MOLD_STEPS, ...CHAPTER_CLOSE_STEPS];

export const EPISTEMIC_KINDS: readonly EpistemicKind[] = [
  "fato-da-fonte",
  "transformacao-pedagogica",
  "inferencia",
  "interpretacao-da-fonte",
  "conhecimento-externo",
  "lacuna",
] as const;

/** Nunca podem ser apresentados como fato da fonte. */
export const NOT_SOURCE_FACT: readonly EpistemicKind[] = [
  "transformacao-pedagogica",
  "inferencia",
  "interpretacao-da-fonte",
  "conhecimento-externo",
  "lacuna",
];

export const CLINICAL_TYPES = ["relevance", "conduct"] as const;

export const BOSS_LEVELS = ["recognition", "differentiation", "reasoning"] as const;

export type BossLevel = (typeof BOSS_LEVELS)[number];

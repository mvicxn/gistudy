import type { LessonStep } from "@/domain/experience";
import type { XpRule } from "@/config/xp-rules";
import type { Lesson } from "@/domain/pedagogy";
import { FULL_LESSON_FLOW } from "@/domain/mold";

export const MOCK_FLOW: LessonStep[] = ["lesson", "challenge", "teachback", "boss", "reward"];

export const PILOT_FLOW: LessonStep[] = FULL_LESSON_FLOW;

export function flowFor(lesson?: Pick<Lesson, "mold"> | null): LessonStep[] {
  return lesson?.mold === "full" ? PILOT_FLOW : MOCK_FLOW;
}

export function firstStep(lesson?: Pick<Lesson, "mold"> | null): LessonStep {
  return flowFor(lesson)[0];
}

export function nextStep(
  lesson: Pick<Lesson, "mold"> | null | undefined,
  current: LessonStep,
): LessonStep | undefined {
  const flow = flowFor(lesson);
  const index = flow.indexOf(current);
  if (index < 0) return flow[0];
  return flow[index + 1];
}

export const STEP_XP: Partial<Record<LessonStep, XpRule>> = {
  how: "explanationComplete",
  figure: "figureComplete",
  analogy: "analogyComplete",
  application: "clinicalComplete",
  mistakes: "commonMistakesComplete",
};

export const STEP_LABEL: Record<LessonStep, string> = {
  lesson: "Aula",
  objective: "Objetivo",
  what: "O que é",
  whyExists: "Por que existe",
  how: "Como funciona",
  figure: "Figura",
  analogy: "Analogia",
  whyMatters: "Por que importa",
  application: "Aplicação na fisioterapia",
  mistakes: "Erros comuns",
  challenge: "Microdesafio",
  teachback: "Ensine de volta",
  mastery: "Domínio",
  boss: "Boss",
  reward: "Recompensa",
};

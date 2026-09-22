import type { ChapterState, LessonStep, StudyModeName } from "@/domain/experience";
import type { Lesson } from "@/domain/pedagogy";
import { flowFor } from "@/engine/lesson-flow";

export const CHAPTER_STATE_LABEL: Record<ChapterState, string> = {
  LOCKED: "Bloqueado",
  AVAILABLE: "Disponível",
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Concluído",
  MASTERED: "Dominado",
};

export const STUDENT_STEP_LABEL: Record<LessonStep, string> = {
  lesson: "Aula",
  objective: "O que você vai aprender",
  what: "O que é",
  whyExists: "Por que isso existe",
  how: "Como funciona",
  figure: "Olhe esta figura",
  analogy: "Uma imagem para lembrar",
  whyMatters: "Por que isso importa",
  application: "Na prática",
  mistakes: "Erros comuns",
  challenge: "Pergunta",
  teachback: "Ensine de volta",
  mastery: "O que você já segura",
  boss: "Desafio final",
  reward: "Capítulo concluído",
};

export function greeting(now = new Date()): string {
  const hour = now.getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function chapterOrdinal(order: number): string {
  return `Capítulo ${String(order).padStart(2, "0")}`;
}

export function chapterCta(state: ChapterState): string {
  if (state === "LOCKED") return "Bloqueado";
  if (state === "IN_PROGRESS") return "Continuar aula";
  if (state === "COMPLETED" || state === "MASTERED") return "Revisar aula";
  return "Começar aula";
}

export function continueLabel(step: LessonStep): string {
  if (step === "objective") return "Começar";
  if (step === "challenge") return "Continuar";
  if (step === "teachback") return "Continuar";
  if (step === "boss") return "Continuar";
  if (step === "reward") return "Continuar jornada";
  return "Continuar";
}

export function modeHeadline(mode: StudyModeName): { kicker: string; title: string } {
  if (mode === "EXAM_URGENCY_MODE") {
    return { kicker: "Prova se aproximando", title: "O que estudar hoje" };
  }
  return { kicker: "Sua jornada", title: "Continue estudando" };
}

export function lessonProgressPercent(lesson: Lesson | undefined, step: LessonStep): number {
  const flow = flowFor(lesson);
  if (step === "reward") return 100;
  const index = flow.indexOf(step);
  if (index < 0) return 0;
  return Math.round((index / flow.length) * 100);
}

export function progressCopy(percent: number): string {
  if (percent <= 0) return "Você ainda não começou esta aula.";
  if (percent >= 100) return "Você concluiu esta aula.";
  return `Já fez ${percent}% dessa aula.`;
}

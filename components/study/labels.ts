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
  if (state === "LOCKED") return "Ainda bloqueado";
  if (state === "IN_PROGRESS") return "Continuar esta aula";
  if (state === "COMPLETED" || state === "MASTERED") return "Revisitar a aula";
  return "Abrir esta aula";
}

export function continueLabel(step: LessonStep, next?: LessonStep): string {
  if (step === "objective") return "Começar a ler a aula";
  if (step === "challenge") return "Conferir resposta";
  if (step === "teachback") return "Conferir minha explicação";
  if (step === "mastery") return "Ir ao desafio final";
  if (step === "boss") return "Próxima pergunta";
  if (step === "reward") return "Abrir o próximo capítulo";
  if (next) return `Seguir: ${STUDENT_STEP_LABEL[next]}`;
  return "Seguir em frente";
}

export function lockReason(chapterTitle: string | undefined): string {
  if (!chapterTitle) return "Este capítulo ainda não chegou a sua vez.";
  return `Termine “${chapterTitle}” para abrir este.`;
}

export function previousChapterTitle(
  chapters: { id: string; order: number; title: string }[],
  chapterId: string,
): string | undefined {
  const ordered = [...chapters].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((item) => item.id === chapterId);
  return index > 0 ? ordered[index - 1]?.title : undefined;
}

export function modeHeadline(mode: StudyModeName): { kicker: string; title: string } {
  if (mode === "EXAM_URGENCY_MODE") {
    return { kicker: "Prova se aproximando", title: "O que estudar hoje" };
  }
  return { kicker: "Sua jornada", title: "Continue estudando" };
}

export function lessonProgress(lesson: Lesson | undefined, step: LessonStep) {
  const flow = flowFor(lesson);
  if (step === "reward") {
    return { current: flow.length, total: flow.length, percent: 100 };
  }
  const index = flow.indexOf(step);
  const current = index < 0 ? 1 : index + 1;
  return {
    current,
    total: flow.length,
    percent: Math.round((Math.max(index, 0) / flow.length) * 100),
  };
}

export function lessonProgressPercent(lesson: Lesson | undefined, step: LessonStep): number {
  return lessonProgress(lesson, step).percent;
}

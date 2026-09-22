import type { MasteryEvent, MasteryEventType } from "@/domain/experience";

/**
 * Canônico F4, alinhado aos sinais da F2:
 * acerto → correct; explicacao → exposure; revisão → review; boss → boss.
 * repeticao: o melhor evento de cada tipo prevalece (já cobre).
 * recencia: NÃO implementada. Lacuna explícita — domínio ainda não esfria.
 */
export const MASTERY_WEIGHTS: Record<MasteryEventType, number> = {
  exposure: 15,
  practice: 20,
  correct: 20,
  teach_back: 25,
  review: 15,
  boss: 25,
};

export const MASTERY_THRESHOLD = 80;
export const MASTERY_RECENCY_IMPLEMENTED = false;

function resultFactor(result: MasteryEvent["result"]) {
  if (result === "success") return 1;
  if (result === "almost") return 0.5;
  return 0;
}

export function computeMastery(events: MasteryEvent[], conceptId: string) {
  const relevant = events.filter((event) => event.conceptId === conceptId);
  const bestByType = new Map<MasteryEventType, number>();

  for (const event of relevant) {
    const value = MASTERY_WEIGHTS[event.type] * resultFactor(event.result);
    const current = bestByType.get(event.type) ?? 0;
    if (value > current) bestByType.set(event.type, value);
  }

  const score = [...bestByType.values()].reduce((sum, value) => sum + value, 0);
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function averageMastery(events: MasteryEvent[], conceptIds: string[]) {
  if (conceptIds.length === 0) return 0;
  const total = conceptIds.reduce((sum, id) => sum + computeMastery(events, id), 0);
  return Math.round(total / conceptIds.length);
}

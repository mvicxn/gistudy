/**
 * Níveis canônicos = F2.
 * F4 tinha Exploradora@200; não usar no conteúdo novo.
 */
export const LEVELS = [
  { id: "aprendiz", title: "Aprendiz", minXp: 0 },
  { id: "guardia", title: "Guardiã", minXp: 500 },
  { id: "princesa", title: "Princesa do Conhecimento", minXp: 1500 },
  { id: "rainha", title: "Rainha da Biblioteca", minXp: 3500 },
] as const;

export function levelForXp(xp: number) {
  return [...LEVELS].reverse().find((level) => xp >= level.minXp) ?? LEVELS[0];
}

export function xpProgressInLevel(xp: number) {
  const current = levelForXp(xp);
  const index = LEVELS.findIndex((level) => level.id === current.id);
  const next = LEVELS[index + 1];
  if (!next) return 100;
  const span = next.minXp - current.minXp;
  return Math.round(((xp - current.minXp) / span) * 100);
}

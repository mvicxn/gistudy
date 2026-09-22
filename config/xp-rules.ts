/**
 * Economia canônica. F2 é a intenção de produto; F4 era o mock.
 * Conteúdo novo referencia só estas chaves — nunca literais "+25".
 *
 * Mapa F2 → canônico:
 * explicacao 10 → explanationComplete
 * figura 10 → figureComplete
 * analogia 10 → analogyComplete
 * clinica 10 → clinicalComplete
 * errosComuns 15 → commonMistakesComplete
 * miniPrimeira 25 → miniChallengeCorrect
 * miniRetry 15 → miniChallengeRetry
 * ensineDominio 30 → teachBackComplete
 * ensineAjuste 20 → teachBackAdjust
 * boss 80 → bossComplete
 * capitulo 50 → chapterComplete
 * revisaoLivro 40 → reviewComplete
 * provaBloco 150 → examComplete
 * streakDia 10 → streakDay
 *
 * lessonComplete (40) permanece só para o fluxo mock da F4.
 */
export const XP_RULES = {
  lessonComplete: 40,
  explanationComplete: 10,
  figureComplete: 10,
  analogyComplete: 10,
  clinicalComplete: 10,
  commonMistakesComplete: 15,
  miniChallengeCorrect: 25,
  miniChallengeRetry: 15,
  teachBackComplete: 30,
  teachBackAdjust: 20,
  bossComplete: 80,
  chapterComplete: 50,
  reviewComplete: 40,
  examComplete: 150,
  streakDay: 10,
} as const;

export type XpRule = keyof typeof XP_RULES;

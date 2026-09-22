export const GUIDE_STORAGE_KEY = "mm-study.guide.v1";

export const GUIDE_STEPS = [
  "welcome",
  "journey",
  "chapter",
  "lesson",
  "challenge",
  "teachback",
  "boss",
  "reward",
] as const;

export type GuideStep = (typeof GUIDE_STEPS)[number];

export type GuideState = {
  status: "active" | "done";
  step: GuideStep;
};

export const GUIDE_COPY: Record<GuideStep, { index: number; title: string; body: string }> = {
  welcome: {
    index: 1,
    title: "Bem-vinda ao MM Study",
    body: "Eu vou te acompanhar na sua primeira aula. A gente entra, estuda e fecha o capítulo juntas.",
  },
  journey: {
    index: 1,
    title: "Escolha sua jornada",
    body: "O primeiro capítulo já está aberto. Os outros esperam você terminar o anterior — não precisa escolher o que vem depois.",
  },
  chapter: {
    index: 2,
    title: "Veja o que você vai aprender",
    body: "Leia o objetivo. Quando estiver pronta, comece a aula. Uma aula, um capítulo.",
  },
  lesson: {
    index: 3,
    title: "Estude um trecho de cada vez",
    body: "Leia com calma. Quando terminar, siga em frente. Não precisa decorar o menu — só o trecho da frente.",
  },
  challenge: {
    index: 4,
    title: "Responda a pergunta",
    body: "Toque a alternativa e confira. Se não for essa, a gente olha de novo. Nada se perde.",
  },
  teachback: {
    index: 5,
    title: "Ensine de volta",
    body: "Explique com as suas palavras. É assim que a aula gruda — não é uma prova, é conversa.",
  },
  boss: {
    index: 6,
    title: "Desafio final do capítulo",
    body: "Uma pergunta de cada vez. Quando você terminar, o capítulo fecha.",
  },
  reward: {
    index: 7,
    title: "Sua primeira aula acabou",
    body: "Você ganhou XP e uma flor no jardim. O próximo capítulo já pode abrir.",
  },
};

export function emptyGuide(): GuideState {
  return { status: "active", step: "welcome" };
}

export function doneGuide(): GuideState {
  return { status: "done", step: "reward" };
}

export function loadGuide(): GuideState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(GUIDE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GuideState;
    if (parsed.status !== "active" && parsed.status !== "done") return null;
    if (!GUIDE_STEPS.includes(parsed.step)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveGuide(state: GuideState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify(state));
}

export function stepIndex(step: GuideStep) {
  return GUIDE_STEPS.indexOf(step);
}

export function reachStep(current: GuideState, next: GuideStep): GuideState {
  if (current.status !== "active") return current;
  if (stepIndex(next) < stepIndex(current.step)) return current;
  return { status: "active", step: next };
}

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

export const GUIDE_COPY: Record<GuideStep, { index: number; title: string; body: string; action: string }> = {
  welcome: {
    index: 0,
    title: "Bem-vinda ao MM Study",
    body: "Eu vou te acompanhar nos estudos. Você não precisa descobrir como tudo funciona sozinha.",
    action: "Vamos começar",
  },
  journey: {
    index: 1,
    title: "É aqui que você começa",
    body: "Você não precisa escolher o que estudar. O MM Study libera a próxima etapa conforme você avança. Toque o capítulo aberto.",
    action: "Abrir o capítulo aberto",
  },
  chapter: {
    index: 2,
    title: "Cada capítulo é uma etapa",
    body: "Leia o objetivo. Depois toque o botão para entrar na aula.",
    action: "Entrar na aula",
  },
  lesson: {
    index: 3,
    title: "Uma parte de cada vez",
    body: "Aqui você aprende um pedaço. Quando terminar, use o botão de baixo.",
    action: "Usar o botão de baixo",
  },
  challenge: {
    index: 4,
    title: "Agora é a sua vez",
    body: "Escolha uma resposta e confira. Se não for essa, a gente olha de novo.",
    action: "Escolher e conferir",
  },
  teachback: {
    index: 5,
    title: "Explique com as suas palavras",
    body: "Não precisa escrever bonito. Quero ver se você entendeu.",
    action: "Escrever e conferir",
  },
  boss: {
    index: 6,
    title: "O desafio final fecha o capítulo",
    body: "Uma pergunta de cada vez. Quando terminar, o capítulo conclui.",
    action: "Responder o desafio final",
  },
  reward: {
    index: 7,
    title: "Capítulo concluído",
    body: "Sua jornada avançou. O próximo capítulo já pode abrir.",
    action: "Começar minha jornada",
  },
};

export const JOURNEY_PATH = [
  "Você está aqui",
  "Capítulo",
  "Aula",
  "Pergunta",
  "Ensine de volta",
  "Desafio final",
  "Vitória",
] as const;

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

export const GUIDE_STEP_COUNT = GUIDE_STEPS.length;

export function previousGuideStep(step: GuideStep): GuideStep | null {
  const index = stepIndex(step);
  return index > 0 ? GUIDE_STEPS[index - 1] : null;
}

export function nextGuideStep(step: GuideStep): GuideStep | null {
  const index = stepIndex(step);
  return index >= 0 && index < GUIDE_STEPS.length - 1 ? GUIDE_STEPS[index + 1] : null;
}

export function reachStep(current: GuideState, next: GuideStep): GuideState {
  if (current.status !== "active") return current;
  if (stepIndex(next) < stepIndex(current.step)) return current;
  return { status: "active", step: next };
}

export function guideStepFromPath(pathname: string): GuideStep {
  if (pathname.startsWith("/aula")) return "lesson";
  if (pathname.startsWith("/capitulo")) return "chapter";
  if (pathname.startsWith("/mapa")) return "journey";
  if (pathname === "/" || pathname.startsWith("/castelo")) return "welcome";
  return "welcome";
}

import type { ClinicalApplicationType, FigureBlock, LessonBody, SourcedBlock } from "@/domain/epistemic";
import type { SourceRef } from "@/domain/source";
import { FULL_LESSON_FLOW, type BossLevel } from "@/domain/mold";
import type { Lesson, MicroChallenge, ChapterBoss, TeachBack } from "@/domain/pedagogy";
import { XP_RULES, type XpRule } from "@/config/xp-rules";
import { STEP_XP } from "@/engine/lesson-flow";
import { MASTERY_RECENCY_IMPLEMENTED } from "@/engine/mastery";

export type MoldViolation = {
  rule: string;
  message: string;
};

export const OBREIRO_RULES = {
  sourceRefCanonical: "source_ref = { file, slide, section?, asset_id?, unsourced? }",
  epistemicTags: "fato-da-fonte | transformacao-pedagogica | inferencia | interpretacao-da-fonte | conhecimento-externo | lacuna",
  interpretationIsNotFact: "interpretacao-da-fonte, inferencia e conhecimento-externo nunca entram como fato-da-fonte",
  figureNeedsOrigin: "figura precisa de source_ref; extrair asset não interpreta a imagem",
  clinicalTypes: "clinicalType: relevance | conduct; senão lacuna",
  microchallengeTaughtOnly: "microdesafio só avalia conteúdo já ensinado no recorte da aula",
  distractorsInScope: "distrator não depende de slide fora do recorte ensinado",
  bossLevels: "boss, quando o conteúdo permitir: reconhecimento + diferenciação + raciocínio",
  teachBackShape: "prompt + expectedAnswer + keyIdeas + rubric + conceptIds + sourceRefs",
  masterySeparateFromXp: "mastery ≠ XP",
  xpCentralized: "XP só em XP_RULES",
  lacunaIsValid: "lacuna é estado válido e nunca se preenche com conhecimento externo",
  moldIsFixed: "PEDAGOGY_PIPELINE é o molde; não reinventar por capítulo",
} as const;

function isCanonicalSourceRef(ref: SourceRef): boolean {
  if (ref.unsourced) return ref.slide === 0;
  return typeof ref.file === "string" && ref.file.length > 0 && Number.isInteger(ref.slide) && ref.slide >= 1;
}

function taughtSlides(lesson: Lesson, body: LessonBody): Set<number> {
  const slides = new Set<number>();
  for (const ref of lesson.sourceRefs) {
    if (!ref.unsourced && ref.slide >= 1) slides.add(ref.slide);
  }
  for (const block of collectBlocks(body)) {
    if (block.kind !== "fato-da-fonte") continue;
    for (const ref of block.sourceRefs) {
      if (!ref.unsourced && ref.slide >= 1) slides.add(ref.slide);
    }
  }
  return slides;
}

function collectBlocks(body: LessonBody): SourcedBlock[] {
  return [
    ...body.objective,
    ...body.what,
    ...body.whyExists,
    ...body.how,
    ...body.analogy,
    ...body.whyMatters,
    ...body.application,
  ];
}

function refsOutOfScope(refs: SourceRef[], taught: Set<number>): SourceRef[] {
  return refs.filter((ref) => !ref.unsourced && ref.slide >= 1 && !taught.has(ref.slide));
}

function figureViolations(figure: FigureBlock): MoldViolation[] {
  const issues: MoldViolation[] = [];
  if (figure.sourceRefs.length === 0) {
    issues.push({ rule: "figureNeedsOrigin", message: "Figura sem source_ref." });
  }
  if (figure.kind === "fato-da-fonte") {
    if (!figure.asset_id) {
      issues.push({
        rule: "figureNeedsOrigin",
        message: "Fato visual exige asset_id. Extração não interpreta a imagem.",
      });
    }
    if (!figure.captionFromSource) {
      issues.push({
        rule: "figureNeedsOrigin",
        message: "Fato visual exige legenda da fonte. O campo observe não substitui a legenda.",
      });
    }
  }
  return issues;
}

function applicationViolations(blocks: SourcedBlock[]): MoldViolation[] {
  return blocks.flatMap((block) => {
    if (block.kind === "lacuna") return [];
    const type = block.clinicalType as ClinicalApplicationType | undefined;
    if (type === "relevance" || type === "conduct") return [];
    return [
      {
        rule: "clinicalTypes",
        message: `Bloco clínico ${block.id} precisa de clinicalType relevance|conduct ou kind lacuna.`,
      },
    ];
  });
}

function factViolations(blocks: SourcedBlock[]): MoldViolation[] {
  const issues: MoldViolation[] = [];
  for (const block of blocks) {
    if (block.kind === "fato-da-fonte") {
      if (block.sourceRefs.length === 0 || block.sourceRefs.some((ref) => ref.unsourced)) {
        issues.push({
          rule: "interpretationIsNotFact",
          message: `fato-da-fonte ${block.id} sem source_ref rastreável.`,
        });
      }
    }
  }
  return issues;
}

function teachBackViolations(teachBack: TeachBack): MoldViolation[] {
  const missing: string[] = [];
  if (!teachBack.prompt.trim()) missing.push("prompt");
  if (!teachBack.expectedAnswer.trim()) missing.push("expectedAnswer");
  if (teachBack.keyIdeas.length === 0) missing.push("keyIdeas");
  if (teachBack.rubric.length === 0) missing.push("rubric");
  if (teachBack.conceptIds.length === 0) missing.push("conceptId");
  if (teachBack.sourceRefs.length === 0) missing.push("sourceRefs");
  if (missing.length === 0) return [];
  return [{ rule: "teachBackShape", message: `Teach-back incompleto: ${missing.join(", ")}.` }];
}

function bossLevelViolations(boss: ChapterBoss): MoldViolation[] {
  const levels = new Set(boss.items.map((item) => item.level).filter(Boolean) as BossLevel[]);
  if (boss.items.length < 3) {
    return [{ rule: "bossLevels", message: "Boss precisa de pelo menos 3 itens quando o conteúdo permitir." }];
  }
  const hasAll =
    levels.has("recognition") && levels.has("differentiation") && levels.has("reasoning");
  if (boss.items.every((item) => item.level) && !hasAll) {
    return [
      {
        rule: "bossLevels",
        message: "Boss marcado com níveis, mas faltam reconhecimento, diferenciação ou raciocínio.",
      },
    ];
  }
  return [];
}

function xpViolations(): MoldViolation[] {
  const issues: MoldViolation[] = [];
  for (const rule of Object.values(STEP_XP)) {
    if (rule && !(rule in XP_RULES)) {
      issues.push({ rule: "xpCentralized", message: `STEP_XP aponta para ${rule}, ausente de XP_RULES.` });
    }
  }
  const known: XpRule[] = Object.keys(XP_RULES) as XpRule[];
  if (known.length === 0) {
    issues.push({ rule: "xpCentralized", message: "XP_RULES vazio." });
  }
  return issues;
}

export type LessonMoldInput = {
  lesson: Lesson;
  body: LessonBody;
  challenge: MicroChallenge;
  teachBack: TeachBack;
  boss: ChapterBoss;
};

export function validateLessonMold(input: LessonMoldInput): MoldViolation[] {
  const { lesson, body, challenge, teachBack, boss } = input;
  const issues: MoldViolation[] = [];

  if (lesson.mold === "full") {
    const flow = FULL_LESSON_FLOW.join(",");
    if (flow !== "objective,what,whyExists,how,figure,analogy,whyMatters,application,mistakes,challenge,teachback,mastery,boss,reward") {
      issues.push({ rule: "moldIsFixed", message: "FULL_LESSON_FLOW divergiu do molde congelado." });
    }
  }

  for (const ref of [
    ...lesson.sourceRefs,
    ...challenge.sourceRefs,
    ...teachBack.sourceRefs,
    ...boss.sourceRefs,
  ]) {
    if (!isCanonicalSourceRef(ref)) {
      issues.push({ rule: "sourceRefCanonical", message: `source_ref inválido: ${JSON.stringify(ref)}` });
    }
  }

  issues.push(...factViolations(collectBlocks(body)));
  issues.push(...figureViolations(body.figure));
  issues.push(...applicationViolations(body.application));
  issues.push(...teachBackViolations(teachBack));
  issues.push(...bossLevelViolations(boss));
  issues.push(...xpViolations());

  if (body.lessonId !== lesson.id) {
    issues.push({ rule: "moldIsFixed", message: "LessonBody.lessonId ≠ Lesson.id." });
  }

  const taught = taughtSlides(lesson, body);
  const out = [
    ...refsOutOfScope(challenge.sourceRefs, taught),
    ...refsOutOfScope(boss.sourceRefs, taught),
    ...refsOutOfScope(teachBack.sourceRefs, taught),
  ];
  if (out.length > 0) {
    issues.push({
      rule: "microchallengeTaughtOnly",
      message: `Avaliação aponta slide fora do recorte ensinado: ${out.map((ref) => ref.slide).join(", ")}.`,
    });
  }

  if (!challenge.conceptIds.every((id) => lesson.conceptIds.includes(id))) {
    issues.push({
      rule: "microchallengeTaughtOnly",
      message: "Microdesafio cobra conceptId que a aula não ensinou.",
    });
  }

  for (const mistake of body.mistakes) {
    if (!mistake.confusion || !mistake.whyItSeemsRight || !mistake.whatReallyHappens || !mistake.howToDifferentiate) {
      issues.push({ rule: "moldIsFixed", message: `Erro comum ${mistake.id} fora do formato Confusão → parece → acontece → diferenciar.` });
    }
  }

  if (MASTERY_RECENCY_IMPLEMENTED) {
    /* recência pode entrar depois; hoje a lacuna é a regra. */
  }

  if ("mastery" in XP_RULES) {
    issues.push({ rule: "masterySeparateFromXp", message: "XP_RULES não pode conter chave mastery." });
  }

  return issues;
}

export function assertLessonMold(input: LessonMoldInput) {
  const issues = validateLessonMold(input);
  if (issues.length > 0) {
    throw new Error(issues.map((item) => `${item.rule}: ${item.message}`).join("\n"));
  }
}

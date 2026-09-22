import { lessonBody, pilotNormalized, pilotPedagogy, pilotSource } from "@/content/pilot/relogio-da-ferida";
import { body02, CICATRIZACAO_02, normalized02, pedagogy02, source02 } from "@/content/pilot/campo-inflamatorio";
import { body03, CICATRIZACAO_03, normalized03, pedagogy03, source03 } from "@/content/pilot/construir-esculpir";
import { body04, CICATRIZACAO_04, normalized04, pedagogy04, source04 } from "@/content/pilot/duas-intencoes";
import { body05, normalized05, pedagogy05, QUELOIDE_01, source05 } from "@/content/pilot/quando-o-reparo-falha";
import { body06, normalized06, pedagogy06, QUELOIDE_02, source06 } from "@/content/pilot/cicatriz-que-transborda";
import type { CalendarEvent } from "@/domain/experience";
import type { LessonBody } from "@/domain/epistemic";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import type { SourceCatalog } from "@/domain/source";

export const upcomingChapters = [
  { id: "queloide-03", title: "A cicatriz que cabe — e o diagnóstico diferencial" },
  { id: "queloide-04", title: "Tratar sem punir a pele" },
] as const;

const source: SourceCatalog = {
  documents: [...pilotSource.documents, ...source05.documents],
  slides: [
    ...pilotSource.slides,
    ...source02.slides,
    ...source03.slides,
    ...source04.slides,
    ...source05.slides,
    ...source06.slides,
  ],
  assets: [
    ...pilotSource.assets,
    ...source02.assets,
    ...source03.assets,
    ...source04.assets,
    ...source05.assets,
    ...source06.assets,
  ],
};

const pedagogy: PedagogyCatalog = {
  subjects: [
    {
      ...pilotPedagogy.subjects[0],
      moduleIds: [...pilotPedagogy.subjects[0].moduleIds, "module-queloide"],
    },
  ],
  modules: [
    {
      ...pilotPedagogy.modules[0],
      chapterIds: [
        ...pilotPedagogy.modules[0].chapterIds,
        CICATRIZACAO_02,
        CICATRIZACAO_03,
        CICATRIZACAO_04,
      ],
      sourceRefs: [
        ...pilotPedagogy.modules[0].sourceRefs,
        ...pedagogy02.chapters[0].sourceRefs,
        ...pedagogy03.chapters[0].sourceRefs,
        ...pedagogy04.chapters[0].sourceRefs,
      ],
    },
    {
      ...pedagogy05.modules[0],
      chapterIds: [QUELOIDE_01, QUELOIDE_02],
      sourceRefs: [...pedagogy05.modules[0].sourceRefs, ...pedagogy06.chapters[0].sourceRefs],
    },
  ],
  chapters: [
    ...pilotPedagogy.chapters,
    ...pedagogy02.chapters,
    ...pedagogy03.chapters,
    ...pedagogy04.chapters,
    ...pedagogy05.chapters,
    ...pedagogy06.chapters,
  ],
  lessons: [
    ...pilotPedagogy.lessons,
    ...pedagogy02.lessons,
    ...pedagogy03.lessons,
    ...pedagogy04.lessons,
    ...pedagogy05.lessons,
    ...pedagogy06.lessons,
  ],
  missions: [
    ...pilotPedagogy.missions,
    ...pedagogy02.missions,
    ...pedagogy03.missions,
    ...pedagogy04.missions,
    ...pedagogy05.missions,
    ...pedagogy06.missions,
  ],
  analogies: [],
  clinicalApplications: [],
  commonMistakes: [],
  challenges: [
    ...pilotPedagogy.challenges,
    ...pedagogy02.challenges,
    ...pedagogy03.challenges,
    ...pedagogy04.challenges,
    ...pedagogy05.challenges,
    ...pedagogy06.challenges,
  ],
  teachBacks: [
    ...pilotPedagogy.teachBacks,
    ...pedagogy02.teachBacks,
    ...pedagogy03.teachBacks,
    ...pedagogy04.teachBacks,
    ...pedagogy05.teachBacks,
    ...pedagogy06.teachBacks,
  ],
  bosses: [
    ...pilotPedagogy.bosses,
    ...pedagogy02.bosses,
    ...pedagogy03.bosses,
    ...pedagogy04.bosses,
    ...pedagogy05.bosses,
    ...pedagogy06.bosses,
  ],
  reviews: [],
  assessments: [],
};

export const catalog = {
  source,
  normalized: {
    topics: [
      ...pilotNormalized.topics,
      ...normalized02.topics,
      ...normalized03.topics,
      ...normalized04.topics,
      ...normalized05.topics,
      ...normalized06.topics,
    ],
    concepts: [
      ...pilotNormalized.concepts,
      ...normalized02.concepts,
      ...normalized03.concepts,
      ...normalized04.concepts,
      ...normalized05.concepts,
      ...normalized06.concepts,
    ],
  },
  pedagogy,
  calendar: [] as CalendarEvent[],
  upcoming: upcomingChapters,
};

const bodies: LessonBody[] = [lessonBody, body02, body03, body04, body05, body06];

export function getLessonBody(lessonId: string): LessonBody | undefined {
  return bodies.find((body) => body.lessonId === lessonId);
}

export function getSubject() {
  return catalog.pedagogy.subjects[0];
}

export function getChapters() {
  return [...catalog.pedagogy.chapters].sort((a, b) => a.order - b.order);
}

export function getChapter(id: string) {
  return catalog.pedagogy.chapters.find((chapter) => chapter.id === id);
}

export function getLesson(id: string) {
  return catalog.pedagogy.lessons.find((lesson) => lesson.id === id);
}

export function getConcept(id: string) {
  return catalog.normalized.concepts.find((concept) => concept.id === id);
}

export function chapterParams() {
  return getChapters().map((chapter) => ({ id: chapter.id }));
}

export function lessonParams() {
  return catalog.pedagogy.lessons.map((lesson) => ({ id: lesson.id }));
}

export function assessmentParams() {
  return catalog.pedagogy.assessments.map((assessment) => ({ id: assessment.id }));
}

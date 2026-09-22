import type { BossLevel } from "@/domain/mold";
import type { SourceRef } from "@/domain/source";

export type PedagogyStatus = "draft" | "ready" | "published";

type PedagogyBase = {
  id: string;
  title: string;
  content: string;
  sourceRefs: SourceRef[];
  status: PedagogyStatus;
  order: number;
  conceptIds: string[];
  topicId?: string;
};

export type Lesson = PedagogyBase & {
  chapterId: string;
  /** full = molde F2/F5A; compact = fluxo mock F4. */
  mold?: "full" | "compact";
};

export type Mission = PedagogyBase & {
  chapterId: string;
};

export type Analogy = PedagogyBase;
export type ClinicalApplication = PedagogyBase;
export type CommonMistake = PedagogyBase;

export type ChallengeOption = {
  id: string;
  label: string;
};

export type MicroChallenge = PedagogyBase & {
  chapterId: string;
  prompt: string;
  options: ChallengeOption[];
  answerId: string;
};

export type TeachBackMode = "livre" | "guiado" | "rapido";

export type TeachBack = PedagogyBase & {
  chapterId: string;
  prompt: string;
  mode: TeachBackMode;
  expectedAnswer: string;
  rubric: { id: string; label: string; keys: string[]; required: boolean }[];
  keyIdeas: string[];
};

export type BossItem = {
  id: string;
  prompt: string;
  options: ChallengeOption[];
  answerId: string;
  /** Quando o conteúdo permitir: reconhecimento, diferenciação, raciocínio. */
  level?: BossLevel;
};

export type ChapterBoss = PedagogyBase & {
  chapterId: string;
  items: BossItem[];
};

export type Review = PedagogyBase & {
  chapterIds: string[];
};

export type Assessment = PedagogyBase & {
  chapterIds: string[];
};

export type Chapter = {
  id: string;
  moduleId: string;
  title: string;
  conceptIds: string[];
  lessonId: string;
  missionId: string;
  challengeId: string;
  teachBackId: string;
  bossId: string;
  sourceRefs: SourceRef[];
  order: number;
};

export type Module = {
  id: string;
  subjectId: string;
  title: string;
  chapterIds: string[];
  sourceRefs: SourceRef[];
  order: number;
};

export type Subject = {
  id: string;
  title: string;
  moduleIds: string[];
};

export type PedagogyCatalog = {
  subjects: Subject[];
  modules: Module[];
  chapters: Chapter[];
  lessons: Lesson[];
  missions: Mission[];
  analogies: Analogy[];
  clinicalApplications: ClinicalApplication[];
  commonMistakes: CommonMistake[];
  challenges: MicroChallenge[];
  teachBacks: TeachBack[];
  bosses: ChapterBoss[];
  reviews: Review[];
  assessments: Assessment[];
};

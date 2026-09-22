import type { SourceRef } from "@/domain/source";

export type EpistemicKind =
  | "fato-da-fonte"
  | "transformacao-pedagogica"
  | "inferencia"
  | "interpretacao-da-fonte"
  | "conhecimento-externo"
  | "lacuna";

/** Quando a fonte não traz protocolo, o bloco clínica ainda pode existir como relevância. */
export type ClinicalApplicationType = "relevance" | "conduct";

export type SourcedBlock = {
  id: string;
  kind: EpistemicKind;
  text: string;
  sourceRefs: SourceRef[];
  lacuna?: string;
  clinicalType?: ClinicalApplicationType;
};

export type FigureBlock = {
  id: string;
  asset_id?: string;
  uri?: string;
  captionFromSource?: string;
  observe: string;
  demonstratesConceptId: string;
  hotspots?: { id: string; label: string; note: string }[];
  kind: EpistemicKind;
  sourceRefs: SourceRef[];
  lacuna?: string;
};

export type CommonMistakeBlock = {
  id: string;
  confusion: string;
  whyItSeemsRight: string;
  whatReallyHappens: string;
  howToDifferentiate: string;
  kind: EpistemicKind;
  sourceRefs: SourceRef[];
};

export type TeachBackRubricItem = {
  id: string;
  label: string;
  keys: string[];
  required: boolean;
};

export type LessonBody = {
  lessonId: string;
  objective: SourcedBlock[];
  what: SourcedBlock[];
  whyExists: SourcedBlock[];
  how: SourcedBlock[];
  figure: FigureBlock;
  analogy: SourcedBlock[];
  whyMatters: SourcedBlock[];
  application: SourcedBlock[];
  mistakes: CommonMistakeBlock[];
};

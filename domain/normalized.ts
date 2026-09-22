import type { SourceRef } from "@/domain/source";

export type ConceptImportance = "core" | "support" | "optional";

export type Concept = {
  id: string;
  title: string;
  description: string;
  sourceRefs: SourceRef[];
  relatedConcepts: string[];
  importance: ConceptImportance;
  tags: string[];
};

export type Topic = {
  id: string;
  title: string;
  concepts: string[];
  sourceRefs: SourceRef[];
};

export type NormalizedCatalog = {
  topics: Topic[];
  concepts: Concept[];
};

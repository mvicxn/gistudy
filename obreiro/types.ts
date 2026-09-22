import type { NormalizedCatalog } from "@/domain/normalized";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import type { LessonBody } from "@/domain/epistemic";
import type { SourceCatalog } from "@/domain/source";

export type SourceBundle = {
  files: { filename: string; bytes?: Uint8Array }[];
};

export type PublishResult = {
  subjectId: string;
  publishedAt: string;
};

export type PedagogyBuild = {
  catalog: PedagogyCatalog;
  lessonBodies: LessonBody[];
};

export type Importer = {
  import(input: SourceBundle): Promise<SourceCatalog>;
};

export type Normalizer = {
  normalize(source: SourceCatalog): Promise<NormalizedCatalog>;
};

export type PedagogyBuilder = {
  build(normalized: NormalizedCatalog): Promise<PedagogyBuild>;
};

export type Publisher = {
  publish(build: PedagogyBuild): Promise<PublishResult>;
};

export type ObreiroPipeline = {
  importer: Importer;
  normalizer: Normalizer;
  pedagogyBuilder: PedagogyBuilder;
  publisher: Publisher;
};

export function notImplementedBackstage(name: string) {
  return async () => {
    throw new Error(`${name} pertence ao backstage. O molde está congelado; o processamento de arquivo não entra nesta fase.`);
  };
}

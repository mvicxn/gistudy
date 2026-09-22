export type SourceDocumentType = "notes" | "slides" | "asset-pack";

/** Contrato único F2+F4. Não criar terceira estrutura. */
export type SourceRef = {
  file: string;
  slide: number;
  section?: string;
  asset_id?: string;
  unsourced?: boolean;
};

export function cite(
  file: string,
  slide: number,
  section?: string,
  asset_id?: string,
): SourceRef {
  const ref: SourceRef = { file, slide };
  if (section) ref.section = section;
  if (asset_id) ref.asset_id = asset_id;
  return ref;
}

export function unsourced(): SourceRef {
  return { file: "", slide: 0, unsourced: true };
}

export function formatCite(ref: SourceRef): string {
  if (ref.unsourced) return "não rastreado à fonte";
  const section = ref.section ? ` · ${ref.section}` : "";
  const asset = ref.asset_id ? ` · ${ref.asset_id}` : "";
  return `${ref.file} · slide ${ref.slide}${section}${asset}`;
}

export type SourceDocument = {
  id: string;
  filename: string;
  type: SourceDocumentType;
  title: string;
  metadata: Record<string, string>;
};

export type SourceSlide = {
  id: string;
  documentId: string;
  slideNumber: number;
  title: string;
  text: string;
  assets: string[];
  notes?: string;
};

export type SourceAsset = {
  id: string;
  documentId: string;
  slideNumber?: number;
  type: "image" | "diagram" | "other";
  uri: string;
  metadata: Record<string, string>;
};

export type SourceCatalog = {
  documents: SourceDocument[];
  slides: SourceSlide[];
  assets: SourceAsset[];
};

export const CICATRIZACAO_FILE = "cicatrização..[1][1].ppt";
export const QUELOIDE_FILE = "Cicatrização Quelóide e Hipertrófica apresentação definitiva.ppt";

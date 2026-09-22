import { Card } from "@/components/ds/Card";
import { Text } from "@/components/ds/Text";
import type { CommonMistakeBlock, EpistemicKind, SourcedBlock } from "@/domain/epistemic";
import { formatCite, type SourceRef } from "@/domain/source";

const KIND_LABEL: Record<EpistemicKind, string> = {
  "fato-da-fonte": "Fato da fonte",
  "transformacao-pedagogica": "Transformação pedagógica",
  inferencia: "Inferência",
  "interpretacao-da-fonte": "Interpretação da fonte",
  "conhecimento-externo": "Conhecimento externo",
  lacuna: "Lacuna",
};

const CLINICAL_LABEL = {
  relevance: "Relevância para a fisioterapia",
  conduct: "Conduta sustentada pela fonte",
} as const;

export function CiteList({ refs }: { refs: SourceRef[] }) {
  return (
    <p className="mt-2 text-[12px] leading-5 text-[var(--text-muted)]">
      {refs.map((ref) => formatCite(ref)).join(" · ")}
    </p>
  );
}

export function KindBadge({ kind }: { kind: EpistemicKind }) {
  return (
    <Text variant="label" className={kind === "lacuna" ? "text-[var(--pink)]" : undefined}>
      {KIND_LABEL[kind]}
    </Text>
  );
}

export function SourcedCard({ block }: { block: SourcedBlock }) {
  return (
    <Card variant={block.kind === "lacuna" ? "locked" : "elevated"} className="space-y-2">
      <KindBadge kind={block.kind} />
      {block.clinicalType ? (
        <Text variant="label">{CLINICAL_LABEL[block.clinicalType]}</Text>
      ) : null}
      <Text variant="body" className="text-[var(--text-primary)]">
        {block.text}
      </Text>
      {block.lacuna ? (
        <Text variant="bodySmall" className="text-[var(--pink)]">
          {block.lacuna}
        </Text>
      ) : null}
      <CiteList refs={block.sourceRefs} />
    </Card>
  );
}

export function MistakeCard({ block }: { block: CommonMistakeBlock }) {
  return (
    <Card variant="elevated" className="space-y-3">
      <KindBadge kind={block.kind} />
      <div>
        <Text variant="label">Confusão</Text>
        <Text variant="body" className="mt-1 text-[var(--text-primary)]">
          {block.confusion}
        </Text>
      </div>
      <div>
        <Text variant="label">Por que parece correto</Text>
        <Text variant="body" className="mt-1">
          {block.whyItSeemsRight}
        </Text>
      </div>
      <div>
        <Text variant="label">O que realmente acontece</Text>
        <Text variant="body" className="mt-1 text-[var(--text-primary)]">
          {block.whatReallyHappens}
        </Text>
      </div>
      <div>
        <Text variant="label">Como diferenciar</Text>
        <Text variant="body" className="mt-1">
          {block.howToDifferentiate}
        </Text>
      </div>
      <CiteList refs={block.sourceRefs} />
    </Card>
  );
}

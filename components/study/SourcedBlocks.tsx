import { Card } from "@/components/ds/Card";
import { Text } from "@/components/ds/Text";
import type { CommonMistakeBlock, SourcedBlock } from "@/domain/epistemic";

const CLINICAL_LABEL = {
  relevance: "Por que isso importa na fisioterapia",
  conduct: "O que a aula sustenta na prática",
} as const;

export function SourcedCard({ block }: { block: SourcedBlock }) {
  return (
    <Card variant={block.kind === "lacuna" ? "locked" : "elevated"} className="space-y-3 p-6">
      <Text variant="bodyLarge" className="text-[var(--text-primary)]">
        {block.text}
      </Text>
      {block.clinicalType || block.lacuna ? (
        <details className="border-t border-[var(--border)] pt-3">
          <summary className="cursor-pointer text-[13px] font-semibold text-[var(--lilac)]">
            Detalhes e rastreabilidade
          </summary>
          <div className="mt-3 space-y-2">
            {block.clinicalType ? <Text variant="label">{CLINICAL_LABEL[block.clinicalType]}</Text> : null}
            {block.lacuna ? <Text variant="body" className="text-[var(--pink)]">{block.lacuna}</Text> : null}
          </div>
        </details>
      ) : null}
    </Card>
  );
}

export function MistakeCard({ block }: { block: CommonMistakeBlock }) {
  return (
    <Card variant="elevated" className="space-y-5 p-6">
      <div>
        <Text variant="label">Confusão comum</Text>
        <Text variant="bodyLarge" className="mt-2 text-[var(--text-primary)]">
          {block.confusion}
        </Text>
      </div>
      <div>
        <Text variant="label">Por que parece correto</Text>
        <Text variant="bodyLarge" className="mt-2">
          {block.whyItSeemsRight}
        </Text>
      </div>
      <div>
        <Text variant="label">O que realmente acontece</Text>
        <Text variant="bodyLarge" className="mt-2 text-[var(--text-primary)]">
          {block.whatReallyHappens}
        </Text>
      </div>
      <div>
        <Text variant="label">Como diferenciar</Text>
        <Text variant="bodyLarge" className="mt-2">
          {block.howToDifferentiate}
        </Text>
      </div>
    </Card>
  );
}

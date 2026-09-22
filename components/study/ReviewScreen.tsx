"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Professor } from "@/components/ds/Professor";
import { Feedback } from "@/components/ds/Feedback";
import { EmptyState } from "@/components/ds/States";
import { useStudyView } from "@/components/study/StudyProvider";

export function ReviewScreen() {
  const { catalog, snapshot, dispatch } = useStudyView();
  const review = catalog.pedagogy.reviews[0];

  if (!review) {
    return (
      <AppShell trail={[{ href: "/mapa", label: "Mapa" }, { label: "Revisão" }]}>
        <BackLink href="/mapa">Voltar ao mapa</BackLink>
        <EmptyState kicker="Revisão" title="Ainda não há revisão neste recorte">
          O capítulo piloto não abre revisão de módulo. Isso entra depois, se a fonte sustentar.
        </EmptyState>
      </AppShell>
    );
  }

  const done = snapshot.completedReviewIds.includes(review.id);

  return (
    <AppShell
      trail={[
        { href: "/mapa", label: "Mapa" },
        { label: "Revisão" },
      ]}
    >
      <BackLink href="/mapa">Voltar ao mapa</BackLink>
      <PageIntro kicker="Revisão" title={review.title} />
      <Professor tone="explanation">{review.content}</Professor>
      <div className="mt-5 space-y-3">
        {review.conceptIds.map((id) => {
          const concept = catalog.normalized.concepts.find((item) => item.id === id);
          return (
            <Card key={id} variant="solid">
              <p className="font-[family-name:var(--font-display)] text-[length:var(--type-h3)]">
                {concept?.title}
              </p>
              <p className="mt-1 text-[14px] text-[var(--text-secondary)]">{concept?.description}</p>
            </Card>
          );
        })}
      </div>
      {done ? (
        <div className="mt-6">
          <Feedback kind="success">Revisão registrada. Mastery pode ser recalculado.</Feedback>
        </div>
      ) : (
        <div className="mt-6">
          <Button variant="cta" onClick={() => dispatch({ type: "COMPLETE_REVIEW", reviewId: review.id })}>
            Concluir revisão
          </Button>
        </div>
      )}
    </AppShell>
  );
}

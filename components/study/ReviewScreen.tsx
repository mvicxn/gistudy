"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Professor } from "@/components/ds/Professor";
import { Feedback } from "@/components/ds/Feedback";
import { EmptyState } from "@/components/ds/States";
import { Text } from "@/components/ds/Text";
import { useStudyView } from "@/components/study/StudyProvider";

export function ReviewScreen() {
  const { catalog, snapshot, dispatch } = useStudyView();
  const review = catalog.pedagogy.reviews[0];

  if (!review) {
    return (
      <AppShell trail={[{ href: "/mapa", label: "Estudo" }, { label: "Revisão" }]}>
        <BackLink href="/mapa">Voltar aos capítulos</BackLink>
        <EmptyState kicker="Revisão" title="Ainda não há uma revisão nesta jornada">
          Continue pelos capítulos. A revisão aparece aqui quando estiver pronta.
        </EmptyState>
      </AppShell>
    );
  }

  const done = snapshot.completedReviewIds.includes(review.id);

  return (
    <AppShell trail={[{ href: "/mapa", label: "Estudo" }, { label: "Revisão" }]}>
      <BackLink href="/mapa">Voltar aos capítulos</BackLink>
      <PageIntro kicker="Revisão" title={review.title} />
      <Professor tone="explanation">{review.content}</Professor>
      <div className="mt-6 space-y-4">
        {review.conceptIds.map((id) => {
          const concept = catalog.normalized.concepts.find((item) => item.id === id);
          return (
            <Card key={id} variant="solid" className="p-6">
              <Text as="h3" variant="h3">
                {concept?.title}
              </Text>
              <Text variant="body" className="mt-2">
                {concept?.description}
              </Text>
            </Card>
          );
        })}
      </div>
      {done ? (
        <div className="mt-8">
          <Feedback kind="success">Revisão concluída.</Feedback>
        </div>
      ) : (
        <div className="mt-8">
          <Button variant="cta" onClick={() => dispatch({ type: "COMPLETE_REVIEW", reviewId: review.id })}>
            Concluir revisão
          </Button>
        </div>
      )}
    </AppShell>
  );
}

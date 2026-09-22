"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Professor } from "@/components/ds/Professor";
import { Feedback } from "@/components/ds/Feedback";
import { LockedState } from "@/components/ds/States";
import { useStudyView } from "@/components/study/StudyProvider";

export function ExamScreen({ assessmentId }: { assessmentId: string }) {
  const { catalog, snapshot, dispatch, mode } = useStudyView();
  const assessment = catalog.pedagogy.assessments.find((item) => item.id === assessmentId);
  if (!assessment) {
    return (
      <AppShell>
        <LockedState title="Essa prova não existe neste mock" />
      </AppShell>
    );
  }
  const done = snapshot.completedAssessmentIds.includes(assessment.id);

  return (
    <AppShell
      trail={[
        { href: "/calendario", label: "Calendário" },
        { label: assessment.title },
      ]}
    >
      <BackLink href="/calendario">Voltar ao calendário</BackLink>
      <PageIntro kicker="Prova" title={assessment.title} />
      <Professor tone="introduction">
        {assessment.content} Modo atual: {mode.mode}.
      </Professor>
      {done ? (
        <div className="mt-6">
          <Feedback kind="achievement">Prova mock concluída. Sem nota acadêmica.</Feedback>
          <div className="mt-4">
            <Button href="/jardim" variant="cta">
              Ver o jardim
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <Button
            variant="cta"
            onClick={() => dispatch({ type: "COMPLETE_EXAM", assessmentId: assessment.id })}
          >
            Encerrar a cerimônia
          </Button>
        </div>
      )}
    </AppShell>
  );
}

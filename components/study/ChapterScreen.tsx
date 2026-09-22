"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Professor } from "@/components/ds/Professor";
import { LockedState } from "@/components/ds/States";
import { useStudyView } from "@/components/study/StudyProvider";

export function ChapterScreen({ chapterId }: { chapterId: string }) {
  const { catalog, states, snapshot } = useStudyView();
  const chapter = catalog.pedagogy.chapters.find((item) => item.id === chapterId);
  const mission = catalog.pedagogy.missions.find((item) => item.id === chapter?.missionId);
  const state = chapter ? states[chapter.id] : "LOCKED";

  if (!chapter || !mission) {
    return (
      <AppShell>
        <LockedState title="Esse capítulo ainda não existe neste recorte" />
      </AppShell>
    );
  }

  const progress = snapshot.chapters[chapter.id];
  const href = `/aula/${chapter.lessonId}`;

  return (
    <AppShell
      trail={[
        { href: "/biblioteca", label: "Biblioteca" },
        { href: "/mapa", label: "Mapa" },
        { label: chapter.title },
      ]}
    >
      <BackLink href="/mapa">Voltar ao mapa</BackLink>
      <PageIntro kicker="Capítulo" title={chapter.title} />
      {state === "LOCKED" ? (
        <LockedState />
      ) : (
        <>
          <Professor tone="introduction">{mission.content}</Professor>
          <Card variant="elevated" className="mt-5">
            <p className="text-[13px] text-[var(--text-muted)]">Missão</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--type-h2)]">
              {mission.title}
            </h2>
            <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
              Missão → Objetivo → O que é → Por que existe → Como funciona → Figura → Analogia → Por que
              importa → Aplicação → Erros → Microdesafio → Ensine de volta → Domínio → Boss → Recompensa.
            </p>
            <div className="mt-5">
              <Button href={href} variant="cta">
                {progress?.state === "IN_PROGRESS" ? "Continuar a aula" : "Começar a aula"}
              </Button>
            </div>
          </Card>
        </>
      )}
    </AppShell>
  );
}

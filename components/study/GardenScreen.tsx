"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { FlowerSlot } from "@/components/ds/World";
import { Professor } from "@/components/ds/Professor";
import { EmptyState, emptyCopy } from "@/components/ds/States";
import { GemBadge } from "@/components/ds/Progress";
import { useStudyView } from "@/components/study/StudyProvider";
import { flowerForChapter } from "@/engine/garden";

export function GardenScreen() {
  const { catalog, snapshot } = useStudyView();
  const bloomed = snapshot.flowers.filter((flower) => flower.state === "bloomed");

  return (
    <AppShell trail={[{ href: "/castelo", label: "Castelo" }, { label: "Jardim" }]}>
      <PageIntro kicker="Jardim da Vitória" title={bloomed.length ? "O canteiro responde" : "Terra nua"} />
      <Professor tone="introduction">
        Flores nascem de capítulos concluídos. XP não planta; domínio tampouco é flor.
      </Professor>
      {bloomed.length === 0 ? (
        <div className="mt-6">
          <EmptyState {...emptyCopy.jardim}>{emptyCopy.jardim.body}</EmptyState>
        </div>
      ) : (
        <div className="mt-6">
          <GemBadge>{`${snapshot.gems.length} gemas`}</GemBadge>
        </div>
      )}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {catalog.pedagogy.chapters.map((chapter) => {
          const flower = flowerForChapter(snapshot, chapter.id);
          return <FlowerSlot key={chapter.id} state={flower.state} label={chapter.title} />;
        })}
      </div>
      <div className="mt-8">
        <Button href="/mapa" variant="cta">
          Continuar a plantar
        </Button>
      </div>
    </AppShell>
  );
}

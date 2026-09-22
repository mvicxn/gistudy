"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { FlowerSlot } from "@/components/ds/World";
import { EmptyState, emptyCopy } from "@/components/ds/States";
import { Text } from "@/components/ds/Text";
import { useStudyView } from "@/components/study/StudyProvider";
import { getChapters } from "@/content/catalog";

export function GardenScreen() {
  const { snapshot } = useStudyView();
  const chapters = getChapters();
  const bloomed = snapshot.flowers.filter((flower) => flower.state === "bloomed").length;

  if (!chapters.length) {
    return (
      <AppShell trail={[{ label: "Jardim" }]}>
        <EmptyState
          kicker={emptyCopy.jardim.kicker}
          title={emptyCopy.jardim.title}
          action={{ href: "/mapa", label: "Ir para a jornada" }}
        >
          {emptyCopy.jardim.body}
        </EmptyState>
      </AppShell>
    );
  }

  return (
    <AppShell trail={[{ label: "Jardim" }]}>
      <PageIntro kicker="Jardim" title="O que o seu estudo fez crescer">
        Cada capítulo concluído deixa uma flor. {bloomed} de {chapters.length} já floresceram.
      </PageIntro>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {chapters.map((chapter) => {
          const flower = snapshot.flowers.find((item) => item.chapterId === chapter.id);
          return (
            <FlowerSlot
              key={chapter.id}
              state={flower?.state === "bloomed" ? "bloomed" : flower?.state === "growing" ? "growing" : "empty"}
              label={chapter.title}
            />
          );
        })}
      </div>
      {bloomed === 0 ? (
        <div className="mt-8 space-y-4 text-center">
          <Text variant="body">Quando você concluir um capítulo, uma flor nasce aqui.</Text>
          <Button href="/mapa" variant="cta">
            Ir para a jornada
          </Button>
        </div>
      ) : null}
    </AppShell>
  );
}

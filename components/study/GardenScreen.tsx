"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { FlowerSlot } from "@/components/ds/World";
import { EmptyState } from "@/components/ds/States";
import { emptyCopy } from "@/components/ds/States";
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
        <EmptyState kicker={emptyCopy.jardim.kicker} title={emptyCopy.jardim.title}>
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
        <Text variant="body" className="mt-8 text-center">
          Quando você concluir um capítulo, uma flor nasce aqui.
        </Text>
      ) : null}
    </AppShell>
  );
}

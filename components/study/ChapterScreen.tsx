"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { ProgressBar } from "@/components/ds/Progress";
import { Text } from "@/components/ds/Text";
import { LockedState } from "@/components/ds/States";
import { useStudyView } from "@/components/study/StudyProvider";
import {
  CHAPTER_STATE_LABEL,
  chapterCta,
  chapterOrdinal,
  lessonProgressPercent,
  progressCopy,
} from "@/components/study/labels";
import type { ChapterState } from "@/domain/experience";

export function ChapterScreen({ chapterId }: { chapterId: string }) {
  const { catalog, snapshot, states } = useStudyView();
  const chapter = catalog.pedagogy.chapters.find((item) => item.id === chapterId);
  const state = (chapter ? states[chapter.id] : "LOCKED") as ChapterState;
  const mission = catalog.pedagogy.missions.find((item) => item.id === chapter?.missionId);
  const lesson = catalog.pedagogy.lessons.find((item) => item.id === chapter?.lessonId);
  const step = chapter ? snapshot.chapters[chapter.id]?.currentStep ?? "objective" : "objective";
  const percent =
    state === "COMPLETED" || state === "MASTERED"
      ? 100
      : lesson
        ? lessonProgressPercent(lesson, step)
        : 0;

  if (!chapter) {
    return (
      <AppShell>
        <BackLink href="/mapa">Voltar aos capítulos</BackLink>
        <LockedState title="Este capítulo não está na jornada">
          Volte à lista e escolha um capítulo disponível.
        </LockedState>
      </AppShell>
    );
  }

  return (
    <AppShell
      trail={[
        { href: "/biblioteca", label: "Biblioteca" },
        { href: "/mapa", label: "Estudo" },
        { label: chapter.title },
      ]}
    >
      <BackLink href="/mapa">Voltar aos capítulos</BackLink>
      <PageIntro kicker={chapterOrdinal(chapter.order)} title={chapter.title}>
        {mission?.content}
      </PageIntro>
      <Text variant="caption">{CHAPTER_STATE_LABEL[state]}</Text>
      {state !== "LOCKED" ? (
        <div className="mt-4">
          <ProgressBar value={percent} label={progressCopy(percent)} tone="chapter" />
        </div>
      ) : null}
      {state === "LOCKED" ? (
        <div className="mt-6">
          <LockedState title="Ainda não deu para abrir">
            Termine o capítulo anterior para começar este.
          </LockedState>
        </div>
      ) : (
        <div className="mt-8">
          <Button href={`/aula/${chapter.lessonId}`} variant="cta">
            {chapterCta(state)}
          </Button>
        </div>
      )}
    </AppShell>
  );
}

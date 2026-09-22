"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { ProgressBar } from "@/components/ds/Progress";
import { Text } from "@/components/ds/Text";
import { LockedState } from "@/components/ds/States";
import { Coach } from "@/components/study/Coach";
import { useGuide } from "@/components/study/GuideProvider";
import { useStudyView } from "@/components/study/StudyProvider";
import {
  CHAPTER_STATE_LABEL,
  chapterCta,
  chapterOrdinal,
  lessonProgress,
  lockReason,
  previousChapterTitle,
  progressCopy,
} from "@/components/study/labels";
import { getChapters } from "@/content/catalog";
import type { ChapterState } from "@/domain/experience";
import { useEffect } from "react";

export function ChapterScreen({ chapterId }: { chapterId: string }) {
  const { catalog, snapshot, states } = useStudyView();
  const { active, reach } = useGuide();
  const chapters = getChapters();
  const chapter = catalog.pedagogy.chapters.find((item) => item.id === chapterId);
  const state = (chapter ? states[chapter.id] : "LOCKED") as ChapterState;
  const mission = catalog.pedagogy.missions.find((item) => item.id === chapter?.missionId);
  const lesson = catalog.pedagogy.lessons.find((item) => item.id === chapter?.lessonId);
  const step = chapter ? snapshot.chapters[chapter.id]?.currentStep ?? "objective" : "objective";
  const parts =
    state === "COMPLETED" || state === "MASTERED"
      ? { current: 1, total: 1, percent: 100 }
      : lessonProgress(lesson, step);

  useEffect(() => {
    if (active && state !== "LOCKED") reach("chapter");
  }, [active, state]);

  if (!chapter) {
    return (
      <AppShell>
        <BackLink href="/mapa">Voltar aos capítulos</BackLink>
        <LockedState
          title="Este capítulo não está na jornada"
          action={{ href: "/mapa", label: "Ver os capítulos" }}
        >
          Volte à lista e escolha um capítulo disponível.
        </LockedState>
      </AppShell>
    );
  }

  return (
    <AppShell
      trail={[
        { href: "/mapa", label: "Estudo" },
        { label: chapter.title },
      ]}
    >
      <BackLink href="/mapa">Voltar aos capítulos</BackLink>
      {state !== "LOCKED" ? <Coach step="chapter" /> : null}
      <PageIntro kicker={chapterOrdinal(chapter.order)} title={chapter.title}>
        {mission?.content}
      </PageIntro>
      <Text variant="caption">{CHAPTER_STATE_LABEL[state]}</Text>
      {state !== "LOCKED" ? (
        <div className="mt-4">
          <ProgressBar
            value={parts.percent}
            label={progressCopy(parts.percent, parts.current, parts.total)}
            tone="chapter"
          />
        </div>
      ) : null}
      {state === "LOCKED" ? (
        <div className="mt-6">
          <LockedState
            title="Ainda não deu para abrir"
            action={{ href: "/mapa", label: "Voltar à jornada" }}
          >
            {lockReason(previousChapterTitle(chapters, chapter.id))}
          </LockedState>
        </div>
      ) : (
        <div className="mt-8">
          <Button href={`/aula/${chapter.lessonId}`} variant="cta" onClick={() => reach("lesson")}>
            {chapterCta(state)}
          </Button>
        </div>
      )}
    </AppShell>
  );
}

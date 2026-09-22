"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { ProgressBar } from "@/components/ds/Progress";
import { Text } from "@/components/ds/Text";
import { EmptyState, emptyCopy } from "@/components/ds/States";
import { Coach } from "@/components/study/Coach";
import { HelpTip } from "@/components/study/HelpTip";
import { useGuide } from "@/components/study/GuideProvider";
import { useStudyView } from "@/components/study/StudyProvider";
import {
  CHAPTER_STATE_LABEL,
  chapterCta,
  chapterOrdinal,
  lessonProgressPercent,
  lockReason,
  previousChapterTitle,
} from "@/components/study/labels";
import { getChapters } from "@/content/catalog";
import type { ChapterState } from "@/domain/experience";
import { cn } from "@/lib/cn";
import { useEffect } from "react";

export function MapScreen() {
  const { catalog, snapshot, states } = useStudyView();
  const { active, reach } = useGuide();
  const chapters = getChapters();
  const upcoming = catalog.upcoming;

  useEffect(() => {
    if (active) reach("journey");
  }, [active]);

  if (!chapters.length) {
    return (
      <AppShell trail={[{ href: "/biblioteca", label: "Biblioteca" }, { label: "Estudo" }]}>
        <EmptyState
          kicker={emptyCopy.mapa.kicker}
          title={emptyCopy.mapa.title}
          action={{ href: "/castelo", label: "Voltar ao início" }}
        >
          {emptyCopy.mapa.body}
        </EmptyState>
      </AppShell>
    );
  }

  return (
    <AppShell trail={[{ href: "/biblioteca", label: "Biblioteca" }, { label: "Estudo" }]}>
      <Coach step="journey" />
      <PageIntro kicker={catalog.pedagogy.subjects[0]?.title ?? "Estudo"} title="Sua jornada">
        <span className="inline-flex items-center">
          Entre no capítulo aberto. Os bloqueados esperam o anterior.
          <HelpTip label="O que significa cada estado">
            Disponível: pode entrar. Em andamento: você já começou. Bloqueado: termine o anterior.
            Concluído: você fechou o desafio final. Dominado: o conteúdo ficou firme.
          </HelpTip>
        </span>
      </PageIntro>
      <div className="space-y-4">
        {catalog.pedagogy.modules.map((module) => {
          const items = chapters.filter((chapter) => module.chapterIds.includes(chapter.id));
          if (!items.length) return null;
          return (
            <section key={module.id} className="space-y-3">
              <Text variant="label">{module.title}</Text>
              {items.map((chapter) => {
                const state = (states[chapter.id] ?? "LOCKED") as ChapterState;
                const lesson = catalog.pedagogy.lessons.find((item) => item.id === chapter.lessonId);
                const step = snapshot.chapters[chapter.id]?.currentStep ?? "objective";
                const percent =
                  state === "COMPLETED" || state === "MASTERED"
                    ? 100
                    : state === "LOCKED"
                      ? 0
                      : lesson
                        ? lessonProgressPercent(lesson, step)
                        : 0;
                const locked = state === "LOCKED";
                const open = state === "AVAILABLE" || state === "IN_PROGRESS";
                return (
                  <Card
                    key={chapter.id}
                    variant={locked ? "locked" : "elevated"}
                    className={cn("space-y-4 p-5", open && active && "halo")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Text variant="caption">{chapterOrdinal(chapter.order)}</Text>
                        <Text as="h2" variant="h3" className="mt-1">
                          {chapter.title}
                        </Text>
                      </div>
                      <Text variant="caption" className="shrink-0 text-[var(--lilac)]">
                        {CHAPTER_STATE_LABEL[state]}
                      </Text>
                    </div>
                    {locked ? (
                      <Text variant="body">
                        {lockReason(previousChapterTitle(chapters, chapter.id))}
                      </Text>
                    ) : (
                      <>
                        <ProgressBar value={percent} tone="chapter" />
                        <Button
                          href={`/capitulo/${chapter.id}`}
                          variant="cta"
                          onClick={() => reach("chapter")}
                        >
                          {chapterCta(state)}
                        </Button>
                      </>
                    )}
                  </Card>
                );
              })}
            </section>
          );
        })}
        {upcoming.length ? (
          <section className="space-y-3 pt-4">
            <Text variant="label">Em breve</Text>
            {upcoming.map((item) => (
              <Card key={item.id} variant="locked">
                <Text variant="caption">Ainda não está na jornada</Text>
                <Text as="h2" variant="h3" className="mt-1">
                  {item.title}
                </Text>
                <Text variant="body" className="mt-2">
                  Este capítulo ainda não chegou. Ignore por agora.
                </Text>
              </Card>
            ))}
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}

"use client";

import { AppShell } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { ProgressBar } from "@/components/ds/Progress";
import { Text } from "@/components/ds/Text";
import { useStudyView } from "@/components/study/StudyProvider";
import {
  chapterCta,
  chapterOrdinal,
  greeting,
  lessonProgressPercent,
  modeHeadline,
  progressCopy,
} from "@/components/study/labels";
import { getChapters } from "@/content/catalog";
import type { ChapterState } from "@/domain/experience";
import Link from "next/link";

export function CasteloScreen() {
  const { catalog, snapshot, states, nextChapter, mode } = useStudyView();
  const chapters = getChapters();
  const current =
    chapters.find((chapter) => states[chapter.id] === "IN_PROGRESS") ??
    nextChapter ??
    chapters.find((chapter) => states[chapter.id] === "AVAILABLE") ??
    chapters[0];
  const currentState = (current ? states[current.id] : "LOCKED") as ChapterState;
  const subject = catalog.pedagogy.subjects[0];
  const moduleTitle =
    catalog.pedagogy.modules.find((item) => item.id === current?.moduleId)?.title ??
    subject?.title ??
    "Seu estudo";
  const lesson = catalog.pedagogy.lessons.find((item) => item.id === current?.lessonId);
  const step = current ? snapshot.chapters[current.id]?.currentStep ?? "objective" : "objective";
  const percent =
    currentState === "COMPLETED" || currentState === "MASTERED"
      ? 100
      : lesson
        ? lessonProgressPercent(lesson, step)
        : 0;
  const doneCount = chapters.filter(
    (chapter) => states[chapter.id] === "COMPLETED" || states[chapter.id] === "MASTERED",
  ).length;
  const headline = modeHeadline(mode.mode);
  const allDone = doneCount === chapters.length;
  const href = current ? `/aula/${current.lessonId}` : "/mapa";

  return (
    <AppShell>
      <Text variant="label">Início</Text>
      <Text as="h1" variant="h1" className="mt-2">
        {greeting()}, Giovana
      </Text>
      <Text variant="body" className="mt-3">
        {doneCount} de {chapters.length} capítulos concluídos.
      </Text>

      <Card variant="elevated" className="mt-8 space-y-5 p-6">
        <Text variant="label">{headline.kicker}</Text>
        <Text as="h2" variant="h2">
          {allDone ? "Você concluiu os capítulos disponíveis" : headline.title}
        </Text>
        {current && !allDone ? (
          <>
            <div>
              <Text variant="caption">{moduleTitle}</Text>
              <Text variant="bodyLarge" className="mt-1 text-[var(--text-primary)]">
                {chapterOrdinal(current.order)} — {current.title}
              </Text>
            </div>
            <ProgressBar value={percent} label={progressCopy(percent)} tone="chapter" />
            <Button href={href} variant="cta">
              {chapterCta(currentState)}
            </Button>
          </>
        ) : (
          <Button href="/jardim" variant="cta">
            Ver o jardim
          </Button>
        )}
      </Card>

      <nav className="mt-8 grid gap-3" aria-label="Outras áreas">
        <Link
          href="/mapa"
          className="flex min-h-14 items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border)] px-5"
        >
          <span>Ver todos os capítulos</span>
          <span aria-hidden className="text-[var(--lilac)]">
            →
          </span>
        </Link>
        <Link
          href="/biblioteca"
          className="flex min-h-14 items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border)] px-5"
        >
          <span>Biblioteca</span>
          <span aria-hidden className="text-[var(--lilac)]">
            →
          </span>
        </Link>
        <Link
          href="/calendario"
          className="flex min-h-14 items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border)] px-5"
        >
          <span>Calendário</span>
          <span aria-hidden className="text-[var(--lilac)]">
            →
          </span>
        </Link>
        <Link
          href="/jardim"
          className="flex min-h-14 items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border)] px-5"
        >
          <span>Jardim</span>
          <span aria-hidden className="text-[var(--lilac)]">
            →
          </span>
        </Link>
      </nav>
    </AppShell>
  );
}

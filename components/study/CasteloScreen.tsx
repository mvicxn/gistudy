"use client";

import { AppShell } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { ProgressBar } from "@/components/ds/Progress";
import { Text } from "@/components/ds/Text";
import { Coach } from "@/components/study/Coach";
import { HelpTip } from "@/components/study/HelpTip";
import { useGuide } from "@/components/study/GuideProvider";
import { useStudyView } from "@/components/study/StudyProvider";
import {
  chapterCta,
  chapterOrdinal,
  greeting,
  lessonProgress,
  modeHeadline,
  progressCopy,
} from "@/components/study/labels";
import { getChapters } from "@/content/catalog";
import type { ChapterState } from "@/domain/experience";
import Link from "next/link";

export function CasteloScreen() {
  const { catalog, snapshot, states, nextChapter, mode } = useStudyView();
  const { active, step, reach } = useGuide();
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
  const lessonStep = current ? snapshot.chapters[current.id]?.currentStep ?? "objective" : "objective";
  const parts =
    currentState === "COMPLETED" || currentState === "MASTERED"
      ? { current: 1, total: 1, percent: 100 }
      : lessonProgress(lesson, lessonStep);
  const doneCount = chapters.filter(
    (chapter) => states[chapter.id] === "COMPLETED" || states[chapter.id] === "MASTERED",
  ).length;
  const headline = modeHeadline(mode.mode);
  const allDone = doneCount === chapters.length;
  const firstVisit = active && step === "welcome";
  const href = firstVisit ? "/mapa" : current ? `/aula/${current.lessonId}` : "/mapa";

  return (
    <AppShell>
      {firstVisit ? <Coach step="welcome" /> : null}
      <Text variant="label">Início</Text>
      <Text as="h1" variant="h1" className="mt-2">
        {greeting()}, Giovana
      </Text>
      <div className="mt-3 flex items-center gap-1">
        <Text variant="body">
          {doneCount} de {chapters.length} capítulos concluídos.
        </Text>
        <HelpTip label="O que conta como concluído">
          Um capítulo só entra nessa conta quando você fecha o desafio final.
        </HelpTip>
      </div>

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
            <ProgressBar
              value={parts.percent}
              label={progressCopy(parts.percent, parts.current, parts.total)}
              tone="chapter"
            />
            <Button
              href={href}
              variant="cta"
              onClick={() => {
                if (firstVisit) reach("journey");
              }}
            >
              {firstVisit ? "Ver minha jornada" : chapterCta(currentState)}
            </Button>
          </>
        ) : (
          <Button href="/jardim" variant="cta">
            Ver o que floresceu
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
          href="/calendario"
          className="flex min-h-14 items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border)] px-5"
        >
          <span>O que estudar hoje</span>
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

"use client";

import { AppShell } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { ProgressBar } from "@/components/ds/Progress";
import { Text } from "@/components/ds/Text";
import { GuideTarget } from "@/components/study/GuideChrome";
import { useGuide } from "@/components/study/GuideProvider";
import { useStudyView } from "@/components/study/StudyProvider";
import {
  chapterCta,
  chapterOrdinal,
  greeting,
  lessonProgress,
  modeHeadline,
} from "@/components/study/labels";
import { getChapters } from "@/content/catalog";
import type { ChapterState } from "@/domain/experience";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CasteloScreen() {
  const { catalog, snapshot, states, nextChapter, mode } = useStudyView();
  const { active, step, reach } = useGuide();
  const [hello, setHello] = useState("Olá");

  useEffect(() => {
    setHello(greeting());
  }, []);
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
    "Dermatofuncional II";
  const lesson = catalog.pedagogy.lessons.find((item) => item.id === current?.lessonId);
  const lessonStep = current ? snapshot.chapters[current.id]?.currentStep ?? "objective" : "objective";
  const parts =
    currentState === "COMPLETED" || currentState === "MASTERED"
      ? { current: 1, total: 1, percent: 100 }
      : lessonProgress(lesson, lessonStep);
  const firstVisit = active && step === "welcome";
  const href = firstVisit ? "/mapa" : current ? `/aula/${current.lessonId}` : "/mapa";

  const cta = firstVisit
    ? "Vamos começar"
    : currentState === "COMPLETED" || currentState === "MASTERED"
      ? chapterCta(currentState)
      : "Continue seus estudos";

  return (
    <AppShell>
      <Text variant="label">{subject?.title ?? "Início"}</Text>
      <Text as="h1" variant="display" className="mt-3">
        {hello}, Giovana
      </Text>
      <Text variant="bodyLarge" className="mt-3">
        Continue seus estudos
      </Text>

      <GuideTarget step="welcome" className="mt-8">
        <Card variant="elevated" className="space-y-5 p-6">
          <Text variant="label">{modeHeadline(mode.mode).kicker}</Text>
          <Text as="h2" variant="h2">
            {current ? `${chapterOrdinal(current.order)} — ${current.title}` : "Sua jornada"}
          </Text>
          {current ? (
            <>
              <Text variant="body">{moduleTitle}</Text>
              <ProgressBar value={parts.percent} label={`Trecho ${parts.current} de ${parts.total}`} tone="chapter" />
              <Button
                href={href}
                variant="cta"
                onClick={() => {
                  if (firstVisit) reach("journey");
                }}
              >
                {cta}
              </Button>
            </>
          ) : (
            <Button href="/jardim" variant="cta">
              Ver o que floresceu
            </Button>
          )}
        </Card>
      </GuideTarget>

      <p className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[15px] text-[var(--text-muted)]">
        <Link href="/mapa" className="min-h-11 inline-flex items-center">
          Todos os capítulos
        </Link>
        <Link href="/calendario" className="min-h-11 inline-flex items-center">
          Calendário
        </Link>
        <Link href="/jardim" className="min-h-11 inline-flex items-center">
          Jardim
        </Link>
      </p>
    </AppShell>
  );
}

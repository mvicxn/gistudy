"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { Card } from "@/components/ds/Card";
import { EmptyState, emptyCopy } from "@/components/ds/States";
import { Text } from "@/components/ds/Text";
import { useStudyView } from "@/components/study/StudyProvider";
import { CHAPTER_STATE_LABEL, chapterOrdinal } from "@/components/study/labels";
import type { ChapterState } from "@/domain/experience";
import Link from "next/link";

export function BibliotecaScreen() {
  const { catalog, states } = useStudyView();
  const modules = catalog.pedagogy.modules;
  const chapters = catalog.pedagogy.chapters;
  const subject = catalog.pedagogy.subjects[0];

  if (!modules.length) {
    return (
      <AppShell trail={[{ label: "Biblioteca" }]}>
        <EmptyState
          kicker={emptyCopy.biblioteca.kicker}
          title={emptyCopy.biblioteca.title}
          action={{ href: "/castelo", label: "Voltar ao início" }}
        >
          {emptyCopy.biblioteca.body}
        </EmptyState>
      </AppShell>
    );
  }

  return (
    <AppShell trail={[{ label: "Biblioteca" }]}>
      <PageIntro kicker="Biblioteca" title={subject?.title ?? "Seus livros"}>
        Cada capítulo da matéria, com o estado bem visível.
      </PageIntro>
      <div className="space-y-8">
        {modules.map((module) => {
          const moduleChapters = chapters.filter((chapter) => module.chapterIds.includes(chapter.id));
          if (!moduleChapters.length) return null;
          return (
            <section key={module.id} className="space-y-4">
              <Text variant="label">{module.title}</Text>
              {moduleChapters.map((chapter) => {
                const state = (states[chapter.id] ?? "LOCKED") as ChapterState;
                const locked = state === "LOCKED";
                const card = (
                  <Card variant={locked ? "locked" : "elevated"} className="min-h-[180px] space-y-4 p-6">
                    <Text variant="caption">{chapterOrdinal(chapter.order)}</Text>
                    <Text as="h2" variant="h2">
                      {chapter.title}
                    </Text>
                    <p
                      className={`text-[28px] font-semibold leading-tight ${
                        locked ? "text-[var(--text-muted)]" : "text-[var(--lilac)]"
                      }`}
                    >
                      {CHAPTER_STATE_LABEL[state]}
                    </p>
                  </Card>
                );
                return locked ? (
                  <div key={chapter.id}>{card}</div>
                ) : (
                  <Link key={chapter.id} href={`/capitulo/${chapter.id}`} className="block">
                    {card}
                  </Link>
                );
              })}
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}

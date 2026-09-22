"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { BookCover } from "@/components/ds/World";
import { EmptyState } from "@/components/ds/States";
import { useStudyView } from "@/components/study/StudyProvider";
import { emptyCopy } from "@/components/ds/States";
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
        >
          {emptyCopy.biblioteca.body}
        </EmptyState>
      </AppShell>
    );
  }

  return (
    <AppShell trail={[{ label: "Biblioteca" }]}>
      <PageIntro kicker="Biblioteca" title={subject?.title ?? "Seus livros"}>
        Escolha a matéria e entre na jornada dos capítulos.
      </PageIntro>
      <div className="space-y-4">
        {modules.map((module) => {
          const moduleChapters = chapters.filter((chapter) => module.chapterIds.includes(chapter.id));
          const done = moduleChapters.filter(
            (chapter) => states[chapter.id] === "COMPLETED" || states[chapter.id] === "MASTERED",
          ).length;
          const locked = moduleChapters.every((chapter) => states[chapter.id] === "LOCKED");
          const percent = moduleChapters.length
            ? Math.round((done / moduleChapters.length) * 100)
            : 0;
          return (
            <Link key={module.id} href="/mapa" className="block">
              <BookCover
                title={module.title}
                locked={locked}
                subtitle={`${done} de ${moduleChapters.length} capítulos`}
                progress={percent}
              />
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}

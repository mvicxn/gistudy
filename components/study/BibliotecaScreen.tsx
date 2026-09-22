"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { BookCover } from "@/components/ds/World";
import { useStudyView } from "@/components/study/StudyProvider";
import Link from "next/link";

export function BibliotecaScreen() {
  const { catalog } = useStudyView();
  const subject = catalog.pedagogy.subjects[0];

  return (
    <AppShell trail={[{ href: "/biblioteca", label: "Biblioteca" }, { label: "Estante" }]}>
      <PageIntro kicker="Biblioteca" title="Dermatofuncional II">
        Cicatrização 01–04 e Quelóide 01–02 encadernados. Não há PPT nesta estante.
      </PageIntro>
      <div className="grid gap-4">
        <Link href="/mapa">
          <BookCover title={subject.title} />
        </Link>
        <BookCover title="Próximas aventuras" locked />
      </div>
    </AppShell>
  );
}

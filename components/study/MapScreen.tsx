"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { MapNode, MapPath, MapPin } from "@/components/ds/World";
import { Professor } from "@/components/ds/Professor";
import { LockedState } from "@/components/ds/States";
import { toMapState } from "@/components/study/map-state";
import { useStudyView } from "@/components/study/StudyProvider";

export function MapScreen() {
  const { catalog, states } = useStudyView();
  const subject = catalog.pedagogy.subjects[0];

  return (
    <AppShell
      trail={[
        { href: "/biblioteca", label: "Biblioteca" },
        { href: "/mapa", label: subject.title },
        { label: "Mapa" },
      ]}
    >
      <PageIntro kicker="Mapa" title={subject.title} />
      <Professor tone="explanation">
        Capítulos 01 a 06 estão escritos (Cicatrização 01–04, Quelóide 01–02). O frontend lê pedagogia, não o PPT. 07–14 permanecem reservados.
      </Professor>
      <div className="mt-8">
        <MapPath>
          {catalog.pedagogy.chapters.map((chapter) => {
            const state = toMapState(states[chapter.id] ?? "LOCKED");
            return (
              <MapNode
                key={chapter.id}
                title={chapter.title}
                state={state}
                href={state === "locked" ? undefined : `/capitulo/${chapter.id}`}
              />
            );
          })}
        </MapPath>
      </div>
      <div className="mt-6 space-y-3">
        {catalog.upcoming.map((item) => (
          <LockedState key={item.id} title={item.title}>
            Título reservado. Sem aula, sem IDs falsos.
          </LockedState>
        ))}
      </div>
      <div className="mt-6 space-y-1">
        <MapPin kind="concept" label="Fases da cicatrização · coagulação" />
        <MapPin kind="concept" label="Campo inflamatório · vasos" />
        <MapPin kind="concept" label="Proliferação · remodelagem" />
        <MapPin kind="concept" label="Primeira e segunda intenção" />
        <MapPin kind="concept" label="Processo inadequado · esquema rotulado" />
        <MapPin kind="concept" label="Quelóide · extravasa sem legenda" />
      </div>
    </AppShell>
  );
}

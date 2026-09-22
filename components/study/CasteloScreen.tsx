"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { FlowerSlot } from "@/components/ds/World";
import { ProgressBar, StatChip, XpChip } from "@/components/ds/Progress";
import { Professor } from "@/components/ds/Professor";
import { useStudyView } from "@/components/study/StudyProvider";
import { levelForXp, xpProgressInLevel } from "@/config/levels";
import { flowerForChapter } from "@/engine/garden";

export function CasteloScreen() {
  const { snapshot, nextChapter, mode, mastery, catalog, dispatch } = useStudyView();
  const level = levelForXp(snapshot.user.xp);
  const assessmentExists = Boolean(
    mode.targetAssessmentId &&
      catalog.pedagogy.assessments.some((item) => item.id === mode.targetAssessmentId),
  );
  const ctaHref =
    mode.mode === "EXAM_URGENCY_MODE" && assessmentExists && mode.targetAssessmentId
      ? `/prova/${mode.targetAssessmentId}`
      : nextChapter
        ? `/capitulo/${nextChapter.id}`
        : "/mapa";

  return (
    <AppShell trail={[{ href: "/", label: "Portal" }, { label: "Castelo" }]}>
      <div className="flex items-start justify-between gap-3">
        <PageIntro kicker="Castelo" title="Boa noite, Giovana" />
        <XpChip value={snapshot.user.xp} />
      </div>

      <Professor tone="introduction">
        {nextChapter
          ? `O próximo passo é ${nextChapter.title}. A máquina aponta; você não escolhe no escuro.`
          : "O capítulo piloto fechou. O jardim guarda a flor."}
      </Professor>

      <Card variant="elevated" className="mt-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--pink)]">
          Modo de progressão
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--type-h2)]">
          {mode.mode}
        </h2>
        <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
          {mode.mode === "EXAM_URGENCY_MODE"
            ? "Janela temporária lida da configuração. A data não vive no componente."
            : "Caminho normal. Sem urgência de prova."}
        </p>
        <div className="mt-5">
          <Button href={ctaHref} variant="cta">
            {mode.mode === "EXAM_URGENCY_MODE" && assessmentExists
              ? "Entrar na revisão da prova"
              : "Continuar o caminho"}
          </Button>
        </div>
      </Card>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatChip label="Sequência" value={snapshot.user.streak} />
        <StatChip
          label="Flores"
          value={snapshot.flowers.filter((flower) => flower.state === "bloomed").length}
        />
        <StatChip label="Nível" value={level.title} />
      </div>

      <Card variant="progress" className="mt-5 space-y-4">
        <ProgressBar label="XP do nível · não é domínio" value={xpProgressInLevel(snapshot.user.xp)} tone="xp" />
        <ProgressBar label="Domínio do recorte" value={mastery} tone="mastery" />
      </Card>

      <div className="mt-6">
        <p className="mb-3 text-[13px] text-[var(--text-muted)]">Jardim miniatura</p>
        <div className="grid grid-cols-3 gap-3">
          {catalog.pedagogy.chapters.map((chapter) => {
            const flower = flowerForChapter(snapshot, chapter.id);
            return <FlowerSlot key={chapter.id} state={flower.state} label={chapter.title} />;
          })}
        </div>
      </div>

      <div className="mt-8">
        <Button variant="ghost" className="w-full" onClick={() => dispatch({ type: "RESET" })}>
          Recomeçar o capítulo
        </Button>
      </div>
    </AppShell>
  );
}

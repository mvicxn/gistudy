"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { CalendarDay, ExamCard } from "@/components/ds/World";
import { useStudyView } from "@/components/study/StudyProvider";
import { Button } from "@/components/ds/Button";

const days = Array.from({ length: 30 }, (_, i) => i + 1);

export function CalendarScreen() {
  const { catalog, mode } = useStudyView();
  const exam = catalog.calendar.find((event) => event.kind === "exam");
  const examDay = exam ? new Date(exam.startsAt).getDate() : undefined;

  return (
    <AppShell trail={[{ href: "/castelo", label: "Castelo" }, { label: "Calendário" }]}>
      <PageIntro kicker="Calendário" title="Setembro" />
      <div className="mt-5 grid grid-cols-7 gap-2 text-center text-[12px] text-[var(--text-muted)]">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        <span />
        {days.map((day) => (
          <CalendarDay
            key={day}
            day={day}
            today={day === examDay}
            exam={day === examDay}
            muted={examDay ? day > examDay : false}
          />
        ))}
      </div>
      <div className="mt-6">
        <ExamCard title={exam?.title ?? "Nenhuma prova no recorte"}>
          {mode.mode === "EXAM_URGENCY_MODE"
            ? "O modo de urgência vem da configuração do recorte, não desta tela."
            : "Fora da janela, o calendário continua visível sem urgência."}
        </ExamCard>
      </div>
      {exam?.href ? (
        <div className="mt-4">
          <Button href={exam.href} variant="cta">
            Abrir a prova mock
          </Button>
        </div>
      ) : null}
    </AppShell>
  );
}

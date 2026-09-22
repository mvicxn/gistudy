"use client";

import { AppShell, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { CalendarDay } from "@/components/ds/World";
import { Text } from "@/components/ds/Text";
import { useStudyView } from "@/components/study/StudyProvider";
import { chapterOrdinal, modeHeadline } from "@/components/study/labels";
import { useMemo, useState } from "react";

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function CalendarScreen() {
  const { snapshot, nextChapter, mode } = useStudyView();
  const today = useMemo(() => new Date(), []);
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const examDate = mode.endsAt ? new Date(mode.endsAt) : null;
  const [selected, setSelected] = useState(today.getDate());
  const selectedDate = new Date(year, month, selected);
  const lastActive = snapshot.user.lastActiveAt ? new Date(snapshot.user.lastActiveAt) : null;
  const headline = modeHeadline(mode.mode);
  const cells: Array<{ day: number; muted: boolean } | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => ({ day: index + 1, muted: false })),
  ];

  const isExamDay = examDate ? sameDay(selectedDate, examDate) : false;
  const isToday = sameDay(selectedDate, today);
  const isPast = startOfDay(selectedDate) < startOfDay(today);
  const studied = lastActive ? sameDay(selectedDate, lastActive) : false;

  let detailTitle = "Dia livre para estudar";
  let detailBody = "Quando quiser, abra o capítulo da vez e continue a jornada.";
  if (isExamDay) {
    detailTitle = "Dia da prova";
    detailBody = "Revise o que já estudou e siga com calma.";
  } else if (isToday && mode.mode === "EXAM_URGENCY_MODE") {
    detailTitle = headline.title;
    detailBody = nextChapter
      ? `${chapterOrdinal(nextChapter.order)} — ${nextChapter.title}`
      : "Você já concluiu os capítulos disponíveis.";
  } else if (isToday) {
    detailTitle = "Hoje";
    detailBody = nextChapter
      ? `Continue em ${chapterOrdinal(nextChapter.order)} — ${nextChapter.title}.`
      : "Você já concluiu os capítulos disponíveis.";
  } else if (isPast) {
    detailTitle = "Dia passado";
    detailBody = studied ? "Você estudou neste dia." : "Nada registrado neste dia.";
  }

  return (
    <AppShell trail={[{ label: "Calendário" }]}>
      <PageIntro kicker="Calendário" title={`${MONTHS[month]} ${year}`}>
        {mode.mode === "EXAM_URGENCY_MODE"
          ? "Veja o que estudar hoje. Toque um dia para abrir os detalhes."
          : "Toque um dia para ver o que ele reserva."}
      </PageIntro>

      <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-semibold text-[var(--text-muted)]">
        {WEEKDAYS.map((day) => (
          <div key={day} className="min-h-11 py-3">
            {day}
          </div>
        ))}
        {cells.map((cell, index) =>
          cell ? (
            <CalendarDay
              key={cell.day}
              day={cell.day}
              today={cell.day === today.getDate()}
              exam={examDate ? examDate.getMonth() === month && examDate.getDate() === cell.day : false}
              studied={lastActive ? lastActive.getDate() === cell.day && lastActive.getMonth() === month : false}
              selected={selected === cell.day}
              onSelect={() => setSelected(cell.day)}
              label={`Dia ${cell.day}${cell.day === today.getDate() ? ", hoje" : ""}`}
            />
          ) : (
            <div key={`empty-${index}`} className="min-h-11" />
          ),
        )}
      </div>

      <Card variant="elevated" className="mt-6 space-y-3 p-6">
        <Text variant="label">
          {selected} de {MONTHS[month]}
        </Text>
        <Text as="h2" variant="h3">
          {detailTitle}
        </Text>
        <Text variant="bodyLarge">{detailBody}</Text>
        {isToday && nextChapter ? (
          <div className="pt-2">
            <Button href={`/aula/${nextChapter.lessonId}`} variant="cta">
              Continuar aula
            </Button>
          </div>
        ) : null}
      </Card>
    </AppShell>
  );
}

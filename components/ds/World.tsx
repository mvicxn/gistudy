"use client";

import { cn } from "@/lib/cn";
import { Card } from "@/components/ds/Card";
import { Text } from "@/components/ds/Text";
import type { MapNodeState } from "@/lib/tokens";
import Link from "next/link";

const nodeCopy: Record<MapNodeState, string> = {
  locked: "Bloqueado",
  available: "Disponível",
  inProgress: "Em andamento",
  completed: "Concluído",
  mastered: "Dominado",
};

export function MapNode({
  title,
  state = "available",
  href,
}: {
  title: string;
  state?: MapNodeState;
  href?: string;
}) {
  const body = (
    <div className="relative z-[1] flex min-h-14 items-center gap-4">
      <div
        aria-hidden
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--border)]",
          state === "available" && "halo",
          state === "inProgress" && "halo bg-[rgba(75,30,122,0.4)]",
          state === "completed" && "border-[rgba(31,169,122,0.5)]",
          state === "mastered" && "border-[var(--pink)]",
          state === "locked" && "opacity-60",
        )}
      >
        {state === "locked" ? "○" : state === "completed" || state === "mastered" ? "✓" : "▶"}
      </div>
      <div className="min-w-0">
        <Text variant="bodyLarge" className="text-[var(--text-primary)]">
          {title}
        </Text>
        <Text variant="caption">{nodeCopy[state]}</Text>
      </div>
    </div>
  );

  if (href && state !== "locked") {
    return (
      <Link href={href} className="block rounded-[var(--radius-lg)]">
        {body}
      </Link>
    );
  }

  return body;
}

export function MapPath({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative space-y-6 before:absolute before:bottom-8 before:left-[27px] before:top-8 before:w-px before:bg-[var(--border)]">
      {children}
    </div>
  );
}

export function MapPin({
  kind,
  label,
}: {
  kind: "revision" | "exam" | "concept";
  label: string;
}) {
  const mark = kind === "exam" ? "♛" : kind === "revision" ? "✦" : "·";
  return (
    <div className="flex min-h-11 items-center gap-2 text-[15px] text-[var(--text-secondary)]">
      <span aria-hidden>{mark}</span>
      <span>{label}</span>
    </div>
  );
}

export function FlowerSlot({
  state = "empty",
  filled,
  label,
}: {
  state?: "empty" | "growing" | "bloomed" | "gem";
  filled?: boolean;
  label: string;
}) {
  const resolved = filled ? "bloomed" : state;
  const status =
    resolved === "bloomed"
      ? "floresceu"
      : resolved === "growing"
        ? "crescendo"
        : resolved === "gem"
          ? "brilha"
          : "espera";
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)]",
          resolved === "bloomed" && "bg-[rgba(244,143,177,0.16)] text-2xl shadow-[var(--glow)]",
          resolved === "growing" && "text-[var(--lilac)]",
          resolved === "gem" && "border-[var(--pink)]",
          resolved === "empty" && "bg-[rgba(255,255,255,0.03)] text-[var(--text-muted)]",
        )}
        aria-label={`${label}: ${status}`}
      >
        {resolved === "empty" ? "·" : resolved === "gem" ? "◆" : "❀"}
      </div>
      <Text variant="caption" className="text-center">
        {label}
      </Text>
    </div>
  );
}

export function ExamCard({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <Card variant="elevated">
      <Text variant="label">Prova</Text>
      <Text as="h2" variant="h2" className="mt-2">
        {title}
      </Text>
      <Text variant="body" className="mt-2">
        {children}
      </Text>
    </Card>
  );
}

export function BookCover({
  title,
  locked,
  subtitle,
  progress,
}: {
  title: string;
  locked?: boolean;
  subtitle?: string;
  progress?: number;
}) {
  const width = locked ? 0 : Math.max(0, Math.min(100, progress ?? 20));
  return (
    <Card variant={locked ? "locked" : "interactive"} className="min-h-[160px]">
      <Text as="h2" variant="h2">
        {title}
      </Text>
      <Text variant="body" className="mt-3">
        {subtitle ?? (locked ? "Ainda não chegou a sua vez." : "Toque para abrir os capítulos.")}
      </Text>
      <div className="mt-6 h-2 overflow-hidden rounded-[var(--radius-pill)] bg-[rgba(255,255,255,0.08)]">
        <div className="h-full bg-[var(--lilac)]" style={{ width: `${width}%` }} />
      </div>
    </Card>
  );
}

export function CalendarDay({
  day,
  today,
  exam,
  studied,
  muted,
  selected,
  onSelect,
  label,
}: {
  day: number;
  today?: boolean;
  exam?: boolean;
  studied?: boolean;
  muted?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={label ?? `Dia ${day}`}
      className={cn(
        "flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-md)] text-[14px]",
        muted && "text-[var(--text-muted)] opacity-40",
        today && "halo",
        exam && "text-[var(--pink)]",
        studied && "bg-[rgba(185,160,232,0.16)]",
        selected && "border border-[var(--lilac)]",
      )}
    >
      {day}
    </button>
  );
}

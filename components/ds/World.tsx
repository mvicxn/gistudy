import { cn } from "@/lib/cn";
import { Card } from "@/components/ds/Card";
import { Text } from "@/components/ds/Text";
import type { MapNodeState } from "@/lib/tokens";
import Link from "next/link";

const nodeCopy: Record<MapNodeState, string> = {
  locked: "Próxima aventura",
  available: "Disponível",
  inProgress: "Continuar",
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
    <div className="relative z-[1] flex items-center gap-3">
      <div
        aria-hidden
        className={cn(
          "flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[var(--border)]",
          state === "available" && "halo",
          state === "inProgress" && "halo bg-[rgba(75,30,122,0.4)]",
          state === "completed" && "border-[rgba(31,169,122,0.5)]",
          state === "mastered" && "border-[var(--pink)]",
          state === "locked" && "opacity-60",
        )}
      >
        {state === "locked" ? "○" : state === "completed" || state === "mastered" ? "❀" : "●"}
      </div>
      <div>
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
    <div className="relative space-y-6 before:absolute before:bottom-8 before:left-[35px] before:top-8 before:w-px before:bg-[var(--border)]">
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
    <div className="flex min-h-11 items-center gap-2 text-[14px] text-[var(--text-secondary)]">
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
        aria-label={label}
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
}: {
  title: string;
  locked?: boolean;
}) {
  return (
    <Card variant={locked ? "locked" : "interactive"} className="min-h-[180px]">
      <Text as="h2" variant="h2">
        {title}
      </Text>
      <Text variant="caption" className="mt-3">
        {locked
          ? "Isso existe, mas ainda não chegou sua vez."
          : "Livro da biblioteca · estrutura pedagógica revisável"}
      </Text>
      <div className="mt-6 h-1.5 overflow-hidden rounded-[var(--radius-pill)] bg-[rgba(255,255,255,0.08)]">
        <div className={cn("h-full bg-[var(--lilac)]", locked ? "w-0" : "w-1/5")} />
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
}: {
  day: number;
  today?: boolean;
  exam?: boolean;
  studied?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-11 items-center justify-center rounded-[var(--radius-md)] text-[14px]",
        muted && "text-[var(--text-muted)] opacity-40",
        today && "halo",
        exam && "text-[var(--pink)]",
        studied && "bg-[rgba(185,160,232,0.16)]",
      )}
    >
      {exam ? <span aria-label={`Dia ${day}, prova`}>♛</span> : day}
    </div>
  );
}

import { cn } from "@/lib/cn";
import { Text } from "@/components/ds/Text";
import type { ReactNode } from "react";

type Kind =
  | "success"
  | "almost"
  | "hint"
  | "toast"
  | "xp"
  | "achievement"
  | "chapter"
  | "flower";

const meta: Record<Kind, { icon: string; title: string }> = {
  success: { icon: "❀", title: "Certo" },
  almost: { icon: "◇", title: "Quase" },
  hint: { icon: "·", title: "Pista" },
  toast: { icon: "✦", title: "Aviso" },
  xp: { icon: "↑", title: "XP ganho" },
  achievement: { icon: "♛", title: "Conquista" },
  chapter: { icon: "❀", title: "Capítulo concluído" },
  flower: { icon: "❀", title: "Flor crescendo" },
};

export function Feedback({
  kind,
  title,
  children,
}: {
  kind: Kind;
  title?: string;
  children: ReactNode;
}) {
  const item = meta[kind];
  return (
    <div
      role="status"
      className={cn(
        "glass flex gap-3 rounded-[var(--radius-lg)] p-4",
        kind === "success" && "border-[rgba(31,169,122,0.4)]",
        kind === "almost" && "border-[rgba(185,160,232,0.55)]",
        kind === "xp" && "motion-safe:animate-[xpfloat_var(--motion-slow)_var(--ease-out)]",
        kind === "achievement" && "shadow-[var(--glow)]",
      )}
    >
      <span aria-hidden className="text-xl">
        {item.icon}
      </span>
      <div>
        <Text variant="label">{title ?? item.title}</Text>
        <Text variant="body" className="mt-1 text-[var(--text-primary)]">
          {children}
        </Text>
      </div>
    </div>
  );
}

export function Toast({ children }: { children: string }) {
  return <Feedback kind="toast">{children}</Feedback>;
}

import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Variant =
  | "glass"
  | "solid"
  | "elevated"
  | "interactive"
  | "locked"
  | "completed"
  | "achievement"
  | "progress";

const variants: Record<Variant, string> = {
  glass: "glass",
  solid: "bg-[var(--surface)] border border-[var(--border)]",
  elevated: "bg-[var(--surface-elevated)] border border-[var(--border)] shadow-[var(--shadow-soft)]",
  interactive:
    "glass motion-safe:hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] cursor-pointer",
  locked: "bg-[var(--surface)] border border-[var(--locked)] opacity-80",
  completed: "glass border-[rgba(31,169,122,0.45)]",
  achievement: "glass shadow-[var(--glow)]",
  progress: "glass",
};

export function Card({
  variant = "glass",
  loading,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  loading?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] p-5 transition-[transform,box-shadow,opacity] duration-[var(--motion-normal)] ease-[var(--ease-out)]",
        variants[variant],
        loading && "animate-pulse",
        className,
      )}
      aria-busy={loading || undefined}
      {...props}
    />
  );
}

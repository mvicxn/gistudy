import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const styles = {
  display:
    "font-[family-name:var(--font-display)] text-[length:var(--type-display)] leading-[var(--leading-display)] tracking-[-0.02em]",
  h1: "font-[family-name:var(--font-display)] text-[length:var(--type-h1)] leading-[1.2]",
  h2: "font-[family-name:var(--font-display)] text-[length:var(--type-h2)] leading-[1.25]",
  h3: "font-[family-name:var(--font-display)] text-[length:var(--type-h3)] leading-[1.3]",
  bodyLarge: "text-[length:var(--type-body-lg)] leading-[var(--leading-lesson)] text-[var(--text-primary)]",
  body: "text-[length:var(--type-body)] leading-[var(--leading-body)] text-[var(--text-secondary)]",
  bodySmall: "text-[length:var(--type-body-sm)] leading-[1.5] text-[var(--text-secondary)]",
  caption: "text-[length:var(--type-caption)] leading-[1.4] text-[var(--text-muted)]",
  label:
    "text-[length:var(--type-label)] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]",
  button: "text-[length:var(--type-button)] font-semibold leading-none",
} as const;

export type TextVariant = keyof typeof styles;

type TextTag = "p" | "h1" | "h2" | "h3" | "h4" | "span" | "label" | "div";

export function Text({
  as = "p",
  variant = "body",
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  as?: TextTag;
  variant?: TextVariant;
}) {
  const classNames = cn(styles[variant], className);
  switch (as) {
    case "h1":
      return <h1 className={classNames} {...props} />;
    case "h2":
      return <h2 className={classNames} {...props} />;
    case "h3":
      return <h3 className={classNames} {...props} />;
    case "h4":
      return <h4 className={classNames} {...props} />;
    case "span":
      return <span className={classNames} {...props} />;
    case "label":
      return <label className={classNames} {...props} />;
    case "div":
      return <div className={classNames} {...props} />;
    default:
      return <p className={classNames} {...props} />;
  }
}

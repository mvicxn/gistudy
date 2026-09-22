"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "icon" | "pill" | "cta" | "soft";
type Status = "default" | "loading" | "success";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--purple)] text-[var(--text-primary)] shadow-[var(--glow)] hover:brightness-110",
  secondary:
    "bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--lilac)]",
  ghost: "glass text-[var(--text-primary)] hover:border-[var(--lilac)]",
  danger:
    "bg-[rgba(244,143,177,0.16)] text-[var(--pink)] border border-[rgba(244,143,177,0.35)]",
  icon: "h-12 w-12 px-0",
  pill: "bg-[rgba(185,160,232,0.16)] text-[var(--lilac)]",
  cta: "min-h-14 w-full bg-[var(--purple)] text-[var(--text-primary)] shadow-[var(--glow)] text-[16px]",
  soft: "bg-[rgba(185,160,232,0.16)] text-[var(--lilac)]",
};

type Common = {
  variant?: Variant;
  status?: Status;
  loading?: boolean;
  locked?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function Button(
  props: (Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }) | (Common & { href: string }),
) {
  const {
    variant = "primary",
    status: statusProp,
    loading,
    locked,
    className,
    children,
    ...rest
  } = props as Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: string };
  const status = loading ? "loading" : statusProp ?? "default";
  const disabled = ("disabled" in rest && rest.disabled) || status === "loading";
  const classes = cn(
    "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 font-semibold transition-[transform,box-shadow,filter,opacity] duration-[var(--motion-fast)] ease-[var(--ease-out)] motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]",
    variants[variant],
    locked && "cursor-not-allowed opacity-70 shadow-none hover:scale-100",
    disabled && "cursor-not-allowed opacity-50 hover:scale-100",
    status === "success" && "bg-[var(--success)] shadow-[var(--glow-success)]",
    className,
  );

  const label =
    status === "loading" ? "Preparando…" : status === "success" ? children : children;

  if (rest.href) {
    return (
      <Link
        href={locked || disabled ? "#" : rest.href}
        className={classes}
        aria-disabled={locked || disabled || undefined}
        aria-label={rest["aria-label"]}
      >
        {label}
      </Link>
    );
  }

  const { href: _href, ...buttonRest } = rest;

  return (
    <button
      {...buttonRest}
      disabled={disabled}
      aria-disabled={disabled || locked || undefined}
      aria-busy={status === "loading" || undefined}
      className={classes}
    >
      {label}
    </button>
  );
}

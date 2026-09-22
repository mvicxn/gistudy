"use client";

import { Text } from "@/components/ds/Text";
import { useState, type ReactNode } from "react";

export function HelpTip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-semibold text-[var(--lilac)]"
      >
        ?
      </button>
      {open ? (
        <span
          role="tooltip"
          className="absolute left-0 top-12 z-[var(--z-sheet)] w-[min(18rem,calc(100vw-2.5rem))] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow-lift)]"
        >
          <Text variant="body">{children}</Text>
        </span>
      ) : null}
    </span>
  );
}

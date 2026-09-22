"use client";

import { Text } from "@/components/ds/Text";
import { useEffect, useState, type ReactNode } from "react";

export function HelpTip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
        <>
          <button
            type="button"
            aria-label="Fechar ajuda"
            className="fixed inset-0 z-[var(--z-sheet)] bg-[rgba(0,0,0,0.35)] md:hidden"
            onClick={() => setOpen(false)}
          />
          <span
            role="tooltip"
            className="fixed inset-x-3 bottom-20 z-[calc(var(--z-sheet)+1)] rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow-lift)] md:absolute md:inset-auto md:bottom-auto md:left-0 md:top-12 md:w-[min(18rem,calc(100vw-2.5rem))]"
          >
            <Text variant="body">{children}</Text>
          </span>
        </>
      ) : null}
    </span>
  );
}

"use client";

import { GUIDE_COPY, JOURNEY_PATH, type GuideStep } from "@/components/study/guide-store";
import { useGuide } from "@/components/study/GuideProvider";
import { Text } from "@/components/ds/Text";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function GuideTarget({
  step,
  children,
  className,
}: {
  step: GuideStep;
  children: ReactNode;
  className?: string;
}) {
  const { active, step: current } = useGuide();
  const on = active && current === step;
  return (
    <div
      className={cn(
        on &&
          "relative z-[35] scroll-mb-52 rounded-[var(--radius-lg)] ring-2 ring-[var(--lilac)] ring-offset-2 ring-offset-[var(--bg)] motion-safe:shadow-[var(--glow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GuideDock({ step }: { step: GuideStep }) {
  const { active, step: current, skip } = useGuide();
  if (!active || current !== step) return null;
  const copy = GUIDE_COPY[step];

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[40] px-3 md:top-auto md:bottom-6">
      <div
        role="dialog"
        aria-label={copy.title}
        className="pointer-events-auto mx-auto w-full max-w-[520px] rounded-[var(--radius-xl)] border border-[rgba(185,160,232,0.45)] bg-[rgba(18,18,26,0.96)] px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur"
      >
        <Text variant="label">
          {copy.index === 0 ? "Primeira aula" : `Primeira aula · ${copy.index} de 7`}
        </Text>
        <Text as="h2" variant="h3" className="mt-1">
          {copy.title}
        </Text>
        <Text variant="body" className="mt-1 text-[var(--text-primary)]">
          {copy.body}
        </Text>
        <button
          type="button"
          onClick={skip}
          className="mt-1 inline-flex min-h-11 items-center text-[14px] text-[var(--text-muted)]"
        >
          Pular ajuda
        </button>
      </div>
    </div>
  );
}

export function JourneyPath({ current = 0 }: { current?: number }) {
  return (
    <ol className="mb-6 space-y-2" aria-label="Como a jornada funciona">
      {JOURNEY_PATH.map((item, index) => (
        <li key={item} className="flex items-center gap-3">
          <span
            aria-hidden
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px]",
              index === current
                ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)] text-[var(--lilac)]"
                : "border-[var(--border)] text-[var(--text-muted)]",
            )}
          >
            {index + 1}
          </span>
          <Text variant="body" className={index === current ? "text-[var(--text-primary)]" : undefined}>
            {item}
          </Text>
        </li>
      ))}
    </ol>
  );
}

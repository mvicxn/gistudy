"use client";

import { GUIDE_COPY, type GuideStep } from "@/components/study/guide-store";
import { useGuide } from "@/components/study/GuideProvider";
import { Text } from "@/components/ds/Text";
import type { ReactNode } from "react";

export function Coach({
  step,
  children,
}: {
  step: GuideStep;
  children?: ReactNode;
}) {
  const { active, step: current } = useGuide();
  if (!active || current !== step) return null;
  const copy = GUIDE_COPY[step];

  return (
    <aside
      className="mb-6 rounded-[var(--radius-xl)] border border-[rgba(185,160,232,0.45)] bg-[rgba(75,30,122,0.28)] p-5"
      aria-label="Primeira aula"
    >
      <Text variant="label">
        {step === "welcome" ? "Primeira aula" : `Primeira aula · ${copy.index} de 7`}
      </Text>
      <Text as="h2" variant="h3" className="mt-2">
        {copy.title}
      </Text>
      <Text variant="bodyLarge" className="mt-2">
        {copy.body}
      </Text>
      {children}
    </aside>
  );
}

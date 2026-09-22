"use client";

import {
  doneGuide,
  emptyGuide,
  loadGuide,
  reachStep,
  saveGuide,
  type GuideState,
  type GuideStep,
} from "@/components/study/guide-store";
import { useStudy } from "@/components/study/StudyProvider";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type GuideContextValue = {
  ready: boolean;
  active: boolean;
  step: GuideStep;
  reach: (next: GuideStep) => void;
  complete: () => void;
  skip: () => void;
};

const GuideContext = createContext<GuideContextValue | null>(null);

export function GuideProvider({ children }: { children: React.ReactNode }) {
  const { ready, snapshot } = useStudy();
  const [guide, setGuide] = useState<GuideState>(emptyGuide);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const stored = loadGuide();
    if (stored) {
      setGuide(stored);
      setHydrated(true);
      return;
    }
    const hasProgress =
      snapshot.completedLessonIds.length > 0 ||
      snapshot.completedBossIds.length > 0 ||
      Object.keys(snapshot.chapters).length > 0;
    const next = hasProgress ? doneGuide() : emptyGuide();
    setGuide(next);
    saveGuide(next);
    setHydrated(true);
  }, [ready]);

  function update(next: GuideState) {
    setGuide(next);
    saveGuide(next);
  }

  const value = useMemo<GuideContextValue>(
    () => ({
      ready: hydrated,
      active: hydrated && guide.status === "active",
      step: guide.step,
      reach: (next) => {
        const nextState = reachStep(guide, next);
        if (nextState.status === guide.status && nextState.step === guide.step) return;
        update(nextState);
      },
      complete: () => update(doneGuide()),
      skip: () => update(doneGuide()),
    }),
    [hydrated, guide],
  );

  return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>;
}

export function useGuide() {
  const context = useContext(GuideContext);
  if (!context) throw new Error("useGuide precisa do GuideProvider");
  return context;
}

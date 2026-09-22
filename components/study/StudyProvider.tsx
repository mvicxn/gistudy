"use client";

import { catalog } from "@/content/catalog";
import { emptyProgress, type ProgressSnapshot } from "@/domain/experience";
import { applyAction, type StudyAction } from "@/engine/apply-action";
import { resolveStudyMode } from "@/engine/mode";
import { resolveAllChapterStates, nextAvailableChapter } from "@/engine/progression";
import { averageMastery } from "@/engine/mastery";
import { createLocalRepository } from "@/repository/local";
import { createApiRepository } from "@/repository/api";
import { createMemoryRepository } from "@/repository/memory";
import type { ProgressRepository } from "@/repository/types";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type StudyContextValue = {
  ready: boolean;
  authReady: boolean;
  user: { id: string; username: string } | null;
  snapshot: ProgressSnapshot;
  dispatch: (action: StudyAction) => void;
};

const StudyContext = createContext<StudyContextValue | null>(null);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [snapshot, setSnapshot] = useState(emptyProgress);
  const [ready, setReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const repoRef = useRef<ProgressRepository>(createMemoryRepository());

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session", { credentials: "same-origin" })
      .then(async (response) => {
        const data = response.ok ? ((await response.json()) as { user: { id: string; username: string } }) : null;
        if (cancelled) return;
        setUser(data?.user ?? null);
        setAuthReady(true);
        const repo = data?.user ? createApiRepository() : createLocalRepository(window.localStorage);
        repoRef.current = repo;
        return repo.load().then((stored) => ({ stored, user: data?.user }));
      })
        .then((result) => {
          if (cancelled) return;
          if (result?.stored) setSnapshot(result.stored);
          else if (result?.user) setSnapshot(emptyProgress(result.user.id));
          setReady(true);
        })
        .catch(() => {
          if (!cancelled) {
            setAuthReady(true);
            setReady(true);
          }
        });
    return () => {
      cancelled = true;
    };
  }, []);

  function dispatch(action: StudyAction) {
    setSnapshot((current) => {
      const result = applyAction(current, catalog.pedagogy, action);
      void repoRef.current.save(result.snapshot);
      return result.snapshot;
    });
  }

  const value = useMemo(() => ({ ready, authReady, user, snapshot, dispatch }), [ready, authReady, user, snapshot]);

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error("useStudy precisa do StudyProvider");
  return context;
}

export function useStudyView() {
  const { ready, snapshot, dispatch } = useStudy();
  const chapters = catalog.pedagogy.chapters;
  const states = resolveAllChapterStates(chapters, snapshot);
  const nextChapter = nextAvailableChapter(chapters, snapshot);
  const mode = resolveStudyMode();
  const conceptIds = catalog.normalized.concepts.map((concept) => concept.id);
  const mastery = averageMastery(snapshot.masteryEvents, conceptIds);

  return {
    ready,
    snapshot,
    dispatch,
    catalog,
    states,
    nextChapter,
    mode,
    mastery,
  };
}

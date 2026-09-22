"use client";

import { GuideProvider } from "@/components/study/GuideProvider";
import { StudyProvider } from "@/components/study/StudyProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StudyProvider>
      <GuideProvider>{children}</GuideProvider>
    </StudyProvider>
  );
}

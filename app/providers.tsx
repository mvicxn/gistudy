"use client";

import { StudyProvider } from "@/components/study/StudyProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <StudyProvider>{children}</StudyProvider>;
}

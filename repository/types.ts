import type { ProgressSnapshot } from "@/domain/experience";

export type ProgressRepository = {
  load(): Promise<ProgressSnapshot | null>;
  save(snapshot: ProgressSnapshot): Promise<void>;
  clear(): Promise<void>;
};

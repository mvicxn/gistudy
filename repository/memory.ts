import type { ProgressSnapshot } from "@/domain/experience";
import type { ProgressRepository } from "@/repository/types";

export function createMemoryRepository(initial?: ProgressSnapshot): ProgressRepository {
  let stored: ProgressSnapshot | null = initial ?? null;

  return {
    async load() {
      return stored ? structuredClone(stored) : null;
    },
    async save(snapshot) {
      stored = structuredClone(snapshot);
    },
    async clear() {
      stored = null;
    },
  };
}

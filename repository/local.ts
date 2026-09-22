import type { ProgressSnapshot } from "@/domain/experience";
import type { ProgressRepository } from "@/repository/types";

export const PROGRESS_STORAGE_KEY = "mm-study.progress.v5a";

type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export function createLocalRepository(storage: StorageLike): ProgressRepository {
  return {
    async load() {
      const raw = storage.getItem(PROGRESS_STORAGE_KEY);
      if (!raw) return null;
      try {
        const parsed = JSON.parse(raw) as ProgressSnapshot;
        if (parsed.version !== 1) return null;
        return parsed;
      } catch {
        return null;
      }
    },
    async save(snapshot) {
      storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(snapshot));
    },
    async clear() {
      storage.removeItem(PROGRESS_STORAGE_KEY);
    },
  };
}

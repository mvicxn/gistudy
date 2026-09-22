import { createLocalRepository } from "@/repository/local";
import { createMemoryRepository } from "@/repository/memory";
import type { ProgressRepository } from "@/repository/types";

export function createProgressRepository(): ProgressRepository {
  if (typeof window === "undefined" || !window.localStorage) {
    return createMemoryRepository();
  }
  return createLocalRepository(window.localStorage);
}

export type { ProgressRepository } from "@/repository/types";
export { createMemoryRepository } from "@/repository/memory";
export { createLocalRepository } from "@/repository/local";

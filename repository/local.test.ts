import assert from "node:assert/strict";
import { test } from "vitest";
import { emptyProgress } from "@/domain/experience";
import { createLocalRepository, PROGRESS_STORAGE_KEY } from "@/repository/local";
import { createMemoryRepository } from "@/repository/memory";

test("MemoryRepository guarda e devolve o snapshot", async () => {
  const repo = createMemoryRepository();
  const snapshot = emptyProgress();
  snapshot.user.xp = 40;
  await repo.save(snapshot);
  const loaded = await repo.load();
  assert.equal(loaded?.user.xp, 40);
});

test("LocalRepository persiste por chave estável, sem conhecer a UI", async () => {
  const store = new Map<string, string>();
  const storage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
  const repo = createLocalRepository(storage);
  const snapshot = emptyProgress();
  snapshot.user.streak = 2;
  await repo.save(snapshot);
  assert.ok(store.get(PROGRESS_STORAGE_KEY));
  const loaded = await repo.load();
  assert.equal(loaded?.user.streak, 2);
  await repo.clear();
  assert.equal(await repo.load(), null);
});

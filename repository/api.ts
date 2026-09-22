import type { ProgressSnapshot } from "@/domain/experience";
import type { ProgressRepository } from "@/repository/types";

export function createApiRepository(): ProgressRepository {
  return {
    async load() {
      const response = await fetch("/api/progress", { credentials: "same-origin" });
      if (!response.ok) throw new Error("Sessão indisponível");
      const data = (await response.json()) as { snapshot: ProgressSnapshot | null };
      return data.snapshot;
    },
    async save(snapshot) {
      const response = await fetch("/api/progress", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ snapshot }),
      });
      if (!response.ok) throw new Error("Não foi possível salvar o progresso");
    },
    async clear() {
      await fetch("/api/progress", { method: "PUT", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ snapshot: null }) });
    },
  };
}

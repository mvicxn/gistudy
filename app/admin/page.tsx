"use client";

import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { GUIDE_STORAGE_KEY } from "@/components/study/guide-store";
import { useStudy } from "@/components/study/StudyProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { authReady, user } = useStudy();
  const router = useRouter();
  const [resetting, setResetting] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    if (authReady && (!user || user.username !== "admin")) {
      router.replace(user ? "/castelo" : "/login?next=/admin");
    }
    if (typeof window !== "undefined" && sessionStorage.getItem("mm-study.admin-reset-confirmed") === "1") {
      sessionStorage.removeItem("mm-study.admin-reset-confirmed");
      setConfirmation("Progresso e onboarding do admin foram resetados. Você está começando como usuário novo.");
    }
  }, [authReady, user, router]);

  async function resetAdmin() {
    if (!window.confirm("Resetar todo o progresso e o onboarding da conta admin?")) return;
    setResetting(true);
    const response = await fetch("/api/admin/reset", { method: "POST", credentials: "same-origin" });
    if (!response.ok) {
      setConfirmation("Não foi possível resetar a conta.");
      setResetting(false);
      return;
    }
    localStorage.removeItem(GUIDE_STORAGE_KEY);
    sessionStorage.setItem("mm-study.admin-reset-confirmed", "1");
    window.location.reload();
  }

  if (!authReady || !user || user.username !== "admin") return null;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[620px] flex-col px-6 py-10">
      <Text variant="label">Administração</Text>
      <Text as="h1" variant="h1" className="mt-4">Conta admin</Text>
      <Text variant="bodyLarge" className="mt-3">
        Ações administrativas da conta de demonstração.
      </Text>
      {confirmation ? (
        <p role="status" className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--success)]">
          {confirmation}
        </p>
      ) : null}
      <section className="mt-10 space-y-4 rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
        <Text as="h2" variant="h3">Resetar conta admin</Text>
        <Text variant="body">
          Apaga o progresso salvo no D1 e reinicia o onboarding local deste navegador.
        </Text>
        <Button type="button" variant="danger" onClick={resetAdmin} disabled={resetting}>
          {resetting ? "Resetando…" : "Resetar progresso e onboarding"}
        </Button>
      </section>
    </main>
  );
}

"use client";

import { Button } from "@/components/ds/Button";
import { Input } from "@/components/ds/Input";
import { Text } from "@/components/ds/Text";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Não foi possível entrar.");
      setBusy(false);
      return;
    }
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next?.startsWith("/") ? next : "/castelo");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col justify-center px-6 py-10">
      <Text variant="label">MM Study</Text>
      <Text as="h1" variant="h1" className="mt-4">Entrar</Text>
      <Text variant="bodyLarge" className="mt-3">Acesse seu castelo de estudos.</Text>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block space-y-2">
          <Text variant="label">Usuário</Text>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
        </label>
        <label className="block space-y-2">
          <Text variant="label">Senha</Text>
          <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        </label>
        {error ? <p role="alert" className="text-sm text-[var(--danger)]">{error}</p> : null}
        <Button type="submit" variant="cta" disabled={busy}>{busy ? "Entrando…" : "Entrar"}</Button>
      </form>
    </main>
  );
}

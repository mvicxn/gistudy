"use client";

import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { useGuide } from "@/components/study/GuideProvider";
import { greeting } from "@/components/study/labels";
import { useEffect, useState } from "react";

export default function PortalPage() {
  const [hello, setHello] = useState("Olá");
  const { ready, active, reach, skip } = useGuide();

  useEffect(() => {
    setHello(greeting());
  }, []);

  const firstVisit = ready && active;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-between px-6 py-10">
      <div className="pt-16 text-center">
        <Text variant="label">MM Study</Text>
        <Text as="h1" variant="display" className="mt-5">
          {firstVisit ? "Bem-vinda ao MM Study" : `${hello}, Giovana`}
        </Text>
        <Text variant="bodyLarge" className="mt-4">
          {firstVisit
            ? "Eu vou te acompanhar nos estudos. Você não precisa descobrir como tudo funciona sozinha."
            : "Continue de onde parou. Sua aula está no início."}
        </Text>
      </div>
      <div className="space-y-3 pb-10">
        {firstVisit ? (
          <>
            <Button href="/mapa" variant="cta" onClick={() => reach("journey")}>
              Vamos começar
            </Button>
            <button
              type="button"
              onClick={skip}
              className="flex min-h-11 w-full items-center justify-center text-[15px] text-[var(--text-muted)]"
            >
              Pular ajuda
            </button>
          </>
        ) : (
          <Button href="/castelo" variant="cta">
            Continuar de onde parei
          </Button>
        )}
      </div>
    </div>
  );
}

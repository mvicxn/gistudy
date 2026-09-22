"use client";

import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { Coach } from "@/components/study/Coach";
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
      <div className="pt-12">
        <Text variant="label" className="text-center">
          MM Study
        </Text>
        <Text as="h1" variant="display" className="mt-5 text-center">
          {hello}, Giovana
        </Text>
        {firstVisit ? (
          <div className="mt-8">
            <Coach step="welcome" />
          </div>
        ) : (
          <Text variant="bodyLarge" className="mt-4 text-center">
            Continue de onde parou. O capítulo da vez está no início.
          </Text>
        )}
      </div>
      <div className="space-y-3 pb-10">
        {firstVisit ? (
          <>
            <Button href="/mapa" variant="cta" onClick={() => reach("journey")}>
              Ver minha jornada
            </Button>
            <button
              type="button"
              onClick={skip}
              className="flex min-h-11 w-full items-center justify-center text-[15px] text-[var(--text-muted)]"
            >
              Já sei usar
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

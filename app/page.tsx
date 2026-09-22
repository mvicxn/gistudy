"use client";

import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { greeting } from "@/components/study/labels";
import { useEffect, useState } from "react";

export default function PortalPage() {
  const [hello, setHello] = useState("Olá");

  useEffect(() => {
    setHello(greeting());
  }, []);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-between px-6 py-10">
      <div className="pt-16 text-center">
        <Text variant="label">MM Study</Text>
        <Text as="h1" variant="display" className="mt-5">
          {hello}, Giovana
        </Text>
        <Text variant="bodyLarge" className="mt-4">
          Seu estudo de Dermatofuncional está aqui. Abra e continue de onde parou.
        </Text>
      </div>
      <div className="pb-10">
        <Button href="/castelo" variant="cta">
          Começar a estudar
        </Button>
      </div>
    </div>
  );
}

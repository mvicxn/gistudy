import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";

export default function PortalPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-between px-6 py-10">
      <div className="pt-10 text-center">
        <Text variant="label">MM Study</Text>
        <Text as="h1" variant="display" className="mt-4">
          Boa noite, Giovana
        </Text>
        <Text variant="body" className="mt-3">
          O castelo está acordado. Hoje o relógio da ferida espera no mapa.
        </Text>
      </div>
      <div className="space-y-3 pb-8">
        <Button href="/castelo" variant="cta">
          Entrar no Castelo
        </Button>
        <Button href="/design-system" variant="ghost" className="w-full">
          Ver Design System
        </Button>
      </div>
    </div>
  );
}

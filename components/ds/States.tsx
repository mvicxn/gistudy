import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Text } from "@/components/ds/Text";

export function Skeleton({ className = "h-16" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-lg)] bg-[rgba(255,255,255,0.06)] ${className}`}
      aria-hidden
    />
  );
}

export function Spinner({ label = "Estamos preparando sua aula..." }: { label?: string }) {
  return (
    <div className="flex min-h-11 items-center gap-3 text-[15px] text-[var(--text-muted)]">
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--lilac)] motion-reduce:animate-none"
        aria-hidden
      />
      <span>{label}</span>
    </div>
  );
}

export function ContentPlaceholder({
  title,
  lines = 3,
}: {
  title: string;
  lines?: number;
}) {
  return (
    <Card variant="solid" aria-busy="true" aria-label={title}>
      <Skeleton className="mb-3 h-5 w-1/2" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="mb-2 h-3 w-full" />
      ))}
    </Card>
  );
}

export function LockedState({
  title = "Ainda não deu para abrir",
  children = "Termine o capítulo anterior para liberar este.",
  action,
}: {
  title?: string;
  children?: string;
  action?: { href: string; label: string };
}) {
  return (
    <Card variant="locked" role="status">
      <Text variant="label">Bloqueado</Text>
      <Text as="h3" variant="h3" className="mt-2">
        {title}
      </Text>
      <Text variant="body" className="mt-2">
        {children}
      </Text>
      {action ? (
        <div className="mt-5">
          <Button href={action.href} variant="cta">
            {action.label}
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

export function EmptyState({
  kicker,
  title,
  children,
  action,
}: {
  kicker: string;
  title: string;
  children: string;
  action?: { href: string; label: string };
}) {
  return (
    <Card variant="glass" className="p-6 text-center">
      <Text variant="label">{kicker}</Text>
      <Text as="h3" variant="h3" className="mt-2">
        {title}
      </Text>
      <Text variant="body" className="mt-2">
        {children}
      </Text>
      {action ? (
        <div className="mt-5">
          <Button href={action.href} variant="cta">
            {action.label}
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

export const emptyCopy = {
  biblioteca: {
    kicker: "Biblioteca",
    title: "Os livros ainda estão chegando",
    body: "Quando uma matéria entrar na jornada, ela aparece aqui.",
  },
  mapa: {
    kicker: "Estudo",
    title: "Ainda não há capítulos para abrir",
    body: "Quando os capítulos estiverem prontos, a jornada começa nesta tela.",
  },
  jardim: {
    kicker: "Jardim",
    title: "O canteiro espera a primeira flor",
    body: "Conclua um capítulo para ver o jardim crescer.",
  },
  calendario: {
    kicker: "Calendário",
    title: "Nenhuma data marcada ainda",
    body: "Os dias de estudo e a prova aparecem aqui quando estiverem no calendário.",
  },
  progresso: {
    kicker: "Progresso",
    title: "Ainda não há trilha para mostrar",
    body: "Comece uma aula para ver o quanto você já fez.",
  },
} as const;

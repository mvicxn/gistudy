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

export function Spinner({ label = "Carregando" }: { label?: string }) {
  return (
    <div className="flex min-h-11 items-center gap-3 text-[14px] text-[var(--text-muted)]">
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
  title = "Próxima aventura",
  children = "Complete o capítulo anterior para desbloquear.",
}: {
  title?: string;
  children?: string;
}) {
  return (
    <Card variant="locked" role="status">
      <Text variant="label">🔒 Bloqueado</Text>
      <Text as="h3" variant="h3" className="mt-2">
        {title}
      </Text>
      <Text variant="body" className="mt-2">
        {children}
      </Text>
    </Card>
  );
}

export function EmptyState({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: string;
}) {
  return (
    <Card variant="glass" className="text-center">
      <Text variant="label">{kicker}</Text>
      <Text as="h3" variant="h3" className="mt-2">
        {title}
      </Text>
      <Text variant="body" className="mt-2">
        {children}
      </Text>
    </Card>
  );
}

export const emptyCopy = {
  biblioteca: {
    kicker: "Biblioteca",
    title: "Os livros ainda estão sendo encadernados",
    body: "Quando o conteúdo entrar na máquina, os livros aparecem aqui — nunca como PDF solto.",
  },
  mapa: {
    kicker: "Mapa",
    title: "O caminho ainda não foi desenhado",
    body: "Os nós genéricos mostram o molde. O território acadêmico entra depois.",
  },
  jardim: {
    kicker: "Jardim",
    title: "O canteiro espera a primeira flor",
    body: "Flores e gemas nascem de capítulos concluídos, não de arquivos.",
  },
  calendario: {
    kicker: "Calendário",
    title: "Nenhuma data marcada ainda",
    body: "Provas e rituais entram como eventos do calendário, não como urgência permanente.",
  },
  progresso: {
    kicker: "Progresso",
    title: "Ainda não há trilha para mostrar",
    body: "XP e domínio ficarão separados assim que a jornada começar.",
  },
} as const;

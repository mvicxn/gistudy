import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Input, TextArea } from "@/components/ds/Input";
import {
  CircularProgress,
  GemBadge,
  MasteryMeter,
  ProgressBar,
  StatChip,
  XpChip,
} from "@/components/ds/Progress";
import { BackLink } from "@/components/ds/Navigation";
import { Professor } from "@/components/ds/Professor";
import { Feedback, Toast } from "@/components/ds/Feedback";
import {
  ContentPlaceholder,
  EmptyState,
  LockedState,
  Skeleton,
  Spinner,
  emptyCopy,
} from "@/components/ds/States";
import { Text } from "@/components/ds/Text";
import { Motion } from "@/components/ds/Motion";
import {
  BookCover,
  CalendarDay,
  ExamCard,
  FlowerSlot,
  MapNode,
  MapPath,
  MapPin,
} from "@/components/ds/World";
import { tokens } from "@/lib/tokens";
import type { ProfessorTone } from "@/lib/tokens";
import type { MapNodeState } from "@/lib/tokens";

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      <header>
        <Text variant="label">{kicker}</Text>
        <Text as="h2" variant="h2" className="mt-1">
          {title}
        </Text>
      </header>
      {children}
    </section>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-14 rounded-[var(--radius-md)] border border-[var(--border)]"
        style={{ background: value.startsWith("var(") ? undefined : value, backgroundColor: value }}
        aria-hidden
      />
      <Text variant="caption">{name}</Text>
    </div>
  );
}

export default function DesignSystemPage() {
  const colors = [
    ["background", tokens.color.bg],
    ["surface", tokens.color.surface],
    ["surface elevated", tokens.color.surfaceElevated],
    ["glass", tokens.color.glass],
    ["border", tokens.color.border],
    ["text primary", tokens.color.textPrimary],
    ["text secondary", tokens.color.textSecondary],
    ["text muted", tokens.color.textMuted],
    ["purple", tokens.color.purple],
    ["violet", tokens.color.violet],
    ["lilac", tokens.color.lilac],
    ["pink", tokens.color.pink],
    ["success", tokens.color.success],
    ["warning", tokens.color.warning],
    ["focus", tokens.color.focus],
    ["locked", tokens.color.locked],
  ] as const;

  const typeRows: { variant: Parameters<typeof Text>[0]["variant"]; sample: string }[] = [
    { variant: "display", sample: "Display · o castelo" },
    { variant: "h1", sample: "H1 · título de tela" },
    { variant: "h2", sample: "H2 · seção" },
    { variant: "h3", sample: "H3 · bloco" },
    { variant: "bodyLarge", sample: "Body Large · leitura de aula futura, nunca dashboard." },
    { variant: "body", sample: "Body · texto de apoio com respiro no mobile." },
    { variant: "bodySmall", sample: "Body Small · detalhe secundário." },
    { variant: "caption", sample: "Caption · metadado e contexto." },
    { variant: "label", sample: "Label" },
    { variant: "button", sample: "Button" },
  ];

  const professorTones: ProfessorTone[] = [
    "introduction",
    "explanation",
    "success",
    "almost",
    "hint",
    "celebration",
  ];

  const mapStates: MapNodeState[] = [
    "locked",
    "available",
    "inProgress",
    "completed",
    "mastered",
  ];

  return (
    <div className="mx-auto max-w-[800px] space-y-16 px-5 py-10 pb-24">
      <header className="space-y-4">
        <BackLink href="/">Voltar ao portal</BackLink>
        <Text variant="label">Fase 3B · fundação visual</Text>
        <Text as="h1" variant="display">
          Design System
        </Text>
        <Text variant="body">
          Catálogo da casa visual. Sem aula, sem PPT, sem quiz. Conteúdo entra
          por propriedades.
        </Text>
      </header>

      <nav aria-label="Índice do catálogo" className="glass rounded-[var(--radius-lg)] p-4">
        <Text variant="label">Índice</Text>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["#cores", "Cores"],
            ["#tipografia", "Tipo"],
            ["#espaco", "Espaço"],
            ["#motion", "Motion"],
            ["#botoes", "Botões"],
            ["#cards", "Cards"],
            ["#nav", "Navegação"],
            ["#progresso", "Progresso"],
            ["#mapa", "Mapa"],
            ["#jardim", "Jardim"],
            ["#professora", "Professora"],
            ["#feedback", "Feedback"],
            ["#estados", "Estados"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center rounded-[var(--radius-pill)] border border-[var(--border)] px-3 text-[13px] text-[var(--lilac)]"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <Section id="cores" kicker="Foundations" title="Cores">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colors.map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </Section>

      <Section id="tipografia" kicker="Foundations" title="Tipografia">
        <div className="space-y-4">
          {typeRows.map((row) => (
            <Text key={row.variant} variant={row.variant}>
              {row.sample}
            </Text>
          ))}
        </div>
      </Section>

      <Section id="espaco" kicker="Foundations" title="Espaçamento, radius e sombra">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["sm", "md", "lg", "xl"].map((size) => (
            <div
              key={size}
              className="border border-[var(--border)] bg-[var(--surface-elevated)] p-4"
              style={{ borderRadius: `var(--radius-${size})` }}
            >
              <Text variant="caption">radius {size}</Text>
            </div>
          ))}
        </div>
        <Card variant="elevated">
          <Text variant="caption">shadow soft · surface elevated</Text>
        </Card>
        <Card variant="achievement">
          <Text variant="caption">glow · achievement</Text>
        </Card>
      </Section>

      <Section id="motion" kicker="Foundations" title="Motion">
        <Text variant="body">
          Faixa 180–450ms. Hierarquia: feedback primeiro, decoração depois.
          Prefers-reduced-motion reduz transformações e preserva fade.
        </Text>
        <div className="grid gap-3 sm:grid-cols-2">
          <Motion kind="fade" className="glass rounded-[var(--radius-lg)] p-4">
            fade
          </Motion>
          <Motion kind="slide" className="glass rounded-[var(--radius-lg)] p-4">
            slide / page
          </Motion>
          <Motion kind="xp" className="glass rounded-[var(--radius-lg)] p-4">
            XP float
          </Motion>
          <Motion kind="grow" className="glass rounded-[var(--radius-lg)] p-4">
            flower growth
          </Motion>
          <Motion kind="unlock" className="glass rounded-[var(--radius-lg)] p-4">
            node unlock
          </Motion>
          <Motion kind="reveal" className="glass rounded-[var(--radius-lg)] p-4">
            achievement reveal
          </Motion>
        </div>
      </Section>

      <Section id="botoes" kicker="Components" title="Botões">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="pill">Pill</Button>
          <Button variant="icon" aria-label="Ação extra">
            ✦
          </Button>
          <Button variant="danger">Danger</Button>
        </div>
        <Button variant="cta">Large CTA · entrar</Button>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button className="brightness-110">Hover</Button>
          <Button className="scale-[0.98]">Active</Button>
          <Button autoFocus>Focus</Button>
          <Button disabled>Disabled</Button>
          <Button status="loading">Loading</Button>
          <Button status="success">Success</Button>
          <Button locked>Locked</Button>
        </div>
      </Section>

      <Section id="cards" kicker="Components" title="Cards">
        <div className="grid gap-3 sm:grid-cols-2">
          <Card variant="glass">Glass</Card>
          <Card variant="solid">Solid</Card>
          <Card variant="elevated">Elevated</Card>
          <Card variant="interactive" tabIndex={0}>
            Interactive · hover / focus
          </Card>
          <Card variant="locked">Locked</Card>
          <Card variant="completed">Completed</Card>
          <Card variant="achievement">Achievement</Card>
          <Card variant="progress" loading>
            Loading
          </Card>
        </div>
        <ExamCard title="Recorte da prova">
          Card genérico de prova. Dados entram por propriedades.
        </ExamCard>
      </Section>

      <Section id="nav" kicker="Components" title="Navegação">
        <Card variant="solid">
          <Text variant="caption">Context trail · nunca sacrificar no mobile</Text>
          <ol className="mt-3 flex min-h-11 flex-wrap items-center gap-2 text-[13px] text-[var(--text-muted)]">
            <li className="text-[var(--lilac)]">Biblioteca</li>
            <li aria-hidden>→</li>
            <li className="text-[var(--lilac)]">Módulo</li>
            <li aria-hidden>→</li>
            <li className="text-[var(--lilac)]">Capítulo</li>
            <li aria-hidden>→</li>
            <li className="text-[var(--lilac)]">Aula</li>
            <li aria-hidden>→</li>
            <li className="text-[var(--text-primary)]">Passo 4/11</li>
          </ol>
        </Card>
        <BackLink href="/castelo">Voltar ao Castelo</BackLink>
      </Section>

      <Section id="progresso" kicker="Components" title="Progresso · XP ≠ domínio">
        <Card variant="progress" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <XpChip value={1240} />
            <GemBadge>3 gemas</GemBadge>
          </div>
          <ProgressBar label="XP do nível · não é domínio" value={35} tone="xp" />
          <MasteryMeter value={80} label="Domínio do recorte" />
          <ProgressBar label="Capítulo" value={20} tone="chapter" />
          <CircularProgress value={42} label="Trilha" />
          <div className="grid grid-cols-3 gap-3">
            <StatChip label="Sequência" value={0} />
            <StatChip label="Nível" value="Aprendiz" />
            <StatChip label="Flores" value={0} />
          </div>
        </Card>
      </Section>

      <Section id="mapa" kicker="Components" title="Mapa">
        <MapPath>
          {mapStates.map((state) => (
            <MapNode key={state} title={`Nó ${state}`} state={state} />
          ))}
        </MapPath>
        <div className="mt-4 space-y-1">
          <MapPin kind="concept" label="Conceito âncora" />
          <MapPin kind="revision" label="Pino de revisão" />
          <MapPin kind="exam" label="Pino de prova" />
        </div>
      </Section>

      <Section id="jardim" kicker="Components" title="Jardim">
        <div className="grid grid-cols-4 gap-3">
          <FlowerSlot state="empty" label="Canteiro" />
          <FlowerSlot state="growing" label="Crescendo" />
          <FlowerSlot state="bloomed" label="Flor" />
          <FlowerSlot state="gem" label="Gema" />
        </div>
      </Section>

      <Section id="professora" kicker="Components" title="Professora">
        <div className="space-y-3">
          {professorTones.map((tone) => (
            <Professor key={tone} tone={tone}>
              Texto externo no tom {tone}. Nada acadêmico hardcoded.
            </Professor>
          ))}
        </div>
      </Section>

      <Section id="feedback" kicker="Components" title="Feedback">
        <div className="space-y-3">
          <Feedback kind="success">Ligou o conceito ao critério.</Feedback>
          <Feedback kind="almost">Nada se perde. Olhe o bloco de novo.</Feedback>
          <Feedback kind="hint">Lembre o que muda a decisão clínica.</Feedback>
          <Toast>Aviso breve, sem depender só da cor.</Toast>
          <Feedback kind="xp">+40 XP · progresso, não domínio.</Feedback>
          <Feedback kind="achievement">Uma conquista desbloqueada.</Feedback>
          <Feedback kind="chapter">O capítulo fechou. A flor pode nascer.</Feedback>
          <Feedback kind="flower">O canteiro respondeu.</Feedback>
        </div>
      </Section>

      <Section id="estados" kicker="Components" title="Loading, locked e empty">
        <div className="space-y-3">
          <Skeleton />
          <ContentPlaceholder title="Estrutura conhecida" />
          <Spinner label="Só quando a estrutura ainda não existe" />
          <LockedState />
          <EmptyState {...emptyCopy.biblioteca}>{emptyCopy.biblioteca.body}</EmptyState>
          <EmptyState {...emptyCopy.mapa}>{emptyCopy.mapa.body}</EmptyState>
          <EmptyState {...emptyCopy.jardim}>{emptyCopy.jardim.body}</EmptyState>
          <EmptyState {...emptyCopy.calendario}>{emptyCopy.calendario.body}</EmptyState>
          <EmptyState {...emptyCopy.progresso}>{emptyCopy.progresso.body}</EmptyState>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <BookCover title="Livro aberto" />
          <BookCover title="Próxima aventura" locked />
        </div>
        <div className="flex gap-2">
          <CalendarDay day={21} studied />
          <CalendarDay day={22} today exam />
          <CalendarDay day={23} muted />
        </div>
        <Input placeholder="Campo de texto · 16px no mobile" />
        <TextArea placeholder="Espaço de escrita com respiro de aula." />
      </Section>
    </div>
  );
}

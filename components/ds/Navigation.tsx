"use client";

import { cn } from "@/lib/cn";
import { Text } from "@/components/ds/Text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const tabs = [
  { href: "/castelo", label: "Castelo" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/mapa", label: "Aula" },
  { href: "/calendario", label: "Calendário" },
  { href: "/jardim", label: "Jardim" },
];

export function ContextTrail({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  return (
    <nav aria-label="Contexto" className="mb-4 overflow-x-auto">
      <ol className="flex min-h-11 flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[var(--text-muted)]">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {item.href ? (
              <Link className="min-h-11 min-w-11 py-2 text-[var(--lilac)]" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className="py-2 text-[var(--text-primary)]" aria-current="page">
                {item.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden>→</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function BackLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center text-[14px] text-[var(--lilac)]"
    >
      ← {children}
    </Link>
  );
}

export function AppShell({
  children,
  trail,
}: {
  children: ReactNode;
  trail?: { href?: string; label: string }[];
}) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const tabLinks = (compact: boolean) =>
    tabs.map((tab) => {
      const active = ready && pathname.startsWith(tab.href);
      return (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex min-h-12 items-center justify-center rounded-full px-2 text-[11px]",
            compact && "h-12 w-12 px-0",
            active
              ? "bg-[var(--purple)] shadow-[var(--glow)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
          )}
        >
          {compact ? tab.label.slice(0, 3) : tab.label}
        </Link>
      );
    });

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1440px]">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[var(--z-focus)] focus:rounded-[var(--radius-pill)] focus:bg-[var(--purple)] focus:px-4 focus:py-2"
      >
        Ir ao conteúdo
      </a>
      <aside
        aria-label="Principal desktop"
        className="sticky top-0 hidden h-dvh w-20 flex-col items-center gap-3 border-r border-[var(--border)] py-6 lg:flex"
      >
        <Link href="/" className="font-[family-name:var(--font-display)] text-lg" aria-label="MM Study, início">
          MM
        </Link>
        {tabLinks(true)}
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col pb-24 md:pb-8">
        <nav
          aria-label="Principal tablet"
          className="glass sticky top-0 z-[var(--z-nav)] hidden items-center gap-2 overflow-x-auto px-3 py-2 md:flex lg:hidden"
        >
          <Link href="/" className="px-2 font-[family-name:var(--font-display)]" aria-label="MM Study, início">
            MM
          </Link>
          {tabLinks(false)}
        </nav>
        <main id="conteudo" className="mx-auto w-full max-w-[800px] flex-1 px-5 py-6">
          {trail ? <ContextTrail items={trail} /> : null}
          {children}
        </main>
      </div>

      <nav
        aria-label="Principal"
        className="glass fixed inset-x-0 bottom-0 z-[var(--z-nav)] grid grid-cols-5 gap-1 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
      >
        {tabLinks(false)}
      </nav>
    </div>
  );
}

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-6">
      <Text variant="label">{kicker}</Text>
      <Text as="h1" variant="h1" className="mt-1">
        {title}
      </Text>
      {children ? (
        <Text variant="body" className="mt-2">
          {children}
        </Text>
      ) : null}
    </header>
  );
}

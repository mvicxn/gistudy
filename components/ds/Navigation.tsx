"use client";

import { cn } from "@/lib/cn";
import { Text } from "@/components/ds/Text";
import { Spinner } from "@/components/ds/States";
import { GuideDock } from "@/components/study/GuideChrome";
import { useGuide } from "@/components/study/GuideProvider";
import type { GuideStep } from "@/components/study/guide-store";
import { useStudy } from "@/components/study/StudyProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const tabs = [
  { href: "/castelo", label: "Início", icon: "⌂" },
  { href: "/mapa", label: "Estudo", icon: "◎" },
  { href: "/biblioteca", label: "Biblioteca", icon: "▣" },
  { href: "/calendario", label: "Calendário", icon: "◷" },
  { href: "/jardim", label: "Jardim", icon: "❀" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/castelo") return pathname === "/castelo";
  if (href === "/mapa") {
    return (
      pathname.startsWith("/mapa") ||
      pathname.startsWith("/capitulo") ||
      pathname.startsWith("/aula") ||
      pathname.startsWith("/revisao")
    );
  }
  return pathname.startsWith(href);
}

function guideDockBelongsHere(pathname: string, step: GuideStep) {
  switch (step) {
    case "welcome":
      return pathname === "/" || pathname.startsWith("/castelo");
    case "journey":
      return pathname.startsWith("/mapa");
    case "chapter":
      return pathname.startsWith("/capitulo");
    case "lesson":
    case "challenge":
    case "teachback":
    case "boss":
    case "reward":
      return pathname.startsWith("/aula");
    default:
      return false;
  }
}

export function AppShell({
  children,
  trail,
}: {
  children: ReactNode;
  trail?: { href?: string; label: string }[];
}) {
  const pathname = usePathname();
  const { ready } = useStudy();
  const { ready: guideReady, active, step, skip, reopen } = useGuide();

  return (
    <div className="min-h-dvh md:flex">
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-56 md:flex-col md:border-r md:border-[var(--border)] md:bg-[rgba(11,11,16,0.92)] md:px-4 md:py-8">
        <Text variant="label">MM Study</Text>
        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Navegação principal">
          {tabs.map((tab) => {
            const tabActive = isActive(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={tabActive ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-[var(--radius-lg)] px-3 text-[15px] font-semibold",
                  tabActive
                    ? "bg-[rgba(185,160,232,0.16)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.04)]",
                )}
              >
                <span aria-hidden className="w-5 text-center text-[var(--lilac)]">
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            );
          })}
        </nav>
        {guideReady ? (
          <button
            type="button"
            onClick={active ? skip : reopen}
            className="mt-6 min-h-11 text-left text-[13px] text-[var(--text-muted)]"
          >
            {active ? "Pular ajuda" : "Preciso de ajuda"}
          </button>
        ) : null}
      </aside>

      <main className="mx-auto w-full max-w-[720px] flex-1 px-5 py-8 pb-52 md:ml-56 md:max-w-[760px] md:px-10 md:pb-16">
        {trail ? <ContextTrail items={trail} /> : null}
        {guideReady && !active ? (
          <button
            type="button"
            onClick={reopen}
            className="mb-4 inline-flex min-h-11 items-center text-[13px] text-[var(--text-muted)] md:hidden"
          >
            Preciso de ajuda
          </button>
        ) : null}
        {guideReady && active && guideDockBelongsHere(pathname, step) ? (
          <GuideDock step={step} />
        ) : null}
        {ready ? (
          children
        ) : (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Spinner label="Estamos preparando sua aula..." />
          </div>
        )}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-[var(--z-nav)] border-t border-[var(--border)] bg-[rgba(11,11,16,0.94)] backdrop-blur md:hidden"
        aria-label="Navegação principal"
      >
        <ul className="grid grid-cols-4">
          {tabs
            .filter((tab) => tab.href !== "/biblioteca")
            .map((tab) => {
            const tabActive = isActive(pathname, tab.href);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={tabActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-2 text-center text-[12px] font-semibold leading-tight",
                    tabActive ? "text-[var(--lilac)]" : "text-[var(--text-muted)]",
                  )}
                >
                  <span aria-hidden className="text-base">
                    {tab.icon}
                  </span>
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function ContextTrail({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Você está em" className="mb-5 text-[13px] text-[var(--text-muted)]">
      <ol className="flex flex-wrap gap-1">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="underline-offset-2 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--text-secondary)]">{item.label}</span>
            )}
            {index < items.length - 1 ? <span aria-hidden>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
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
    <header className="mb-8 space-y-3">
      <Text variant="label">{kicker}</Text>
      <Text as="h1" variant="h1">
        {title}
      </Text>
      {children ? (
        <Text as="div" variant="bodyLarge">
          {children}
        </Text>
      ) : null}
    </header>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mb-5 inline-flex min-h-11 items-center text-[15px] text-[var(--lilac)]"
    >
      ← {children}
    </Link>
  );
}

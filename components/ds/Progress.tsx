import { cn } from "@/lib/cn";
import { Text } from "@/components/ds/Text";

export function ProgressBar({
  value,
  label,
  tone = "xp",
}: {
  value: number;
  label?: string;
  tone?: "xp" | "mastery" | "chapter";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between">
          <Text variant="caption">{label}</Text>
          <Text variant="caption">{clamped}%</Text>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2 overflow-hidden rounded-[var(--radius-pill)] bg-[rgba(255,255,255,0.08)]"
      >
        <div
          className={cn(
            "h-full rounded-[var(--radius-pill)] transition-[width] duration-[var(--motion-slow)] motion-safe:shadow-[var(--glow)]",
            tone === "mastery" && "bg-[linear-gradient(90deg,var(--lilac),var(--success))]",
            tone === "xp" && "bg-[linear-gradient(90deg,var(--purple),var(--lilac))]",
            tone === "chapter" && "bg-[var(--violet)]",
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = 18;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-3">
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="var(--lilac)"
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={c - (clamped / 100) * c}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
        />
      </svg>
      <div>
        <Text variant="label">{label}</Text>
        <Text variant="h3">{clamped}%</Text>
      </div>
    </div>
  );
}

function formatXp(value: number) {
  const digits = Math.round(value).toString();
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function XpChip({ value }: { value: number }) {
  return (
    <span className="inline-flex min-h-11 items-center rounded-[var(--radius-pill)] bg-[var(--purple)] px-3 text-[13px] font-semibold text-[var(--lilac)]">
      {formatXp(value)} XP
    </span>
  );
}

export function MasteryMeter({ value, label = "Domínio" }: { value: number; label?: string }) {
  return <ProgressBar value={value} label={label} tone="mastery" />;
}

export function StatChip({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="glass rounded-[var(--radius-lg)] px-3 py-3 text-center">
      <Text variant="caption">{label}</Text>
      <Text as="p" variant="h3" className="mt-1">
        {value}
      </Text>
    </div>
  );
}

export const Progress = ProgressBar;

export function GemBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border)] px-3 text-[12px] text-[var(--pink)]">
      <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--pink)]" />
      {children}
    </span>
  );
}

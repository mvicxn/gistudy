import { cn } from "@/lib/cn";
import { Text } from "@/components/ds/Text";
import type { ProfessorTone } from "@/lib/tokens";
import type { ReactNode } from "react";

const toneCopy: Record<ProfessorTone, { mark: string; kicker: string }> = {
  introduction: { mark: "✦", kicker: "Apresentação" },
  explanation: { mark: "◆", kicker: "Explicação" },
  success: { mark: "❀", kicker: "Certo" },
  almost: { mark: "◇", kicker: "Quase" },
  hint: { mark: "·", kicker: "Pista" },
  celebration: { mark: "♛", kicker: "Celebração" },
};

export function Professor({
  tone = "explanation",
  children,
}: {
  tone?: ProfessorTone;
  children: ReactNode;
}) {
  const meta = toneCopy[tone];
  return (
    <aside
      className={cn(
        "glass flex gap-4 rounded-[var(--radius-xl)] p-6",
        tone === "success" && "border-[rgba(31,169,122,0.4)]",
        tone === "almost" && "border-[rgba(185,160,232,0.55)]",
        tone === "celebration" && "shadow-[var(--glow)]",
      )}
      aria-label={`Professora, ${meta.kicker}`}
    >
      <div
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(75,30,122,0.45)] text-xl"
      >
        {meta.mark}
      </div>
      <div>
        <Text variant="label">{meta.kicker}</Text>
        <Text variant="bodyLarge" className="mt-1">
          {children}
        </Text>
      </div>
    </aside>
  );
}

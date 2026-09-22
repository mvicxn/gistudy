import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const motions = {
  fade: "motion-fade",
  slide: "motion-slide",
  page: "motion-page",
  xp: "motion-xp",
  unlock: "motion-unlock",
  grow: "motion-grow",
  reveal: "motion-reveal",
} as const;

export function Motion({
  kind = "fade",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { kind?: keyof typeof motions }) {
  return <div className={cn(motions[kind], className)} {...props} />;
}

import type { ChapterState } from "@/domain/experience";
import type { MapNodeState } from "@/lib/tokens";

export function toMapState(state: ChapterState): MapNodeState {
  if (state === "LOCKED") return "locked";
  if (state === "IN_PROGRESS") return "inProgress";
  if (state === "COMPLETED") return "completed";
  if (state === "MASTERED") return "mastered";
  return "available";
}

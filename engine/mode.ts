import { STUDY_MODE_CONFIG } from "@/config/study-mode";
import type { StudyMode } from "@/domain/experience";

export function resolveStudyMode(now: Date = new Date(), config: StudyMode = STUDY_MODE_CONFIG): StudyMode {
  if (config.mode !== "EXAM_URGENCY_MODE") {
    return { mode: "NORMAL_MODE" };
  }

  const start = config.startsAt ? new Date(config.startsAt) : null;
  const end = config.endsAt ? new Date(config.endsAt) : null;
  const inside =
    (!start || now.getTime() >= start.getTime()) &&
    (!end || now.getTime() < end.getTime());

  if (!inside) return { mode: "NORMAL_MODE" };

  return {
    mode: "EXAM_URGENCY_MODE",
    startsAt: config.startsAt,
    endsAt: config.endsAt,
    targetAssessmentId: config.targetAssessmentId,
  };
}

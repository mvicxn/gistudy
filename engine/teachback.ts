import type { TeachBack } from "@/domain/pedagogy";
import type { MasteryResult } from "@/domain/experience";

export function scoreTeachBack(text: string, teachBack: TeachBack): MasteryResult {
  const hay = text.toLocaleLowerCase("pt-BR");
  const required = teachBack.rubric.filter((item) => item.required);
  const hit = required.filter((item) => item.keys.some((key) => hay.includes(key.toLocaleLowerCase("pt-BR"))));
  if (hit.length === required.length) return "success";
  if (hit.length > 0) return "almost";
  return "fail";
}

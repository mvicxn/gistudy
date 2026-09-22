import { XP_RULES, type XpRule } from "@/config/xp-rules";
import type { XpGrant } from "@/domain/experience";
import { nextId } from "@/engine/ids";

export function grantXp(rule: XpRule, reason: string, at: string): XpGrant {
  return {
    id: nextId("xp"),
    rule,
    amount: XP_RULES[rule],
    timestamp: at,
    reason,
  };
}

export function totalXp(grants: XpGrant[]) {
  return grants.reduce((sum, grant) => sum + grant.amount, 0);
}

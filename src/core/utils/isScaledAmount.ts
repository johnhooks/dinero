import type { Rate, ScaledAmount } from "../types/mod.ts";

export function isScaledAmount<TAmount>(
  amount: Rate<TAmount>,
): amount is ScaledAmount<TAmount> {
  return (amount as ScaledAmount<TAmount>)?.hasOwnProperty("amount");
}

import type { ScaledAmount } from "../types/mod.ts";

import { isScaledAmount } from "./isScaledAmount.ts";

export function getAmountAndScale<TAmount>(
  value: ScaledAmount<TAmount> | TAmount,
  zero: TAmount,
) {
  if (isScaledAmount(value)) {
    return { amount: value.amount, scale: value?.scale ?? zero };
  }

  return { amount: value, scale: zero };
}

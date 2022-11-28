import type { DivideOperation } from "../types/mod.ts";
import { absolute, isHalf, sign } from "../utils/mod.ts";

import { halfUp } from "./halfUp.ts";
import { up } from "./up.ts";

export const halfAwayFromZero: DivideOperation = (
  amount,
  factor,
  calculator,
) => {
  const signFn = sign(calculator);
  const isHalfFn = isHalf(calculator);
  const absoluteFn = absolute(calculator);

  if (!isHalfFn(amount, factor)) {
    return halfUp(amount, factor, calculator);
  }

  return calculator.multiply(
    signFn(amount),
    up(absoluteFn(amount), factor, calculator),
  );
};

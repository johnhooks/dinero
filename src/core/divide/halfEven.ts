import type { DivideOperation } from "../types/mod.ts";
import { isEven, isHalf } from "../utils/mod.ts";

import { halfUp } from "./halfUp.ts";

export const halfEven: DivideOperation = (amount, factor, calculator) => {
  const isEvenFn = isEven(calculator);
  const isHalfFn = isHalf(calculator);

  const rounded = halfUp(amount, factor, calculator);

  if (!isHalfFn(amount, factor)) {
    return rounded;
  }

  return isEvenFn(rounded) ? rounded : calculator.decrement(rounded);
};

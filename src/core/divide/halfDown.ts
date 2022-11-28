import type { DivideOperation } from "../types/mod.ts";
import { isHalf } from "../utils/mod.ts";

import { down } from "./down.ts";
import { halfUp } from "./halfUp.ts";

export const halfDown: DivideOperation = (amount, factor, calculator) => {
  const isHalfFn = isHalf(calculator);

  if (isHalfFn(amount, factor)) {
    return down(amount, factor, calculator);
  }

  return halfUp(amount, factor, calculator);
};

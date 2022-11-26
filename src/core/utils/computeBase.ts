import type { Calculator } from "../types/mod.ts";

import { isArray } from "./isArray.ts";

export function computeBase<TAmount>(calculator: Calculator<TAmount>) {
  return (base: TAmount | readonly TAmount[]) => {
    if (isArray(base)) {
      return base.reduce((acc, curr) => calculator.multiply(acc, curr));
    }

    return base;
  };
}

import { Big } from "../../test_deps.ts";

import type { Currency } from "../../src/core/mod.ts";

export function castToBigjsCurrency(currency: Currency<number>): Currency<Big> {
  return {
    ...currency,
    base: new Big(currency.base),
    exponent: new Big(currency.exponent),
  };
}

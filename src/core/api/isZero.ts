import type { Calculator, Dinero } from "../types/mod.ts";
import { equal } from "../utils/mod.ts";

export type IsZeroParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export function isZero<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);

  return function _isZero(...[dineroObject]: IsZeroParams<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return equalFn(amount, calculator.zero());
  };
}

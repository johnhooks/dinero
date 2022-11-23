import type { Calculator, Dinero } from "../types/mod.ts";
import { greaterThanOrEqual } from "../utils/mod.ts";

export type IsPositiveParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
];

export function isPositive<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

  return function _isPositive(...[dineroObject]: IsPositiveParams<TAmount>) {
    const { amount } = dineroObject.toJSON();

    return greaterThanOrEqualFn(amount, calculator.zero());
  };
}

import type { Calculator, Dinero } from "../types/mod.ts";
import { computeBase, equal } from "../utils/mod.ts";

export type HasSubUnitsParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
];

export function hasSubUnits<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);
  const computeBaseFn = computeBase(calculator);

  return function _hasSubUnits(...[dineroObject]: HasSubUnitsParams<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const base = computeBaseFn(currency.base);

    return !equalFn(
      calculator.modulo(amount, calculator.power(base, scale)),
      calculator.zero(),
    );
  };
}

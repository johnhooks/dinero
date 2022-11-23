import type { Calculator, Dinero } from "../types/mod.ts";
import { equal } from "../utils/mod.ts";

export type HasSubUnitsParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
];

export function hasSubUnits<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);

  return function _hasSubUnits(...[dineroObject]: HasSubUnitsParams<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();

    return !equalFn(
      calculator.modulo(amount, calculator.power(currency.base, scale)),
      calculator.zero(),
    );
  };
}

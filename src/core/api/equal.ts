import type { Calculator, Dinero } from "../types/mod.ts";

import { haveSameAmount } from "./haveSameAmount.ts";
import { haveSameCurrency } from "./haveSameCurrency.ts";

export type EqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>,
];

export function equal<TAmount>(calculator: Calculator<TAmount>) {
  return function _equal(...[dineroObject, comparator]: EqualParams<TAmount>) {
    return (
      haveSameAmount(calculator)([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}

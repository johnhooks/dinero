import type { Calculator, Dinero } from "../types/mod.ts";
import { equal } from "../utils/mod.ts";

import { normalizeScale } from "./normalizeScale.ts";

export type HaveSameAmountParams<TAmount> = readonly [
  dineroObjects: ReadonlyArray<Dinero<TAmount>>,
];

export function haveSameAmount<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const equalFn = equal(calculator);

  return function _haveSameAmount(
    ...[dineroObjects]: HaveSameAmountParams<TAmount>
  ) {
    const [firstDinero, ...otherDineros] = normalizeFn(dineroObjects);
    const { amount: comparatorAmount } = firstDinero.toJSON();

    return otherDineros.every((d) => {
      const { amount: subjectAmount } = d.toJSON();

      return equalFn(subjectAmount, comparatorAmount);
    });
  };
}

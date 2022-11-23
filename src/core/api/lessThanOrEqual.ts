/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks/mod.ts";
import { assert } from "../helpers/mod.ts";
import type { Calculator, Dinero } from "../types/mod.ts";
import { lessThanOrEqual as lte } from "../utils/mod.ts";

import { haveSameCurrency } from "./haveSameCurrency.ts";
import { normalizeScale } from "./normalizeScale.ts";

export type LessThanOrEqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>,
];

function unsafeLessThanOrEqual<TAmount>(calculator: Calculator<TAmount>) {
  const lessThanOrEqualFn = lte(calculator);

  return function lessThanOrEqual(
    ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export function safeLessThanOrEqual<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const lessThanOrEqualFn = unsafeLessThanOrEqual(calculator);

  return function lessThanOrEqual(
    ...[dineroObject, comparator]: LessThanOrEqualParams<TAmount>
  ) {
    const condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

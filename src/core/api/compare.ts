/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks/mod.ts";
import { assert } from "../helpers/mod.ts";
import type { Calculator, Dinero } from "../types/mod.ts";
import { compare as cmp } from "../utils/mod.ts";

import { haveSameCurrency } from "./haveSameCurrency.ts";
import { normalizeScale } from "./normalizeScale.ts";

export type CompareParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>,
];

function unsafeCompare<TAmount>(calculator: Calculator<TAmount>) {
  const compareFn = cmp(calculator);

  return function compare(
    ...[dineroObject, comparator]: CompareParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return compareFn(subjectAmount, comparatorAmount);
  };
}

export function safeCompare<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const compareFn = unsafeCompare(calculator);

  return function compare(
    ...[dineroObject, comparator]: CompareParams<TAmount>
  ) {
    const condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return compareFn(subjectAmount, comparatorAmount);
  };
}

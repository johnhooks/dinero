/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks/mod.ts";
import { assert } from "../helpers/mod.ts";
import type { Calculator, Dinero } from "../types/mod.ts";
import { greaterThanOrEqual as gte } from "../utils/mod.ts";

import { haveSameCurrency } from "./haveSameCurrency.ts";
import { normalizeScale } from "./normalizeScale.ts";

export type GreaterThanOrEqualParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>,
];

function unsafeGreaterThanOrEqual<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanOrEqualFn = gte(calculator);

  return function greaterThanOrEqual(
    ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export function safeGreaterThanOrEqual<TAmount>(
  calculator: Calculator<TAmount>,
) {
  const normalizeFn = normalizeScale(calculator);
  const greaterThanOrEqualFn = unsafeGreaterThanOrEqual(calculator);

  return function greaterThanOrEqual(
    ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>
  ) {
    const condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

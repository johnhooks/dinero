import type { Calculator } from "../types/mod.ts";

import { equal } from "./equal.ts";
import { greaterThan } from "./greaterThan.ts";

type GreaterThanOrEqualCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a greaterThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThanOrEqual function.
 */
export function greaterThanOrEqual<TAmount>(
  calculator: GreaterThanOrEqualCalculator<TAmount>,
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      greaterThan(calculator)(subject, comparator) ||
      equal(calculator)(subject, comparator)
    );
  };
}

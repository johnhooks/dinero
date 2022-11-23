import type { Calculator } from "../types/mod.ts";

import { equal } from "./equal.ts";
import { lessThan } from "./lessThan.ts";

type LessThanOrEqualCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a lessThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThanOrEqual function.
 */
export function lessThanOrEqual<TAmount>(
  calculator: LessThanOrEqualCalculator<TAmount>,
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      lessThan(calculator)(subject, comparator) ||
      equal(calculator)(subject, comparator)
    );
  };
}

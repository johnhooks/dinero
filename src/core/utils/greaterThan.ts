import { ComparisonOperator } from "../types/mod.ts";
import type { Calculator } from "../types/mod.ts";

type GreaterThanCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a greaterThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThan function.
 */
export function greaterThan<TAmount>(
  calculator: GreaterThanCalculator<TAmount>,
) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.GT;
  };
}

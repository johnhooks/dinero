import { ComparisonOperator } from "../types/mod.ts";
import type { Calculator } from "../types/mod.ts";

type LessThanCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a lessThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThan function.
 */
export function lessThan<TAmount>(calculator: LessThanCalculator<TAmount>) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.LT;
  };
}

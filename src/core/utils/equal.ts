import { ComparisonOperator } from "../types/mod.ts";
import type { Calculator } from "../types/mod.ts";

type EqualCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns an equal function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The equal function.
 */
export function equal<TAmount>(calculator: EqualCalculator<TAmount>) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.EQ;
  };
}

import type { Calculator } from "../types/mod.ts";

import { greaterThan } from "./greaterThan.ts";

type MinimumCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a minimum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The minimum function.
 */
export function minimum<TAmount>(calculator: MinimumCalculator<TAmount>) {
  const greaterThanFn = greaterThan(calculator);

  return (values: readonly TAmount[]) => {
    return values.reduce((acc, curr) => {
      return greaterThanFn(acc, curr) ? curr : acc;
    });
  };
}

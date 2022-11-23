import { isNegative as coreIsNegative } from "../../core/mod.ts";
import type { IsNegativeParams } from "../../core/mod.ts";

/**
 * Check whether a Dinero object is negative.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is negative.
 *
 * @public
 */
export function isNegative<TAmount>(
  ...[dineroObject]: IsNegativeParams<TAmount>
) {
  const { calculator } = dineroObject;
  const isNegativeFn = coreIsNegative(calculator);

  return isNegativeFn(dineroObject);
}

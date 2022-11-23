import { safeGreaterThanOrEqual } from "../../core/mod.ts";
import type { GreaterThanOrEqualParams } from "../../core/mod.ts";

/**
 * Check whether the value of a Dinero object is greater than or equal another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than or equal the other.
 *
 * @public
 */
export function greaterThanOrEqual<TAmount>(
  ...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>
) {
  const { calculator } = dineroObject;
  const greaterThanOrEqualFn = safeGreaterThanOrEqual(calculator);

  return greaterThanOrEqualFn(dineroObject, comparator);
}

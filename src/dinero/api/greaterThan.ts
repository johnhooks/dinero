import { safeGreaterThan } from "../../core/mod.ts";
import type { GreaterThanParams } from "../../core/mod.ts";

/**
 * Check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 *
 * @public
 */
export function greaterThan<TAmount>(
  ...[dineroObject, comparator]: GreaterThanParams<TAmount>
) {
  const { calculator } = dineroObject;
  const greaterThanFn = safeGreaterThan(calculator);

  return greaterThanFn(dineroObject, comparator);
}

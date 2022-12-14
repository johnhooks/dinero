import { isZero as coreIsZero } from "../../core/mod.ts";
import type { IsZeroParams } from "../../core/mod.ts";

/**
 * Check whether the value of a Dinero object is zero.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the value of a Dinero object is zero.
 *
 * @public
 */
export function isZero<TAmount>(...[dineroObject]: IsZeroParams<TAmount>) {
  const { calculator } = dineroObject;
  const isZeroFn = coreIsZero(calculator);

  return isZeroFn(dineroObject);
}

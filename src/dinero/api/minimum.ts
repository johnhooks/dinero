import { safeMinimum } from "../../core/mod.ts";
import type { MinimumParams } from "../../core/mod.ts";

/**
 * Get the lowest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to minimum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function minimum<TAmount>(...[dineroObjects]: MinimumParams<TAmount>) {
  const { calculator } = dineroObjects[0];
  const minimumFn = safeMinimum(calculator);

  return minimumFn(dineroObjects);
}

import { trimScale as coreTrimScale } from "../../core/mod.ts";
import type { TrimScaleParams } from "../../core/mod.ts";

/**
 * Trim a Dinero object's scale as much as possible, down to the currency exponent.
 *
 * @param dineroObject - The Dinero object which scale to trim.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function trimScale<TAmount>(
  ...[dineroObject]: TrimScaleParams<TAmount>
) {
  const { calculator } = dineroObject;
  const trimScaleFn = coreTrimScale(calculator);

  return trimScaleFn(dineroObject);
}

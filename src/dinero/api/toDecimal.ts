import {
  toDecimal as coreToDecimal,
  type ToDecimalParams,
} from "../../core/mod.ts";

/**
 * Get the amount of a Dinero object in decimal form.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns The amount in decimal form.
 *
 * @public
 */
export function toDecimal<TAmount>(
  ...[dineroObject, transformer]: ToDecimalParams<TAmount>
) {
  const { calculator } = dineroObject;
  const toDecimalFn = coreToDecimal<TAmount>(calculator);

  return toDecimalFn(dineroObject, transformer);
}

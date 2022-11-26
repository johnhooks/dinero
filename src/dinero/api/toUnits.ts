import { toUnits as coreToUnits, type ToUnitsParams } from "../../core/mod.ts";

/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject - The Dinero object to format.
 *
 * @returns The amount in units.
 *
 * @public
 */
export function toUnits<TAmount>(
  ...[dineroObject]: ToUnitsParams<TAmount>
) {
  const { calculator } = dineroObject;
  const toUnitsFn = coreToUnits<TAmount>(calculator);

  return toUnitsFn(dineroObject);
}

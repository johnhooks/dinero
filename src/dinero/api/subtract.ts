import { safeSubtract } from "../../core/mod.ts";
import type { SubtractParams } from "../../core/mod.ts";

/**
 * Subtract the passed Dinero objects.
 *
 * @param minuend - The Dinero object to subtract from.
 * @param subtrahend - The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function subtract<TAmount>(
  ...[minuend, subtrahend]: SubtractParams<TAmount>
) {
  const { calculator } = minuend;
  const subtractFn = safeSubtract(calculator);

  return subtractFn(minuend, subtrahend);
}

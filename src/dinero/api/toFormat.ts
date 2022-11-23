import { toFormat as coreToFormat } from "../../core/mod.ts";
import type { ToFormatParams } from "../../core/mod.ts";

/**
 * Format a Dinero object with a custom transformer.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns The object as a formatted string.
 *
 * @public
 */
export function toFormat<TAmount>(
  ...[dineroObject, transformer]: ToFormatParams<TAmount>
) {
  const { calculator } = dineroObject;
  const formatter = coreToFormat(calculator);

  return formatter(dineroObject, transformer);
}

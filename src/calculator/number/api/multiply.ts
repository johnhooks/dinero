import type { BinaryOperation } from "../../../core/mod.ts";

/**
 * Returns the product of two numbers.
 *
 * @param multiplicand - The number to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns The product of the two numbers.
 */
export const multiply: BinaryOperation<number> = (multiplicand, multiplier) => {
  return multiplicand * multiplier;
};

import type { BinaryOperation } from "../../../core/mod.ts";

/**
 * Returns the product of two bigints.
 *
 * @param multiplicand - The bigint to multiply.
 * @param multiplier - The bigint to multiply with.
 *
 * @returns The product of the two bigints.
 */
export const multiply: BinaryOperation<bigint> = (multiplicand, multiplier) => {
  return multiplicand * multiplier;
};

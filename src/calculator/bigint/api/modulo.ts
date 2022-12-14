import type { BinaryOperation } from "../../../core/mod.ts";

/**
 * Returns the remainder of two bigints.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The remainder of the two bigints.
 */
export const modulo: BinaryOperation<bigint> = (dividend, divisor) => {
  return dividend % divisor;
};

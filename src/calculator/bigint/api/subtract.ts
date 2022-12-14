import type { BinaryOperation } from "../../../core/mod.ts";

/**
 * Returns the difference between two bigints.
 *
 * @param minuend - The bigint to subtract from.
 * @param subtrahend - The bigint to subtract.
 *
 * @returns The difference of the two bigints.
 */
export const subtract: BinaryOperation<bigint> = (minuend, subtrahend) => {
  return minuend - subtrahend;
};

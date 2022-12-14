import type { BinaryOperation } from "../../../core/mod.ts";

/**
 * Returns the sum of two bigints.
 *
 * @param augend - The bigint to add to.
 * @param addend - The bigint to add.
 *
 * @returns The sum of the two bigints.
 */
export const add: BinaryOperation<bigint> = (augend, addend) => {
  return augend + addend;
};

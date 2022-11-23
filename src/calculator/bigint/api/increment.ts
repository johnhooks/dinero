import type { UnaryOperation } from "../../../core/mod.ts";

/**
 * Returns an incremented bigint.
 *
 * @param value - The bigint to increment.
 *
 * @returns The incremented bigint.
 */
export const increment: UnaryOperation<bigint> = (value) => {
  return value + 1n;
};

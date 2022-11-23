import type { RoundingMode } from "../types/mod.ts";

/**
 * Round a number with half values up.
 *
 * @param value - The number to round.
 *
 * @returns The rounded number.
 */
export const halfUp: RoundingMode = (value) => {
  return Math.round(value);
};

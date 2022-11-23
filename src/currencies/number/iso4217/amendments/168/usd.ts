import type { Currency } from "../../../../../core/mod.ts";

/**
 * United States dollar.
 */
export const USD: Currency<number> = {
  code: "USD",
  base: 10,
  exponent: 2,
};

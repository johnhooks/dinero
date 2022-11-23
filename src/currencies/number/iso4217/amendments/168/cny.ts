import type { Currency } from "../../../../../core/mod.ts";

/**
 * Renminbi (Chinese) yuan.
 */
export const CNY: Currency<number> = {
  code: "CNY",
  base: 10,
  exponent: 2,
};

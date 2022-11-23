import type { Currency } from "../../src/core/mod.ts";

export function castToBigintCurrency(
  currency: Currency<number>,
): Currency<bigint> {
  return {
    ...currency,
    base: BigInt(currency.base),
    exponent: BigInt(currency.exponent),
  };
}

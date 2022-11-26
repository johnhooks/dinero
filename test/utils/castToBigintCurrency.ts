import type { Currency } from "../../src/core/mod.ts";

export function castToBigintCurrency(
  currency: Currency<number>,
): Currency<bigint> {
  return {
    ...currency,
    base: Array.isArray(currency.base)
      ? currency.base.map(BigInt)
      : BigInt(currency.base as number),
    exponent: BigInt(currency.exponent),
  };
}

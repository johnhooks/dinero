import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { USD } from "../../../currencies/number/mod.ts";
import { Big } from "../../../../test_deps.ts";

import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintDinero,
  createBigjsDinero,
  createNumberDinero,
} from "../../../../test/utils/mod.ts";

import { isZero } from "../isZero.ts";

describe("isZero", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("returns true when amount is equal to 0", () => {
      const d = dinero({ amount: 0, currency: USD });

      assertEquals(isZero(d), true);
    });
    it("returns false when amount is not equal to 0", () => {
      const d = dinero({ amount: 100, currency: USD });

      assertEquals(isZero(d), false);
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns true when amount is equal to 0", () => {
      const d = dinero({ amount: 0n, currency: bigintUSD });

      assertEquals(isZero(d), true);
    });
    it("returns false when amount is not equal to 0", () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });

      assertEquals(isZero(d), false);
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns true when amount is equal to 0", () => {
      const d = dinero({ amount: new Big(0), currency: bigjsUSD });

      assertEquals(isZero(d), true);
    });
    it("returns false when amount is not equal to 0", () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });

      assertEquals(isZero(d), false);
    });
  });
});

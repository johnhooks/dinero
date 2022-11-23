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

import { haveSameAmount } from "../haveSameAmount.ts";

describe("haveSameAmount", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("returns true when amounts are equal", () => {
      const d1 = dinero({ amount: 1000, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD });

      assertEquals(haveSameAmount([d1, d2]), true);
    });
    it("returns false when amounts are not equal", () => {
      const d1 = dinero({ amount: 1000, currency: USD });
      const d2 = dinero({ amount: 2000, currency: USD });

      assertEquals(haveSameAmount([d1, d2]), false);
    });
    it("returns true when amounts are equal once normalized", () => {
      const d1 = dinero({ amount: 1000, currency: USD });
      const d2 = dinero({ amount: 10000, currency: USD, scale: 3 });

      assertEquals(haveSameAmount([d1, d2]), true);
    });
    it("returns false when amounts are not equal once normalized", () => {
      const d1 = dinero({ amount: 10000, currency: USD });
      const d2 = dinero({ amount: 10000, currency: USD, scale: 3 });

      assertEquals(haveSameAmount([d1, d2]), false);
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns true when amounts are equal", () => {
      const d1 = dinero({ amount: 1000n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD });

      assertEquals(haveSameAmount([d1, d2]), true);
    });
    it("returns false when amounts are not equal", () => {
      const d1 = dinero({ amount: 1000n, currency: bigintUSD });
      const d2 = dinero({ amount: 2000n, currency: bigintUSD });

      assertEquals(haveSameAmount([d1, d2]), false);
    });
    it("returns true when amounts are equal once normalized", () => {
      const d1 = dinero({ amount: 1000n, currency: bigintUSD });
      const d2 = dinero({ amount: 10000n, currency: bigintUSD, scale: 3n });

      assertEquals(haveSameAmount([d1, d2]), true);
    });
    it("returns false when amounts are not equal once normalized", () => {
      const d1 = dinero({ amount: 10000n, currency: bigintUSD });
      const d2 = dinero({ amount: 10000n, currency: bigintUSD, scale: 3n });

      assertEquals(haveSameAmount([d1, d2]), false);
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns true when amounts are equal", () => {
      const d1 = dinero({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(1000), currency: bigjsUSD });

      assertEquals(haveSameAmount([d1, d2]), true);
    });
    it("returns false when amounts are not equal", () => {
      const d1 = dinero({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(2000), currency: bigjsUSD });

      assertEquals(haveSameAmount([d1, d2]), false);
    });
    it("returns true when amounts are equal once normalized", () => {
      const d1 = dinero({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(10000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      assertEquals(haveSameAmount([d1, d2]), true);
    });
    it("returns false when amounts are not equal once normalized", () => {
      const d1 = dinero({ amount: new Big(10000), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(10000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      assertEquals(haveSameAmount([d1, d2]), false);
    });
  });
});

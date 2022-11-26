import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { EUR, USD } from "../../../currencies/number/mod.ts";
import { Big } from "../../../../test_deps.ts";

import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintDinero,
  createBigjsDinero,
  createNumberDinero,
} from "../../../../test/utils/mod.ts";

import { haveSameCurrency } from "../haveSameCurrency.ts";

describe("haveSameCurrency", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("returns true when currencies are equal", () => {
      const d1 = dinero({ amount: 2000, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns false when currencies are not equal", () => {
      const d1 = dinero({ amount: 1000, currency: USD });
      const d2 = dinero({ amount: 1000, currency: EUR });

      assertEquals(haveSameCurrency([d1, d2]), false);
    });
    it("returns true when currencies are structurally equal", () => {
      const d1 = dinero({
        amount: 2000,
        currency: {
          code: "USD",
          base: 10,
          exponent: 2,
        },
      });
      const d2 = dinero({
        amount: 1000,
        currency: {
          code: "USD",
          base: 10,
          exponent: 2,
        },
      });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns true when multi-base currencies are structurally equal", () => {
      const GBP = { code: "GBP", base: [20, 12], exponent: 1 };
      const d1 = dinero({ amount: 240, currency: GBP });
      const d2 = dinero({ amount: 240, currency: GBP });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns true when multi-base currencies compute to the same base", () => {
      const d1 = dinero({
        amount: 240,
        currency: { code: "GBP", base: [20, 12], exponent: 1 },
      });
      const d2 = dinero({
        amount: 240,
        currency: { code: "GBP", base: 240, exponent: 1 },
      });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it("returns true when currencies are equal", () => {
      const d1 = dinero({ amount: 2000n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns false when currencies are not equal", () => {
      const d1 = dinero({ amount: 1000n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintEUR });

      assertEquals(haveSameCurrency([d1, d2]), false);
    });
    it("returns true when currencies are structurally equal", () => {
      const d1 = dinero({
        amount: 2000n,
        currency: {
          code: "USD",
          base: 10n,
          exponent: 2n,
        },
      });
      const d2 = dinero({
        amount: 1000n,
        currency: {
          code: "USD",
          base: 10n,
          exponent: 2n,
        },
      });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns true when multi-base currencies are structurally equal", () => {
      const GBP = { code: "GBP", base: [20n, 12n], exponent: 1n };
      const d1 = dinero({ amount: 240n, currency: GBP });
      const d2 = dinero({ amount: 240n, currency: GBP });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns true when multi-base currencies compute to the same base", () => {
      const d1 = dinero({
        amount: 240n,
        currency: { code: "GBP", base: [20n, 12n], exponent: 1n },
      });
      const d2 = dinero({
        amount: 240n,
        currency: { code: "GBP", base: 240n, exponent: 1n },
      });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it("returns true when currencies are equal", () => {
      const d1 = dinero({ amount: new Big(2000), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(1000), currency: bigjsUSD });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns false when currencies are not equal", () => {
      const d1 = dinero({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(1000), currency: bigjsEUR });

      assertEquals(haveSameCurrency([d1, d2]), false);
    });
    it("returns true when currencies are structurally equal", () => {
      const d1 = dinero({
        amount: new Big(2000),
        currency: {
          code: "USD",
          base: new Big(10),
          exponent: new Big(2),
        },
      });
      const d2 = dinero({
        amount: new Big(1000),
        currency: {
          code: "USD",
          base: new Big(10),
          exponent: new Big(2),
        },
      });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns true when multi-base currencies are structurally equal", () => {
      const GBP = {
        code: "GBP",
        base: [new Big(20), new Big(20)],
        exponent: new Big(1),
      };
      const d1 = dinero({ amount: new Big(240), currency: GBP });
      const d2 = dinero({ amount: new Big(240), currency: GBP });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
    it("returns true when multi-base currencies compute to the same base", () => {
      const d1 = dinero({
        amount: new Big(240),
        currency: {
          code: "GBP",
          base: [new Big(20), new Big(12)],
          exponent: new Big(1),
        },
      });
      const d2 = dinero({
        amount: new Big(240),
        currency: { code: "GBP", base: new Big(240), exponent: new Big(1) },
      });

      assertEquals(haveSameCurrency([d1, d2]), true);
    });
  });
});

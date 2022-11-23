import { assertEquals, assertThrows } from "testing/asserts.ts";
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

import { lessThanOrEqual } from "../lessThanOrEqual.ts";

describe("lessThanOrEqual", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("returns true when the first amount is less than the other", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 800, currency: USD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it("returns true when amounts are equal", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it(
      "returns false when the first amount is greater than the other",
      () => {
        const d1 = dinero({ amount: 800, currency: USD });
        const d2 = dinero({ amount: 500, currency: USD });

        assertEquals(lessThanOrEqual(d1, d2), false);
      },
    );
    it("normalizes the result to the highest scale", () => {
      const d1 = dinero({ amount: 5000, currency: USD, scale: 3 });
      const d2 = dinero({ amount: 800, currency: USD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 800, currency: EUR });

      assertThrows(
        () => {
          lessThanOrEqual(d1, d2);
        },
        Error,
        "[Dinero.js] Objects must have the same currency.",
      );
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it("returns true when the first amount is less than the other", () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 800n, currency: bigintUSD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it("returns true when amounts are equal", () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintUSD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it(
      "returns false when the first amount is greater than the other",
      () => {
        const d1 = dinero({ amount: 800n, currency: bigintUSD });
        const d2 = dinero({ amount: 500n, currency: bigintUSD });

        assertEquals(lessThanOrEqual(d1, d2), false);
      },
    );
    it("normalizes the result to the highest scale", () => {
      const d1 = dinero({ amount: 5000n, currency: bigintUSD, scale: 3n });
      const d2 = dinero({ amount: 800n, currency: bigintUSD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 800n, currency: bigintEUR });

      assertThrows(
        () => {
          lessThanOrEqual(d1, d2);
        },
        Error,
        "[Dinero.js] Objects must have the same currency.",
      );
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it("returns true when the first amount is less than the other", () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it("returns true when amounts are equal", () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it(
      "returns false when the first amount is greater than the other",
      () => {
        const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

        assertEquals(lessThanOrEqual(d1, d2), false);
      },
    );
    it("normalizes the result to the highest scale", () => {
      const d1 = dinero({
        amount: new Big(5000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
      const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

      assertEquals(lessThanOrEqual(d1, d2), true);
    });
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(800), currency: bigjsEUR });

      assertThrows(
        () => {
          lessThanOrEqual(d1, d2);
        },
        Error,
        "[Dinero.js] Objects must have the same currency.",
      );
    });
  });
});

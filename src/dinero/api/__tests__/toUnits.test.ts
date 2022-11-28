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

import { toUnits } from "../toUnits.ts";

describe("toUnits", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    describe("decimal currencies", () => {
      it("returns the amount in currency units", () => {
        const d = dinero({ amount: 1050, currency: USD });

        assertEquals(toUnits(d), [10, 50]);
      });
      it("returns the amount in currency units, based on a custom scale", () => {
        const d = dinero({ amount: 10545, currency: USD, scale: 3 });

        assertEquals(toUnits(d), [10, 545]);
      });
      it("returns the amount in currency units, with a single trailing zero", () => {
        const d = dinero({ amount: 1000, currency: USD });

        assertEquals(toUnits(d), [10, 0]);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns the amount in currency units", () => {
        const GRD = { code: "GRD", base: 6, exponent: 1 };
        const d = dinero({ amount: 9, currency: GRD });

        assertEquals(toUnits(d), [1, 3]);
      });
      it("handles currencies with multiple subdivisions", () => {
        const GBP = { code: "GBP", base: [20, 12], exponent: 1 };
        const d = dinero({ amount: 267, currency: GBP });

        assertEquals(toUnits(d), [1, 2, 3]);
      });
      it("handles intermediary zero values", () => {
        const GBP = { code: "GBP", base: [20, 12], exponent: 1 };
        const d = dinero({ amount: 2, currency: GBP });

        assertEquals(toUnits(d), [0, 0, 2]);
      });
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    describe("decimal currencies", () => {
      it("returns the amount in currency units", () => {
        const d = dinero({ amount: 1050n, currency: bigintUSD });

        assertEquals(toUnits(d), [10n, 50n]);
      });
      it("returns the amount in currency units, based on a custom scale", () => {
        const d = dinero({ amount: 10545n, currency: bigintUSD, scale: 3n });

        assertEquals(toUnits(d), [10n, 545n]);
      });
      it("returns the amount in currency units, with a single trailing zero", () => {
        const d = dinero({ amount: 1000n, currency: bigintUSD });

        assertEquals(toUnits(d), [10n, 0n]);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns the amount in currency units", () => {
        const GRD = { code: "GRD", base: 6n, exponent: 1n };
        const d = dinero({ amount: 9n, currency: GRD });

        assertEquals(toUnits(d), [1n, 3n]);
      });
      it("handles currencies with multiple subdivisions", () => {
        const GBP = { code: "GBP", base: [20n, 12n], exponent: 1n };
        const d = dinero({ amount: 267n, currency: GBP });

        assertEquals(toUnits(d), [1n, 2n, 3n]);
      });
      it("handles intermediary zero values", () => {
        const GBP = { code: "GBP", base: [20n, 12n], exponent: 1n };
        const d = dinero({ amount: 2n, currency: GBP });

        assertEquals(toUnits(d), [0n, 0n, 2n]);
      });
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    describe("decimal currencies", () => {
      it("returns the amount in currency units", () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        assertEquals(toUnits(d), [new Big(10), new Big(50)]);
      });
      it("returns the amount in currency units, based on a custom scale", () => {
        const d = dinero({
          amount: new Big(10545),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertEquals(toUnits(d), [new Big(10), new Big(545)]);
      });
      it("returns the amount in currency units, with a single trailing zero", () => {
        const d = dinero({ amount: new Big(1000), currency: bigjsUSD });

        assertEquals(toUnits(d), [new Big(10), new Big(0)]);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns the amount in currency units", () => {
        const GRD = { code: "GRD", base: new Big(6), exponent: new Big(1) };
        const d = dinero({ amount: new Big(9), currency: GRD });

        assertEquals(toUnits(d), [new Big(1), new Big(3)]);
      });
      it("handles currencies with multiple subdivisions", () => {
        const GBP = {
          code: "GBP",
          base: [new Big(20), new Big(12)],
          exponent: new Big(1),
        };
        const d = dinero({ amount: new Big(267), currency: GBP });

        assertEquals(toUnits(d), [new Big(1), new Big(2), new Big(3)]);
      });
      it("handles intermediary zero values", () => {
        const GBP = {
          code: "GBP",
          base: [new Big(20), new Big(12)],
          exponent: new Big(1),
        };
        const d = dinero({ amount: new Big(2), currency: GBP });

        assertEquals(toUnits(d), [new Big(0), new Big(0), new Big(2)]);
      });
    });
  });
});

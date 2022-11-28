import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { MGA, USD } from "../../../currencies/number/mod.ts";
import { Big } from "../../../../test_deps.ts";

import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintDinero,
  createBigjsDinero,
  createNumberDinero,
} from "../../../../test/utils/mod.ts";

import { hasSubUnits } from "../hasSubUnits.ts";

describe("hasSubUnits", () => {
  describe("number", () => {
    const dinero = createNumberDinero;
    const GBP = { code: "GBP", base: [20, 12], exponent: 1 };

    describe("decimal currencies", () => {
      it("returns false when there are no sub-units", () => {
        const d = dinero({ amount: 1100, currency: USD });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units based on a custom scale", () => {
        const d = dinero({ amount: 1100, currency: USD, scale: 3 });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns true when there are sub-units", () => {
        const d = dinero({ amount: 1150, currency: USD });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns false when there are no sub-units based on a custom scale", () => {
        const d = dinero({ amount: 1150, currency: USD, scale: 1 });

        assertEquals(hasSubUnits(d), false);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns false when there are no sub-units", () => {
        const d = dinero({ amount: 10, currency: MGA });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units", () => {
        const d = dinero({ amount: 11, currency: MGA });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns false when there are no sub-units based on a multi-base", () => {
        const d = dinero({ amount: 240, currency: GBP });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units based on a multi-base", () => {
        const d = dinero({ amount: 267, currency: GBP });

        assertEquals(hasSubUnits(d), true);
      });
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintMGA = castToBigintCurrency(MGA);
    const bigintGBP = { code: "GBP", base: [20n, 12n], exponent: 1n };

    describe("decimal currencies", () => {
      it("returns false when there are no sub-units", () => {
        const d = dinero({ amount: 1100n, currency: bigintUSD });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units based on a custom scale", () => {
        const d = dinero({ amount: 1100n, currency: bigintUSD, scale: 3n });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns true when there are sub-units", () => {
        const d = dinero({ amount: 1150n, currency: bigintUSD });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns false when there are no sub-units based on a custom scale", () => {
        const d = dinero({ amount: 1150n, currency: bigintUSD, scale: 1n });

        assertEquals(hasSubUnits(d), false);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns false when there are no sub-units", () => {
        const d = dinero({ amount: 10n, currency: bigintMGA });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units", () => {
        const d = dinero({ amount: 11n, currency: bigintMGA });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns false when there are no sub-units based on a multi-base", () => {
        const d = dinero({ amount: 240n, currency: bigintGBP });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units based on a multi-base", () => {
        const d = dinero({ amount: 267n, currency: bigintGBP });

        assertEquals(hasSubUnits(d), true);
      });
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsMGA = castToBigjsCurrency(MGA);
    const bigjsGBP = {
      code: "GBP",
      base: [new Big(20), new Big(12)],
      exponent: new Big(1),
    };

    describe("decimal currencies", () => {
      it("returns false when there are no sub-units", () => {
        const d = dinero({ amount: new Big(1100), currency: bigjsUSD });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units based on a custom scale", () => {
        const d = dinero({
          amount: new Big(1100),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns true when there are sub-units", () => {
        const d = dinero({ amount: new Big(1150), currency: bigjsUSD });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns false when there are no sub-units based on a custom scale", () => {
        const d = dinero({
          amount: new Big(1150),
          currency: bigjsUSD,
          scale: new Big(1),
        });

        assertEquals(hasSubUnits(d), false);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns false when there are no sub-units", () => {
        const d = dinero({ amount: new Big(10), currency: bigjsMGA });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units", () => {
        const d = dinero({ amount: new Big(11), currency: bigjsMGA });

        assertEquals(hasSubUnits(d), true);
      });
      it("returns false when there are no sub-units based on a multi-base", () => {
        const d = dinero({ amount: new Big(240), currency: bigjsGBP });

        assertEquals(hasSubUnits(d), false);
      });
      it("returns true when there are sub-units based on a multi-base", () => {
        const d = dinero({ amount: new Big(267), currency: bigjsGBP });

        assertEquals(hasSubUnits(d), true);
      });
    });
  });
});

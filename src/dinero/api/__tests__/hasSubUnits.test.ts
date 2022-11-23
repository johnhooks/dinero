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

import { hasSubUnits } from "../hasSubUnits.ts";

describe("hasSubUnits", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("returns false when there are no sub-units", () => {
      const d = dinero({ amount: 1100, currency: USD });

      assertEquals(hasSubUnits(d), false);
    });
    it(
      "returns true when there are sub-units based on a custom scale",
      () => {
        const d = dinero({ amount: 1100, currency: USD, scale: 3 });

        assertEquals(hasSubUnits(d), true);
      },
    );
    it("returns true when there are sub-units", () => {
      const d = dinero({ amount: 1150, currency: USD });

      assertEquals(hasSubUnits(d), true);
    });
    it(
      "returns false when there are no sub-units based on a custom scale",
      () => {
        const d = dinero({ amount: 1150, currency: USD, scale: 1 });

        assertEquals(hasSubUnits(d), false);
      },
    );
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns false when there are no sub-units", () => {
      const d = dinero({ amount: 1100n, currency: bigintUSD });

      assertEquals(hasSubUnits(d), false);
    });
    it(
      "returns true when there are sub-units based on a custom scale",
      () => {
        const d = dinero({ amount: 1100n, currency: bigintUSD, scale: 3n });

        assertEquals(hasSubUnits(d), true);
      },
    );
    it("returns true when there are sub-units", () => {
      const d = dinero({ amount: 1150n, currency: bigintUSD });

      assertEquals(hasSubUnits(d), true);
    });
    it(
      "returns false when there are no sub-units based on a custom scale",
      () => {
        const d = dinero({ amount: 1150n, currency: bigintUSD, scale: 1n });

        assertEquals(hasSubUnits(d), false);
      },
    );
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns false when there are no sub-units", () => {
      const d = dinero({ amount: new Big(1100), currency: bigjsUSD });

      assertEquals(hasSubUnits(d), false);
    });
    it(
      "returns true when there are sub-units based on a custom scale",
      () => {
        const d = dinero({
          amount: new Big(1100),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertEquals(hasSubUnits(d), true);
      },
    );
    it("returns true when there are sub-units", () => {
      const d = dinero({ amount: new Big(1150), currency: bigjsUSD });

      assertEquals(hasSubUnits(d), true);
    });
    it(
      "returns false when there are no sub-units based on a custom scale",
      () => {
        const d = dinero({
          amount: new Big(1150),
          currency: bigjsUSD,
          scale: new Big(1),
        });

        assertEquals(hasSubUnits(d), false);
      },
    );
  });
});

import { assertObjectMatch, assertThrows } from "testing/asserts.ts";
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

import { subtract, toSnapshot } from "../mod.ts";

describe("subtract", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("subtracts positive Dinero objects", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: USD });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: 400,
        currency: USD,
        scale: 2,
      });
    });
    it("subtracts negative Dinero objects", () => {
      const d1 = dinero({ amount: -500, currency: USD });
      const d2 = dinero({ amount: -100, currency: USD });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: -400,
        currency: USD,
        scale: 2,
      });
    });
    it("normalizes the result to the highest scale", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: 4000,
        currency: USD,
        scale: 3,
      });
    });
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: EUR });

      assertThrows(
        () => {
          subtract(d1, d2);
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

    it("subtracts positive Dinero objects", () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 100n, currency: bigintUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: 400n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it("subtracts negative Dinero objects", () => {
      const d1 = dinero({ amount: -500n, currency: bigintUSD });
      const d2 = dinero({ amount: -100n, currency: bigintUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: -400n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it("normalizes the result to the highest scale", () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: 4000n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 100n, currency: bigintEUR });

      assertThrows(
        () => {
          subtract(d1, d2);
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

    it("subtracts positive Dinero objects", () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(100), currency: bigjsUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: new Big(400),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it("subtracts negative Dinero objects", () => {
      const d1 = dinero({ amount: new Big(-500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(-100), currency: bigjsUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: new Big(-400),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it("normalizes the result to the highest scale", () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      const snapshot = toSnapshot(subtract(d1, d2));

      assertObjectMatch(snapshot, {
        amount: new Big(4000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(100), currency: bigjsEUR });

      assertThrows(
        () => {
          subtract(d1, d2);
        },
        Error,
        "[Dinero.js] Objects must have the same currency.",
      );
    });
  });
});

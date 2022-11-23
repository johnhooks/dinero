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

import { maximum, toSnapshot } from "../mod.ts";

describe("maximum", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("returns the greatest from a set of Dinero objects", () => {
      const d1 = dinero({ amount: 150, currency: USD });
      const d2 = dinero({ amount: 50, currency: USD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      assertObjectMatch(snapshot, {
        amount: 150,
        currency: USD,
        scale: 2,
      });
    });
    it(
      "returns the greatest from a set of Dinero objects after normalization",
      () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

        const snapshot = toSnapshot(maximum([d1, d2]));

        assertObjectMatch(snapshot, {
          amount: 5000,
          currency: USD,
          scale: 3,
        });
      },
    );
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: 150, currency: USD });
      const d2 = dinero({ amount: 50, currency: EUR });

      assertThrows(
        () => {
          maximum([d1, d2]);
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

    it("returns the greatest from a set of Dinero objects", () => {
      const d1 = dinero({ amount: 150n, currency: bigintUSD });
      const d2 = dinero({ amount: 50n, currency: bigintUSD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      assertObjectMatch(snapshot, {
        amount: 150n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it(
      "returns the greatest from a set of Dinero objects after normalization",
      () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(maximum([d1, d2]));

        assertObjectMatch(snapshot, {
          amount: 5000n,
          currency: bigintUSD,
          scale: 3n,
        });
      },
    );
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: 150n, currency: bigintUSD });
      const d2 = dinero({ amount: 50n, currency: bigintEUR });

      assertThrows(
        () => {
          maximum([d1, d2]);
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

    it("returns the greatest from a set of Dinero objects", () => {
      const d1 = dinero({ amount: new Big(150), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(50), currency: bigjsUSD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      assertObjectMatch(snapshot, {
        amount: new Big(150),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it(
      "returns the greatest from a set of Dinero objects after normalization",
      () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({
          amount: new Big(1000),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(maximum([d1, d2]));

        assertObjectMatch(snapshot, {
          amount: new Big(5000),
          currency: bigjsUSD,
          scale: new Big(3),
        });
      },
    );
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: new Big(150), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(50), currency: bigjsEUR });

      assertThrows(
        () => {
          maximum([d1, d2]);
        },
        Error,
        "[Dinero.js] Objects must have the same currency.",
      );
    });
  });
});

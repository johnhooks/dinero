import { assertObjectMatch, assertThrows } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { EUR, MGA, MRU, USD } from "../../../currencies/number/mod.ts";
import { Big } from "../../../../test_deps.ts";
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintDinero,
  createBigjsDinero,
  createNumberDinero,
} from "../../../../test/utils/mod.ts";

import { add, toSnapshot } from "../mod.ts";

describe("add", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    describe("decimal currencies", () => {
      it("adds up positive Dinero objects", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 100, currency: USD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 600,
          currency: USD,
          scale: 2,
        });
      });
      it("adds up negative Dinero objects", () => {
        const d1 = dinero({ amount: -500, currency: USD });
        const d2 = dinero({ amount: -100, currency: USD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: -600,
          currency: USD,
          scale: 2,
        });
      });
      it("normalizes the result to the highest scale", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 6000,
          currency: USD,
          scale: 3,
        });
      });
      it("throws when using different currencies", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 100, currency: EUR });

        assertThrows(
          () => {
            add(d1, d2);
          },
          Error,
          `[Dinero.js] Objects must have the same currency.`,
        );
      });
    });
    describe("non-decimal currencies", () => {
      it("adds up positive Dinero objects", () => {
        const d1 = dinero({ amount: 8, currency: MGA });
        const d2 = dinero({ amount: 3, currency: MGA });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 11,
          currency: MGA,
          scale: 1,
        });
      });
      it("adds up negative Dinero objects", () => {
        const d1 = dinero({ amount: -8, currency: MGA });
        const d2 = dinero({ amount: -3, currency: MGA });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: -11,
          currency: MGA,
          scale: 1,
        });
      });
      it("normalizes the result to the highest scale", () => {
        const d1 = dinero({ amount: 8, currency: MGA });
        const d2 = dinero({ amount: 10, currency: MGA, scale: 2 });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 50,
          currency: MGA,
          scale: 2,
        });
      });
      it("throws when using different currencies", () => {
        const d1 = dinero({ amount: 8, currency: MRU });
        const d2 = dinero({ amount: 8, currency: MGA });

        assertThrows(
          () => {
            add(d1, d2);
          },
          Error,
          `[Dinero.js] Objects must have the same currency.`,
        );
      });
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);
    const bigintMGA = castToBigintCurrency(MGA);
    const bigintMRU = castToBigintCurrency(MRU);

    describe("decimal currencies", () => {
      it("adds up positive Dinero objects", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 100n, currency: bigintUSD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 600n,
          currency: bigintUSD,
          scale: 2n,
        });
      });
      it("adds up positive Dinero objects with large integers", () => {
        const d1 = dinero({
          amount: 1000000000000000050n,
          currency: bigintUSD,
        });
        const d2 = dinero({ amount: 10n, currency: bigintUSD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 1000000000000000060n,
          currency: bigintUSD,
          scale: 2n,
        });
      });
      it("adds up negative Dinero objects", () => {
        const d1 = dinero({ amount: -500n, currency: bigintUSD });
        const d2 = dinero({ amount: -100n, currency: bigintUSD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: -600n,
          currency: bigintUSD,
          scale: 2n,
        });
      });
      it("adds up negative Dinero objects with large integers", () => {
        const d1 = dinero({
          amount: -1000000000000000050n,
          currency: bigintUSD,
        });
        const d2 = dinero({ amount: -10n, currency: bigintUSD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: -1000000000000000060n,
          currency: bigintUSD,
          scale: 2n,
        });
      });
      it("normalizes the result to the highest scale", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 6000n,
          currency: bigintUSD,
          scale: 3n,
        });
      });
      it("throws when using different currencies", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 100n, currency: bigintEUR });

        assertThrows(
          () => {
            add(d1, d2);
          },
          Error,
          `[Dinero.js] Objects must have the same currency.`,
        );
      });
    });
    describe("non-decimal currencies", () => {
      it("adds up positive Dinero objects", () => {
        const d1 = dinero({ amount: 8n, currency: bigintMGA });
        const d2 = dinero({ amount: 3n, currency: bigintMGA });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 11n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it("adds up negative Dinero objects", () => {
        const d1 = dinero({ amount: -8n, currency: bigintMGA });
        const d2 = dinero({ amount: -3n, currency: bigintMGA });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: -11n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it("normalizes the result to the highest scale", () => {
        const d1 = dinero({ amount: 8n, currency: bigintMGA });
        const d2 = dinero({ amount: 10n, currency: bigintMGA, scale: 2n });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: 50n,
          currency: bigintMGA,
          scale: 2n,
        });
      });
      it("throws when using different currencies", () => {
        const d1 = dinero({ amount: 8n, currency: bigintMRU });
        const d2 = dinero({ amount: 8n, currency: bigintMGA });

        assertThrows(
          () => {
            add(d1, d2);
          },
          Error,
          `[Dinero.js] Objects must have the same currency.`,
        );
      });
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);
    const bigjsMGA = castToBigjsCurrency(MGA);
    const bigjsMRU = castToBigjsCurrency(MRU);

    describe("decimal currencies", () => {
      it("adds up positive Dinero objects", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(100), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: new Big(600),
          currency: bigjsUSD,
          scale: new Big(2),
        });
      });
      it("adds up positive Dinero objects with large integers", () => {
        const d1 = dinero({
          amount: new Big("1000000000000000050"),
          currency: bigjsUSD,
        });
        const d2 = dinero({ amount: new Big(10), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: new Big("1000000000000000060"),
          currency: bigjsUSD,
          scale: new Big(2),
        });
      });
      it("adds up negative Dinero objects", () => {
        const d1 = dinero({ amount: new Big(-500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(-100), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: new Big(-600),
          currency: bigjsUSD,
          scale: new Big(2),
        });
      });
      it("adds up negative Dinero objects with large integers", () => {
        const d1 = dinero({
          amount: new Big("-1000000000000000050"),
          currency: bigjsUSD,
        });
        const d2 = dinero({ amount: new Big(-10), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: new Big("-1000000000000000060"),
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

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: new Big(6000),
          currency: bigjsUSD,
          scale: new Big(3),
        });
      });
      it("throws when using different currencies", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(100), currency: bigjsEUR });

        assertThrows(
          () => {
            add(d1, d2);
          },
          Error,
          `[Dinero.js] Objects must have the same currency.`,
        );
      });
    });
    describe("non-decimal currencies", () => {
      it("adds up positive Dinero objects", () => {
        const d1 = dinero({ amount: new Big(8), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(3), currency: bigjsMGA });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: new Big(11),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it("adds up negative Dinero objects", () => {
        const d1 = dinero({ amount: new Big(-8), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(-3), currency: bigjsMGA });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: new Big(-11),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it("normalizes the result to the highest scale", () => {
        const d1 = dinero({ amount: new Big(8), currency: bigjsMGA });
        const d2 = dinero({
          amount: new Big(10),
          currency: bigjsMGA,
          scale: new Big(2),
        });

        const snapshot = toSnapshot(add(d1, d2));

        assertObjectMatch(snapshot, {
          amount: new Big(50),
          currency: bigjsMGA,
          scale: new Big(2),
        });
      });
      it("throws when using different currencies", () => {
        const d1 = dinero({ amount: new Big(8), currency: bigjsMRU });
        const d2 = dinero({ amount: new Big(8), currency: bigjsMGA });

        assertThrows(
          () => {
            add(d1, d2);
          },
          Error,
          `[Dinero.js] Objects must have the same currency.`,
        );
      });
    });
  });
});

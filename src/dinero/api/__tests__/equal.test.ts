import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { EUR, MGA, USD } from "../../../currencies/number/mod.ts";
import { Big } from "../../../../test_deps.ts";

import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintDinero,
  createBigjsDinero,
  createNumberDinero,
} from "../../../../test/utils/mod.ts";

import { equal } from "../equal.ts";

describe("equal", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    describe("decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 500, currency: USD });

        assertEquals(equal(d1, d2), true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 800, currency: USD });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 500, currency: EUR });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 800, currency: EUR });

        assertEquals(equal(d1, d2), false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 5000, currency: USD, scale: 3 });

        assertEquals(equal(d1, d2), true);
      });
      it(
        "returns false when amounts are not equal after normalization",
        () => {
          const d1 = dinero({ amount: 500, currency: USD });
          const d2 = dinero({ amount: 500, currency: USD, scale: 3 });

          assertEquals(equal(d1, d2), false);
        },
      );
    });
    describe("non-decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = dinero({ amount: 5, currency: MGA });
        const d2 = dinero({ amount: 5, currency: MGA });

        assertEquals(equal(d1, d2), true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = dinero({ amount: 5, currency: MGA });
        const d2 = dinero({ amount: 8, currency: MGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 500, currency: MGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 8, currency: MGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = dinero({ amount: 5, currency: MGA });
        const d2 = dinero({ amount: 25, currency: MGA, scale: 2 });

        assertEquals(equal(d1, d2), true);
      });
      it(
        "returns false when amounts are not equal after normalization",
        () => {
          const d1 = dinero({ amount: 25, currency: MGA });
          const d2 = dinero({ amount: 25, currency: MGA, scale: 2 });

          assertEquals(equal(d1, d2), false);
        },
      );
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);
    const bigintMGA = castToBigintCurrency(MGA);

    describe("decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 500n, currency: bigintUSD });

        assertEquals(equal(d1, d2), true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 800n, currency: bigintUSD });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 500n, currency: bigintEUR });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 800n, currency: bigintEUR });

        assertEquals(equal(d1, d2), false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 5000n, currency: bigintUSD, scale: 3n });

        assertEquals(equal(d1, d2), true);
      });
      it(
        "returns false when amounts are not equal after normalization",
        () => {
          const d1 = dinero({ amount: 500n, currency: bigintUSD });
          const d2 = dinero({ amount: 500n, currency: bigintUSD, scale: 3n });

          assertEquals(equal(d1, d2), false);
        },
      );
    });
    describe("non-decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = dinero({ amount: 5n, currency: bigintMGA });
        const d2 = dinero({ amount: 5n, currency: bigintMGA });

        assertEquals(equal(d1, d2), true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = dinero({ amount: 5n, currency: bigintMGA });
        const d2 = dinero({ amount: 8n, currency: bigintMGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 500n, currency: bigintMGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 8n, currency: bigintMGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = dinero({ amount: 5n, currency: bigintMGA });
        const d2 = dinero({ amount: 25n, currency: bigintMGA, scale: 2n });

        assertEquals(equal(d1, d2), true);
      });
      it(
        "returns false when amounts are not equal after normalization",
        () => {
          const d1 = dinero({ amount: 25n, currency: bigintMGA });
          const d2 = dinero({ amount: 25n, currency: bigintMGA, scale: 2n });

          assertEquals(equal(d1, d2), false);
        },
      );
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);
    const bigjsMGA = castToBigjsCurrency(MGA);

    describe("decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

        assertEquals(equal(d1, d2), true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(500), currency: bigjsEUR });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(800), currency: bigjsEUR });

        assertEquals(equal(d1, d2), false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({
          amount: new Big(5000),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertEquals(equal(d1, d2), true);
      });
      it(
        "returns false when amounts are not equal after normalization",
        () => {
          const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
          const d2 = dinero({
            amount: new Big(500),
            currency: bigjsUSD,
            scale: new Big(3),
          });

          assertEquals(equal(d1, d2), false);
        },
      );
    });
    describe("non-decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = dinero({ amount: new Big(5), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(5), currency: bigjsMGA });

        assertEquals(equal(d1, d2), true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = dinero({ amount: new Big(5), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(8), currency: bigjsMGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(500), currency: bigjsMGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(8), currency: bigjsMGA });

        assertEquals(equal(d1, d2), false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = dinero({ amount: new Big(5), currency: bigjsMGA });
        const d2 = dinero({
          amount: new Big(25),
          currency: bigjsMGA,
          scale: new Big(2),
        });

        assertEquals(equal(d1, d2), true);
      });
      it(
        "returns false when amounts are not equal after normalization",
        () => {
          const d1 = dinero({ amount: new Big(25), currency: bigjsMGA });
          const d2 = dinero({
            amount: new Big(25),
            currency: bigjsMGA,
            scale: new Big(2),
          });

          assertEquals(equal(d1, d2), false);
        },
      );
    });
  });
});

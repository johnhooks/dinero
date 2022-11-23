import { assertObjectMatch } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { EUR, IQD, MGA, MRU, USD } from "../../../currencies/number/mod.ts";
import { Big } from "../../../../test_deps.ts";

import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintDinero,
  createBigjsDinero,
  createNumberDinero,
} from "../../../../test/utils/mod.ts";

import { convert, toSnapshot } from "../mod.ts";

describe("convert", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    describe("decimal currencies", () => {
      it("converts a Dinero object to another currency", () => {
        const d = dinero({ amount: 500, currency: USD });

        const converted = convert(d, EUR, {
          EUR: {
            amount: 89,
            scale: 2,
          },
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: 44500,
          currency: EUR,
          scale: 4,
        });
      });
      it("uses the destination currency's exponent as scale", () => {
        const d = dinero({ amount: 500, currency: USD });

        const converted = convert(d, IQD, {
          IQD: 1199,
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: 5995000,
          currency: IQD,
          scale: 3,
        });
      });
    });
    describe("non-decimal currencies", () => {
      it("converts a Dinero object to another currency", () => {
        const d = dinero({ amount: 1, currency: MRU });

        const converted = convert(d, MGA, {
          MGA: 108,
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: 108,
          currency: MGA,
          scale: 1,
        });
      });
      it("converts to the safest scale", () => {
        const d = dinero({ amount: 100, currency: USD });

        const converted = convert(d, MGA, {
          MGA: {
            amount: 3912566,
            scale: 3,
          },
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: 391256600,
          currency: MGA,
          scale: 5,
        });
      });
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);
    const bigintIQD = castToBigintCurrency(IQD);
    const bigintMGA = castToBigintCurrency(MGA);
    const bigintMRU = castToBigintCurrency(MRU);

    describe("decimal currencies", () => {
      it("converts a Dinero object to another currency", () => {
        const d = dinero({ amount: 500n, currency: bigintUSD });

        const converted = convert(d, bigintEUR, {
          EUR: {
            amount: 89n,
            scale: 2n,
          },
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: 44500n,
          currency: bigintEUR,
          scale: 4n,
        });
      });
      it("uses the destination currency's exponent as scale", () => {
        const d = dinero({ amount: 500n, currency: bigintUSD });

        const converted = convert(d, bigintIQD, {
          IQD: 1199n,
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: 5995000n,
          currency: bigintIQD,
          scale: 3n,
        });
      });
    });
    describe("non-decimal currencies", () => {
      it("converts a Dinero object to another currency", () => {
        const d = dinero({ amount: 1n, currency: bigintMRU });

        const converted = convert(d, bigintMGA, {
          MGA: 108n,
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: 108n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it("converts to the safest scale", () => {
        const d = dinero({ amount: 100n, currency: bigintUSD });

        const converted = convert(d, bigintMGA, {
          MGA: {
            amount: 3912566n,
            scale: 3n,
          },
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: 391256600n,
          currency: bigintMGA,
          scale: 5n,
        });
      });
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);
    const bigjsIQD = castToBigjsCurrency(IQD);
    const bigjsMGA = castToBigjsCurrency(MGA);
    const bigjsMRU = castToBigjsCurrency(MRU);

    describe("decimal currencies", () => {
      it("converts a Dinero object to another currency", () => {
        const d = dinero({ amount: new Big(500), currency: bigjsUSD });

        const converted = convert(d, bigjsEUR, {
          EUR: {
            amount: new Big(89),
            scale: new Big(2),
          },
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: new Big(44500),
          currency: bigjsEUR,
          scale: new Big(4),
        });
      });
      it("uses the destination currency's exponent as scale", () => {
        const d = dinero({ amount: new Big(500), currency: bigjsUSD });

        const converted = convert(d, bigjsIQD, {
          IQD: new Big(1199),
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: new Big(5995000),
          currency: bigjsIQD,
          scale: new Big(3),
        });
      });
    });
    describe("non-decimal currencies", () => {
      it("converts a Dinero object to another currency", () => {
        const d = dinero({ amount: new Big(1), currency: bigjsMRU });

        const converted = convert(d, bigjsMGA, {
          MGA: new Big(108),
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: new Big(108),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it("converts to the safest scale", () => {
        const d = dinero({ amount: new Big(100), currency: bigjsUSD });

        const converted = convert(d, bigjsMGA, {
          MGA: {
            amount: new Big(3912566),
            scale: new Big(3),
          },
        });

        assertObjectMatch(toSnapshot(converted), {
          amount: new Big(391256600),
          currency: bigjsMGA,
          scale: new Big(5),
        });
      });
    });
  });
});

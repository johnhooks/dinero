import { assertObjectMatch } from "testing/asserts.ts";
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

import { toSnapshot } from "../toSnapshot.ts";

describe("toSnapshot", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("returns an object literal with the right data", () => {
      const d = dinero({ amount: 500, currency: USD });

      assertObjectMatch(toSnapshot(d), {
        amount: 500,
        currency: {
          code: "USD",
          base: 10,
          exponent: 2,
        },
        scale: 2,
      });
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns an object literal with the right data", () => {
      const d = dinero({ amount: 500n, currency: bigintUSD });

      assertObjectMatch(toSnapshot(d), {
        amount: 500n,
        currency: {
          code: "USD",
          base: 10n,
          exponent: 2n,
        },
        scale: 2n,
      });
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns an object literal with the right data", () => {
      const d = dinero({ amount: new Big(500), currency: bigjsUSD });

      assertObjectMatch(toSnapshot(d), {
        amount: new Big(500),
        currency: {
          code: "USD",
          base: new Big(10),
          exponent: new Big(2),
        },
        scale: new Big(2),
      });
    });
  });
});

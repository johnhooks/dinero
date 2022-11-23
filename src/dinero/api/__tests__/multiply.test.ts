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

import { multiply, toSnapshot } from "../mod.ts";

describe("multiply", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("multiplies positive Dinero objects", () => {
      const d = dinero({ amount: 400, currency: USD });

      const snapshot = toSnapshot(multiply(d, 4));

      assertObjectMatch(snapshot, {
        amount: 1600,
        scale: 2,
        currency: USD,
      });
    });
    it("converts the multiplied amount to the safest scale", () => {
      const d = dinero({ amount: 401, currency: USD });

      const snapshot = toSnapshot(multiply(d, { amount: 2001, scale: 3 }));

      assertObjectMatch(snapshot, {
        amount: 802401,
        scale: 5,
        currency: USD,
      });
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it("multiplies positive Dinero objects", () => {
      const d = dinero({ amount: 400n, currency: bigintUSD });

      const snapshot = toSnapshot(multiply(d, 4n));

      assertObjectMatch(snapshot, {
        amount: 1600n,
        scale: 2n,
        currency: bigintUSD,
      });
    });
    it("converts the multiplied amount to the safest scale", () => {
      const d = dinero({ amount: 401n, currency: bigintUSD });

      const snapshot = toSnapshot(multiply(d, { amount: 2001n, scale: 3n }));

      assertObjectMatch(snapshot, {
        amount: 802401n,
        scale: 5n,
        currency: bigintUSD,
      });
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("multiplies positive Dinero objects", () => {
      const d = dinero({ amount: new Big(400), currency: bigjsUSD });

      const snapshot = toSnapshot(multiply(d, new Big(4)));

      assertObjectMatch(snapshot, {
        amount: new Big(1600),
        scale: new Big(2),
        currency: bigjsUSD,
      });
    });
    it("converts the multiplied amount to the safest scale", () => {
      const d = dinero({ amount: new Big(401), currency: bigjsUSD });

      const snapshot = toSnapshot(
        multiply(d, { amount: new Big(2001), scale: new Big(3) }),
      );

      assertObjectMatch(snapshot, {
        amount: new Big(802401),
        scale: new Big(5),
        currency: bigjsUSD,
      });
    });
  });
});

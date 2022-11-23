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

import { normalizeScale, toSnapshot } from "../mod.ts";

describe("normalizeScale", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it(
      "returns an array of Dinero objects with normalized scale and converted amount",
      () => {
        const d1 = dinero({ amount: 100, currency: USD, scale: 2 });
        const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

        const [firstDineroObject, secondDineroObject] = normalizeScale([
          d1,
          d2,
        ]);

        assertObjectMatch(toSnapshot(firstDineroObject), {
          amount: 1000,
          currency: USD,
          scale: 3,
        });
        assertObjectMatch(toSnapshot(secondDineroObject), {
          amount: 1000,
          currency: USD,
          scale: 3,
        });
      },
    );
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it(
      "returns an array of Dinero objects with normalized scale and converted amount",
      () => {
        const d1 = dinero({ amount: 100n, currency: bigintUSD, scale: 2n });
        const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

        const [firstDineroObject, secondDineroObject] = normalizeScale([
          d1,
          d2,
        ]);

        assertObjectMatch(toSnapshot(firstDineroObject), {
          amount: 1000n,
          currency: bigintUSD,
          scale: 3n,
        });
        assertObjectMatch(toSnapshot(secondDineroObject), {
          amount: 1000n,
          currency: bigintUSD,
          scale: 3n,
        });
      },
    );
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it(
      "returns an array of Dinero objects with normalized scale and converted amount",
      () => {
        const d1 = dinero({
          amount: new Big(100),
          currency: bigjsUSD,
          scale: new Big(2),
        });
        const d2 = dinero({
          amount: new Big(1000),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const [firstDineroObject, secondDineroObject] = normalizeScale([
          d1,
          d2,
        ]);

        assertObjectMatch(toSnapshot(firstDineroObject), {
          amount: new Big(1000),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        assertObjectMatch(toSnapshot(secondDineroObject), {
          amount: new Big(1000),
          currency: bigjsUSD,
          scale: new Big(3),
        });
      },
    );
  });
});

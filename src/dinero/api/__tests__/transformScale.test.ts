import { assertObjectMatch } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";
import { assertSpyCall, spy } from "testing/mock.ts";

import { MGA, USD } from "../../../currencies/number/mod.ts";
import { Big } from "../../../../test_deps.ts";
import {
  bigintCalculator,
  bigjsCalculator,
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintDinero,
  createBigjsDinero,
  createNumberDinero,
} from "../../../../test/utils/mod.ts";

import {
  down,
  halfAwayFromZero,
  halfDown,
  halfEven,
  halfOdd,
  halfTowardsZero,
  halfUp,
  up,
} from "../../../core/mod.ts";

import { toSnapshot, transformScale } from "../mod.ts";
import { calculator } from "../../../calculator/number/calculator.ts";

type DivideOperation = Parameters<typeof transformScale>[2];

describe("transformScale", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    describe("decimal currencies", () => {
      it("returns a new Dinero object with a new scale and a converted amount", () => {
        const d = dinero({ amount: 500, currency: USD, scale: 2 });
        const snapshot = toSnapshot(transformScale(d, 4));

        assertObjectMatch(snapshot, { amount: 50000, scale: 4 });
      });
      it("returns a new Dinero object with a new scale and a converted, rounded down amount", () => {
        const d = dinero({ amount: 14270, currency: USD, scale: 2 });
        const snapshot = toSnapshot(transformScale(d, 0));

        assertObjectMatch(snapshot, { amount: 142, scale: 0 });
      });
      it("converts between scales correctly", () => {
        const d = dinero({ amount: 333336, currency: USD, scale: 5 });
        const snapshot = toSnapshot(transformScale(d, 2));

        assertObjectMatch(snapshot, { amount: 333, scale: 2 });
      });
      it("converts from long initial scales correctly", () => {
        const d = dinero({ amount: 3333333336, currency: USD, scale: 9 });
        const snapshot = toSnapshot(transformScale(d, 2));

        assertObjectMatch(snapshot, { amount: 333, scale: 2 });
      });
      it("uses the provided `up` divide function", () => {
        const d = dinero({ amount: 10455, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d, 2, up));

        assertObjectMatch(snapshot, { amount: 1046, scale: 2 });
      });
      it("uses the provided `down` divide function", () => {
        const d = dinero({ amount: 10455, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d, 2, down));

        assertObjectMatch(snapshot, { amount: 1045, scale: 2 });
      });
      it("uses the provided `halfOdd` divide function", () => {
        const d1 = dinero({ amount: 10415, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 10425, currency: USD, scale: 3 });

        assertObjectMatch(toSnapshot(transformScale(d1, 2, halfOdd)), {
          amount: 1041,
          scale: 2,
        });
        assertObjectMatch(toSnapshot(transformScale(d2, 2, halfOdd)), {
          amount: 1043,
          scale: 2,
        });
      });
      it("uses the provided `halfEven` divide function", () => {
        const d1 = dinero({ amount: 10425, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 10435, currency: USD, scale: 3 });

        assertObjectMatch(toSnapshot(transformScale(d1, 2, halfEven)), {
          amount: 1042,
          scale: 2,
        });
        assertObjectMatch(toSnapshot(transformScale(d2, 2, halfEven)), {
          amount: 1044,
          scale: 2,
        });
      });
      it("uses the provided `halfDown` divide function", () => {
        const d1 = dinero({ amount: 10455, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 10456, currency: USD, scale: 3 });

        assertObjectMatch(toSnapshot(transformScale(d1, 2, halfDown)), {
          amount: 1045,
          scale: 2,
        });
        assertObjectMatch(toSnapshot(transformScale(d2, 2, halfDown)), {
          amount: 1046,
          scale: 2,
        });
      });
      it("uses the provided `halfUp` divide function", () => {
        const d1 = dinero({ amount: 10454, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 10455, currency: USD, scale: 3 });

        assertObjectMatch(toSnapshot(transformScale(d1, 2, halfUp)), {
          amount: 1045,
          scale: 2,
        });
        assertObjectMatch(toSnapshot(transformScale(d2, 2, halfUp)), {
          amount: 1046,
          scale: 2,
        });
      });
      it("uses the provided `halfTowardsZero` divide function", () => {
        const d1 = dinero({ amount: 10415, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d1, 2, halfTowardsZero));

        assertObjectMatch(snapshot, {
          amount: 1041,
          scale: 2,
        });
      });
      it("uses the provided `halfAwayFromZero` divide function", () => {
        const d1 = dinero({ amount: 10415, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d1, 2, halfAwayFromZero));

        assertObjectMatch(snapshot, {
          amount: 1042,
          scale: 2,
        });
      });
      it("uses a custom divide function", () => {
        const divideFn = spy(() => 1045);
        const d = dinero({ amount: 10455, currency: USD, scale: 3 });

        const snapshot = toSnapshot(
          transformScale(d, 2, divideFn as DivideOperation),
        );

        assertObjectMatch(snapshot, { amount: 1045, scale: 2 });
        assertSpyCall(divideFn, 0, {
          args: [
            10455,
            10,
            calculator,
          ],
          returned: 1045,
        });
      });
    });
    describe("non-decimal currencies", () => {
      it("returns a new Dinero object with a new scale and a converted amount", () => {
        const d = dinero({ amount: 5, currency: MGA });
        const snapshot = toSnapshot(transformScale(d, 2));

        assertObjectMatch(snapshot, { amount: 25, scale: 2 });
      });
      it("returns a new Dinero object with a new scale and a converted, rounded down amount", () => {
        const d = dinero({ amount: 26, currency: MGA, scale: 2 });
        const snapshot = toSnapshot(transformScale(d, 1));

        assertObjectMatch(snapshot, { amount: 5, scale: 1 });
      });
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    describe("decimal currencies", () => {
      it("returns a new Dinero object with a new scale and a converted amount", () => {
        const d = dinero({ amount: 500n, currency: bigintUSD, scale: 2n });
        const snapshot = toSnapshot(transformScale(d, 4n));

        assertObjectMatch(snapshot, { amount: 50000n, scale: 4n });
      });
      it("returns a new Dinero object with a new scale and a converted, rounded down amount", () => {
        const d = dinero({ amount: 14270n, currency: bigintUSD, scale: 2n });
        const snapshot = toSnapshot(transformScale(d, 0n));

        assertObjectMatch(snapshot, { amount: 142n, scale: 0n });
      });
      it("converts between scales correctly", () => {
        const d = dinero({ amount: 333336n, currency: bigintUSD, scale: 5n });
        const snapshot = toSnapshot(transformScale(d, 2n));

        assertObjectMatch(snapshot, { amount: 333n, scale: 2n });
      });
      it("converts from long initial scales correctly", () => {
        const d = dinero({
          amount: 3333333336n,
          currency: bigintUSD,
          scale: 9n,
        });
        const snapshot = toSnapshot(transformScale(d, 2n));

        assertObjectMatch(snapshot, { amount: 333n, scale: 2n });
      });
      it("uses the provided `up` divide function", () => {
        const d = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d, 2n, up));

        assertObjectMatch(snapshot, { amount: 1046n, scale: 2n });
      });
      it("uses the provided `down` divide function", () => {
        const d = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d, 2n, down));

        assertObjectMatch(snapshot, { amount: 1045n, scale: 2n });
      });
      it("uses the provided `halfOdd` divide function", () => {
        const d1 = dinero({ amount: 10415n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 10425n, currency: bigintUSD, scale: 3n });

        assertObjectMatch(toSnapshot(transformScale(d1, 2n, halfOdd)), {
          amount: 1041n,
          scale: 2n,
        });
        assertObjectMatch(toSnapshot(transformScale(d2, 2n, halfOdd)), {
          amount: 1043n,
          scale: 2n,
        });
      });
      it("uses the provided `halfEven` divide function", () => {
        const d1 = dinero({ amount: 10425n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 10435n, currency: bigintUSD, scale: 3n });

        assertObjectMatch(toSnapshot(transformScale(d1, 2n, halfEven)), {
          amount: 1042n,
          scale: 2n,
        });
        assertObjectMatch(toSnapshot(transformScale(d2, 2n, halfEven)), {
          amount: 1044n,
          scale: 2n,
        });
      });
      it("uses the provided `halfDown` divide function", () => {
        const d1 = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 10456n, currency: bigintUSD, scale: 3n });

        assertObjectMatch(toSnapshot(transformScale(d1, 2n, halfDown)), {
          amount: 1045n,
          scale: 2n,
        });
        assertObjectMatch(toSnapshot(transformScale(d2, 2n, halfDown)), {
          amount: 1046n,
          scale: 2n,
        });
      });
      it("uses the provided `halfUp` divide function", () => {
        const d1 = dinero({ amount: 10454n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });

        assertObjectMatch(toSnapshot(transformScale(d1, 2n, halfUp)), {
          amount: 1045n,
          scale: 2n,
        });
        assertObjectMatch(toSnapshot(transformScale(d2, 2n, halfUp)), {
          amount: 1046n,
          scale: 2n,
        });
      });
      it("uses the provided `halfTowardsZero` divide function", () => {
        const d1 = dinero({ amount: 10415n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d1, 2n, halfTowardsZero));

        assertObjectMatch(snapshot, {
          amount: 1041n,
          scale: 2n,
        });
      });
      it("uses the provided `halfAwayFromZero` divide function", () => {
        const d1 = dinero({ amount: 10415n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d1, 2n, halfAwayFromZero));

        assertObjectMatch(snapshot, {
          amount: 1042n,
          scale: 2n,
        });
      });
      it("uses a custom divide function", () => {
        const divideFn = spy(() => 1045n);
        const d = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(
          transformScale(d, 2n, divideFn as DivideOperation),
        );

        assertObjectMatch(snapshot, { amount: 1045n, scale: 2n });
        assertSpyCall(divideFn, 0, {
          args: [
            10455n,
            10n,
            bigintCalculator,
          ],
          returned: 1045n,
        });
      });
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    describe("decimal currencies", () => {
      it("returns a new Dinero object with a new scale and a converted amount", () => {
        const d = dinero({
          amount: new Big(500),
          currency: bigjsUSD,
          scale: new Big(2),
        });
        const snapshot = toSnapshot(transformScale(d, new Big(4)));

        assertObjectMatch(snapshot, {
          amount: new Big(50000),
          scale: new Big(4),
        });
      });
      it("returns a new Dinero object with a new scale and a converted, rounded down amount", () => {
        const d = dinero({
          amount: new Big(14270),
          currency: bigjsUSD,
          scale: new Big(2),
        });
        const snapshot = toSnapshot(transformScale(d, new Big(0)));

        assertObjectMatch(snapshot, {
          amount: new Big(142),
          scale: new Big(0),
        });
      });
      it("converts between scales correctly", () => {
        const d = dinero({
          amount: new Big(333336),
          currency: bigjsUSD,
          scale: new Big(5),
        });
        const snapshot = toSnapshot(transformScale(d, new Big(2)));

        assertObjectMatch(snapshot, {
          amount: new Big(333),
          scale: new Big(2),
        });
      });
      it("converts from long initial scales correctly", () => {
        const d = dinero({
          amount: new Big(3333333336),
          currency: bigjsUSD,
          scale: new Big(9),
        });
        const snapshot = toSnapshot(transformScale(d, new Big(2)));

        assertObjectMatch(snapshot, {
          amount: new Big(333),
          scale: new Big(2),
        });
      });
      it("uses the provided `up` divide function", () => {
        const d = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(transformScale(d, new Big(2), up));

        assertObjectMatch(snapshot, {
          amount: new Big(1046),
          scale: new Big(2),
        });
      });
      it("uses the provided `down` divide function", () => {
        const d = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(transformScale(d, new Big(2), down));

        assertObjectMatch(snapshot, {
          amount: new Big(1045),
          scale: new Big(2),
        });
      });
      it("uses the provided `halfOdd` divide function", () => {
        const d1 = dinero({
          amount: new Big(10415),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({
          amount: new Big(10425),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertObjectMatch(
          toSnapshot(transformScale(d1, new Big(2), halfOdd)),
          {
            amount: new Big(1041),
            scale: new Big(2),
          },
        );
        assertObjectMatch(
          toSnapshot(transformScale(d2, new Big(2), halfOdd)),
          {
            amount: new Big(1043),
            scale: new Big(2),
          },
        );
      });
      it("uses the provided `halfEven` divide function", () => {
        const d1 = dinero({
          amount: new Big(10425),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({
          amount: new Big(10435),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertObjectMatch(
          toSnapshot(transformScale(d1, new Big(2), halfEven)),
          {
            amount: new Big(1042),
            scale: new Big(2),
          },
        );
        assertObjectMatch(
          toSnapshot(transformScale(d2, new Big(2), halfEven)),
          {
            amount: new Big(1044),
            scale: new Big(2),
          },
        );
      });
      it("uses the provided `halfDown` divide function", () => {
        const d1 = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({
          amount: new Big(10456),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertObjectMatch(
          toSnapshot(transformScale(d1, new Big(2), halfDown)),
          {
            amount: new Big(1045),
            scale: new Big(2),
          },
        );
        assertObjectMatch(
          toSnapshot(transformScale(d2, new Big(2), halfDown)),
          {
            amount: new Big(1046),
            scale: new Big(2),
          },
        );
      });
      it("uses the provided `halfUp` divide function", () => {
        const d1 = dinero({
          amount: new Big(10454),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertObjectMatch(
          toSnapshot(transformScale(d1, new Big(2), halfUp)),
          {
            amount: new Big(1045),
            scale: new Big(2),
          },
        );
        assertObjectMatch(
          toSnapshot(transformScale(d2, new Big(2), halfUp)),
          {
            amount: new Big(1046),
            scale: new Big(2),
          },
        );
      });
      it("uses the provided `halfTowardsZero` divide function", () => {
        const d1 = dinero({
          amount: new Big(10415),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(
          transformScale(d1, new Big(2), halfTowardsZero),
        );

        assertObjectMatch(snapshot, {
          amount: new Big(1041),
          scale: new Big(2),
        });
      });
      it("uses the provided `halfAwayFromZero` divide function", () => {
        const d1 = dinero({
          amount: new Big(10415),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(
          transformScale(d1, new Big(2), halfAwayFromZero),
        );

        assertObjectMatch(snapshot, {
          amount: new Big(1042),
          scale: new Big(2),
        });
      });
      it("uses a custom divide function", () => {
        const divideFn = spy(() => new Big(1045));
        const d = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(
          transformScale(d, new Big(2), divideFn as DivideOperation),
        );

        assertObjectMatch(snapshot, {
          amount: new Big(1045),
          scale: new Big(2),
        });
        assertSpyCall(divideFn, 0, {
          args: [new Big(10455), new Big(10), bigjsCalculator],
          returned: new Big(1045),
        });
      });
    });
  });
});

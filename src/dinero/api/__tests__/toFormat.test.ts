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

import { toFormat } from "../toFormat.ts";

describe("toFormat", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    it("formats the Dinero object with the passed transformer", () => {
      // @ts-expect-error testing
      const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
      const d = dinero({ amount: 500, currency: USD });

      assertEquals(toFormat(d, formatter), "USD 5");
    });
    it(
      "formats the Dinero object with the passed transformer using the scale",
      () => {
        // @ts-expect-error testing=
        const formatter = ({ amount, currency }) =>
          `${currency.code} ${amount}`;
        const d = dinero({ amount: 4545, currency: USD, scale: 3 });

        assertEquals(toFormat(d, formatter), "USD 4.545");
      },
    );
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it("formats the Dinero object with the passed transformer", () => {
      // @ts-expect-error testing
      const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
      const d = dinero({ amount: 500n, currency: bigintUSD });

      assertEquals(toFormat(d, formatter), "USD 5");
    });
    it(
      "formats the Dinero object with the passed transformer using the scale",
      () => {
        // @ts-expect-error testing
        const formatter = ({ amount, currency }) =>
          `${currency.code} ${amount}`;
        const d = dinero({ amount: 4545n, currency: bigintUSD, scale: 3n });

        assertEquals(toFormat(d, formatter), "USD 4.545");
      },
    );
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("formats the Dinero object with the passed transformer", () => {
      // @ts-expect-error testing
      const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
      const d = dinero({ amount: new Big(500), currency: bigjsUSD });

      assertEquals(toFormat(d, formatter), "USD 5");
    });
    it(
      "formats the Dinero object with the passed transformer using the scale",
      () => {
        // @ts-expect-error testing
        const formatter = ({ amount, currency }) =>
          `${currency.code} ${amount}`;
        const d = dinero({
          amount: new Big(4545),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertEquals(toFormat(d, formatter), "USD 4.545");
      },
    );
  });
});

import { assertEquals, assertThrows } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { MGA, USD } from "../../../currencies/number/mod.ts";
import { Big } from "../../../../test_deps.ts";
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintDinero,
  createBigjsDinero,
  createNumberDinero,
} from "../../../../test/utils/mod.ts";

import { toDecimal } from "../toDecimal.ts";

describe("toDecimal", () => {
  describe("number", () => {
    const dinero = createNumberDinero;

    describe("decimal currencies", () => {
      it("returns the amount in decimal format", () => {
        const d = dinero({ amount: 1050, currency: USD });

        assertEquals(toDecimal(d), "10.50");
      });
      it("returns the amount in decimal format based on a custom scale", () => {
        const d = dinero({ amount: 10545, currency: USD, scale: 3 });

        assertEquals(toDecimal(d), "10.545");
      });
      it("returns the amount in decimal format with trailing zeros", () => {
        const d = dinero({ amount: 1000, currency: USD });

        assertEquals(toDecimal(d), "10.00");
      });
      it("returns the amount in decimal format with leading zeros", () => {
        const d = dinero({ amount: 1005, currency: USD });

        assertEquals(toDecimal(d), "10.05");
      });
      it("returns the amount in decimal format and pads the decimal part", () => {
        const d = dinero({ amount: 500, currency: USD });

        assertEquals(toDecimal(d), "5.00");
      });
      it("uses a custom transformer", () => {
        const d = dinero({ amount: 1050, currency: USD });

        assertEquals(
          toDecimal(
            d,
            ({ value: [dollars, cents], currency }) =>
              `${currency.code} ${dollars}.${cents}`,
          ),
          "USD 10.50",
        );
      });
    });
    describe("non-decimal currencies", () => {
      it("throws when passing a Dinero object using a non-decimal currency", () => {
        const d = dinero({ amount: 13, currency: MGA });

        assertThrows(
          () => {
            toDecimal(d);
          },
          Error,
          "[Dinero.js] Currency is not decimal.",
        );
      });
      it("throws when passing a Dinero object using a multi-base currency which compiles to a multiple of 10", () => {
        const d = dinero({
          amount: 13,
          currency: { code: "ABC", exponent: 1, base: [5, 2] },
        });

        assertThrows(
          () => {
            toDecimal(d);
          },
          Error,
          "[Dinero.js] Currency is not decimal.",
        );
      });
    });
  });
  describe("bigint", () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintMGA = castToBigintCurrency(MGA);

    describe("decimal currencies", () => {
      it("returns the amount in decimal format", () => {
        const d = dinero({ amount: 1050n, currency: bigintUSD });

        assertEquals(toDecimal(d), "10.50");
      });
      it("returns the amount in decimal format with large integers", () => {
        const d = dinero({ amount: 1000000000000000050n, currency: bigintUSD });

        assertEquals(toDecimal(d), "10000000000000000.50");
      });
      it("returns the amount in decimal format based on a custom scale", () => {
        const d = dinero({ amount: 10545n, currency: bigintUSD, scale: 3n });

        assertEquals(toDecimal(d), "10.545");
      });
      it("returns the amount in decimal format with trailing zeros", () => {
        const d = dinero({ amount: 1000n, currency: bigintUSD });

        assertEquals(toDecimal(d), "10.00");
      });
      it("returns the amount in decimal format with leading zeros", () => {
        const d = dinero({ amount: 1005n, currency: bigintUSD });

        assertEquals(toDecimal(d), "10.05");
      });
      it("returns the amount in decimal format and pads the decimal part", () => {
        const d = dinero({ amount: 500n, currency: bigintUSD });

        assertEquals(toDecimal(d), "5.00");
      });
      it("uses a custom transformer", () => {
        const d = dinero({ amount: 1050n, currency: bigintUSD });

        assertEquals(
          toDecimal(
            d,
            ({ value: [dollars, cents], currency }) =>
              `${currency.code} ${dollars}.${cents}`,
          ),
          "USD 10.50",
        );
      });
    });
    describe("non-decimal currencies", () => {
      it("throws when passing a Dinero object using a non-decimal currency", () => {
        const d = dinero({ amount: 13n, currency: bigintMGA });

        assertThrows(
          () => {
            toDecimal(d);
          },
          Error,
          "[Dinero.js] Currency is not decimal.",
        );
      });
      it("throws when passing a Dinero object using a multi-base currency which compiles to a multiple of 10", () => {
        const d = dinero({
          amount: 13n,
          currency: { code: "ABC", exponent: 1n, base: [5n, 2n] },
        });

        assertThrows(
          () => {
            toDecimal(d);
          },
          Error,
          "[Dinero.js] Currency is not decimal.",
        );
      });
    });
  });
  describe("Big.js", () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsMGA = castToBigjsCurrency(MGA);

    describe("decimal currencies", () => {
      it("returns the amount in decimal format", () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        assertEquals(toDecimal(d), "10.50");
      });
      it("returns the amount in decimal format with large integers", () => {
        const d = dinero({
          amount: new Big("1000000000000000050"),
          currency: bigjsUSD,
        });

        assertEquals(toDecimal(d), "10000000000000000.50");
      });
      it("returns the amount in decimal format based on a custom scale", () => {
        const d = dinero({
          amount: new Big(10545),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        assertEquals(toDecimal(d), "10.545");
      });
      it("returns the amount in decimal format with trailing zeros", () => {
        const d = dinero({ amount: new Big(1000), currency: bigjsUSD });

        assertEquals(toDecimal(d), "10.00");
      });
      it("returns the amount in decimal format with leading zeros", () => {
        const d = dinero({ amount: new Big(1005), currency: bigjsUSD });

        assertEquals(toDecimal(d), "10.05");
      });
      it("returns the amount in decimal format and pads the decimal part", () => {
        const d = dinero({ amount: new Big(500), currency: bigjsUSD });

        assertEquals(toDecimal(d), "5.00");
      });
      it("uses a custom transformer", () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        assertEquals(
          toDecimal(
            d,
            ({ value: [dollars, cents], currency }) =>
              `${currency.code} ${dollars}.${cents}`,
          ),
          "USD 10.50",
        );
      });
    });
    describe("non-decimal currencies", () => {
      it("throws when passing a Dinero object using a non-decimal currency", () => {
        const d = dinero({ amount: new Big(13), currency: bigjsMGA });

        assertThrows(
          () => {
            toDecimal(d);
          },
          Error,
          "[Dinero.js] Currency is not decimal.",
        );
      });
      it("throws when passing a Dinero object using a multi-base currency which compiles to a multiple of 10", () => {
        const d = dinero({
          amount: new Big(13),
          currency: {
            code: "ABC",
            exponent: new Big(1),
            base: [new Big(5), new Big(2)],
          },
        });

        assertThrows(
          () => {
            toDecimal(d);
          },
          Error,
          "[Dinero.js] Currency is not decimal.",
        );
      });
    });
  });
});

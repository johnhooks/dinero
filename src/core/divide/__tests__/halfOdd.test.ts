import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { halfOdd } from "../halfOdd.ts";

describe("halfOdd", () => {
  describe("decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfOdd(14, 10, calculator), 1);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfOdd(-14, 10, calculator), -1);
    });
    it("rounds to nearest odd integer with a positive half quotient rounding to an even integer", () => {
      assertEquals(halfOdd(15, 10, calculator), 1);
    });
    it("rounds to nearest odd integer with a positive half quotient rounding to an odd integer", () => {
      assertEquals(halfOdd(25, 10, calculator), 3);
    });
    it("rounds to nearest odd integer with a negative half quotient", () => {
      assertEquals(halfOdd(-25, 10, calculator), -3);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfOdd(16, 10, calculator), 2);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfOdd(-16, 10, calculator), -2);
    });
  });
  describe("non-decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfOdd(22, 5, calculator), 4);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfOdd(-22, 5, calculator), -4);
    });
    it("rounds to nearest odd integer with a positive half quotient rounding to an even integer", () => {
      assertEquals(halfOdd(3, 2, calculator), 1);
    });
    it("rounds to nearest odd integer with a positive half quotient rounding to an odd integer", () => {
      assertEquals(halfOdd(5, 2, calculator), 3);
    });
    it("rounds to nearest odd integer with a negative half quotient", () => {
      assertEquals(halfOdd(-5, 2, calculator), -3);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfOdd(24, 5, calculator), 5);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfOdd(-24, 5, calculator), -5);
    });
  });
});

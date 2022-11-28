import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { halfEven } from "../halfEven.ts";

describe("halfEven", () => {
  describe("decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfEven(14, 10, calculator), 1);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfEven(-14, 10, calculator), -1);
    });
    it("rounds to nearest even integer with a positive half quotient rounding to an even integer", () => {
      assertEquals(halfEven(15, 10, calculator), 2);
    });
    it("rounds to nearest even integer with a positive half quotient rounding to an odd integer", () => {
      assertEquals(halfEven(25, 10, calculator), 2);
    });
    it("rounds to nearest even integer with a negative half quotient", () => {
      assertEquals(halfEven(-25, 10, calculator), -2);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfEven(16, 10, calculator), 2);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfEven(-16, 10, calculator), -2);
    });
  });
  describe("non-decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfEven(22, 5, calculator), 4);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfEven(-22, 5, calculator), -4);
    });
    it("rounds to nearest even integer with a positive half quotient rounding to an even integer", () => {
      assertEquals(halfEven(3, 2, calculator), 2);
    });
    it("rounds to nearest even integer with a positive half quotient rounding to an odd integer", () => {
      assertEquals(halfEven(5, 2, calculator), 2);
    });
    it("rounds to nearest even integer with a negative half quotient", () => {
      assertEquals(halfEven(-5, 2, calculator), -2);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfEven(24, 5, calculator), 5);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfEven(-24, 5, calculator), -5);
    });
  });
});

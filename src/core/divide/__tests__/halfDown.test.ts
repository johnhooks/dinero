import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { halfDown } from "../halfDown.ts";

describe("halfDown", () => {
  describe("decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfDown(14, 10, calculator), 1);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfDown(-14, 10, calculator), -1);
    });
    it("rounds down with a positive half quotient", () => {
      assertEquals(halfDown(15, 10, calculator), 1);
    });
    it("rounds down with a negative half quotient", () => {
      assertEquals(halfDown(-15, 10, calculator), -2);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfDown(16, 10, calculator), 2);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfDown(-16, 10, calculator), -2);
    });
  });
  describe("non-decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfDown(22, 5, calculator), 4);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfDown(-22, 5, calculator), -4);
    });
    it("rounds down with a positive half quotient", () => {
      assertEquals(halfDown(3, 2, calculator), 1);
    });
    it("rounds down with a negative half quotient", () => {
      assertEquals(halfDown(-3, 2, calculator), -2);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfDown(24, 5, calculator), 5);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfDown(-24, 5, calculator), -5);
    });
  });
});

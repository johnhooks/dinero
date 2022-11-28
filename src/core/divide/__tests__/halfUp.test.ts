import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { halfUp } from "../halfUp.ts";

describe("halfUp", () => {
  describe("decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfUp(14, 10, calculator), 1);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfUp(-14, 10, calculator), -1);
    });
    it("rounds up with a positive half quotient", () => {
      assertEquals(halfUp(15, 10, calculator), 2);
    });
    it("rounds up with a negative half quotient", () => {
      assertEquals(halfUp(-15, 10, calculator), -1);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfUp(16, 10, calculator), 2);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfUp(-16, 10, calculator), -2);
    });
  });
  describe("non-decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfUp(22, 5, calculator), 4);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfUp(-22, 5, calculator), -4);
    });
    it("rounds up with a positive half quotient", () => {
      assertEquals(halfUp(3, 2, calculator), 2);
    });
    it("rounds up with a negative half quotient", () => {
      assertEquals(halfUp(-3, 2, calculator), -1);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfUp(24, 5, calculator), 5);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfUp(-24, 5, calculator), -5);
    });
  });
});

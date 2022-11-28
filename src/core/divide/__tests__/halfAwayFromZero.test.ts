import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { halfAwayFromZero } from "../halfAwayFromZero.ts";

describe("halfAwayFromZero", () => {
  describe("decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfAwayFromZero(14, 10, calculator), 1);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfAwayFromZero(-14, 10, calculator), -1);
    });
    it("rounds to the nearest integer away from zero with a positive half quotient", () => {
      assertEquals(halfAwayFromZero(15, 10, calculator), 2);
    });
    it("rounds to the nearest integer away from zero with a negative half quotient", () => {
      assertEquals(halfAwayFromZero(-25, 10, calculator), -3);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfAwayFromZero(16, 10, calculator), 2);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfAwayFromZero(-16, 10, calculator), -2);
    });
  });
  describe("non-decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(halfAwayFromZero(22, 5, calculator), 4);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(halfAwayFromZero(-22, 5, calculator), -4);
    });
    it("rounds to the nearest integer away from zero with a positive half quotient", () => {
      assertEquals(halfAwayFromZero(3, 2, calculator), 2);
    });
    it("rounds to the nearest integer away from zero with a negative half quotient", () => {
      assertEquals(halfAwayFromZero(-5, 2, calculator), -3);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(halfAwayFromZero(24, 5, calculator), 5);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(halfAwayFromZero(-24, 5, calculator), -5);
    });
  });
});

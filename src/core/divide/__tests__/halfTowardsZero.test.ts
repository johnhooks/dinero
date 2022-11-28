import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { halfTowardsZero } from "../halfTowardsZero.ts";

describe("halfTowardsZero", () => {
  describe("decimal factors", () => {
    it("rounds down with a positive float below half", () => {
      assertEquals(halfTowardsZero(14, 10, calculator), 1);
    });
    it("rounds up with a negative float below half", () => {
      assertEquals(halfTowardsZero(-14, 10, calculator), -1);
    });
    it("rounds to the nearest integer towards zero with a positive half float", () => {
      assertEquals(halfTowardsZero(15, 10, calculator), 1);
    });
    it("rounds to the nearest integer towards zero with a negative half float", () => {
      assertEquals(halfTowardsZero(-25, 10, calculator), -2);
    });
    it("rounds up with a positive float above half", () => {
      assertEquals(halfTowardsZero(16, 10, calculator), 2);
    });
    it("rounds down with a negative float above half", () => {
      assertEquals(halfTowardsZero(-16, 10, calculator), -2);
    });
  });
  describe("non-decimal factors", () => {
    it("rounds down with a positive float below half", () => {
      assertEquals(halfTowardsZero(22, 5, calculator), 4);
    });
    it("rounds up with a negative float below half", () => {
      assertEquals(halfTowardsZero(-22, 5, calculator), -4);
    });
    it("rounds to the nearest integer towards zero with a positive half float", () => {
      assertEquals(halfTowardsZero(3, 2, calculator), 1);
    });
    it("rounds to the nearest integer towards zero with a negative half float", () => {
      assertEquals(halfTowardsZero(-5, 2, calculator), -2);
    });
    it("rounds up with a positive float above half", () => {
      assertEquals(halfTowardsZero(24, 5, calculator), 5);
    });
    it("rounds down with a negative float above half", () => {
      assertEquals(halfTowardsZero(-24, 5, calculator), -5);
    });
  });
});

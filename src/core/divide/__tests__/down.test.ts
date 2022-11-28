import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { down } from "../down.ts";

describe("down", () => {
  describe("decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(down(14, 10, calculator), 1);
    });
    it("rounds down with a negative quotient below half", () => {
      assertEquals(down(-14, 10, calculator), -2);
    });
    it("rounds down with a positive half quotient", () => {
      assertEquals(down(15, 10, calculator), 1);
    });
    it("rounds down with a negative half quotient", () => {
      assertEquals(down(-15, 10, calculator), -2);
    });
    it("rounds down with a positive quotient above half", () => {
      assertEquals(down(16, 10, calculator), 1);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(down(-16, 10, calculator), -2);
    });
  });
  describe("non-decimal factors", () => {
    it("rounds down with a positive quotient below half", () => {
      assertEquals(down(22, 5, calculator), 4);
    });
    it("rounds down with a negative quotient below half", () => {
      assertEquals(down(-22, 5, calculator), -5);
    });
    it("rounds down with a positive half quotient", () => {
      assertEquals(down(3, 2, calculator), 1);
    });
    it("rounds down with a negative half quotient", () => {
      assertEquals(down(-3, 2, calculator), -2);
    });
    it("rounds down with a positive quotient above half", () => {
      assertEquals(down(24, 5, calculator), 4);
    });
    it("rounds down with a negative quotient above half", () => {
      assertEquals(down(-24, 5, calculator), -5);
    });
  });
});

import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { up } from "../up.ts";

describe("up", () => {
  describe("decimal factors", () => {
    it("rounds up with a positive quotient below half", () => {
      assertEquals(up(14, 10, calculator), 2);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(up(-14, 10, calculator), -1);
    });
    it("rounds up with a positive half quotient", () => {
      assertEquals(up(15, 10, calculator), 2);
    });
    it("rounds up with a negative half quotient", () => {
      assertEquals(up(-15, 10, calculator), -1);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(up(16, 10, calculator), 2);
    });
    it("rounds up with a negative quotient above half", () => {
      assertEquals(up(-16, 10, calculator), -1);
    });
  });
  describe("non-decimal factors", () => {
    it("rounds up with a positive quotient below half", () => {
      assertEquals(up(22, 5, calculator), 5);
    });
    it("rounds up with a negative quotient below half", () => {
      assertEquals(up(-22, 5, calculator), -4);
    });
    it("rounds up with a positive half quotient", () => {
      assertEquals(up(3, 2, calculator), 2);
    });
    it("rounds up with a negative half quotient", () => {
      assertEquals(up(-3, 2, calculator), -1);
    });
    it("rounds up with a positive quotient above half", () => {
      assertEquals(up(24, 5, calculator), 5);
    });
    it("rounds up with a negative quotient above half", () => {
      assertEquals(up(-24, 5, calculator), -4);
    });
  });
});

import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { ComparisonOperator } from "../../../../core/mod.ts";

import { compare } from "../compare.ts";

describe("compare", () => {
  describe("ComparisonOperator.LT", () => {
    it("returns `ComparisonOperator.LT` with positive numbers", () => {
      assertEquals(compare(1, 2), ComparisonOperator.LT);
    });
    it("returns `ComparisonOperator.LT` with negative numbers", () => {
      assertEquals(compare(-2, -1), ComparisonOperator.LT);
    });
    it("returns `ComparisonOperator.LT` with positive floats", () => {
      assertEquals(compare(1.2, 2.2), ComparisonOperator.LT);
    });
    it("returns `ComparisonOperator.LT` with negative floats", () => {
      assertEquals(compare(-2.2, -1.2), ComparisonOperator.LT);
    });
    it(
      "returns `ComparisonOperator.LT` with a numbers in scientific notation",
      () => {
        assertEquals(compare(1e5, 2e5), ComparisonOperator.LT);
      },
    );
  });
  describe("ComparisonOperator.GT", () => {
    it("returns `ComparisonOperator.GT` with positive numbers", () => {
      assertEquals(compare(2, 1), ComparisonOperator.GT);
    });
    it("returns `ComparisonOperator.GT` with negative numbers", () => {
      assertEquals(compare(-1, -2), ComparisonOperator.GT);
    });
    it("returns `ComparisonOperator.GT` with positive floats", () => {
      assertEquals(compare(2.2, 1.2), ComparisonOperator.GT);
    });
    it("returns `ComparisonOperator.GT` with negative floats", () => {
      assertEquals(compare(-1.2, -2.2), ComparisonOperator.GT);
    });
    it(
      "returns `ComparisonOperator.GT` with a numbers in scientific notation",
      () => {
        assertEquals(compare(2e5, 1e5), ComparisonOperator.GT);
      },
    );
  });
  describe("ComparisonOperator.EQ", () => {
    it("returns `ComparisonOperator.EQ` with positive numbers", () => {
      assertEquals(compare(2, 2), ComparisonOperator.EQ);
    });
    it("returns `ComparisonOperator.EQ` with negative numbers", () => {
      assertEquals(compare(-2, -2), ComparisonOperator.EQ);
    });
    it("returns `ComparisonOperator.EQ` with positive floats", () => {
      assertEquals(compare(2.2, 2.2), ComparisonOperator.EQ);
    });
    it("returns `ComparisonOperator.EQ` with negative floats", () => {
      assertEquals(compare(-2.2, -2.2), ComparisonOperator.EQ);
    });
    it(
      "returns `ComparisonOperator.EQ` with a numbers in scientific notation",
      () => {
        assertEquals(compare(2e5, 2e5), ComparisonOperator.EQ);
      },
    );
  });
});

import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { ComparisonOperator } from "../../../../core/mod.ts";

import { compare } from "../compare.ts";

describe("compare", () => {
  describe("ComparisonOperator.LT", () => {
    it("returns `ComparisonOperator.LT` with positive numbers", () => {
      assertEquals(compare(1n, 2n), ComparisonOperator.LT);
    });
    it("returns `ComparisonOperator.LT` with negative numbers", () => {
      assertEquals(compare(-2n, -1n), ComparisonOperator.LT);
    });
  });
  describe("ComparisonOperator.GT", () => {
    it("returns `ComparisonOperator.GT` with positive numbers", () => {
      assertEquals(compare(2n, 1n), ComparisonOperator.GT);
    });
    it("returns `ComparisonOperator.GT` with negative numbers", () => {
      assertEquals(compare(-1n, -2n), ComparisonOperator.GT);
    });
  });
  describe("ComparisonOperator.EQ", () => {
    it("returns `ComparisonOperator.EQ` with positive numbers", () => {
      assertEquals(compare(2n, 2n), ComparisonOperator.EQ);
    });
    it("returns `ComparisonOperator.EQ` with negative numbers", () => {
      assertEquals(compare(-2n, -2n), ComparisonOperator.EQ);
    });
  });
});

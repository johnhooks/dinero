import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { greaterThanOrEqual } from "../greaterThanOrEqual.ts";

const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

describe("greaterThanOrEqual", () => {
  it(
    "returns true when the first number is greater than the other with positive numbers",
    () => {
      assertEquals(greaterThanOrEqualFn(4, 3), true);
    },
  );
  it(
    "returns true when the first number is greater than the other with negative numbers",
    () => {
      assertEquals(greaterThanOrEqualFn(-2, -3), true);
    },
  );
  it(
    "returns true when the first number is greater than the other with floats",
    () => {
      assertEquals(greaterThanOrEqualFn(2.2, 1.2), true);
    },
  );
  it(
    "returns true when the first number is greater than the other with numbers in scientific notation",
    () => {
      assertEquals(greaterThanOrEqualFn(2e5, 1e5), true);
    },
  );
  it("returns true with equal positive numbers", () => {
    assertEquals(greaterThanOrEqualFn(2, 2), true);
  });
  it("returns true with equal negative numbers", () => {
    assertEquals(greaterThanOrEqualFn(-2, -2), true);
  });
  it("returns true with equal floats", () => {
    assertEquals(greaterThanOrEqualFn(2.2, 2.2), true);
  });
  it("returns true with equal numbers in scientific notation", () => {
    assertEquals(greaterThanOrEqualFn(2e5, 2e5), true);
  });
  it(
    "returns false when the first number is less than the other with positive numbers",
    () => {
      assertEquals(greaterThanOrEqualFn(1, 2), false);
    },
  );
  it(
    "returns false when the first number is less than the other with negative numbers",
    () => {
      assertEquals(greaterThanOrEqualFn(-3, -2), false);
    },
  );
  it(
    "returns false when the first number is less than the other with floats",
    () => {
      assertEquals(greaterThanOrEqualFn(0.2, 1.2), false);
    },
  );
  it(
    "returns false when the first number is less than the other with numbers in scientific notation",
    () => {
      assertEquals(greaterThanOrEqualFn(1e5, 2e5), false);
    },
  );
});

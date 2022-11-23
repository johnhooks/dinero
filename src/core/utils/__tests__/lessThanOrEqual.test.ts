import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { compare } from "../../../calculator/number/mod.ts";

import { lessThanOrEqual } from "../lessThanOrEqual.ts";

// @ts-expect-error testing// @ts-expect-error testing
const lessThanOrEqualFn = lessThanOrEqual({ compare });

describe("lessThanOrEqual", () => {
  it(
    "returns true when the first number is less than the other with positive numbers",
    () => {
      assertEquals(lessThanOrEqualFn(1, 2), true);
    },
  );
  it(
    "returns true when the first number is less than the other with negative numbers",
    () => {
      assertEquals(lessThanOrEqualFn(-3, -2), true);
    },
  );
  it(
    "returns true when the first number is less than the other with floats",
    () => {
      assertEquals(lessThanOrEqualFn(1.2, 2.2), true);
    },
  );
  it(
    "returns true when the first number is less than the other with numbers in scientific notation",
    () => {
      assertEquals(lessThanOrEqualFn(2e5, 3e5), true);
    },
  );
  it("returns true with equal positive numbers", () => {
    assertEquals(lessThanOrEqualFn(2, 2), true);
  });
  it("returns true with equal negative numbers", () => {
    assertEquals(lessThanOrEqualFn(-2, -2), true);
  });
  it("returns true with equal floats", () => {
    assertEquals(lessThanOrEqualFn(2.2, 2.2), true);
  });
  it("returns true with equal numbers in scientific notation", () => {
    assertEquals(lessThanOrEqualFn(2e5, 2e5), true);
  });
  it(
    "returns false when the first number is greater than the other with positive numbers",
    () => {
      assertEquals(lessThanOrEqualFn(4, 3), false);
    },
  );
  it(
    "returns false when the first number is greater than the other with negative numbers",
    () => {
      assertEquals(lessThanOrEqualFn(-2, -3), false);
    },
  );
  it(
    "returns false when the first number is greater than the other with floats",
    () => {
      assertEquals(lessThanOrEqualFn(3.2, 2.2), false);
    },
  );
  it(
    "returns false when the first number is greater than the other with numbers in scientific notation",
    () => {
      assertEquals(lessThanOrEqualFn(3e5, 2e5), false);
    },
  );
});

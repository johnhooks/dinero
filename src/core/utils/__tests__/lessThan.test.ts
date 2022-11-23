import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { compare } from "../../../calculator/number/mod.ts";

import { lessThan } from "../lessThan.ts";

// @ts-expect-error testing
const lessThanFn = lessThan({ compare });

describe("lessThan", () => {
  it(
    "returns true when the first number is less than the other with positive numbers",
    () => {
      assertEquals(lessThanFn(1, 2), true);
    },
  );
  it(
    "returns true when the first number is less than the other with negative numbers",
    () => {
      assertEquals(lessThanFn(-3, -2), true);
    },
  );
  it(
    "returns true when the first number is less than the other with floats",
    () => {
      assertEquals(lessThanFn(1.2, 2.2), true);
    },
  );
  it(
    "returns true when the first number is less than the other with numbers in scientific notation",
    () => {
      assertEquals(lessThanFn(2e5, 3e5), true);
    },
  );
  it(
    "returns false when the first number is greater than the other with positive numbers",
    () => {
      assertEquals(lessThanFn(4, 3), false);
    },
  );
  it(
    "returns false when the first number is greater than the other with negative numbers",
    () => {
      assertEquals(lessThanFn(-2, -3), false);
    },
  );
  it(
    "returns false when the first number is greater than the other with floats",
    () => {
      assertEquals(lessThanFn(3.2, 2.2), false);
    },
  );
  it(
    "returns false when the first number is greater than the other with numbers in scientific notation",
    () => {
      assertEquals(lessThanFn(3e5, 2e5), false);
    },
  );
});

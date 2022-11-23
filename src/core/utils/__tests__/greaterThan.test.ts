import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { compare } from "../../../calculator/number/mod.ts";

import { greaterThan } from "../greaterThan.ts";

// @ts-expect-error testing
const greaterThanFn = greaterThan({ compare });

describe("greaterThan", () => {
  it(
    "returns true when the first number is greater than the other with positive numbers",
    () => {
      assertEquals(greaterThanFn(4, 3), true);
    },
  );
  it(
    "returns true when the first number is greater than the other with negative numbers",
    () => {
      assertEquals(greaterThanFn(-2, -3), true);
    },
  );
  it(
    "returns true when the first number is greater than the other with floats",
    () => {
      assertEquals(greaterThanFn(2.2, 1.2), true);
    },
  );
  it(
    "returns true when the first number is greater than the other with numbers in scientific notation",
    () => {
      assertEquals(greaterThanFn(2e5, 1e5), true);
    },
  );
  it(
    "returns false when the first number is less than the other with positive numbers",
    () => {
      assertEquals(greaterThanFn(1, 2), false);
    },
  );
  it(
    "returns false when the first number is less than the other with negative numbers",
    () => {
      assertEquals(greaterThanFn(-3, -2), false);
    },
  );
  it(
    "returns false when the first number is less than the other with floats",
    () => {
      assertEquals(greaterThanFn(1.2, 2.2), false);
    },
  );
  it(
    "returns false when the first number is less than the other with numbers in scientific notation",
    () => {
      assertEquals(greaterThanFn(1e5, 2e5), false);
    },
  );
});

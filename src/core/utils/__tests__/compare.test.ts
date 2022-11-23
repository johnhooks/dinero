import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { compare as cmp } from "../../../calculator/number/mod.ts";

import { compare } from "../compare.ts";

// @ts-expect-error testing
const compareFn = compare({ compare: cmp });

describe("compare", () => {
  describe("inferiority", () => {
    it(
      "returns -1 when the first number is less than the other with positive numbers",
      () => {
        assertEquals(compareFn(1, 2), -1);
      },
    );
    it(
      "returns -1 when the first number is less than the other with negative numbers",
      () => {
        assertEquals(compareFn(-3, -2), -1);
      },
    );
    it(
      "returns -1 when the first number is less than the other with floats",
      () => {
        assertEquals(compareFn(1.2, 2.2), -1);
      },
    );
    it(
      "returns -1 when the first number is less than the other with numbers in scientific notation",
      () => {
        assertEquals(compareFn(2e5, 3e5), -1);
      },
    );
  });
  describe("equality", () => {
    it(
      "returns 0 when the first number is equal to the other with positive numbers",
      () => {
        assertEquals(compareFn(4, 4), 0);
      },
    );
    it(
      "returns 0 when the first number is equal to the other with negative numbers",
      () => {
        assertEquals(compareFn(-2, -2), 0);
      },
    );
    it(
      "returns 0 when the first number is equal to the other with floats",
      () => {
        assertEquals(compareFn(3.2, 3.2), 0);
      },
    );
    it(
      "returns 0 when the first number is equal to the other with numbers in scientific notation",
      () => {
        assertEquals(compareFn(3e5, 3e5), 0);
      },
    );
  });
  describe("superiority", () => {
    it(
      "returns 1 when the first number is greater than the other with positive numbers",
      () => {
        assertEquals(compareFn(4, 3), 1);
      },
    );
    it(
      "returns 1 when the first number is greater than the other with negative numbers",
      () => {
        assertEquals(compareFn(-2, -3), 1);
      },
    );
    it(
      "returns 1 when the first number is greater than the other with floats",
      () => {
        assertEquals(compareFn(3.2, 2.2), 1);
      },
    );
    it(
      "returns 1 when the first number is greater than the other with numbers in scientific notation",
      () => {
        assertEquals(compareFn(3e5, 2e5), 1);
      },
    );
  });
});

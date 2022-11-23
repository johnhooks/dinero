import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { compare } from "../../../calculator/number/mod.ts";

import { maximum } from "../maximum.ts";

// @ts-expect-error testing
const maximumFn = maximum({ compare });

describe("maximum", () => {
  it("gets the greatest from positive numbers", () => {
    assertEquals(maximumFn([5, 3, 2]), 5);
  });
  it("gets the greatest from negative numbers", () => {
    assertEquals(maximumFn([-5, -4, -2]), -2);
  });
  it("gets the greatest from floats", () => {
    assertEquals(maximumFn([10.5, 2.5, 1.6]), 10.5);
  });
  it("gets the greatest from numbers in scientific notation", () => {
    assertEquals(maximumFn([4e5, 3e5, 2e5]), 4e5);
  });
});

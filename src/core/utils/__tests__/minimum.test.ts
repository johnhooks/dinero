import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { compare } from "../../../calculator/number/mod.ts";

import { minimum } from "../minimum.ts";

// @ts-expect-error testing
const minimumFn = minimum({ compare });

describe("minimum", () => {
  it("gets the lowest from positive numbers", () => {
    assertEquals(minimumFn([5, 3, 2]), 2);
  });
  it("gets the lowest from negative numbers", () => {
    assertEquals(minimumFn([-5, -4, -2]), -5);
  });
  it("gets the lowest from floats", () => {
    assertEquals(minimumFn([10.5, 2.5, 1.6]), 1.6);
  });
  it("gets the lowest from numbers in scientific notation", () => {
    assertEquals(minimumFn([4e5, 3e5, 2e5]), 2e5);
  });
});

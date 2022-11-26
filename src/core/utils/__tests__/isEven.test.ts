import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { isEven } from "../isEven.ts";

const isEvenFn = isEven(calculator);

describe("isEven", () => {
  it("returns true for a positive even integer", () => {
    assertEquals(isEvenFn(202), true);
  });
  it("returns true for a negative even integer", () => {
    assertEquals(isEvenFn(-202), true);
  });
  it("returns false for a positive odd integer", () => {
    assertEquals(isEvenFn(101), false);
  });
  it("returns false for a negative odd integer", () => {
    assertEquals(isEvenFn(-101), false);
  });
});

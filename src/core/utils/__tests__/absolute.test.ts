import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { absolute } from "../absolute.ts";

const absoluteFn = absolute(calculator);

describe("absolute", () => {
  it("returns the value with positive values", () => {
    assertEquals(absoluteFn(5), 5);
  });
  it("returns the negation of the value with negative values", () => {
    assertEquals(absoluteFn(-5), 5);
  });
  it("returns the value with positive zero", () => {
    assertEquals(absoluteFn(0), 0);
  });
  it("returns the negation of the value with negative zero", () => {
    assertEquals(absoluteFn(-0), 0);
  });
});

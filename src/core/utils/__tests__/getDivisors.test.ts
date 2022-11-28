import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { getDivisors } from "../getDivisors.ts";

const getDivisorsFn = getDivisors(calculator);

describe("#getDivisors", () => {
  it("returns the same divisor with one base", () => {
    assertEquals(getDivisorsFn([100]), [100]);
  });
  it("recursively computes divisors with two bases", () => {
    assertEquals(getDivisorsFn([20, 12]), [240, 12]);
  });
  it("recursively computes divisors with more than two bases", () => {
    assertEquals(getDivisorsFn([20, 12, 7]), [1680, 84, 7]);
  });
});

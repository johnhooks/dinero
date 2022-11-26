import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { computeBase as createComputeBase } from "../computeBase.ts";

const computeBase = createComputeBase(calculator);

describe("computeBase", () => {
  it("returns non-array values as is", () => {
    assertEquals(computeBase(100), 100);
  });
  it("computes array values", () => {
    assertEquals(computeBase([20, 12, 7]), 1680);
  });
});

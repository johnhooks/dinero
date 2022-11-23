import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { getAmountAndScale } from "../getAmountAndScale.ts";

describe("getAmountAndScale", () => {
  it("returns the amount and scale with scaled amounts", () => {
    assertEquals(getAmountAndScale({ amount: 100, scale: 2 }, 0), {
      amount: 100,
      scale: 2,
    });
  });
  it("returns a zero scale when unspecified", () => {
    assertEquals(getAmountAndScale({ amount: 100 }, 0), {
      amount: 100,
      scale: 0,
    });
  });
  it("returns the amount and a zero scale with amounts", () => {
    assertEquals(getAmountAndScale(100, 0), {
      amount: 100,
      scale: 0,
    });
  });
});

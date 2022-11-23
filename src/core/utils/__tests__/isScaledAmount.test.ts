import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { isScaledAmount } from "../isScaledAmount.ts";

describe("isScaledAmount", () => {
  it("returns false with an integer", () => {
    assertEquals(isScaledAmount(100), false);
  });
  it("returns true with a scaled amount", () => {
    assertEquals(isScaledAmount({ amount: 100, scale: 0 }), true);
  });
  it("returns true with a scaled amount without a scale", () => {
    assertEquals(isScaledAmount({ amount: 100 }), true);
  });
});

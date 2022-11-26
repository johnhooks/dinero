import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { isHalf } from "../isHalf.ts";

const isHalfFn = isHalf(calculator);

describe("isHalf", () => {
  it("returns true with a half number", () => {
    assertEquals(isHalfFn(5, 10), true);
  });
  it("returns true with a negative half number", () => {
    assertEquals(isHalfFn(-5, 10), true);
  });
  it("returns false with a non-half number", () => {
    assertEquals(isHalfFn(2, 10), false);
  });
});

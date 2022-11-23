import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { compare } from "../../../calculator/number/mod.ts";

import { equal } from "../equal.ts";

// @ts-expect-error testing
const equalFn = equal({ compare });

describe("equal", () => {
  it("returns true with equal positive numbers", () => {
    assertEquals(equalFn(2, 2), true);
  });
  it("returns true with equal negative numbers", () => {
    assertEquals(equalFn(-2, -2), true);
  });
  it("returns true with equal floats numbers", () => {
    assertEquals(equalFn(1.2, 1.2), true);
  });
  it("returns true with equal numbers in scientific notation", () => {
    assertEquals(equalFn(1e5, 1e5), true);
  });
  it("returns false with unequal positive numbers", () => {
    assertEquals(equalFn(2, 3), false);
  });
  it("returns false with unequal negative numbers", () => {
    assertEquals(equalFn(-2, -3), false);
  });
  it("returns false with unequal floats numbers", () => {
    assertEquals(equalFn(1.2, 1.3), false);
  });
  it("returns false with unequal numbers in scientific notation", () => {
    assertEquals(equalFn(1e5, 2e5), false);
  });
});

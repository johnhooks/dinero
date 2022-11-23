import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { integerDivide } from "../integerDivide.ts";

describe("integerDivide", () => {
  it("divides positive numbers", () => {
    assertEquals(integerDivide(8n, 2n), 4n);
  });
  it("divides negative numbers", () => {
    assertEquals(integerDivide(-8n, -2n), 4n);
  });
  it("rounds positive numbers towards zero", () => {
    assertEquals(integerDivide(3n, 2n), 1n);
  });
  it("rounds negative numbers towards zero", () => {
    assertEquals(integerDivide(-3n, 2n), -1n);
  });
});

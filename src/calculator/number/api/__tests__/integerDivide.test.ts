import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { integerDivide } from "../integerDivide.ts";

describe("integerDivide", () => {
  it("divides positive numbers", () => {
    assertEquals(integerDivide(8, 2), 4);
  });
  it("divides negative numbers", () => {
    assertEquals(integerDivide(-8, -2), 4);
  });
  it("divides floats", () => {
    assertEquals(integerDivide(10.5, 2.5), 4);
  });
  it("divides numbers in scientific notation", () => {
    assertEquals(integerDivide(3e5, 2e5), 1);
  });
  it("rounds positive numbers towards zero", () => {
    assertEquals(integerDivide(3, 2), 1);
  });
  it("rounds negative numbers towards zero", () => {
    assertEquals(integerDivide(-3, 2), -1);
  });
});

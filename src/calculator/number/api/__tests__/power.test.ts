import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { power } from "../power.ts";

describe("power", () => {
  it("raises a positive number to the power of an exponent", () => {
    assertEquals(power(2, 3), 8);
  });
  it("raises a negative number to the power of an exponent", () => {
    assertEquals(power(-2, 3), -8);
  });
  it("raises a float to the power of an exponent", () => {
    assertEquals(power(1.5, 3), 3.375);
  });
  it(
    "raises a number in scientific notation to the power of an exponent",
    () => {
      assertEquals(power(1e5, 3), 1000000000000000);
    },
  );
});

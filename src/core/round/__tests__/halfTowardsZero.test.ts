import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { halfTowardsZero } from "../halfTowardsZero.ts";

describe("halfTowardsZero", () => {
  it("rounds down with a positive float below half", () => {
    assertEquals(halfTowardsZero(1.4), 1);
  });
  it("rounds up with a negative float below half", () => {
    assertEquals(halfTowardsZero(-1.4), -1);
  });
  it(
    "rounds to the nearest integer towards zero with a positive half float",
    () => {
      assertEquals(halfTowardsZero(1.5), 1);
    },
  );
  it(
    "rounds to the nearest integer towards zero with a negative half float",
    () => {
      assertEquals(halfTowardsZero(-2.5), -2);
    },
  );
  it("rounds up with a positive float above half", () => {
    assertEquals(halfTowardsZero(1.6), 2);
  });
  it("rounds down with a negative float above half", () => {
    assertEquals(halfTowardsZero(-1.6), -2);
  });
});

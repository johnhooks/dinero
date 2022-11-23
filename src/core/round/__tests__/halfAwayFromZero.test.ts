import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { halfAwayFromZero } from "../halfAwayFromZero.ts";

describe("halfAwayFromZero", () => {
  it("rounds down with a positive float below half", () => {
    assertEquals(halfAwayFromZero(1.4), 1);
  });
  it("rounds up with a negative float below half", () => {
    assertEquals(halfAwayFromZero(-1.4), -1);
  });
  it(
    "rounds to the nearest integer away from zero with a positive half float",
    () => {
      assertEquals(halfAwayFromZero(1.5), 2);
    },
  );
  it(
    "rounds to the nearest integer away from zero with a negative half float",
    () => {
      assertEquals(halfAwayFromZero(-2.5), -3);
    },
  );
  it("rounds up with a positive float above half", () => {
    assertEquals(halfAwayFromZero(1.6), 2);
  });
  it("rounds down with a negative float above half", () => {
    assertEquals(halfAwayFromZero(-1.6), -2);
  });
});

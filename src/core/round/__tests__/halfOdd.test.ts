import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { halfOdd } from "../halfOdd.ts";

describe("halfOdd", () => {
  it("rounds down with a positive float below half", () => {
    assertEquals(halfOdd(1.4), 1);
  });
  it("rounds down with a negative float below half", () => {
    assertEquals(halfOdd(-1.4), -1);
  });
  it(
    "rounds to nearest odd integer with a positive half float rounding to an even integer",
    () => {
      assertEquals(halfOdd(1.5), 1);
    },
  );
  it(
    "rounds to nearest odd integer with a positive half float rounding to an odd integer",
    () => {
      assertEquals(halfOdd(2.5), 3);
    },
  );
  it("rounds to nearest odd integer with a negative half float", () => {
    assertEquals(halfOdd(-2.5), -3);
  });
  it("rounds up with a positive float above half", () => {
    assertEquals(halfOdd(1.6), 2);
  });
  it("rounds down with a negative float above half", () => {
    assertEquals(halfOdd(-1.6), -2);
  });
});

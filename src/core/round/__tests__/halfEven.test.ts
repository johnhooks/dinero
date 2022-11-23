import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { halfEven } from "../halfEven.ts";

describe("halfEven", () => {
  it("rounds down with a positive float below half", () => {
    assertEquals(halfEven(1.4), 1);
  });
  it("rounds down with a negative float below half", () => {
    assertEquals(halfEven(-1.4), -1);
  });
  it(
    "rounds to nearest even integer with a positive half float rounding to an even integer",
    () => {
      assertEquals(halfEven(1.5), 2);
    },
  );
  it(
    "rounds to nearest even integer with a positive half float rounding to an odd integer",
    () => {
      assertEquals(halfEven(2.5), 2);
    },
  );
  it("rounds to nearest even integer with a negative half float", () => {
    assertEquals(halfEven(-2.5), -2);
  });
  it("rounds up with a positive float above half", () => {
    assertEquals(halfEven(1.6), 2);
  });
  it("rounds down with a negative float above half", () => {
    assertEquals(halfEven(-1.6), -2);
  });
});

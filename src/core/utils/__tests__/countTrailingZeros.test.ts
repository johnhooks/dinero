import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { countTrailingZeros } from "../countTrailingZeros.ts";

const countTrailingZerosFn = countTrailingZeros(calculator);

describe("countTrailingZeros", () => {
  it("counts trailing zeros from a positive integer", () => {
    assertEquals(countTrailingZerosFn(1000, 10), 3);
  });
  it("counts trailing zeros from a negative integer", () => {
    assertEquals(countTrailingZerosFn(-1000, 10), 3);
  });
  it(
    "counts trailing zeros from a positive integer in scientific notation",
    () => {
      assertEquals(countTrailingZerosFn(1e3, 10), 3);
    },
  );
  it(
    "counts trailing zeros from a negative integer in scientific notation",
    () => {
      assertEquals(countTrailingZerosFn(-1e3, 10), 3);
    },
  );
  it("doesn't retrieve trailing zeros when there are none", () => {
    assertEquals(countTrailingZerosFn(123, 10), 0);
  });
  it("doesn't retrieve trailing zeros from floats", () => {
    assertEquals(countTrailingZerosFn(12.5, 10), 0);
  });
  it("correctly handles zero inputs", () => {
    assertEquals(countTrailingZerosFn(0, 10), 0);
    assertEquals(countTrailingZerosFn(0, 2), 0);
  });
});

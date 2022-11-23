import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { isEven } from "../isEven.ts";

describe("isEven", () => {
  it("returns true for a positive even integer", () => {
    assertEquals(isEven(202), true);
  });
  it("returns true for a negative even integer", () => {
    assertEquals(isEven(-202), true);
  });
  it("returns false for a positive odd integer", () => {
    assertEquals(isEven(101), false);
  });
  it("returns false for a negative odd integer", () => {
    assertEquals(isEven(-101), false);
  });
});

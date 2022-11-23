import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { decrement } from "../decrement.ts";

describe("decrement", () => {
  it("decrements positive numbers", () => {
    assertEquals(decrement(2n), 1n);
  });
  it("decrements negative numbers", () => {
    assertEquals(decrement(-2n), -3n);
  });
});

import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { increment } from "../increment.ts";

describe("increment", () => {
  it("increments positive numbers", () => {
    assertEquals(increment(2n), 3n);
  });
  it("increments negative numbers", () => {
    assertEquals(increment(-2n), -1n);
  });
});

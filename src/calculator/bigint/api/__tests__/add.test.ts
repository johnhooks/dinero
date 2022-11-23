import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { add } from "../add.ts";

describe("add", () => {
  it("adds up positive numbers", () => {
    assertEquals(add(2n, 3n), 5n);
  });
  it("adds up negative numbers", () => {
    assertEquals(add(-1n, -2n), -3n);
  });
});

import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { add } from "../add.ts";

describe("add", () => {
  it("adds up positive numbers", () => {
    assertEquals(add(2, 3), 5);
  });
  it("adds up negative numbers", () => {
    assertEquals(add(-1, -2), -3);
  });
  it("adds up floats", () => {
    assertEquals(add(1.5, 2.5), 4);
  });
  it("adds up numbers in scientific notation", () => {
    assertEquals(add(1e5, 2e5), 300000);
  });
});

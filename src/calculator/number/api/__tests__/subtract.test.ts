import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { subtract } from "../subtract.ts";

describe("subtract", () => {
  it("subtracts positive numbers", () => {
    assertEquals(subtract(1, 2), -1);
  });
  it("subtracts negative numbers", () => {
    assertEquals(subtract(-1, -2), 1);
  });
  it("subtracts floats", () => {
    assertEquals(subtract(1.5, 2.5), -1);
  });
  it("subtracts numbers in scientific notation", () => {
    assertEquals(subtract(1e5, 2e5), -100000);
  });
});

import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { subtract } from "../subtract.ts";

describe("subtract", () => {
  it("subtracts positive numbers", () => {
    assertEquals(subtract(1n, 2n), -1n);
  });
  it("subtracts negative numbers", () => {
    assertEquals(subtract(-1n, -2n), 1n);
  });
});

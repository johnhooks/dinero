import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { modulo } from "../modulo.ts";

describe("modulo", () => {
  it("performs a modulo with positive numbers", () => {
    assertEquals(modulo(5n, 3n), 2n);
  });
  it("performs a modulo with negative numbers", () => {
    assertEquals(modulo(-5n, -4n), -1n);
  });
});

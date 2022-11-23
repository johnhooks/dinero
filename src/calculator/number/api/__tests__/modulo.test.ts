import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { modulo } from "../modulo.ts";

describe("modulo", () => {
  it("performs a modulo with positive numbers", () => {
    assertEquals(modulo(5, 3), 2);
  });
  it("performs a modulo with negative numbers", () => {
    assertEquals(modulo(-5, -4), -1);
  });
  it("performs a modulo with floats", () => {
    assertEquals(modulo(10.5, 2.5), 0.5);
  });
  it("performs a modulo with numbers in scientific notation", () => {
    assertEquals(modulo(4e5, 3e5), 100000);
  });
});

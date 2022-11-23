import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { multiply } from "../multiply.ts";

describe("multiply", () => {
  it("multiplies positive numbers", () => {
    assertEquals(multiply(10, 20), 200);
  });
  it("multiplies negative numbers", () => {
    assertEquals(multiply(-10, -20), 200);
  });
  it("multiplies numbers in scientific notation", () => {
    assertEquals(multiply(1e5, 2e5), 20000000000);
  });
});

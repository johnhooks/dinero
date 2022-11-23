import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { multiply } from "../multiply.ts";

describe("multiply", () => {
  it("multiplies positive numbers", () => {
    assertEquals(multiply(10n, 20n), 200n);
  });
  it("multiplies negative numbers", () => {
    assertEquals(multiply(-10n, -20n), 200n);
  });
});

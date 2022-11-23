import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { power } from "../power.ts";

describe("power", () => {
  it("raises a positive number to the power of an exponent", () => {
    assertEquals(power(2n, 3n), 8n);
  });
  it("raises a negative number to the power of an exponent", () => {
    assertEquals(power(-2n, 3n), -8n);
  });
});

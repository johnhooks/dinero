import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { toNumber } from "../toNumber.ts";

describe("toNumber", () => {
  it("returns the input", () => {
    assertEquals(toNumber(2), 2);
  });
});

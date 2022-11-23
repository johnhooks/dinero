import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { zero } from "../zero.ts";

describe("zero", () => {
  it("returns zero", () => {
    assertEquals(zero(), 0n);
  });
});

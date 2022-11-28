import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { isArray } from "../isArray.ts";

describe("isArray", () => {
  it("returns true with arrays", () => {
    assertEquals(isArray([]), true);
  });
  it("returns false with numbers", () => {
    assertEquals(isArray(5), false);
  });
});

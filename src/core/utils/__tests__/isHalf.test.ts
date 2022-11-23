import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { isHalf } from "../isHalf.ts";

describe("#isHalf", () => {
  it("returns true with a half number", () => {
    assertEquals(isHalf(2.5), true);
  });
  it("returns true with a negative half number", () => {
    assertEquals(isHalf(-2.5), true);
  });
  it("returns false with a non-half number", () => {
    assertEquals(isHalf(2), false);
  });
});

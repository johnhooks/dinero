import { assertThrows } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { assert } from "../assert.ts";

const errorMessage = "Some error message.";

describe("assert", () => {
  it("doesn't throw when the condition is met", () => {
    assert(true, errorMessage);
  });
  it("throws when the condition isn't met", () => {
    assertThrows(
      () => assert(false, errorMessage),
      Error,
      "[Dinero.js] Some error message.",
    );
  });
});

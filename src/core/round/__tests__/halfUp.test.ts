import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { halfUp } from "../halfUp.ts";

describe("halfUp", () => {
  it("rounds down with a positive float below half", () => {
    assertEquals(halfUp(1.4), 1);
  });
  it("rounds down with a negative float below half", () => {
    assertEquals(halfUp(-1.4), -1);
  });
  it("rounds up with a positive half float", () => {
    assertEquals(halfUp(1.5), 2);
  });
  it("rounds up with a negative half float", () => {
    assertEquals(halfUp(-2.5), -2);
  });
  it("rounds up with a positive float above half", () => {
    assertEquals(halfUp(1.6), 2);
  });
  it("rounds down with a negative float above half", () => {
    assertEquals(halfUp(-1.6), -2);
  });
});

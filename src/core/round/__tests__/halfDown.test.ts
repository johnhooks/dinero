import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { halfDown } from "../halfDown.ts";

describe("halfDown", () => {
  it("rounds down with a positive float below half", () => {
    assertEquals(halfDown(1.4), 1);
  });
  it("rounds down with a negative float below half", () => {
    assertEquals(halfDown(-1.4), -1);
  });
  it("rounds down with a positive half float", () => {
    assertEquals(halfDown(1.5), 1);
  });
  it("rounds down with a negative half float", () => {
    assertEquals(halfDown(-1.5), -2);
  });
  it("rounds up with a positive float above half", () => {
    assertEquals(halfDown(1.6), 2);
  });
  it("rounds down with a negative float above half", () => {
    assertEquals(halfDown(-1.6), -2);
  });
});

import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { up } from "../up.ts";

describe("up", () => {
  it("rounds up with a positive float below half", () => {
    assertEquals(up(1.4), 2);
  });
  it("rounds up with a negative float below half", () => {
    assertEquals(up(-1.4), -1);
  });
  it("rounds up with a positive half float", () => {
    assertEquals(up(1.5), 2);
  });
  it("rounds up with a negative half float", () => {
    assertEquals(up(-1.5), -1);
  });
  it("rounds up with a positive float above half", () => {
    assertEquals(up(1.6), 2);
  });
  it("rounds up with a negative float above half", () => {
    assertEquals(up(-1.6), -1);
  });
});

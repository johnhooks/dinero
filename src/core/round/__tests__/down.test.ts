import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { down } from "../down.ts";

describe("down", () => {
  it("rounds down with a positive float below half", () => {
    assertEquals(down(1.4), 1);
  });
  it("rounds down with a negative float below half", () => {
    assertEquals(down(-1.4), -2);
  });
  it("rounds down with a positive half float", () => {
    assertEquals(down(1.5), 1);
  });
  it("rounds down with a negative half float", () => {
    assertEquals(down(-1.5), -2);
  });
  it("rounds down with a positive float above half", () => {
    assertEquals(down(1.6), 1);
  });
  it("rounds down with a negative float above half", () => {
    assertEquals(down(-1.6), -2);
  });
});

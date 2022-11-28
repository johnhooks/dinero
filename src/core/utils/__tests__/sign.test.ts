import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { calculator } from "../../../calculator/number/mod.ts";

import { sign } from "../sign.ts";

const signFn = sign(calculator);

describe("sign", () => {
  it("returns 0 with positive zero", () => {
    assertEquals(signFn(0), 0);
  });
  it("returns 0 with negative zero", () => {
    assertEquals(signFn(-0), 0);
  });
  it("returns 1 with positive values", () => {
    assertEquals(signFn(5), 1);
  });
  it("returns -1 with negative values", () => {
    assertEquals(signFn(-5), -1);
  });
});

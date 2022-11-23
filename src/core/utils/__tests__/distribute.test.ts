import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import {
  add,
  compare,
  decrement,
  increment,
  integerDivide,
  modulo,
  multiply,
  subtract,
  zero,
} from "../../../calculator/number/mod.ts";

import { distribute } from "../distribute.ts";

// @ts-expect-error testing
const distributeFn = distribute({
  add,
  compare,
  integerDivide,
  increment,
  decrement,
  multiply,
  subtract,
  zero,
  modulo,
});

describe("distribute", () => {
  it("distributes to percentages", () => {
    assertEquals(distributeFn(1003, [50, 50]), [502, 501]);
  });
  it("distributes to ratios", () => {
    assertEquals(distributeFn(100, [1, 3]), [25, 75]);
  });
  it("distributes negative amounts", () => {
    assertEquals(distributeFn(-1003, [50, 50]), [-502, -501]);
  });
  it("distributes while ignoring zero ratios", () => {
    assertEquals(distributeFn(1003, [0, 50, 50]), [0, 502, 501]);
  });
  it("distributes to zero ratios", () => {
    assertEquals(distributeFn(1003, [0, 0]), [0, 0]);
  });
  it("distributes to negative ratios", () => {
    assertEquals(distributeFn(1003, [-50, -50]), [502, 501]);
  });
  it("distributes negative amounts to negative ratios", () => {
    assertEquals(distributeFn(-1003, [-50, -50]), [-502, -501]);
  });
  it("distributes to empty ratios", () => {
    assertEquals(distributeFn(1003, []), []);
  });
});

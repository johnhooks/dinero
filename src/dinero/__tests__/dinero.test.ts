import { assertObjectMatch } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { USD } from "../../currencies/number/mod.ts";

import { dinero, toSnapshot } from "../mod.ts";

describe("dinero", () => {
  it("creates a Dinero object", () => {
    const d = dinero({ amount: 50000, currency: USD, scale: 4 });

    const snapshot = toSnapshot(d);

    assertObjectMatch(snapshot, { amount: 50000, currency: USD, scale: 4 });
  });
  it("uses the currency's exponent as scale when not provided", () => {
    const d = dinero({ amount: 500, currency: USD });

    const snapshot = toSnapshot(d);

    assertObjectMatch(snapshot, { amount: 500, currency: USD, scale: 2 });
  });
  it("cleans up unwanted properties from the options", () => {
    const d = dinero({
      amount: 500,
      // @ts-expect-error testing
      currency: { code: "USD", exponent: 2, base: 10, _extraProperty: 123 },
      _extraProperty: 123,
    });

    const snapshot = toSnapshot(d);

    assertObjectMatch(snapshot, {
      amount: 500,
      currency: USD,
      scale: 2,
    });
  });
});

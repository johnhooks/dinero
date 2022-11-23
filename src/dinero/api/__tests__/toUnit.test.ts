import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { down } from "../../../core/mod.ts";
import { USD } from "../../../currencies/number/mod.ts";

import { toUnit } from "../toUnit.ts";
import { dinero } from "../../dinero.ts";

describe("toUnit", () => {
  it("returns the amount in currency unit", () => {
    const d = dinero({ amount: 1050, currency: USD });

    assertEquals(toUnit(d), 10.5);
  });
  it("returns the amount in currency unit, based on a custom scale", () => {
    const d = dinero({ amount: 10545, currency: USD, scale: 3 });

    assertEquals(toUnit(d), 10.545);
  });
  it(
    "returns the amount in currency unit, rounded to one fraction digit",
    () => {
      const d = dinero({ amount: 1055, currency: USD });

      assertEquals(toUnit(d, { digits: 1, round: down }), 10.5);
    },
  );
  it(
    "returns the negative amount in currency unit, rounded to one fraction digit",
    () => {
      const d = dinero({ amount: -1055, currency: USD });

      assertEquals(toUnit(d, { digits: 1, round: down }), -10.6);
    },
  );
  it(
    "returns the amount in currency unit, rounded to two fraction digits",
    () => {
      const d = dinero({ amount: 1055, currency: USD });

      assertEquals(toUnit(d, { digits: 2, round: down }), 10.55);
    },
  );
  it(
    "returns the amount in currency unit, rounded to no fraction digit",
    () => {
      const d = dinero({ amount: 1055, currency: USD });

      assertEquals(toUnit(d, { digits: 0, round: down }), 10);
    },
  );
});

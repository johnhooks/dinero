import type { Calculator } from "../types/mod.ts";

import { equal } from "./equal.ts";
import { lessThan } from "./lessThan.ts";

export function sign<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);
  const lessThanFn = lessThan(calculator);
  const zero = calculator.zero();

  return (input: TAmount) => {
    if (equalFn(input, zero)) {
      return zero;
    }

    const one = calculator.increment(zero);
    const minusOne = calculator.decrement(zero);

    return lessThanFn(input, zero) ? minusOne : one;
  };
}

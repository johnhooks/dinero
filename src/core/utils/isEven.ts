import type { Calculator } from "../types/mod.ts";

import { equal } from "./equal.ts";

export function isEven<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);
  const zero = calculator.zero();
  const two = calculator.increment(calculator.increment(zero));

  return (input: TAmount) => {
    return equalFn(calculator.modulo(input, two), zero);
  };
}

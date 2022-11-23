/* eslint-disable functional/no-let, functional/no-loop-statement, functional/no-expression-statement */
import type { Calculator } from "../types/mod.ts";

import { equal } from "./equal.ts";

type CountTrailingZerosCalculator<TAmount> = Calculator<TAmount>;

export function countTrailingZeros<TAmount>(
  calculator: CountTrailingZerosCalculator<TAmount>,
) {
  const equalFn = equal(calculator);

  return (input: TAmount, base: TAmount) => {
    const zero = calculator.zero();

    if (equalFn(zero, input)) {
      return calculator.zero();
    }

    let i = zero;
    let temp = input;

    while (equalFn(calculator.modulo(temp, base), zero)) {
      temp = calculator.integerDivide(temp, base);
      i = calculator.increment(i);
    }

    return i;
  };
}

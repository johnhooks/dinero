import type { Dinero } from "../types/mod.ts";
import { equal } from "../utils/mod.ts";

export function haveSameCurrency<TAmount>(
  dineroObjects: ReadonlyArray<Dinero<TAmount>>,
) {
  const [firstDinero, ...otherDineros] = dineroObjects;
  const { currency: comparator } = firstDinero.toJSON();
  const equalFn = equal(firstDinero.calculator);

  return otherDineros.every((d) => {
    const { currency: subject } = d.toJSON();

    return (
      subject.code === comparator.code &&
      equalFn(subject.base, comparator.base) &&
      equalFn(subject.exponent, comparator.exponent)
    );
  });
}

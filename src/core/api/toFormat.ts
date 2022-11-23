import type { Calculator, Dinero, Transformer } from "../types/mod.ts";

import { toUnit } from "./toUnit.ts";

export type ToFormatParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount>,
];

export function toFormat<TAmount>(calculator: Calculator<TAmount>) {
  const toUnitFn = toUnit(calculator);

  return function toFormatFn(
    ...[dineroObject, transformer]: ToFormatParams<TAmount>
  ) {
    const { currency, scale } = dineroObject.toJSON();
    const amount = toUnitFn(dineroObject, { digits: scale });

    return transformer({ amount, currency, dineroObject });
  };
}

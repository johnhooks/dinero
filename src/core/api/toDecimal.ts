import { NON_DECIMAL_CURRENCY_MESSAGE } from "../checks/mod.ts";
import { assert } from "../helpers/mod.ts";
import type {
  Calculator,
  Dinero,
  Formatter,
  Transformer,
} from "../types/mod.ts";
import { computeBase, equal, isArray } from "../utils/mod.ts";

import { toUnits } from "./toUnits.ts";

export type ToDecimalParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer?: Transformer<TAmount, string, TAmount[]>,
];

export function toDecimal<TAmount>(calculator: Calculator<TAmount>) {
  const toUnitsFn = toUnits(calculator);
  const computeBaseFn = computeBase(calculator);
  const equalFn = equal(calculator);

  return function toDecimalFn(
    ...[
      dineroObject,
      transformer,
    ]: ToDecimalParams<TAmount>
  ) {
    const { currency, scale } = dineroObject.toJSON();

    const base = computeBaseFn(currency.base);
    const zero = calculator.zero();
    const ten = new Array(10).fill(null).reduce(calculator.increment, zero);

    const isMultiBase = isArray(currency.base);
    const isBaseTen = equalFn(calculator.modulo(base, ten), zero);
    const isDecimal = !isMultiBase && isBaseTen;

    // eslint-disable-next-line functional/no-expression-statement
    assert(isDecimal, NON_DECIMAL_CURRENCY_MESSAGE);

    const units = toUnitsFn(dineroObject);

    if (transformer) return transformer({ value: units, currency });

    const getDecimalFn = getDecimal(dineroObject.formatter);
    const value = getDecimalFn(units, scale);

    return value;
  };
}

function getDecimal<TAmount>(formatter: Formatter<TAmount>) {
  return (units: readonly TAmount[], scale: TAmount) => {
    return units
      .map((unit, index) => {
        const isLast = units.length - 1 === index;
        const unitAsString = formatter.toString(unit);

        if (isLast) {
          return unitAsString.padStart(formatter.toNumber(scale), "0");
        }

        return unitAsString;
      })
      .join(".");
  };
}

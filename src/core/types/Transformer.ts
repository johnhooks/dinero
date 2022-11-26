import type { Currency } from "./Currency.ts";

export type TransformerOptions<TAmount, TValue> = {
  readonly value: TValue;
  readonly currency: Currency<TAmount>;
};

export type Transformer<TAmount, TOutput, TValue> = (
  options: TransformerOptions<TAmount, TValue>,
) => TOutput;

export type TransformerOutput<T> = T extends (...args: never[]) => infer R ? R
  : never;

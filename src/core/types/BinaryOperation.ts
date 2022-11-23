export type BinaryOperation<TInput, TOutput = TInput> = (
  a: TInput,
  b: TInput,
) => TOutput;

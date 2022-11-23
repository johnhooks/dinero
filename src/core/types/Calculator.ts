/* eslint-disable functional/no-mixed-type */
import type {
  BinaryOperation,
  TransformOperation,
  UnaryOperation,
} from "./mod.ts";

export enum ComparisonOperator {
  LT = -1,
  EQ = 0,
  GT = 1,
}

export type Calculator<TInput> = {
  readonly add: BinaryOperation<TInput>;
  readonly compare: BinaryOperation<TInput, ComparisonOperator>;
  readonly decrement: UnaryOperation<TInput>;
  readonly integerDivide: BinaryOperation<TInput>;
  readonly increment: UnaryOperation<TInput>;
  readonly modulo: BinaryOperation<TInput>;
  readonly multiply: BinaryOperation<TInput>;
  readonly power: BinaryOperation<TInput>;
  readonly subtract: BinaryOperation<TInput>;
  readonly toNumber: TransformOperation<TInput, number>;
  readonly zero: () => TInput;
};

import type { Calculator } from "./Calculator.ts";

export type DivideOperation = <TAmount>(
  amount: TAmount,
  factor: TAmount,
  calculator: Calculator<TAmount>,
) => TAmount;

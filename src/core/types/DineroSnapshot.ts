import type { Currency } from "./Currency.ts";

export type DineroSnapshot<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale: TAmount;
};

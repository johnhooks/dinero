import type { Currency } from "./Currency.ts";

export type DineroOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale?: TAmount;
};

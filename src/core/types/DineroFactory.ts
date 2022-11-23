import type { Dinero, DineroOptions } from "./mod.ts";

export type DineroFactory<TAmount> = ({
  amount,
  currency,
  scale,
}: DineroOptions<TAmount>) => Dinero<TAmount>;

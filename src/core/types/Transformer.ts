import type { Currency } from "./Currency.ts";

import type { Dinero } from "./Dinero.ts";

export type TransformerOptions<TAmount> = {
  readonly amount: number;
  readonly currency: Currency<TAmount>;
  readonly dineroObject: Dinero<TAmount>;
};

export type Transformer<TAmount> = (
  options: TransformerOptions<TAmount>,
) => string;

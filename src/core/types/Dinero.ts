import type { Calculator, DineroOptions, DineroSnapshot } from "./mod.ts";

export type Dinero<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly create: (options: DineroOptions<TAmount>) => Dinero<TAmount>;
  readonly toJSON: () => DineroSnapshot<TAmount>;
};

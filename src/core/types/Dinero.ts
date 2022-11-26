import type {
  Calculator,
  DineroOptions,
  DineroSnapshot,
  Formatter,
} from "./mod.ts";

export type Dinero<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly formatter: Formatter<TAmount>;
  readonly create: (options: DineroOptions<TAmount>) => Dinero<TAmount>;
  readonly toJSON: () => DineroSnapshot<TAmount>;
};

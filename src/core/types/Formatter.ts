import type { Dinero } from "./Dinero.ts";

export type Formatter<TAmount> = (dineroObject: Dinero<TAmount>) => string;

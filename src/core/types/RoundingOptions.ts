import type { RoundingMode } from "./RoundingMode.ts";

export type RoundingOptions<TAmount> = {
  readonly digits?: TAmount;
  readonly round?: RoundingMode;
};

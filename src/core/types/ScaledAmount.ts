export type ScaledAmount<TAmount> = {
  readonly amount: TAmount;
  readonly scale?: TAmount;
};

import type { Dinero } from "../types/mod.ts";

export type ToSnapshotParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
];

export function toSnapshot<TAmount>(
  ...[
    dineroObject,
  ]: ToSnapshotParams<TAmount>
) {
  const value = dineroObject.toJSON();

  return value;
}

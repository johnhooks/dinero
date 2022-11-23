import type { Dinero } from "../types/mod.ts";

export function toSnapshot<TAmount>(dineroObject: Dinero<TAmount>) {
  return dineroObject.toJSON();
}

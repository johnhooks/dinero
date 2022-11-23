import { dinero, type DineroOptions } from "../../src/dinero/mod.ts";

export function createNumberDinero(options: DineroOptions<number>) {
  return dinero(options);
}

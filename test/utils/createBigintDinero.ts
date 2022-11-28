import { calculator } from "../../src/calculator/bigint/mod.ts";
import { createDinero, type DineroOptions } from "../../src/dinero/mod.ts";

const dinero = createDinero({ calculator });

export function createBigintDinero(options: DineroOptions<bigint>) {
  return dinero(options);
}

export { calculator as bigintCalculator };

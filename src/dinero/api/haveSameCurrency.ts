import { haveSameCurrency as coreHaveSameCurrency } from "../../core/mod.ts";

/**
 * Check whether a set of Dinero objects have the same currency.
 *
 * @param dineroObjects - The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same currency.
 *
 * @public
 */
export const haveSameCurrency = coreHaveSameCurrency;

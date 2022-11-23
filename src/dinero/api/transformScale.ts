import { transformScale as coreTransformScale } from "../../core/mod.ts";
import type { TransformScaleParams } from "../../core/mod.ts";

/**
 * Transform a Dinero object to a new scale.
 *
 * @param dineroObject - The Dinero object to transform.
 * @param newScale - The new scale.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function transformScale<TAmount>(
  ...[dineroObject, newScale]: TransformScaleParams<TAmount>
) {
  const { calculator } = dineroObject;
  const transformScaleFn = coreTransformScale(calculator);

  return transformScaleFn(dineroObject, newScale);
}

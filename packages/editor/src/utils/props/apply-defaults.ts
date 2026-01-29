/**
 * Applies default values to a object valued prop
 *
 * WARNING: This returns new object every time, so avoid using it in places where you expect the same reference
 * like in place where we pass this as prop to prevent unnecessary rerenders.
 */
export function applyDefaults<T>(
	prop: Partial<T> | undefined,
	defaultProp: Required<T>,
): Required<T> {
	return {
		...defaultProp,
		...prop,
	};
}

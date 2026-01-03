export type PlainObject = Record<PropertyKey, unknown>;
export function isPlainObject(arg: unknown): arg is PlainObject {
	if (
		arg !== null &&
		typeof arg === 'object' &&
		[null, Object.prototype].includes(Object.getPrototypeOf(arg))
	) {
		return true;
	}

	return false;
}

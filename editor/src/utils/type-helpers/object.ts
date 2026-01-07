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

export function isEqualObjects(object1: PlainObject, object2: PlainObject) {
	if (Object.keys(object1).length !== Object.keys(object2).length) {
		return false;
	}

	for (const key of Object.keys(object1)) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}

	return true;
}

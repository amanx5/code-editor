import { isEqualArrays } from '../..';

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

/**
 * Returns shallow comparison of 2 objects by their property values.
 */
export function isEqualObjects(a: unknown, b: unknown) {
	if (!isPlainObject(a) || !isPlainObject(b)) return false;

	const keys1 = Object.keys(a);
	const keys2 = Object.keys(b);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (Array.isArray(a[key])) {
			if (!isEqualArrays(a[key], b[key])) return false;
		} else {
			if (!Object.is(a[key], b[key])) return false;
		}
	}

	return true;
}

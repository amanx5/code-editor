import { isEqualObjects, isPlainObject } from '../..';

/**
 * Returns an array starting from `start` till `end`.
 * Negative range is also supported.
 */
export function range(start: number, end: number): number[] {
	if (!Number.isInteger(start) || !Number.isInteger(end)) {
		throw new Error('start and end must be integers');
	}

	const step = start <= end ? 1 : -1;
	const length = Math.abs(end - start) + 1;

	return Array.from({ length }, (_, i) => start + i * step);
}

export function shuffle<T>(arr: T[]) {
	return [...arr].sort(() => Math.random() - 0.5);
}
/**
 * Returns true if elements of both arrays are equal.
 * 
 * Note: If elements are objects, they are shallow compared using `isEqualObjects`.
 */
export function isEqualArrays(a: unknown, b: unknown) {
	if (!Array.isArray(a) || !Array.isArray(b)) return false;
	
	if (a.length !== b.length) return false;

	for (let i = 0; i < a.length; i++) {
		if (isPlainObject(a[i])) {
			if (!isEqualObjects(a[i], b[i])) return false;
		} else {
			if (!Object.is(a[i], b[i])) return false;
		}
	}

	return true;
}

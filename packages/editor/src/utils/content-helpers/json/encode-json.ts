
/**
 * Replica of native JSON.stringify, but this version fallbacks to casted string
 * instead of throwing error if the value is invalid.
 */
export function encode(
	value: unknown,
	replacer?:
		| ((this: any, key: string, value: any) => any)
		| (string | number)[]
		| null,
	space?: string | number
): string {
	try {
		return JSON.stringify(value, replacer as any, space);
	} catch {
		return String(value);
	}
}

export function beautifyJson(json: unknown) {
	return encode(json, null, 2);
}

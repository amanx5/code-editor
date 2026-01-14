export function toNumber(
	value: string,
	convertTo: 'integer' | 'float' = 'float',
	fallbackValue: null | number = 0
): number {
	const converter =
		convertTo === 'integer' ? Number.parseInt : Number.parseFloat;

	const result = converter(value, 10);

	return Number.isNaN(result) && fallbackValue != null
		? fallbackValue
		: result;
}

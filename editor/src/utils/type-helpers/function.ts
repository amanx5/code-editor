export type SetterValue<V> = V | ((prev: V) => V);

export function isFunction(arg: unknown): arg is Function {
	return typeof arg === 'function';
}

export function resolveSetterValue<V>(
	value: SetterValue<V>,
	previousValue: V,
): V {
	return isFunction(value) ? value(previousValue) : value;
}

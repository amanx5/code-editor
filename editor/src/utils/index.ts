export * from './code-editing';
export * from './code-languages';

export function cls(
	...args: Array<string | false | null | undefined>
) {
	return args.filter(Boolean).join(' ');
}
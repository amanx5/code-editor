import { exampleJson } from './example-json';
import { getExampleLines } from './example-lines';
import type { CodeEditorProps } from 'code-editor';

export type ExampleProps = CodeEditorProps;

export const EXAMPLES_PROPS: ExampleProps[] = [
	{
		document: {
			content: exampleJson,
			language: 'json',
		},
	},
	{
		document: {
			content: getExampleLines(1, 0, 5),
			language: 'txt',
		},
		editorOptions: {
			highlightLines: [1],
		},
	},
	{
		document: {
			content: getExampleLines(2, 0, 10),
			language: 'txt',
		},
		editorOptions: {
			highlightLines: [1, 3],
			hideLineNumbers: true
		},
	},
	{
		document: {
			content: getExampleLines(10, 0, 40),
			language: 'txt',
		},
		editorOptions: {
			highlightLines: [1, 3],
		},
	},
	{
		document: {
			content: getExampleLines(1000, 0, 40),
			language: 'txt',
		},
		editorOptions: {
			highlightLines: [1, 3],
		},
	},
];


export function formatPropValue(value: unknown): string {
	return Array.isArray(value)
		? '[ ' + value.join(', ') + ' ]'
		: isBoolean(value)
		? toBoolIcon(value)
		: String(value);
}

export function isBoolean(arg: unknown): arg is boolean {
	return typeof arg === 'boolean';
}

export function toBoolIcon(bool: boolean): string {
	return bool == true ? '✓' : '✗';
}

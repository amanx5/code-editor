import { exampleJson } from './example-json';
import { getExampleLines } from './example-lines';
import type { CodeEditorProps } from 'code-editor';

export type ExampleProps = CodeEditorProps;

export const EXAMPLES_PROPS: ExampleProps[] = [
	{
		code: exampleJson,
		codeLang: 'json',
	},
	{
		code: getExampleLines(1, 0, 6),
		codeLang: 'txt',
		highlightLines: [1],
	},
	{
		code: getExampleLines(10, 0, 40),
		codeLang: 'txt',
		highlightLines: [1, 3],
	},
	{
		code: getExampleLines(1000, 0, 40),
		codeLang: 'txt',
		highlightLines: [1, 3],
	},
];

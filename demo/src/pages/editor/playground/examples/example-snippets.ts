import {
	EXAMPLE_SNIPPET0,
	EXAMPLE_SNIPPET1,
	EXAMPLE_SNIPPET2,
	EXAMPLE_SNIPPET3,
	EXAMPLE_SNIPPET4,
} from './snippets';

export type EditorExample = {
	id: string;
	title: string;
	snippet: string;
};

export const EXAMPLE_SNIPPETS: Array<EditorExample> = [
	{
		id: 'example0',
		title: 'Select Example...',
		snippet: EXAMPLE_SNIPPET0,
	},
	{
		id: 'example1',
		title: 'Simple JSON',
		snippet: EXAMPLE_SNIPPET1,
	},
	{
		id: 'example2',
		title: 'Single highlighted text line',
		snippet: EXAMPLE_SNIPPET2,
	},
	{
		id: 'example3',
		title: 'Two text lines (highlighted second line), line numbers turned off',
		snippet: EXAMPLE_SNIPPET3,
	},
	{
		id: 'example4',
		title: 'Thousand text lines',
		snippet: EXAMPLE_SNIPPET4,
	},
];

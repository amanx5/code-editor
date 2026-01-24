import type { ContentTokeniser } from '../tokenise-content';

const JSON_TOKEN_REGEX =
	/(\s+|"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b|[{}\[\]:,]|[^\s{}\[\]:,"]+)/g;

const TOKEN_CLS_MAP = {
	string: 'text-ceMarkupToken-string',
	number: 'text-ceMarkupToken-number',
	boolean: 'text-ceMarkupToken-boolean',
	null: 'text-ceMarkupToken-null',
	punctuation: 'text-ceMarkupToken-punctuation',
	whitespace: 'text-ceMarkupToken-whitespace',
	unknown: 'text-ceMarkupToken-unknown',
} as const;

export const contentTokeniserJson: ContentTokeniser = (content) => {
	const lines = content.split('\n');
	const tokenisedLines = [];

	for (const line of lines) {
		const matches = line.match(JSON_TOKEN_REGEX) ?? [line];

		const tokens = matches.map((token) => ({
			cls: TOKEN_CLS_MAP[getTokenType(token)],
			value: token,
		}));

		tokenisedLines.push({
			value: line,
			tokens,
		});
	}

	return tokenisedLines;
};

function getTokenType(value: string): keyof typeof TOKEN_CLS_MAP {
	if (/^\s+$/.test(value)) return 'whitespace';
	if (/^"/.test(value)) return 'string';
	if (/^-?\d/.test(value)) return 'number';
	if (value === 'true' || value === 'false') return 'boolean';
	if (value === 'null') return 'null';
	if (/^[{}\[\]:,]$/.test(value)) return 'punctuation';

	return 'unknown';
}

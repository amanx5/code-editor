import type { Content } from '../language-util';
import type { TokenisedLine } from '../tokenise-content';

const JSON_TOKEN_REGEX =
	/(\s+|"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b|[{}\[\]:,])/g;

const TOKEN_CLS_MAP = {
	string: 'text-ceMarkupToken-string',
	number: 'text-ceMarkupToken-number',
	boolean: 'text-ceMarkupToken-boolean',
	null: 'text-ceMarkupToken-null',
	punctuation: 'text-ceMarkupToken-punctuation',
	whitespace: 'text-ceMarkupToken-whitespace',
	unknown: 'text-ceMarkupToken-unknown',
} as const;

export function contentTokeniserJson(content: Content): TokenisedLine[] {
	const plainLines = content.split('\n');
	let tokenisedLines: TokenisedLine[] = [];

	for (const line of plainLines) {
		const tokenisedLine: TokenisedLine = [];

		const matches = line.match(JSON_TOKEN_REGEX) ?? [];

		for (const token of matches) {
			const type = getTokenType(token);

			tokenisedLine.push({
				cls: TOKEN_CLS_MAP[type],
				value: token,
			});
		}

		tokenisedLines.push(tokenisedLine);
	}

	return tokenisedLines;
}

function getTokenType(value: string): keyof typeof TOKEN_CLS_MAP {
	if (/^\s+$/.test(value)) return 'whitespace';
	if (/^"/.test(value)) return 'string';
	if (/^-?\d/.test(value)) return 'number';
	if (value === 'true' || value === 'false') return 'boolean';
	if (value === 'null') return 'null';
	if (/^[{}\[\]:,]$/.test(value)) return 'punctuation';

	return 'unknown';
}

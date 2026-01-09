import type { Content } from '../language-util';
import type { Token, LineTokens } from '../tokenise-content';

const JSON_TOKEN_REGEX =
	/(\s+|"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b|[{}\[\]:,])/g;

const TOKEN_CLS_MAP = {
	string: 'text-ce-token-string',
	number: 'text-ce-token-number',
	boolean: 'text-ce-token-boolean',
	null: 'text-ce-token-null',
	punctuation: 'text-ce-token-punctuation',
	whitespace: 'text-ce-token-whitespace',
	unknown: 'text-ce-token-unknown',
} as const;

export function contentTokeniserJson(content: Content): LineTokens[] {
	const plainLines = content.split('\n');
	const LineTokenss: LineTokens[] = [];

	for (const line of plainLines) {
		const LineTokens: LineTokens = [];

		const matches = line.match(JSON_TOKEN_REGEX) ?? [];

		for (const token of matches) {
			const type = getTokenType(token);

			LineTokens.push({
				cls: TOKEN_CLS_MAP[type],
				value: token,
			} satisfies Token);
		}

		LineTokenss.push(LineTokens);
	}

	return LineTokenss;
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

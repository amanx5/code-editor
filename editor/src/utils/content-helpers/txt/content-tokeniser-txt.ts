import type { Content } from '../language-util';
import type { LineTokens } from '../tokenise-content';

export function contentTokeniserTxt(content: Content): LineTokens[] {
	const plainLines = content.split('\n');

	let LineTokenss: LineTokens[] = [];

	for (const line of plainLines) {
		const LineTokens: LineTokens = [
			{
				cls: '',
				value: line,
			},
		];

		LineTokenss.push(LineTokens);
	}

	return LineTokenss;
}

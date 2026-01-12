import type { Content } from '../language-util';
import type { TokenisedLine } from '../tokenise-content';

export function contentTokeniserTxt(content: Content): TokenisedLine[] {
	const plainLines = content.split('\n');

	let tokenisedLines: TokenisedLine[] = [];

	for (const line of plainLines) {
		const tokenisedLine: TokenisedLine = [
			{
				cls: '',
				value: line,
			},
		];

		tokenisedLines.push(tokenisedLine);
	}

	return tokenisedLines;
}

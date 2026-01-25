import type { ContentTokeniser } from '../tokenise-content';

export const contentTokeniserTxt: ContentTokeniser = (content) => {
	const lines = content.split('\n');
	const tokenisedLines = [];

	for (const line of lines) {
		const tokens = [
			{
				cls: '',
				value: line,
			},
		];

		tokenisedLines.push({
			value: line,
			tokens,
		});
	}

	return tokenisedLines;
};

import type { ContentTokeniser, TokenisedLine } from '../tokenise-content';

export const contentTokeniserTxt: ContentTokeniser = (content) => {
	const contentLines = content.split('\n');

	let result = [];

	for (const line of contentLines) {
		const tokenisedLine: TokenisedLine = {
			content: line,
			tokens: [
				{
					cls: '',
					value: line,
				},
			],
		};

		result.push(tokenisedLine);
	}

	return result;
};

import { getMarkupLine, type MarkupGenerator } from '../generate-markup';

export const generateMarkupTxt: MarkupGenerator = (content, error, options) => {
	const lines = content.split('\n');
	const markupLines = lines.map((lineContent, index) =>
		getMarkupLine(lineContent, index + 1, error, options)
	);
	const markup = markupLines.join('');

	return markup;
};

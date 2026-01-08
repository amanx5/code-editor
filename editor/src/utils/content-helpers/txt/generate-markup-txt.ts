import { getMarkupLine, type MarkupGenerator } from '../generate-markup';

export const generateMarkupTxt: MarkupGenerator = (content, error, markupOptions) => {
	const lines = content.split('\n');
	const markupLines = lines.map((lineContent, index) =>
		getMarkupLine(lineContent, index + 1, error, markupOptions)
	);
	const markup = markupLines.join('');

	return markup;
};

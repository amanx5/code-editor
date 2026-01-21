import type { EditorDocument } from '../..';
import {
	tokeniseContent,
	type Content,
	type EditorError,
	type TokenisedLine,
} from '../../utils';
import type { LineNumber } from '../useEditorMarkupApiSetup';

export type LineMeta = {
	content: Content;
	error: EditorError;
	number: LineNumber;
	tokens: TokenisedLine['tokens'];
};

export type EditorMarkupMeta = Array<LineMeta>;

export function generateMarkupMeta(
	document: EditorDocument,
	error: EditorError,
): EditorMarkupMeta {
	const tokenisedLines = tokeniseContent(document);

	const markup = tokenisedLines.map(({ content, tokens }, index) => {
		const lineNumber = index + 1;

		const lineMeta = {
			// TODO: Make editor error as key value pair of line numbers and corresponding errors
			content,
			error: error?.line === lineNumber ? error : null,
			number: lineNumber,
			tokens,
		};

		return lineMeta;
	});

	return markup;
}

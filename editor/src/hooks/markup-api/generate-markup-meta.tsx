import type { CodeLineNumber } from '../../components';
import type { EditorDocument } from '../../contexts';
import {
	tokeniseContent,
	type EditorError,
	type TokenisedLine,
} from '../../utils';

export type LineMeta = {
	error: EditorError | null;
	number: CodeLineNumber;
	value: TokenisedLine;
};

export type EditorMarkupMeta = Array<LineMeta>;

export function generateMarkupMeta(
	document: EditorDocument,
	error: EditorError
): EditorMarkupMeta {
	const tokenisedLines = tokeniseContent(document);

	const markup = tokenisedLines.map((lineTokens, index) => {
		const lineNumber = index + 1;

		const lineMeta = {
			// TODO: Make editor error as key value pair of line numbers and corresponding errors
			error: error?.line === lineNumber ? error : null,
			number: lineNumber,
			value: lineTokens,
		};

		return lineMeta;
	});

	return markup;
}



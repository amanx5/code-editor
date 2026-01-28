import type { DocumentIssues, EditorDocument, LineIssue } from '../..';
import {
	tokeniseContent,
	type Content,
	type TokenisedLine,
} from '../../utils';
import type { LineNumber } from '../useEditorMarkupApiSetup';

export type LineMeta = {
	issue?: LineIssue;
	number: LineNumber;
	tokens: TokenisedLine['tokens'];
	value: Content;
};

export type EditorMarkupMeta = Array<LineMeta>;

export function generateMarkupMeta(
	document: EditorDocument,
	documentIssues: DocumentIssues,
): EditorMarkupMeta {
	const tokenisedLines = tokeniseContent(document);

	const markup = tokenisedLines.map(({ value, tokens }, index) => {
		const lineNumber = index + 1;

		const lineMeta: LineMeta = {
			issue: documentIssues[lineNumber],
			number: lineNumber,
			tokens,
			value,
		};

		return lineMeta;
	});

	return markup;
}

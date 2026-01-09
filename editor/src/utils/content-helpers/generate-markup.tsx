import type { CodeLineNumber, EditorOptions } from '../../components';
import type { EditorDocument } from '../../contexts';
import type { ToolbarStateValues } from '../../contexts/ToolbarStatesContext';
import { cls } from '../styling';
import { tokeniseContent, type TokenisedLine } from './tokenise-content';
import type { EditorError } from './validate-content';

export type LineMeta = {
	cls: string;
	number: CodeLineNumber;
	value: TokenisedLine;
};

export type EditorMarkup = Array<LineMeta>;

export type MarkupOptions = EditorOptions & ToolbarStateValues;

export function generateMarkup(
	document: EditorDocument,
	error: EditorError,
	markupOptions?: MarkupOptions
): EditorMarkup {
	const tokenisedLines = tokeniseContent(document);

	const markup = tokenisedLines.map((lineTokens, index) => {
		const lineNumber = index + 1;

		const { highlightLines, isWrapEnabled } = markupOptions || {};
		const isInvalid = error?.line === lineNumber;
		const isHighlighted = highlightLines?.includes(lineNumber);

		const lineCls = cls(
			'ce-content flex-1 inline-flex',
			isHighlighted && 'bg-ce-bg-highlight',
			isInvalid && 'bg-ce-bg-error',
			isWrapEnabled && 'ce-content-wrap'
		);

		return {
			cls: lineCls,
			number: lineNumber,
			value: lineTokens,
		};
	});

	return markup;
}

import type { CodeLineNumber, EditorOptions } from '../../components';
import type { EditorDocument } from '../../contexts';
import type { ToolbarStateValues } from '../../contexts/ToolbarStatesContext';
import { cls } from '../styling';
import { LANGUAGE_UTIL, type Content } from './language-util';
import type { EditorError } from './validate-content';

export type EditorMarkup = string;

export type MarkupOptions = EditorOptions & ToolbarStateValues;

export type MarkupGenerator = (
	content: Content,
	error: EditorError,
	markupOptions?: MarkupOptions
) => EditorMarkup;

export function generateMarkup(
	document: EditorDocument,
	error: EditorError,
	markupOptions?: MarkupOptions
): EditorMarkup {
	const { content, language } = document;

	const MarkupGenerator = LANGUAGE_UTIL[language]?.markupGenerator;

	if (!MarkupGenerator) {
		throw new Error(
			`No 'MarkupGenerator' found for language '${language}'`
		);
	}

	return MarkupGenerator(content, error, markupOptions);
}

export function getMarkupLine(
	lineContent: Content,
	lineNumber: CodeLineNumber,
	error: EditorError,
	options?: MarkupOptions
) {
	const { highlightLines, isWrapEnabled } = options || {};
	const isInvalid = error?.line === lineNumber;
	const isHighlighted = highlightLines?.includes(lineNumber);

	const classes = cls(
		'inline-flex ce-content flex-1',
		isHighlighted && 'bg-ce-bg-highlight',
		isInvalid && 'bg-ce-bg-error',
		isWrapEnabled && 'ce-content-wrap'
	);

	return `<pre class='${classes}' data-line-num='${lineNumber}'>${lineContent}</pre>`;
}

export function mkp(...args: Array<string | false | null | undefined>) {
	return args.filter(Boolean).join('');
}

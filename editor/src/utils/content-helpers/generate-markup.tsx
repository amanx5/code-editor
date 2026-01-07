import type { CodeLineNumber, EditorDocument } from '../../contexts';
import { cls } from '../styling';
import { LANGUAGE_UTIL, type Content } from './language-util';
import type { EditorError } from './validate-content';

export type EditorMarkup = string;

export type MarkupGeneratorOptions = {
	beautify?: boolean;
	highlightLines?: CodeLineNumber[];
	wrapContent: boolean;
};

export type MarkupGenerator = (
	content: Content,
	error: EditorError,
	options?: MarkupGeneratorOptions
) => EditorMarkup;

export function generateMarkup(
	document: EditorDocument,
	error: EditorError,
	options?: MarkupGeneratorOptions
): EditorMarkup {
	const { content, language } = document;

	const MarkupGenerator = LANGUAGE_UTIL[language]?.markupGenerator;

	if (!MarkupGenerator) {
		throw new Error(
			`No 'MarkupGenerator' found for language '${language}'`
		);
	}

	return MarkupGenerator(content, error, options);
}

export function getMarkupLine(
	lineContent: Content,
	lineNumber: CodeLineNumber,
	error: EditorError,
	options?: MarkupGeneratorOptions
) {
	const { highlightLines, wrapContent } = options || {};
	const isInvalid = error?.line === lineNumber;
	const isHighlighted = highlightLines?.includes(lineNumber);

	const classes = cls(
		'inline-flex ce-content flex-1',
		isHighlighted && 'bg-ce-bg-highlight',
		isInvalid && 'bg-ce-bg-error',
		wrapContent && 'ce-content-wrap'
	);

	return `<pre class='${classes}' data-line-num='${lineNumber}'>${lineContent}</pre>`;
}

export function mkp(...args: Array<string | false | null | undefined>) {
	return args.filter(Boolean).join('');
}

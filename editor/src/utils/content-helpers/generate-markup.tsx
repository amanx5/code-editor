import type {
	CodeLineNumber,
	EditorOptions,
	MarkupElement,
} from '../../components';
import type { EditorDocument } from '../../contexts';
import type { ToolbarStateValues } from '../../contexts/ToolbarStatesContext';
import { MARKUP_LINE_ATTRIBUTES } from '../../hooks';
import { cls } from '../styling';
import {
	tokeniseContent,
	type TokenisedLine,
	type TokenMeta,
} from './tokenise-content';
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
	markupEl: MarkupElement,
	markupOptions?: MarkupOptions
): EditorMarkup {
	const tokenisedLines = tokeniseContent(document);

	const markup = tokenisedLines.map((lineTokens, index) => {
		const lineNumber = index + 1;

		const { highlightLines, isWrapEnabled, hideLineNumbers } =
			markupOptions || {};
		const isInvalid = error?.line === lineNumber;
		const isHighlighted = highlightLines?.includes(lineNumber);

		const lineCls = cls(
			'ce-content max-h-max flex-1 inline-flex',
			hideLineNumbers && 'ce-content-pd',
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

	renderMarkup(markup, markupEl);

	return markup;
}

// TODO: Perform a minimal diff of changed lines and only add new token markup instead of re-rendering complete markup
export function renderMarkup(markup: EditorMarkup, markupEl: MarkupElement) {
	const linesMarkup = markup
		.map((lineMeta) => convertLineMetaToMarkup(lineMeta))
		.join('');

	markupEl.innerHTML = linesMarkup;
}

export function convertLineMetaToMarkup(lineMeta: LineMeta): string {
	const lineNumAttr = MARKUP_LINE_ATTRIBUTES.lineNumber;
	const { cls, number, value } = lineMeta;

	const tokensMarkup = value.map(convertTokenMetaToMarkup).join('');

	return `<pre class='${cls}' ${lineNumAttr}='${number}'>${tokensMarkup}</pre>`;
}

export function convertTokenMetaToMarkup(token: TokenMeta): string {
	return `<span class='${token.cls}'>${token.value}</span>`;
}

import {
	MARKUP_LINE_ATTRIBUTES,
	type EditorMarkupMeta,
	type LineMeta,
	type MarkupApi,
	type RenderOptions,
} from '../../hooks';
import { cls } from '../../utils/styling';
import {
	type TokenMeta,
} from '../../utils';


// TODO: Perform a minimal diff of changed lines and only add new token markup instead of re-rendering complete markup
export function renderMarkup(
	markupApi: MarkupApi,
	markupMeta: EditorMarkupMeta,
	newRenderOptions?: RenderOptions
) {
	const markupEl = markupApi.getEl();

	if (!markupEl) return;

	const linesMarkup = markupMeta
		.map((lineMeta) =>
			generateLineElementMarkup(lineMeta, newRenderOptions)
		)
		.join('');

	markupEl.innerHTML = linesMarkup;
}

export function generateLineElementMarkup(
	lineMeta: LineMeta,
	renderOptions?: RenderOptions
): string {
	const { highlightLines, isWrapEnabled, hideLineNumbers } =
		renderOptions || {};

	const lineNumAttr = MARKUP_LINE_ATTRIBUTES.lineNumber;
	const { error, number, value } = lineMeta;

	const isHighlighted = highlightLines?.includes(number);

	const lineCls = cls(
		'ce-content',
		'flex-1 inline-flex',
		'max-h-max', // disabled stetching to parent's height
		hideLineNumbers && 'ce-content-pd',
		isHighlighted && 'bg-ce-bg-highlight',
		error && 'bg-ce-bg-error',
		isWrapEnabled && 'ce-content-wrap'
	);

	const tokensMarkup = value.map(generateTokenElementMarkup).join('');

	return `<pre class='${lineCls}' ${lineNumAttr}='${number}'>${tokensMarkup}</pre>`;
}

export function generateTokenElementMarkup(token: TokenMeta): string {
	return `<span class='${token.cls}'>${token.value}</span>`;
}
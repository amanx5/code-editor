import { type MarkupApi} from '../../';
import { type EditorOptions} from '../../../';
import { type TokenMeta, cls } from '../../../utils';
import type { EditorMarkupMeta, LineMeta } from './generate-markup-meta';

export type MarkupLineAttribute = keyof typeof MarkupLineAttributeDomName;

export enum MarkupLineAttributeDomName {
	lineNumber = 'data-line-num',
}

// TODO: Perform a minimal diff of changed lines and only add new token markup instead of re-rendering complete markup
export function renderMarkup(
	markupApi: MarkupApi,
	markupMeta: EditorMarkupMeta,
	editorOptions: EditorOptions,
) {
	const markupEl = markupApi.getElement();

	if (!markupEl) return;

	const linesMarkup = markupMeta.map(generateLineElementMarkup).join('');

	markupEl.innerHTML = linesMarkup;

	function generateLineElementMarkup(lineMeta: LineMeta): string {
		const { highlightLines, hideLineNumbers } =
			editorOptions;

		const lineNumAttr = MarkupLineAttributeDomName.lineNumber;
		const { error, number, tokens } = lineMeta;

		const isHighlighted = highlightLines?.includes(number);

		const tokensMarkup = tokens.map(generateTokenElementMarkup).join('');

		return `
			<pre 
				class='${cls(
					'ceContent',
					'flex-1 inline-flex',
					'max-h-max' /* disabled stetching to parent's height */,
					hideLineNumbers && 'pl-6',
					isHighlighted && 'bg-ceMarkupLine-highlight', // FIXME: Selection bg is not visible on highlighted lines. Either move this into OVERLAY* layer OR do a css workaround
					error && 'bg-ceMarkupLine-error',
					// isWrapEnabled && 'whitespace-pre-wrap wrap-anywhere',
				)}' 
				${lineNumAttr}='${number}'
			>${tokensMarkup}</pre>
		`;
	}

	function generateTokenElementMarkup(token: TokenMeta): string {
		return `<span class='${token.cls}'>${token.value}</span>`;
	}
}

import { memo } from 'react';
import {
	arePropValuesEqual,
	cls,
	EditorOptionsDefault,
	MarkupTokenMemo,
	applyDefaults,
	type EditorOptions,
	type LineIssue,
	type LineNumber,
	type TokenisedLine,
} from '../../..';

export type MarkupLineAttribute = keyof typeof MarkupLineAttributeDomName;

export enum MarkupLineAttributeDomName {
	lineNumber = 'data-line-num',
}

export const MarkupLineMemo = memo(MarkupLine, arePropValuesEqual);

function MarkupLine({
	editorOptions,
	issue,
	number,
	tokens,
}: {
	editorOptions?: EditorOptions;
	issue?: LineIssue;
	number: LineNumber;
	tokens: TokenisedLine['tokens'];
}) {
	editorOptions = applyDefaults(editorOptions, EditorOptionsDefault);

	const { highlightLines, hideLineNumbers } = editorOptions;
	const lineNumAttr = MarkupLineAttributeDomName.lineNumber;
	const isHighlighted = highlightLines?.includes(number);

	return (
		<pre
			className={cls(
				'ceContent',
				'flex-1 inline-flex',
				'max-h-max' /* disabled stetching to parent's height */,
				hideLineNumbers && 'pl-6',
				isHighlighted && 'bg-ceMarkupLine-highlight', // FIXME: Selection bg is not visible on highlighted lines. Either move this into OVERLAY* layer OR do a css workaround
				issue && 'bg-ceMarkupLine-issue',
				// isWrapEnabled && 'whitespace-pre-wrap wrap-anywhere',
			)}
			{...{ [lineNumAttr]: number }}
		>
			{tokens.map(({ cls, value }, index) => (
				<MarkupTokenMemo key={index} cls={cls} value={value} />
			))}
		</pre>
	);
}

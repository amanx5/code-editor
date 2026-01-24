import { memo } from 'react';
import {
	cls,
	type EditorOptions,
	type LineMeta,
} from '../../..';

export type MarkupLineAttribute = keyof typeof MarkupLineAttributeDomName;

export enum MarkupLineAttributeDomName {
	lineNumber = 'data-line-num',
}

export const MarkupLine = memo(MarkupLineComp);

function MarkupLineComp({
	children,
	editorOptions,
	lineMeta,
}: {
	children?: React.ReactNode;
	editorOptions: EditorOptions;
	lineMeta: LineMeta;
}) {
	const { highlightLines, hideLineNumbers } = editorOptions;
	const lineNumAttr = MarkupLineAttributeDomName.lineNumber;
	const { error, number } = lineMeta;

	const isHighlighted = highlightLines?.includes(number);

	return (
		<pre
			className={cls(
				'ceContent',
				'flex-1 inline-flex',
				'max-h-max' /* disabled stetching to parent's height */,
				hideLineNumbers && 'pl-6',
				isHighlighted && 'bg-ceMarkupLine-highlight', // FIXME: Selection bg is not visible on highlighted lines. Either move this into OVERLAY* layer OR do a css workaround
				error && 'bg-ceMarkupLine-error',
				// isWrapEnabled && 'whitespace-pre-wrap wrap-anywhere',
			)}
			{...{ [lineNumAttr]: number }}
		>
			{children}
		</pre>
	);
}

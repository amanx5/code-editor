import { memo } from 'react';
import {
	comparePropsByValue,
	cls,
	MarkupTokenMemo,
	type LineMeta,
} from '../../..';

export type MarkupLineAttribute = keyof typeof MarkupLineDomAttribute;

export enum MarkupLineDomAttribute {
	lineNumber = 'data-line-num',
}

export type MarkupLineProps = LineMeta;

function MarkupLine(props: MarkupLineProps) {
	const { number, tokens } = props;
	const dataAttributes = {
		[MarkupLineDomAttribute.lineNumber]: number,
	};

	return (
		<pre
			className={cls(
				'ceContent',
				'flex-1 inline-flex',
				'max-h-max' /* disabled stetching to parent's height */,
				// hideLineNumbers && 'pl-6',
				// isWrapEnabled && 'whitespace-pre-wrap wrap-anywhere',
			)}
			{...dataAttributes}
		>
			{tokens.map(({ cls, value }, index) => (
				<MarkupTokenMemo key={index} cls={cls} value={value} />
			))}
		</pre>
	);
}

export const MarkupLineMemo = memo(MarkupLine, comparePropsByValue);

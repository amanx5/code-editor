import { memo } from 'react';
import {
	applyDefaults,
	comparePropsByValue,
	cls,
	EditorOptionsDefault,
	type EditorOptions,
	type LineMeta,
} from '../../..';

export const DecorationMemo = memo(Decoration, comparePropsByValue);

export type DecorationProps = LineMeta & {
	editorOptions?: EditorOptions;
};

function Decoration(props: DecorationProps) {
	const { issue, number, value } = props;

	const editorOptions = applyDefaults(
		props.editorOptions,
		EditorOptionsDefault,
	);
	const { highlightLines } = editorOptions;
	const isHighlighted = highlightLines.includes(number);
    const isError = issue?.type === 'error';
    const isWarning = issue?.type === 'warning';

	return (
		<pre
			className={cls(
				'ceContent',
				'flex-1 inline-flex',
				'max-h-max',
				isHighlighted && 'bg-ceDecoration-highlight',
				isError && 'bg-ceDecoration-error',
				isWarning && 'bg-ceDecoration-warning',
				'text-transparent',
			)}
		>
			{value}
		</pre>
	);
}

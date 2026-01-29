import { comparePropsByValue, cls } from '../../../utils';
import { memo } from 'react';
import type { SelectionRange } from './SelectionLayer';
import { useEditorApi } from '../../../hooks';

export type SelectionProps = SelectionRange;

function Selection(props: SelectionProps) {
	const { cursor } = useEditorApi();

	const { columnStart, columnEnd, lineNumber } = props;

	const columnStartCoordinate = cursor.positionToCoordinates({
		lineColumn: columnStart,
		lineNumber,
	});

	const columnEndCoordinate = cursor.positionToCoordinates({
		lineColumn: columnEnd,
		lineNumber,
	});

	const width = columnEndCoordinate.x - columnStartCoordinate.x;

	return (
		<div
			key={lineNumber}
			className={cls('absolute', 'bg-blue-100', 'ceContent')}
			style={{
				width: width + 'px',
				transform: `translate(${columnStartCoordinate.x}px, ${columnStartCoordinate.y}px)`,
			}}
		/>
	);
}

export const SelectionMemo = memo(Selection, comparePropsByValue);

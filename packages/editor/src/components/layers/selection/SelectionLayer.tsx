import {
	MIN_LINE_COLUMN,
	type LineColumn,
	type LineNumber,
	useEditorApi,
} from '../../../hooks';
import { comparePositions, PositionComparison, range } from '../../../utils';
import { SelectionMemo } from './Selection';

export type SelectionRange = {
	columnStart: LineColumn;
	columnEnd: LineColumn;
	lineNumber: LineNumber;
};

export function SelectionLayer() {
	const { cursor, markup } = useEditorApi();
	const { getMaxLineColumn } = markup;
	const { selection } = cursor;

	if (!selection) return null;

	const { start, end } = selection;
	const selectionRanges: Array<SelectionRange> = [];
	const positionComparison = comparePositions(start, end);

	if (positionComparison === PositionComparison.EQUAL) {
		return null; // NOOP as start and end is equal (collapsed selection)
	} else {
		const isForwardSelection =
			positionComparison === PositionComparison.LESSER;

		for (const lineNumber of range(start.lineNumber, end.lineNumber)) {
			const lesserLineNumber = isForwardSelection ? start : end;
			const greaterLineNumber = isForwardSelection ? end : start;

			const columnStart =
				lineNumber === lesserLineNumber.lineNumber
					? lesserLineNumber.lineColumn
					: MIN_LINE_COLUMN;

			const columnEnd =
				lineNumber === greaterLineNumber.lineNumber
					? greaterLineNumber.lineColumn
					: getMaxLineColumn(lineNumber) + 1;

			selectionRanges.push({
				columnStart,
				columnEnd,
				lineNumber,
			});
		}
	}

	return (
		<div aria-hidden className='absolute select-none pointer-events-none'>
			{selectionRanges.map((selectionRange) => (
				<SelectionMemo
					key={selectionRange.lineNumber}
					{...selectionRange}
				/>
			))}
		</div>
	);
}

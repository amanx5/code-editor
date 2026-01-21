import {
	MIN_LINE_COLUMN,
	type Coordinates,
	type LineColumn,
	type LineNumber,
	useEditorApi,
} from '../../hooks';
import { cls, range } from '../../utils';
import { comparePositions, PositionComparison } from '../../utils/cursor';

export type LineSelectionRange = {
	columnStart: LineColumn;
	columnEnd: LineColumn;
	lineNumber: LineNumber;
};

export type LineSelectionMeta = {
	coordinates: Coordinates;
	lineNumber: LineNumber;
	width: number;
};

export function SelectionLayer() {
	const { cursor, markup } = useEditorApi();
	const { getLineElement, getMaxLineColumn } = markup;
	const { positionToCoordinates, selection } = cursor;

	if (!selection) return null;

	const { start, end } = selection;
	const lineSelectionRanges: Array<LineSelectionRange> = [];
	const positionComparison = comparePositions(start, end);

	if (positionComparison === PositionComparison.EQUAL) {
		// NOOP as start and end is equal (collapsed selection)
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

			lineSelectionRanges.push({
				columnStart,
				columnEnd,
				lineNumber,
			});
		}
	}

	const lineSelMeta: Array<LineSelectionMeta> = lineSelectionRanges.map(
		({ columnStart, columnEnd, lineNumber }) => {
			const lineElement = getLineElement(lineNumber);
			if (!lineElement) {
				throw new Error(
					'Invalid line number in cursor selection. No corresponding line element found for line number:  ' +
						lineNumber,
				);
			}

			const columnStartCoordinate = positionToCoordinates({
				lineColumn: columnStart,
				lineNumber,
			});

			const columnEndCoordinate = positionToCoordinates({
				lineColumn: columnEnd,
				lineNumber,
			});

			const width = columnEndCoordinate.x - columnStartCoordinate.x;

			return {
				coordinates: columnStartCoordinate,
				lineNumber,
				width,
			};
		},
	);

	return (
		<div aria-hidden className='absolute select-none pointer-events-none'>
			{lineSelMeta.map(({ lineNumber, coordinates, width }) => (
				<div
					key={lineNumber}
					className={cls('absolute', 'bg-blue-100', 'ceContent')}
					style={{
						width: width + 'px',
						transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
					}}
				/>
			))}
		</div>
	);
}

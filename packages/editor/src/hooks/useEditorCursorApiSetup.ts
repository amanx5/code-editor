import { useMemo, useState } from 'react';
import {
	MIN_LINE_COLUMN,
	MIN_LINE_NUMBER,
	type Coordinates,
	type LineColumn,
	type LineNumber,
	type MarkupApi,
} from './useEditorMarkupApiSetup';
import {
	type Content,
	isEqualObjects,
	toNumber,
	comparePositions,
	PositionComparison,
} from '../utils';

export type CursorOffset = number;

export type CursorPosition = {
	lineColumn: LineColumn;
	lineNumber: LineNumber;
};

export type CursorSelection = {
	start: CursorPosition;
	end: CursorPosition;
};

type CursorSelectionAction =
	| CursorSelection
	| { collapse: CursorPosition }
	| { moveStart: CursorPosition }
	| { moveEnd: CursorPosition };

export type CursorSelectionListener = () => void;

export type CursorApi = {
	selection: CursorSelection | null;
	getSelectedContent(): Content | null;

	positionFromEvent(event: React.PointerEvent): CursorPosition;
	positionNormalize(cursorPosition: CursorPosition): CursorPosition;
	positionToCoordinates(cursorPosition: CursorPosition): Coordinates;
	positionToOffset(cursorPosition: CursorPosition): CursorOffset;

	updateSelection(action: CursorSelectionAction): void;
};

/**
 * CursorAPI setup hook
 *
 * NOTE: This is a single use hook per editor instance.
 *
 * FIXME: Cursor renders blurry and wider on alternate columns. But looks fine on high zoom levels.
 */
export function useEditorCursorApiSetup(markupApi: MarkupApi): CursorApi {
	const [selection, setSelection] = useState<CursorSelection | null>(null);

	const cursorApiMemoized = useMemo<CursorApi>(() => {
		const cursorApi: CursorApi = {
			selection,
			getSelectedContent() {
				const commit = markupApi.commit;
				if (!commit || !selection) return null;

				const { start, end } = selection;
				if (comparePositions(start, end) === PositionComparison.EQUAL) {
					return null;
				}

				const allContent = commit.document.content;
				const startOffset = cursorApi.positionToOffset(start);
				const endOffset = cursorApi.positionToOffset(end);

				return allContent.substring(startOffset, endOffset);
			},

			positionFromEvent(event) {
				const markupMetrics = markupApi.getMetrics();
				if (!markupMetrics) {
					throw new Error('Markup metrics not setup yet.');
				}

				const targetEl = event.target as HTMLElement;
				const closestLineEl = markupApi.getLineElement({
					near: targetEl,
				});
				const lastLineEl = markupApi.getLineElement('last');

				if (!lastLineEl) {
					throw new Error(
						'Unable to calculate cursor position as no lines are rendered yet.',
					);
				}

				let lineColumn, lineNumber;
				if (closestLineEl) {
					const lineNumAttrVal = markupApi.getLineElementAttribute(
						closestLineEl,
						'lineNumber',
					);
					lineNumber = toNumber(lineNumAttrVal);

					const lineStartClientX =
						closestLineEl.getBoundingClientRect().left +
						toNumber(markupMetrics.line.paddingLeft);

					const targettedColumnDistanceFromLineStart =
						event.clientX - lineStartClientX;

					const targettedColumn = Math.round(
						targettedColumnDistanceFromLineStart /
							markupMetrics.column.width,
					);

					lineColumn = targettedColumn + 1; // after targetted column
				} else {
					const lineNumAttrVal = markupApi.getLineElementAttribute(
						lastLineEl,
						'lineNumber',
					);
					lineNumber = toNumber(lineNumAttrVal);

					const lastColumn = markupApi.getMaxLineColumn(lineNumber);
					lineColumn = lastColumn + 1; // after last character
				}

				return {
					lineColumn,
					lineNumber,
				};
			},
			positionNormalize(cursorPosition) {
				const maxLineNumber = markupApi.getMaxLineNumber();
				const lineNumberNormalized = Math.max(
					MIN_LINE_NUMBER,
					Math.min(cursorPosition.lineNumber, maxLineNumber),
				);
				
				const maxLineColumn = markupApi.getMaxLineColumn(lineNumberNormalized);
				const lineColumnNormalized = Math.max(
					MIN_LINE_COLUMN,
					Math.min(
						cursorPosition.lineColumn,
						maxLineColumn + 1,
					),
				);

				return {
					lineColumn: lineColumnNormalized,
					lineNumber: lineNumberNormalized,
				};
			},
			positionToCoordinates(cursorPosition) {
				const lineEl = markupApi.getLineElement(
					cursorPosition.lineNumber,
				);
				const markupMetrics = markupApi.getMetrics();

				if (!lineEl || !markupMetrics) {
					throw new Error(
						'Call this method only after the editor is rendered.',
					);
				}

				// TODO: Calculate metrics everytime based on lineContentTillCursor

				const lineColumnWidthMultiplier = cursorPosition.lineColumn - 1;

				const columnsWidth =
					lineColumnWidthMultiplier * markupMetrics.column.width +
					(lineColumnWidthMultiplier - 1) *
						toNumber(markupMetrics.column.letterSpacing);

				const lineElementCoordinates =
					markupApi.getLineElementCoordinates(lineEl);

				const x: number =
					lineElementCoordinates.x +
					toNumber(markupMetrics.line.paddingLeft) +
					columnsWidth;

				const y = lineElementCoordinates.y;

				return { x, y };
			},
			positionToOffset(cursorPosition) {
				const { lineNumber, lineColumn } = cursorPosition;
				const commit = markupApi.commit;

				if (!commit) {
					throw new Error(
						'Unable to calculate offset as no document is commited yet.',
					);
				}

				const allContent = commit.document.content;

				const lines = allContent.split('\n');

				let offset = lines
					.slice(undefined, lineNumber - 1)
					.reduce((prev, curr) => (prev += curr.length), 0);

				offset += lineColumn - 1;

				return offset;
			},

			updateSelection(selectionAction) {
				const prevSelection = selection;

				let nextSelection: CursorSelection;
				if ('start' in selectionAction && 'end' in selectionAction) {
					nextSelection = {
						start: selectionAction.start,
						end: selectionAction.end,
					};
				} else if ('collapse' in selectionAction) {
					nextSelection = {
						start: selectionAction.collapse,
						end: selectionAction.collapse,
					};
				} else if ('moveStart' in selectionAction) {
					nextSelection = {
						start: selectionAction.moveStart,
						end: prevSelection
							? prevSelection.end
							: selectionAction.moveStart,
					};
				} else if ('moveEnd' in selectionAction) {
					nextSelection = {
						start: prevSelection
							? prevSelection.start
							: selectionAction.moveEnd,
						end: selectionAction.moveEnd,
					};
				} else {
					throw new Error(
						'Invalid action provided in updateSelection',
					);
				}

				nextSelection = {
					start: cursorApi.positionNormalize(nextSelection.start),
					end: cursorApi.positionNormalize(nextSelection.end),
				};

				const isSelectionChanged =
					!isEqualObjects(selection?.start, nextSelection.start) ||
					!isEqualObjects(selection?.end, nextSelection.end);

				if (isSelectionChanged) {
					setSelection(nextSelection);
				}
			},
		};

		return cursorApi;
	}, [selection, markupApi]);

	return cursorApiMemoized;
}

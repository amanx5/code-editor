import { useLayoutEffect, useRef } from 'react';
import type { CursorElement } from '../../components';
import { type MarkupApi } from './useMarkupApi';
import {
	isEqualObjects,
	resolveSetterValue,
	toNumber,
	type SetterValue,
} from '../../utils';

export type LineColumn = number;
export type LineNumber = number;

export const MIN_LINE_COLUMN: LineColumn = 1;
export const MIN_LINE_NUMBER: LineNumber = 1;

export type CursorPosition = {
	lineColumn: LineColumn;
	lineNumber: LineNumber;
};

export enum PositionComparison {
	BEFORE = -1,
	EQUAL = 0,
	AFTER = 1,
}

export type CursorSelection = {
	start: CursorPosition;
	end: CursorPosition;
};

export type CursorSelectionListener = () => void;

export type CursorApi = {
	calculatePosition(e: React.PointerEvent): CursorPosition | null;

	getElement(): CursorElement | null;

	getMaxLineColumn(lineNumber: LineNumber): LineColumn;

	getMaxLineNumber(): LineNumber;

	getSelection(): CursorSelection;

	setElement(element: CursorElement): void;

	setSelection(arg: SetterValue<CursorSelection>): void;

	setSelectionCollapsed(cursorPosition: CursorPosition): void;

	setSelectionStart(cursorPosition: CursorPosition): void;

	setSelectionEnd(cursorPosition: CursorPosition): void;

	setVisible(isVisible: boolean): void;

	subscribeSelection(listener: CursorSelectionListener): () => void;
};

/**
 *
 * Cursor API hook
 *
 * NOTE: This is a single use hook per editor instance.
 *
 * To prevent unnecessary re-creations of the API object on rerenders, the returned API object is memoized internally by keeping it in a ref.
 */
// FIXME: Cursor renders blurry and wider on alternate columns. But looks fine on high zoom levels.
export function useCursorApi(markupApi: MarkupApi): CursorApi {
	const defaultPosition = {
		lineColumn: 1,
		lineNumber: 1,
	};
	const apiRef = useRef<CursorApi>(null);
	const elementRef = useRef<CursorElement>(null);
	const selectionRef = useRef<CursorSelection>({
		start: defaultPosition,
		end: defaultPosition,
	});

	const selectionListenersRef = useRef<CursorSelectionListener[]>([]);

	// sync initial cursor coordinates
	useLayoutEffect(syncCoordinates, []);

	// Create the Cursor API only once to keep a stable imperative API reference.
	// Recreating this object would break functions holding the old reference
	// dont use ?? even though it prevents overwriting, the assignment itself runs every render, which is a smell and can break in StrictMode or future refactors.
	if (!apiRef.current) {
		apiRef.current = {
			calculatePosition(e) {
				const markupMetrics = markupApi.getMetrics();
				if (!markupMetrics) return null;

				const targetEl = e.target as HTMLElement;

				let lineColumn, lineNumber;

				const closestLineEl = markupApi.getLineElement({
					near: targetEl,
				});
				const lastLineEl = markupApi.getLineElement('last');

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
						e.clientX - lineStartClientX;

					const targettedColumn = Math.round(
						targettedColumnDistanceFromLineStart /
							markupMetrics.column.width,
					);

					const lastColumn = this.getMaxLineColumn(lineNumber);

					if (targettedColumn < MIN_LINE_COLUMN) {
						lineColumn = MIN_LINE_COLUMN; // before first character
					} else if (targettedColumn > lastColumn) {
						lineColumn = lastColumn + 1; // after last character
					} else {
						lineColumn = targettedColumn + 1; // +1 for 1-based index
					}
				} else if (lastLineEl) {
					const lineNumAttrVal = markupApi.getLineElementAttribute(
						lastLineEl,
						'lineNumber',
					);
					lineNumber = toNumber(lineNumAttrVal);

					const lastColumn = this.getMaxLineColumn(lineNumber);
					lineColumn = lastColumn + 1; // after last character
				}

				if (lineColumn != null && lineNumber != null) {
					return {
						lineColumn,
						lineNumber,
					};
				}

				return null;
			},

			getElement() {
				return elementRef.current ?? null;
			},

			getMaxLineColumn(lineNumber) {
				const currentCommit = markupApi.getCurrentCommit();
				if (!currentCommit) return MIN_LINE_COLUMN;

				const lineMeta = currentCommit.markupMeta.find(
					(lineMeta) => lineMeta.number === lineNumber,
				);

				if (!lineMeta) {
					throw new Error(
						`Line meta doesn't exist for line number: ${lineNumber}`,
					);
				}

				return lineMeta.content.length;
			},

			getMaxLineNumber() {
				const currentCommit = markupApi.getCurrentCommit();
				if (!currentCommit) return MIN_LINE_NUMBER;

				return currentCommit.markupMeta.length;
			},

			getSelection() {
				return selectionRef.current;
			},

			setElement(el) {
				elementRef.current = el;
			},

			setSelection(value) {
				const newSelection = resolveSetterValue(
					value,
					this.getSelection(),
				);

				const newSelectionNormalized = normalizeSelection(newSelection);

				const isSelectionChanged =
					!isEqualObjects(
						selectionRef.current.start,
						newSelectionNormalized.start,
					) ||
					!isEqualObjects(
						selectionRef.current.end,
						newSelectionNormalized.end,
					);

				if (isSelectionChanged) {
					selectionRef.current = newSelectionNormalized;

					syncCoordinates();
					notifySelectionListeners();
				} else {
					this.setVisible(true);
				}
			},

			setSelectionCollapsed(cursorPosition) {
				this.setSelection({
					start: cursorPosition,
					end: cursorPosition,
				});
			},

			setSelectionStart(cursorPosition) {
				this.setSelection((prev) => ({
					start: cursorPosition,
					end: prev.end,
				}));
			},

			setSelectionEnd(cursorPosition) {
				this.setSelection((prev) => ({
					start: prev.start,
					end: cursorPosition,
				}));
			},

			setVisible(isVisible: boolean) {
				const cursorEl = this.getElement();

				if (!cursorEl) return;

				cursorEl.classList.toggle('hidden', !isVisible);

				if (isVisible) {
					cursorEl.scrollIntoView({
						behavior: 'instant',
						block: 'nearest',
						inline: 'nearest',
					});
				}
			},

			subscribeSelection(listener: CursorSelectionListener) {
				selectionListenersRef.current.push(listener);

				return () => {
					selectionListenersRef.current =
						selectionListenersRef.current.filter(
							(li) => li !== listener,
						);
				};
			},
		};
	}

	return apiRef.current;

	function normalizeSelection(selection: CursorSelection): CursorSelection {
		const { start, end } = selection;

		return {
			start: normalizePosition(start),
			end: normalizePosition(end),
		};
	}

	function normalizePosition(position: CursorPosition): CursorPosition {
		const cursorApi = apiRef.current;

		let lineColumnNormalized, lineNumberNormalized;

		if (cursorApi) {
			lineNumberNormalized = Math.max(
				MIN_LINE_NUMBER,
				Math.min(position.lineNumber, cursorApi.getMaxLineNumber()),
			);

			lineColumnNormalized = Math.max(
				MIN_LINE_COLUMN,
				Math.min(
					position.lineColumn,
					cursorApi.getMaxLineColumn(lineNumberNormalized) + 1,
				),
			);
		} else {
			lineColumnNormalized = MIN_LINE_COLUMN;
			lineNumberNormalized = MIN_LINE_NUMBER;
		}

		return {
			lineColumn: lineColumnNormalized,
			lineNumber: lineNumberNormalized,
		};
	}

	function notifySelectionListeners() {
		for (const listener of selectionListenersRef.current) {
			listener();
		}
	}

	function syncCoordinates() {
		const cursorApi = apiRef.current;
		if (!cursorApi) return;

		const cursorPosition = cursorApi.getSelection().end;
		const markupMetrics = markupApi.getMetrics();
		if (!markupMetrics) return;

		const cursorEl = cursorApi.getElement();
		const markupEl = markupApi.getElement();
		const lineEl = markupApi.getLineElement(cursorPosition.lineNumber);
		if (!cursorEl || !lineEl || !markupEl) return;

		// TODO: Calculate metrics everytime based on lineContentTillCursor
		// const lineContentTillCursor = lineEl.textContent.substring(
		// 	0,
		// 	cursorPosition.lineColumn
		// );

		const lineColumnWidthMultiplier = cursorPosition.lineColumn - 1;

		const columnsWidth =
			lineColumnWidthMultiplier * markupMetrics.column.width +
			(lineColumnWidthMultiplier - 1) *
				toNumber(markupMetrics.column.letterSpacing);

		const newX: number =
			lineEl.offsetLeft +
			toNumber(markupMetrics.line.paddingLeft) +
			columnsWidth;

		const newY: number =
			lineEl.getBoundingClientRect().top -
			markupEl.getBoundingClientRect().top;

		cursorEl.style.transform = `translate(${newX}px, ${newY}px)`;

		cursorApi.setVisible(true);
	}
}

export function comparePositions(
	a: CursorPosition,
	b: CursorPosition,
): PositionComparison {
	const { lineNumber: ln1, lineColumn: lc1 } = a;
	const { lineNumber: ln2, lineColumn: lc2 } = b;

	if (ln1 !== ln2) {
		return ln1 > ln2 ? PositionComparison.AFTER : PositionComparison.BEFORE;
	}

	if (lc1 !== lc2) {
		return lc1 > lc2 ? PositionComparison.AFTER : PositionComparison.BEFORE;
	}

	return PositionComparison.EQUAL;
}

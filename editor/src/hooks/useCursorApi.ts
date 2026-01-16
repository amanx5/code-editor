import { useLayoutEffect, useRef } from 'react';
import type { CodeLineNumber, CursorElement } from '../components';
import { MARKUP_LINE_ATTRIBUTES, type MarkupApi } from './useMarkupApi';
import { isEqualObjects, toNumber } from '../utils';

export type CursorPosition = {
	lineColumn: number;
	lineNumber: CodeLineNumber;
};

export type CursorPositionStoreListener = () => void;

export type CursorApi = {
	getElement(): CursorElement | null;

	getElementRef(): React.RefObject<CursorElement | null>;

	getPosition(): CursorPosition;
	setPosition(cursorPosition: CursorPosition): void;

	setPositionOnPointer(e: React.PointerEvent): void;

	setVisible(isVisible: boolean): void;

	subscribePosition(listener: CursorPositionStoreListener): () => void;
};

// FIXME: Cursor renders blurry on alternate columns (dom render issue)
export function useCursorApi(markupApi: MarkupApi): CursorApi {
	const apiRef = useRef<CursorApi>(null);
	const elementRef = useRef<CursorElement>(null);
	const positionRef = useRef<CursorPosition>({
		lineColumn: 1,
		lineNumber: 1,
	});

	const positionListenersRef = useRef<CursorPositionStoreListener[]>([]);

	// sync initial cursor coordinates
	useLayoutEffect(syncCoordinates, []);

	// prevent unnecessary re-creations of the API object on rerenders
	apiRef.current = apiRef.current ?? {
		getElement() {
			return elementRef.current ?? null;
		},

		getElementRef() {
			return elementRef;
		},

		getPosition() {
			return positionRef.current;
		},

		setPosition(cursorPosition: CursorPosition) {
			const isPositionChanged = !isEqualObjects(
				positionRef.current,
				cursorPosition
			); // compare by value instead of reference

			if (isPositionChanged) {
				const newPosition = { ...cursorPosition }; // force new reference (needed for useSyncExternalStore), (maybe setter invoker reused the old position object)
				positionRef.current = newPosition;

				syncCoordinates();
				notifyPositionListeners();
			} else {
				this.setVisible(true);
			}
		},

		setPositionOnPointer(e) {
			const markupMetrics = markupApi.getMetrics();
			if (!markupMetrics) return;

			const lineNumAttr = MARKUP_LINE_ATTRIBUTES.lineNumber;
			const targetEl = e.target as HTMLElement;

			let lineColumn, lineNumber;

			const closestLineEl = markupApi.getLineElement({
				near: targetEl,
			});
			const lastLineEl = markupApi.getLineElement('last');

			if (closestLineEl) {
				const lineStartClientX =
					closestLineEl.getBoundingClientRect().left +
					toNumber(markupMetrics.line.paddingLeft);

				const targettedColumnDistanceFromLineStart =
					e.clientX - lineStartClientX;

				const targettedColumn = Math.round(
					targettedColumnDistanceFromLineStart /
						markupMetrics.column.width
				);

				const lastColumn = closestLineEl.textContent.length;

				if (targettedColumn < 1) {
					lineColumn = 1; // before first character
				} else if (targettedColumn > lastColumn) {
					lineColumn = lastColumn + 1; // after last character
				} else {
					lineColumn = targettedColumn + 1; // +1 for 1-based index
				}

				lineNumber = Number(closestLineEl.getAttribute(lineNumAttr));
			} else if (lastLineEl) {
				const lastLineColumn = lastLineEl.textContent.length;

				lineColumn = lastLineColumn + 1; // after last character
				lineNumber = Number(lastLineEl.getAttribute(lineNumAttr));
			}

			if (lineColumn != null && lineNumber != null) {
				this.setPosition({
					lineColumn,
					lineNumber,
				});
			}
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

		subscribePosition(listener: CursorPositionStoreListener) {
			positionListenersRef.current.push(listener);

			return () => {
				positionListenersRef.current =
					positionListenersRef.current.filter(
						(li) => li !== listener
					);
			};
		},
	};

	return apiRef.current;

	function syncCoordinates() {
		const cursorApi = apiRef.current;
		if (!cursorApi) return;

		const cursorPosition = cursorApi.getPosition();
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

	function notifyPositionListeners() {
		for (const listener of positionListenersRef.current) {
			listener();
		}
	}
}

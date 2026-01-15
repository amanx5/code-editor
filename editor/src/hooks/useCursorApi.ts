import { useEffect, useRef } from 'react';
import type { CodeLineNumber, CursorElement } from '../components';
import { MARKUP_LINE_ATTRIBUTES, type MarkupApi } from './useMarkupApi';
import { isEqualObjects, toNumber, type ApiMap } from '../utils';

export type CursorPosition = {
	lineColumn: number;
	lineNumber: CodeLineNumber;
};

export type CursorEventName = keyof CursorEventListener;

export type CursorEventListener = {
	positionChange: (cursorPosition: CursorPosition) => void;
};

export type CursorEventListeners = {
	[E in CursorEventName]: Array<CursorEventListener[E]>;
};

export type CursorApi = {
	addListener: <E extends CursorEventName = CursorEventName>(
		event: E,
		listener: CursorEventListener[E]
	) => void;

	getElement: () => CursorElement | null;

	getElementRef: () => React.RefObject<CursorElement | null>;

	removeListener: <E extends CursorEventName = CursorEventName>(
		event: E,
		listener: CursorEventListener[E]
	) => void;

	getPosition: () => CursorPosition;

	setPosition: (cursorPosition: CursorPosition) => void;

	setVisible: (isVisible: boolean) => void;
};

export function useCursorApi(markupApi: MarkupApi): CursorApi {
	const elementRef = useRef<CursorElement>(null);
	const positionRef = useRef<CursorPosition>({
		lineColumn: 1,
		lineNumber: 1,
	});
	const listenersRef = useRef<CursorEventListeners>({
		positionChange: [],
	});

	const cursorApi: CursorApi = {
		addListener: (event, listener) => {
			listenersRef.current[event].push(listener);
		},

		getElement: () => elementRef.current ?? null,

		getElementRef: () => elementRef,

		getPosition: () => positionRef.current,

		removeListener: (event, listener) => {
			const listeners = listenersRef.current[event];
			const listenerIndex = listeners.indexOf(listener);

			if (listenerIndex !== -1) {
				listeners.splice(listenerIndex, 1);
			}
		},

		setPosition: (cursorPosition: CursorPosition) => {
			cursorApi.setVisible(true);

			if (!isEqualObjects(positionRef.current, cursorPosition)) {
				positionRef.current = cursorPosition;
				applyCursorPosition();
				fireEvent('positionChange');
			}
		},

		setVisible: (isVisible: boolean) => {
			const cursorEl = cursorApi.getElement();

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
	};

	useEffect(() => {
		applyCursorPosition();
	}, []);

	return cursorApi;

	function applyCursorPosition() {
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
	}

	function fireEvent(event: CursorEventName) {
		switch (event) {
			case 'positionChange':
				const listeners = listenersRef.current.positionChange;
				listeners.forEach((listener) =>
					listener(cursorApi.getPosition()!)
				);

				break;
		}
	}
}

export function setCursorPositionOnEvent(
	e: React.PointerEvent,
	apiMap: ApiMap
) {
	const { cursorApi, markupApi } = apiMap;

	const markupMetrics = markupApi.getMetrics();
	if (!markupMetrics) return;

	const lineNumAttr = MARKUP_LINE_ATTRIBUTES.lineNumber;
	const targetEl = e.target as HTMLElement;

	let lineColumn, lineNumber;

	const closestLineEl = markupApi.getLineElement({ near: targetEl });
	const lastLineEl = markupApi.getLineElement('last');

	if (closestLineEl) {
		const lineStartClientX =
			closestLineEl.getBoundingClientRect().left +
			toNumber(markupMetrics.line.paddingLeft);

		const targettedColumnDistanceFromLineStart =
			e.clientX - lineStartClientX;

		const targettedColumn = Math.round(
			targettedColumnDistanceFromLineStart / markupMetrics.column.width
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
		cursorApi.setPosition({
			lineColumn,
			lineNumber,
		});
	}
}

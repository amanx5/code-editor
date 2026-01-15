import { useRef } from 'react';
import type { CodeLineNumber, CursorElement } from '../components';
import { MARKUP_LINE_ATTRIBUTES, type MarkupApi } from './useMarkupApi';
import { toNumber, type ApiMap } from '../utils';
import { applyCursorPosition } from './cursor-api/apply-cursor-position';

export type CursorPosition = {
	lineColumn: number;
	lineNumber: CodeLineNumber;
};

export type CursorApi = {
	getElement: () => CursorElement | null;

	getElementRef: () => React.RefObject<CursorElement | null>;

	getPosition: () => CursorPosition | null;

	setPosition: (cursorPosition: CursorPosition) => void;

	setVisible: (isVisible: boolean) => void;
};

export function useCursorApi(markupApi: MarkupApi): CursorApi {
	const cursorElementRef = useRef<CursorElement>(null);
	const cursorPositionRef = useRef<CursorPosition>(null);

	const cursorApi: CursorApi = {
		getElement: () => cursorElementRef.current ?? null,

		getElementRef: () => cursorElementRef,

		getPosition: () => cursorPositionRef.current,

		setPosition: (cursorPosition: CursorPosition) => {
			cursorPositionRef.current = cursorPosition;

			applyCursorPosition(cursorPosition, cursorApi, markupApi);
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

	return cursorApi;
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
		const pointerHorizontalDiff: number =
			e.clientX -
			toNumber(markupMetrics.line.paddingLeft) -
			closestLineEl.getBoundingClientRect().left;

		const targetColumn = Math.round(
			pointerHorizontalDiff / markupMetrics.column.width
		);

		const totalColumns = closestLineEl.textContent.length;

		lineColumn = Math.max(0, Math.min(targetColumn, totalColumns));
		lineNumber = Number(closestLineEl.getAttribute(lineNumAttr));
	} else if (lastLineEl) {
		lineColumn = lastLineEl.textContent.length;
		lineNumber = Number(lastLineEl.getAttribute(lineNumAttr));
	}

	if (lineColumn != null && lineNumber != null) {
		cursorApi.setPosition({
			lineColumn,
			lineNumber,
		});
	}
}

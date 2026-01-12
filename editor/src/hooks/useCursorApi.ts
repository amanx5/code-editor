import { useRef } from 'react';
import type { CodeLineNumber, CursorElement } from '../components';
import {
	MARKUP_LINE_ATTRIBUTES,
	type MarkupApi,
	type MarkupLineElement,
} from './useMarkupApi';
import { type EditorEventObject } from '../utils';

export type CursorPosition = {
	lineColumn: number;
	lineNumber: CodeLineNumber;
};

export type CursorApi = {
	cursorRef: React.RefObject<CursorElement | null>;
	setVisible: (isVisible: boolean) => void;
	getPosition: () => CursorPosition;
	setPosition: (cursorPosition: CursorPosition) => void;
	setPositionOnClick: (e: EditorEventObject['onClick']) => void;
};

export function useCursorApi(markupApi: MarkupApi): CursorApi {
	const { markupRef, getMarkupLineEl } = markupApi;

	const cursorRef = useRef<CursorElement>(null);
	const cursorPositionRef = useRef<CursorPosition>(null);

	return {
		cursorRef,
		getPosition,
		setPosition,
		setPositionOnClick,
		setVisible,
	};

	function getPosition() {
		return (
			cursorPositionRef.current || {
				lineColumn: 0,
				lineNumber: 0,
			}
		);
	}

	function setPosition(cursorPosition: CursorPosition) {
		if (!cursorRef.current) return;

		cursorPositionRef.current = cursorPosition;

		if (cursorPosition.lineNumber > 0) {
			syncCoordinates();
			setVisible(true);
		} else {
			setVisible(false);
		}
	}

	function setPositionOnClick(e: EditorEventObject['onClick']) {
		const markupMetrics = markupApi.getMarkupMetrics();
		if (!markupMetrics) return;

		const lineNumAttr = MARKUP_LINE_ATTRIBUTES.lineNumber;
		const clickedEl = e.target as HTMLElement;

		let lineColumn, lineNumber;
		const closestLineEl = clickedEl.closest(
			`[${lineNumAttr}]`
		) as MarkupLineElement;

		const lastLineEl = clickedEl.querySelector(
			`[${lineNumAttr}]:last-child`
		) as MarkupLineElement;

		if (closestLineEl) {
			// calculate difference between click x coordinate and left coordinate of markup line relative to viewport.
			// this is to account for the fact that the click event is relative to the viewport and not the element.
			// don't use offsetLeft here as it is relative to the offset parent.
			const clickXDiff =
				e.clientX -
				closestLineEl.getBoundingClientRect().left -
				markupMetrics.line.paddingLeft;

			const clickedColumn = Math.round(
				clickXDiff / markupMetrics.line.columnWidth
			);

			const totalColumns = closestLineEl.textContent.length;

			lineColumn = Math.max(0, Math.min(clickedColumn, totalColumns));
			lineNumber = Number(closestLineEl.getAttribute(lineNumAttr));

			setPosition({
				lineColumn,
				lineNumber,
			});
		} else if (lastLineEl) {
			lineColumn = lastLineEl.textContent.length;
			lineNumber = Number(lastLineEl.getAttribute(lineNumAttr));

			setPosition({
				lineColumn,
				lineNumber,
			});
		} else {
			setVisible(false);
		}
	}

	function setVisible(isVisible: boolean) {
		cursorRef.current?.classList.toggle('hidden', !isVisible);
	}

	function syncCoordinates() {
		const markupMetrics1 = markupApi.getMarkupMetrics();
		const cursorPosition1 = getPosition();

		if (!cursorPosition1 || !markupMetrics1) return;

		const cursorEl = cursorRef.current;
		const markupEl = markupRef.current;
		const lineEl = getMarkupLineEl(cursorPosition1.lineNumber);

		if (!cursorEl || !lineEl || !markupEl) return;

		const newX =
			lineEl.offsetLeft +
			markupMetrics1.line.paddingLeft +
			cursorPosition1.lineColumn * markupMetrics1.line.columnWidth;

		const newY =
			lineEl.getBoundingClientRect().top -
			markupEl.getBoundingClientRect().top;

		cursorEl.style.transform = `translate(${newX}px, ${newY}px)`;

		ensureVisible(cursorEl);
	}

}

export function ensureVisible(el: HTMLElement) {
	el.scrollIntoView({
		behavior: 'instant',
		block: 'nearest',
		inline: 'nearest',
	});
}

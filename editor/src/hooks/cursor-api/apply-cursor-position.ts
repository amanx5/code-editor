import { toNumber } from '../../utils';
import type { CursorApi, CursorPosition } from '../useCursorApi';
import type { MarkupApi } from '../useMarkupApi';

export function applyCursorPosition(
	cursorPosition: CursorPosition,
	cursorApi: CursorApi,
	markupApi: MarkupApi
) {
	if (cursorPosition.lineNumber === 0) return;

	const markupMetrics = markupApi.getMetrics();

	if (!markupMetrics) return;

	const cursorEl = cursorApi.getEl();
	const markupEl = markupApi.getEl();
	const lineEl = markupApi.getLineEl(cursorPosition.lineNumber);

	if (!cursorEl || !lineEl || !markupEl) return;

	// TODO: Calculate metrics everytime based on lineContentTillCursor
	// const lineContentTillCursor = lineEl.textContent.substring(
	// 	0,
	// 	cursorPosition.lineColumn
	// );

	const columnsWidth =
		cursorPosition.lineColumn * markupMetrics.column.width +
		(cursorPosition.lineColumn - 1) *
			toNumber(markupMetrics.column.letterSpacing);

	const newX: number =
		lineEl.offsetLeft +
		toNumber(markupMetrics.line.paddingLeft) +
		columnsWidth;

	const newY: number =
		lineEl.getBoundingClientRect().top -
		markupEl.getBoundingClientRect().top;

	cursorEl.style.transform = `translate(${newX}px, ${newY}px)`;

	ensureInView(cursorEl);
	cursorApi.setVisible(true);
}

function ensureInView(el: HTMLElement) {
	el.scrollIntoView({
		behavior: 'instant',
		block: 'nearest',
		inline: 'nearest',
	});
}

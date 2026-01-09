import type { EditorEventHandler } from '../get-event-handlers';

export const handleClick: EditorEventHandler<'onClick'> = (e, apiMap) => {
	e.preventDefault();

	const { cursorApi } = apiMap;

	// Use event delegation to find the line number
	const target = e.target as HTMLElement;
	const lineElement = target.closest('[data-line-num]');
	const lineNumber = lineElement
		? parseInt(lineElement.getAttribute('data-line-num') || '0', 10)
		: null;

	if (lineNumber) {
		console.log(`Clicked on line: ${lineNumber}`);
	}

	const rect = e.currentTarget.getBoundingClientRect();

	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	cursorApi.setCursorPosition(x, y);
};

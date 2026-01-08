import type { EditorEventHandler } from '../get-event-handlers';

export const handleClick: EditorEventHandler<'onClick'> = (
	e,
	apiMap
) => {
	e.preventDefault();

	const { cursorApi } = apiMap;

	cursorApi.setCursorPosition(e.clientX, e.clientY);

};

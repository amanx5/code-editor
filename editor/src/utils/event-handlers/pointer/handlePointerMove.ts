import type { EditorEventHandler } from '../get-event-handlers';

// FIXME:
// - Needs debouncing
// - Unable to calculate Cursor position when selection is moved outside the markup element. Maybe use setPointerCapture
// - Native selection also selects elements outside the markup element
export const handlePointerMove: EditorEventHandler<'onPointerMove'> = (
	e,
	editorApi,
) => {
	const { cursorApi } = editorApi;

	if (e.buttons === 1) {
		// primary button is pressed
		console.log('pointer move with button 1');

		const pointerPosition = cursorApi.calculatePosition(e);

		if (pointerPosition) {
			cursorApi.setSelectionEnd(pointerPosition);
		}
	}
};

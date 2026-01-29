import type { EditorEventHandler } from '../get-event-handlers';

// TODO:
// - Needs debouncing
// - Unable to calculate Cursor position when selection is moved outside the markup element. Maybe use setPointerCapture
// - Native selection also selects elements outside the markup element
export const handlePointerMove: EditorEventHandler<'onPointerMove'> = (
	e,
	editorApi,
) => {
	const { cursor } = editorApi;
	const { positionFromEvent, updateSelection } = cursor;

	if (e.buttons === 1) {
		// primary button is pressed
		console.log('pointer move with button 1');

		const pointerPosition = positionFromEvent(e);
		updateSelection({ moveEnd: pointerPosition });
	}
};

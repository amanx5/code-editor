import type { EditorEventHandler } from '../get-event-handlers';

export const handlePointerDown: EditorEventHandler<'onPointerDown'> = (
	e,
	editorApi,
) => {
	console.log('pointer down');
	const { cursor } = editorApi;
	const { positionFromEvent, updateSelection } = cursor;

	if ((e.buttons = 1)) {
		const pointerPosition = positionFromEvent(e);
		updateSelection({ collapse: pointerPosition });
	}
};

import type { EditorEventHandler } from '../get-event-handlers';

export const handlePointerDown: EditorEventHandler<'onPointerDown'> = (
	e,
	editorApi,
) => {
	console.log('pointer down');
	const { cursorApi } = editorApi;
	
	if ((e.buttons = 1)) {
		const pointerPosition = cursorApi.positionFromEvent(e);
		cursorApi.updateSelection({ collapse: pointerPosition });
	}
};

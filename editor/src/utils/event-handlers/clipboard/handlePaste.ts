import type { EditorEventHandler } from '../get-event-handlers';

export const handlePaste: EditorEventHandler<'onPaste'> = (eventObject, editorApi) => {
	const text = eventObject.clipboardData.getData('text/plain');

	console.log(text);

	// return insertTextAtCursor(text);
};

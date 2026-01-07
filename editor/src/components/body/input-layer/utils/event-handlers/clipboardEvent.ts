import { insertTextAtCursor } from '../dom-mutators';
import type {
	EditingObject,
	EditorEventObject,
	ShouldCallChangeCallback,
} from './get-event-handlers';

export function onPaste(
	eventObject: EditorEventObject['onPaste'],
	editingObject: EditingObject
): ShouldCallChangeCallback {
	const text = eventObject.clipboardData.getData('text/plain');

	return insertTextAtCursor(text);
}

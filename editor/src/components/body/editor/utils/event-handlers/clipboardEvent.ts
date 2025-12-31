import { insertTextAtCursor } from '../dom-mutators';
import type { EditorEventObject, ShouldCommitState } from './get-event-handlers';

export function onPaste(event: EditorEventObject['onPaste']): ShouldCommitState {
	const text = event.clipboardData.getData('text/plain');

	return insertTextAtCursor(text);
}

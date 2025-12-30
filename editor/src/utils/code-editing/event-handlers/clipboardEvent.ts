import { insertTextAtCursor } from '../dom-mutators';
import { applyEdit, type StateUpdater } from './applyEdit';

export function onPaste(
	event: React.ClipboardEvent<HTMLPreElement>,
	stateUpdater: StateUpdater
) {
	const text = event.clipboardData.getData('text/plain');

	applyEdit(event, () => insertTextAtCursor(text), stateUpdater);
}

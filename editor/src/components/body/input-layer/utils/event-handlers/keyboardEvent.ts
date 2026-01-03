import {
	deleteBackward,
	deleteForward,
	insertTextAtCursor,
} from '../dom-mutators';
import type {
	EditorEventObject,
	ShouldCommitState,
} from './get-event-handlers';

export function onKeyDown(
	event: EditorEventObject['onKeyDown']
): ShouldCommitState {
	const key = event.key;

	switch (key) {
		case 'Control': {
			// TODO: Implement Undo, Redo
			return false;
		}
		case 'Shift': {
			// let browser handle
			return false;
		}
		case 'Backspace': {
			return deleteBackward();
		}
		case 'Delete': {
			return deleteForward();
		}
		case 'Enter': {
			return insertTextAtCursor('\n');
		}
		case 'Tab': {
			return insertTextAtCursor('\t');
		}
		default: {
			if (isCharacterKey(event)) {
				return insertTextAtCursor(key);
			}

			return false;
		}
	}
}

export function isCharacterKey(e: React.KeyboardEvent): boolean {
	const key = e.key;

	if (e.ctrlKey || e.metaKey || e.altKey) {
		// let browser handle combination input
		return false;
	}

	return key.length === 1;
}

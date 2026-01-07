import type { RendererObject } from '../../hooks';
import {
	deleteBackward,
	deleteForward,
	insertTextAtCursor,
} from '../dom-mutators';
import type {
	EditorEventObject,
	ShouldCallChangeCallback,
} from './get-event-handlers';

export function onKeyDown(
	eventObject: EditorEventObject['onKeyDown'],
	rendererObject: RendererObject
): ShouldCallChangeCallback {
	const key = eventObject.key;
	// const { editorDataRef, renderDocument } = editingObject;

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
			return insertTextAtCursor('\n', rendererObject);
		}
		case 'Tab': {
			return insertTextAtCursor('\t', rendererObject);
		}
		default: {
			if (isCharacterKey(eventObject)) {
				return insertTextAtCursor(key, rendererObject);
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

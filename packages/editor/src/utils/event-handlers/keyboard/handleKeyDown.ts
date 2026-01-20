import type { EditorEventHandler } from '../get-event-handlers';

export const handleKeyDown: EditorEventHandler<'onKeyDown'> = (e, editorApi) => {
	const key = e.key;

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
			// return deleteBackward();
		}
		case 'Delete': {
			// return deleteForward();
		}
		case 'Enter': {
			// return insertTextAtCursor('\n', editorUtility);
		}
		case 'Tab': {
			// return insertTextAtCursor('\t', editorUtility);
		}
		default: {
			if (isCharacterKey(e)) {
				// return insertTextAtCursor(key, editorUtility);
			}

			return false;
		}
	}
};

export function isCharacterKey(e: React.KeyboardEvent): boolean {
	const key = e.key;

	if (e.ctrlKey || e.metaKey || e.altKey) {
		// let browser handle combination input
		return false;
	}

	return key.length === 1;
}

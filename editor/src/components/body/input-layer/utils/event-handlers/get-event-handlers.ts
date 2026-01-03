import type { EditorElement } from '../../Editor';
import { onPaste } from './clipboardEvent';
import { onKeyDown } from './keyboardEvent';

export type EditorEventObject = {
	onDragEnter: React.DragEvent<EditorElement>;
	onDragOver: React.DragEvent<EditorElement>;
	onDragLeave: React.DragEvent<EditorElement>;
	onDrop: React.DragEvent<EditorElement>;
	onKeyDown: React.KeyboardEvent<EditorElement>;
	onPaste: React.ClipboardEvent<EditorElement>;
};

export type EditorEventName = keyof EditorEventObject;

export type CommitState = () => void;
export type ShouldCommitState = boolean;

export type EditorEventHandler<T extends EditorEventName> = (
	event: EditorEventObject[T]
) => ShouldCommitState;

type EditorEventHandlerMap = {
	[K in EditorEventName]?: EditorEventHandler<K>;
};

const EVENT_HANDLERS: EditorEventHandlerMap = {
	onKeyDown,
	onPaste,
};

export function getEventHandlers(commitState: CommitState) {
	return {
		onKeyDown: (eventObject: EditorEventObject['onKeyDown']) =>
			handleEvent('onKeyDown', eventObject, commitState),

		onPaste: (eventObject: EditorEventObject['onPaste']) =>
			handleEvent('onPaste', eventObject, commitState),
	};
}

function handleEvent<T extends EditorEventName>(
	eventName: T,
	eventObject: EditorEventObject[T],
	commitState: CommitState
): void {
	const handler = EVENT_HANDLERS[eventName];
	if (!handler) return;

	const shouldCommitState = handler(eventObject);

	if (shouldCommitState) {
		eventObject.preventDefault();
		commitState();
	}
}

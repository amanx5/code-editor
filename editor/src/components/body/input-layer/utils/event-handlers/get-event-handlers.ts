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

export type ChangeCallback = () => void;
export type ShouldCallChangeCallback = boolean;

export type EditorEventHandler<T extends EditorEventName> = (
	event: EditorEventObject[T],
	getCurrentContent: () => string,
	setEditorMarkup: (content: string) => void
) => ShouldCallChangeCallback;

type EditorEventHandlerMap = {
	[K in EditorEventName]?: EditorEventHandler<K>;
};

const EVENT_HANDLERS: EditorEventHandlerMap = {
	onKeyDown,
	onPaste,
};

export function getEventHandlers(
	changeCallback: ChangeCallback,
	getCurrentContent: () => string,
	setEditorMarkup: (content: string) => void
) {
	return {
		onKeyDown: (eventObject: EditorEventObject['onKeyDown']) =>
			handleEvent(
				'onKeyDown',
				eventObject,
				changeCallback,
				getCurrentContent,
				setEditorMarkup
			),

		onPaste: (eventObject: EditorEventObject['onPaste']) =>
			handleEvent(
				'onPaste',
				eventObject,
				changeCallback,
				getCurrentContent,
				setEditorMarkup
			),
	};
}

function handleEvent<T extends EditorEventName>(
	eventName: T,
	eventObject: EditorEventObject[T],
	changeCallback: ChangeCallback,
	getCurrentContent: () => string,
	setEditorMarkup: (content: string) => void
): void {
	const handler = EVENT_HANDLERS[eventName];
	if (!handler) return;

	const shouldCallChangeCallback = handler(
		eventObject,
		getCurrentContent,
		setEditorMarkup
	);

	if (shouldCallChangeCallback) {
		eventObject.preventDefault();
		changeCallback();
	}
}

import type { RendererObject } from '../../hooks';
import type { MarkupEditorElement } from '../../MarkupEditor';
import { onPaste } from './clipboardEvent';
import { onKeyDown } from './keyboardEvent';

export type EditorEventObject = {
	onDragEnter: React.DragEvent<MarkupEditorElement>;
	onDragOver: React.DragEvent<MarkupEditorElement>;
	onDragLeave: React.DragEvent<MarkupEditorElement>;
	onDrop: React.DragEvent<MarkupEditorElement>;
	onKeyDown: React.KeyboardEvent<MarkupEditorElement>;
	onPaste: React.ClipboardEvent<MarkupEditorElement>;
};

export type EditorEventName = keyof EditorEventObject;

export type ChangeCallback = () => void;
export type ShouldCallChangeCallback = boolean;

export type EditorEventHandler<T extends EditorEventName> = (
	eventObject: EditorEventObject[T],
	rendererObject: RendererObject
) => ShouldCallChangeCallback;


export function getEventHandlers(rendererObject: RendererObject) {
	return {
		onKeyDown: (eventObject: EditorEventObject['onKeyDown']) =>
			handleEvent('onKeyDown', eventObject, rendererObject),

		onPaste: (eventObject: EditorEventObject['onPaste']) =>
			handleEvent('onPaste', eventObject, rendererObject),
	};
}

function handleEvent<T extends EditorEventName>(
	eventName: T,
	eventObject: EditorEventObject[T],
	rendererObject: RendererObject
): void {
	const handler = EVENT_HANDLERS[eventName];
	if (!handler) return;

	const shouldCallChangeCallback = handler(eventObject, rendererObject);

	if (shouldCallChangeCallback) {
		eventObject.preventDefault();
		rendererObject.editorChangeCallback();
	}
}

type EditorEventHandlerMap = {
	[K in EditorEventName]?: EditorEventHandler<K>;
};

const EVENT_HANDLERS: EditorEventHandlerMap = {
	onKeyDown,
	onPaste,
};

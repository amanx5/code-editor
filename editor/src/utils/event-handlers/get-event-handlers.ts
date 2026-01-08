import type { MarkupElement } from '../../components';
import type { CursorApi, MarkupApi } from '../../hooks';
import { handleKeyDown } from './keyboard';
import { handlePaste } from './clipboard';
import { handleClick } from './mouse';

export type ApiMap = {
	cursorApi: CursorApi;
	markupApi: MarkupApi;
};

export type EditorEventObject = {
	// onDragEnter: React.DragEvent<MarkupElement>;
	// onDragOver: React.DragEvent<MarkupElement>;
	// onDragLeave: React.DragEvent<MarkupElement>;
	// onDrop: React.DragEvent<MarkupElement>;
	onClick: React.MouseEvent<MarkupElement>;
	onKeyDown: React.KeyboardEvent<MarkupElement>;
	onPaste: React.ClipboardEvent<MarkupElement>;
};

export type EditorEventName = keyof EditorEventObject;

export type EditorEventHandler<T extends EditorEventName> = (
	e: EditorEventObject[T],
	apiMap: ApiMap
) => void;

export type EditorEventHandlerInvoker<T extends EditorEventName> = (
	e: EditorEventObject[T]
) => ReturnType<EditorEventHandler<T>>;

export type EditorEventHandlers = {
	[eventName in EditorEventName]: EditorEventHandlerInvoker<eventName>;
};

export function getEventHandlers(apiMap: ApiMap): EditorEventHandlers {
	return {
		onClick: (e) => handleClick(e, apiMap),
		onKeyDown: (e) => handleKeyDown(e, apiMap),
		onPaste: (e) => handlePaste(e, apiMap),
	};
}

import type { MarkupElement } from '../../components';
import type { CursorApi, MarkupApi } from '../../hooks';
import { handleBlur, handleFocus } from './focus';
import { handleKeyDown } from './keyboard';
import { handlePaste } from './clipboard';
import { handleClick } from './mouse';

export type ApiMap = {
	cursorApi: CursorApi;
	markupApi: MarkupApi;
};

export interface EditorEventObject<E = MarkupElement> {
	// onDragEnter: React.DragEvent<MarkupElement>;
	// onDragOver: React.DragEvent<MarkupElement>;
	// onDragLeave: React.DragEvent<MarkupElement>;
	// onDrop: React.DragEvent<MarkupElement>;
	onBlur: React.FocusEvent<E>;
	onClick: React.MouseEvent<E>;
	onFocus: React.FocusEvent<E>;
	onKeyDown: React.KeyboardEvent<E>;
	onPaste: React.ClipboardEvent<E>;
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
		onBlur: (e) => handleBlur(e, apiMap),
		onClick: (e) => handleClick(e, apiMap),
		onFocus: (e) => handleFocus(e, apiMap),
		onKeyDown: (e) => handleKeyDown(e, apiMap),
		onPaste: (e) => handlePaste(e, apiMap),
	};
}

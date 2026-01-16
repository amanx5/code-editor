import type { MarkupElement } from '../../components';
import { handleBlur, handleFocus } from './focus';
import { handleKeyDown } from './keyboard';
import { handlePaste } from './clipboard';
import {
	handlePointerDown,
	handlePointerMove,
	handlePointerUp,
} from './pointer';
import type { EditorApi } from '../../contexts';

export type EditorEventName = keyof EditorEventHandlerInvoker;

export type EditorEventObject<N extends EditorEventName> = Parameters<
	NonNullable<EditorEventHandlerInvoker[N]>
>[0];

export type EditorEventHandler<N extends EditorEventName> = (
	e: EditorEventObject<N>,
	editorApi: EditorApi
) => void;

export type EditorEventHandlerInvoker = Pick<
	React.DOMAttributes<MarkupElement>,
	// Clipboard Events
	| 'onPaste'

	// Focus Events
	| 'onFocus'
	| 'onBlur'

	// Keyboard Events
	| 'onKeyDown'

	// Pointer Events
	| 'onPointerDown'
	| 'onPointerMove'
	| 'onPointerUp'
>;

export function getEventHandlers(
	editorApi: EditorApi
): EditorEventHandlerInvoker {
	return {
		// Clipboard Events
		onPaste: (e) => handlePaste(e, editorApi),

		// Focus Events
		onFocus: (e) => handleFocus(e, editorApi),
		onBlur: (e) => handleBlur(e, editorApi),

		// Keyboard Events
		onKeyDown: (e) => handleKeyDown(e, editorApi),

		// Pointer Events
		onPointerDown: (e) => handlePointerDown(e, editorApi),
		onPointerMove: (e) => handlePointerMove(e, editorApi),
		onPointerUp: (e) => handlePointerUp(e, editorApi),
	};
}

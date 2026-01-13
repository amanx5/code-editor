import type { MarkupElement } from '../../components';
import type { CursorApi, MarkupApi } from '../../hooks';
import { handleBlur, handleFocus } from './focus';
import { handleKeyDown } from './keyboard';
import { handlePaste } from './clipboard';
import {
	handlePointerDown,
	handlePointerMove,
	handlePointerUp,
} from './pointer';

export type ApiMap = {
	cursorApi: CursorApi;
	markupApi: MarkupApi;
};

export type EditorEventName = keyof EditorEventHandlerInvoker;

export type EditorEventObject<N extends EditorEventName> = Parameters<
	NonNullable<EditorEventHandlerInvoker[N]>
>[0];

export type EditorEventHandler<N extends EditorEventName> = (
	e: EditorEventObject<N>,
	apiMap: ApiMap
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

export function getEventHandlers(apiMap: ApiMap): EditorEventHandlerInvoker {
	return {
		// Clipboard Events
		onPaste: (e) => handlePaste(e, apiMap),

		// Focus Events
		onFocus: (e) => handleFocus(e, apiMap),
		onBlur: (e) => handleBlur(e, apiMap),

		// Keyboard Events
		onKeyDown: (e) => handleKeyDown(e, apiMap),

		// Pointer Events
		onPointerDown: (e) => handlePointerDown(e, apiMap),
		onPointerMove: (e) => handlePointerMove(e, apiMap),
		onPointerUp: (e) => handlePointerUp(e, apiMap),
	};
}

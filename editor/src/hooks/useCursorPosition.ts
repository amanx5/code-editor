import { useSyncExternalStore } from 'react';
import type { CursorPosition } from './internals';
import { useEditor } from './useEditor';

export function useCursorPosition(): CursorPosition {
	const { cursorApi } = useEditor();
	const { subscribePosition, getPosition } = cursorApi;
	const cursorPosition = useSyncExternalStore(subscribePosition, getPosition);

	return cursorPosition;
}

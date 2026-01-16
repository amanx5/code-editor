import { useContext, useSyncExternalStore } from 'react';
import type { CursorPosition } from './internals';
import { EditorApiContext } from '../contexts';

export function useCursorPosition(): CursorPosition {
	const { cursorApi } = useContext(EditorApiContext);
	const { subscribePosition, getPosition } = cursorApi;
	const cursorPosition = useSyncExternalStore(subscribePosition, getPosition);

	return cursorPosition;
}

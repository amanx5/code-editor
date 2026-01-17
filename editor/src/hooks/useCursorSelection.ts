import { useSyncExternalStore } from 'react';
import type { CursorSelection } from './internals';
import { useEditor } from './useEditor';

export function useCursorSelection(): CursorSelection {
	const { cursorApi } = useEditor();
	const { getSelection, subscribeSelection } = cursorApi;

	const cursorSelection = useSyncExternalStore(
		subscribeSelection,
		getSelection,
	);

	return cursorSelection;
}

import { useEditorApi } from './useEditorApi';
import type { CursorSelection } from './useEditorCursorApiSetup';

export function useCursorSelection(): CursorSelection | null {
	const cursor = useEditorApi('cursor');

	return cursor.selection;
}

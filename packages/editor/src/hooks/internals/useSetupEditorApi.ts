import type { EditorDocument, EditorListeners } from '../..';
import { useSetupCursorApi, type CursorApi } from './useSetupCursorApi';
import { useSetupMarkupApi, type MarkupApi } from './useSetupMarkupApi';
import type { EditorOptions } from '../..';

export type EditorApi = {
	cursorApi: CursorApi;
	markupApi: MarkupApi;
};

/**
 * Hook to setup all the editor APIs.
 *
 * NOTE: This is a single use hook per editor instance.
 *
 * Don't use this hook for reading the editor APIs. Use `useCursorApi` and `useMarkupApi` hooks for reading the editor APIs.
 */
export function useSetupEditorApi(
	document: EditorDocument,
	editorOptions: EditorOptions,
	listeners?: EditorListeners,
): EditorApi {
	const markupApi = useSetupMarkupApi(document, editorOptions, listeners);
	const cursorApi = useSetupCursorApi(markupApi);

	return {
		markupApi,
		cursorApi,
	};
}

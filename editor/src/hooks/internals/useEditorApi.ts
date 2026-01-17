import { useRef } from 'react';
import type { EditorListeners } from '../../CodeEditor';
import type { EditorDocument } from '../../contexts';
import { useCursorApi, type CursorApi } from './useCursorApi';
import {
	useMarkupApi,
	type MarkupApi,
	type RenderOptions,
} from './useMarkupApi';

export type EditorApi = {
	cursorApi: CursorApi;
	markupApi: MarkupApi;
};

/**
 * Hook to setup all the editor APIs.
 *
 * NOTE: This is a single use hook per editor instance.
 *
 * Don't use this hook for reading the editor APIs. Use `useEditor` hook for reading the editor APIs.
 */
export function useEditorApi(
	document: EditorDocument,
	renderOptions: RenderOptions,
	listeners?: EditorListeners,
): EditorApi {
	const markupApi = useMarkupApi(document, renderOptions, listeners);
	const cursorApi = useCursorApi(markupApi);

	const editorApi = useRef<EditorApi>({
		markupApi,
		cursorApi,
	});

	return editorApi.current;
}

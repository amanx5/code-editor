import { useRef } from 'react';
import type { EditorListeners } from '../../CodeEditor';
import type { EditorApi, EditorDocument } from '../../contexts';
import { useCursorApi } from './useCursorApi';
import { useMarkupApi, type RenderOptions } from './useMarkupApi';

export function useEditorApi(
	document: EditorDocument,
	renderOptions: RenderOptions,
	listeners?: EditorListeners
): EditorApi {
	const markupApi = useMarkupApi(document, renderOptions, listeners);
	const cursorApi = useCursorApi(markupApi);

	const editorApi = useRef<EditorApi>({
		markupApi,
		cursorApi,
	});

	return editorApi.current;
}

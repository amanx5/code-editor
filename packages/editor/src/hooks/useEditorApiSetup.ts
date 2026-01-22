import type { EditorDocument, EditorListeners } from '..';
import {
	useEditorMarkupApiSetup,
	type MarkupApi,
} from './useEditorMarkupApiSetup';
import {
	useEditorCursorApiSetup,
	type CursorApi,
} from './useEditorCursorApiSetup';
import type { EditorOptions } from '..';
import { useEffect } from 'react';

export type EditorApi = {
	cursor: CursorApi;
	markup: MarkupApi;
};

/**
 * Hook to setup all the APIs.
 *
 * NOTE: This is a single use hook per editor instance.
 *
 * For accessing an already setup API, use the `useAllApi` hook..
 */
export function useEditorApiSetup(
	document: EditorDocument,
	editorOptions: EditorOptions,
	listeners?: EditorListeners,
): EditorApi {
	const markup = useEditorMarkupApiSetup(document, editorOptions, listeners);
	const cursor = useEditorCursorApiSetup(markup);

	const editorApi: EditorApi = {
		markup,
		cursor,
	};

	useEffect(() => {
		listeners?.apiChange?.(editorApi);
	}, [editorApi]);
	
	return editorApi;
}

import { type EditorDocument, type EditorListeners } from '..';
import {
	useEditorMarkupApiSetup,
	type MarkupApi,
} from './useEditorMarkupApiSetup';
import {
	useEditorCursorApiSetup,
	type CursorApi,
} from './useEditorCursorApiSetup';
import type { EditorOptions } from '..';
import { useEffect, useMemo } from 'react';

export type EditorApi = {
	cursor: CursorApi;
	markup: MarkupApi;
};

/**
 * Hook to setup all the APIs.
 *
 * NOTE: This is a single use hook per editor instance.
 *
 * For accessing an already setup API, use the `useEditorApi` hook..
 */
export function useEditorApiSetup(
	document: EditorDocument,
	editorOptions?: EditorOptions,
	listeners?: EditorListeners,
): EditorApi {
	// TODO: Separate reactive and non-reactive properties in different objects and return them in separate contexts
	const markup = useEditorMarkupApiSetup(document, editorOptions, listeners);
	const cursor = useEditorCursorApiSetup(markup);

	// editorApi is memoized as when the Editor component re-renders for some reason
	// then if this hook returns a new editorApi object, the EditorApiContext.Provider
	// will pass a new value to its children every time and all the context consumers
	// will re-render for no reason.
	// Also, the effect below that calls apiChange listeners will be called on each render of Editor.
	// For same reason, markup and cursor are also memoized in their respective hooks.
	const editorApi = useMemo<EditorApi>(() => ({
		markup,
		cursor,
	}), [markup, cursor]);

	useEffect(() => {
		listeners?.apiChange?.(editorApi);
	}, [editorApi]);
	
	return editorApi;
}

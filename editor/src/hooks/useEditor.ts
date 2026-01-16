import { useContext } from 'react';
import { EditorApiContext, type EditorApi } from '../contexts';

/**
 * Hook to read/access the Editor API.
 * This hook is different from `useEditorApi` which is a internal hook for setting up the API and not for reading.
 */
export function useEditor(): EditorApi {
	const editorApi = useContext(EditorApiContext);

	if (!editorApi) {
		throw new Error(
			'Invalid usage of `useEditor` hook. This hook is only meant to be used inside `CodeEditor` child components or hooks.'
		);
	}

	return editorApi;
}

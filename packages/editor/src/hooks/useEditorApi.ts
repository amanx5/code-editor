import { useContext } from 'react';
import { EditorApiContext } from '../contexts';
import type { EditorApi } from './useEditorApiSetup';

export function useEditorApi(): EditorApi {
	const editorApi = useContext(EditorApiContext);

	if (!editorApi) {
		throw new Error(
			'Invalid hook call. Call this hook inside "EditorApiContext.Provider" only.',
		);
	}

	return editorApi;
}

import { useContext } from 'react';
import { EditorApiContext } from '../contexts';
import type { EditorApi, EditorApiName } from './useEditorApiSetup';

export function useEditorApi(): EditorApi;
export function useEditorApi<N extends EditorApiName>(apiName: N): EditorApi[N];
export function useEditorApi(apiName?: EditorApiName) {
	const editorApi = useContext(EditorApiContext);

	if (!editorApi) {
		throw new Error(
			'Invalid hook call. Call this hook inside AllApiContext.Provider',
		);
	}

	return apiName ? editorApi[apiName] : editorApi;
}

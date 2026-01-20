import { useContext } from 'react';
import { EditorApiContext } from '../../contexts';
import type { MarkupApi } from '../internals';

export function useMarkupApi(): MarkupApi {
    const editorApi = useContext(EditorApiContext);

    if (!editorApi) {
        throw new Error(
            'Invalid hook call. This hook is only meant to be used inside `CodeEditor` child components or hooks.',
        );
    }

    return editorApi.markupApi;
}

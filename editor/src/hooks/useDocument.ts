import { useContext } from 'react';
import { EditorDocumentContext, type EditorDocument } from '../contexts';

export function useDocument(): EditorDocument {
	const editorDocument = useContext(EditorDocumentContext);

	if (!editorDocument) {
		throw new Error(
			'Invalid usage of `useDocument` hook. This hook is only meant to be used inside `CodeEditor` child components or hooks.'
		);
	}

	return editorDocument;
}

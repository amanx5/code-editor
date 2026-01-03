import { useEffect, useRef } from 'react';
import { convertToEditorContent } from '../utils/internals';
import type { EditorElement } from '../Editor';
import type { Content } from '../../../../contexts';

export function useEditor(internalContent: Content) {
	const editorRef = useRef<EditorElement>(null);

	useEffect(() => {
		setEditorContent(internalContent);
	}, [internalContent]);

	return {
		editorRef,
		getEditorContent,
		setEditorContent,
	};

	function getEditorContent() {
		if (!editorRef.current) return '';

		return editorRef.current.textContent;
	}

	function setEditorContent(internalContent: Content) {
		if (!editorRef.current) return;

		const currentEditorContent = getEditorContent();
		const convertedEditorContent = convertToEditorContent(internalContent);

		if (currentEditorContent !== convertedEditorContent) {
			editorRef.current.textContent = convertedEditorContent;
			console.info('CodeEditor: Updated code in the editor.');
		}
	}
}



import { useEffect, useRef } from 'react';
import { convertToEditorContent } from '../utils/internals';
import type { EditorElement } from '../Editor';
import type { Content } from '../../../../contexts';

export function useEditor(sourceCode: Content) {
	const editorRef = useRef<EditorElement>(null);

	useEffect(() => {
		setEditorContent(sourceCode);
	}, [sourceCode]);

	return {
		editorRef,
		getEditorContent,
		setEditorContent,
	};

	function getEditorContent() {
		if (!editorRef.current) return '';

		return editorRef.current.textContent;
	}

	function setEditorContent(sourceCode: Content) {
		if (!editorRef.current) return;

		const currentEditorContent = getEditorContent();
		const convertedSourceCode = convertToEditorContent(sourceCode);

		if (currentEditorContent !== convertedSourceCode) {
			editorRef.current.textContent = convertedSourceCode;
			console.info('CodeEditor: Updated code in the editor.');
		}
	}
}



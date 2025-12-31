import { useEffect, useRef } from 'react';
import { Code } from '../../../../CodeEditor';
import { convertToEditorContent } from '../utils/internals';
import type { EditorElement } from '../Editor';

export function useEditor(sourceCode: Code) {
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

	function setEditorContent(sourceCode: Code) {
		if (!editorRef.current) return;

		const currentEditorContent = getEditorContent();
		const convertedSourceCode = convertToEditorContent(sourceCode);

		if (currentEditorContent !== convertedSourceCode) {
			editorRef.current.textContent = convertedSourceCode;
			console.info('CodeEditor: Updated code in the editor.');
		}
	}
}

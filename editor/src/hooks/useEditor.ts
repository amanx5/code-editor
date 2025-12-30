import { useEffect, useRef } from 'react';
import { Code } from '../CodeEditor';
import {
	convertToEditorContent,
	convertToSourceCode,
} from '../utils/virtualLinesUtil';

export function useEditor(sourceCode: Code) {
	const editorRef = useRef<HTMLPreElement>(null);

	useEffect(() => {
		if (!editorRef.current) return;

		const oldSourceCode = convertToSourceCode(getEditorContent());

		if (oldSourceCode !== sourceCode) {
			console.info('CodeEditor: Updating code in the editor.');
			setEditorContent(sourceCode);
		}
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

	function setEditorContent(code: Code) {
		if (!editorRef.current) return;

		editorRef.current.textContent = convertToEditorContent(code);
	}
}

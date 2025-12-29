import { useEffect, useRef } from 'react';
import { Code } from '../CodeEditor';
import {
	convertToEditorContent,
	convertToSourceCode,
} from '../utils/virtualLinesUtil';

export function useContentEditor(sourceCode: Code) {
	const contentEditorRef = useRef<HTMLPreElement>(null);

	useEffect(() => {
		if (!contentEditorRef.current) return;

		const oldSourceCode = convertToSourceCode(getEditorContent());

		if (oldSourceCode !== sourceCode) {
			console.info('CodeEditor: Updating code in the editor.');
			setEditorContent(sourceCode);
		}
	}, [sourceCode]);

	return {
		contentEditorRef,
		getEditorContent,
		setEditorContent,
	};

	function getEditorContent() {
		if (!contentEditorRef.current) return '';

		return contentEditorRef.current.textContent;
	}

	function setEditorContent(code: Code) {
		if (!contentEditorRef.current) return;

		contentEditorRef.current.textContent = convertToEditorContent(code);
	}
}

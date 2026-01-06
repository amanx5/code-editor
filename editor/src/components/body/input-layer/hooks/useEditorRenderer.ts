import { useEffect, useRef } from 'react';
import type { EditorElement } from '../Editor';
import {
	renderContent,
	type Content,
	type EditorMarkup,
} from '../../../../utils';
import type { EditorDocument } from '../../../../contexts';

export type ContentObj = {
	content: Content;
	markup: EditorMarkup;
};

export function useEditorRenderer(document: EditorDocument) {
	const editorRef = useRef<EditorElement>(null);

	const contentRef = useRef<ContentObj>({
		content: '',
		markup: '',
	})

	useEffect(() => {
		setEditorMarkup(document.content);
	}, [document]);

	return {
		editorRef,
		getCurrentContent,
		setEditorMarkup
	};

	function getCurrentContent() {
		if (!contentRef.current) return '';

		return contentRef.current.content;
	}

	function setEditorMarkup(content: Content) {
		if (!editorRef.current) return;

		const currentContent = getCurrentContent();

		if (content !== currentContent) {
			const updatedMarkup = renderContent(content, document.language);

			contentRef.current.content = content;
			contentRef.current.markup = updatedMarkup;
			editorRef.current.innerHTML = updatedMarkup;

			console.info('CodeEditor: Updated code in the editor.');
		}
	}
}

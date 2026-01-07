import { useCallback, useEffect, useRef } from 'react';
import type { MarkupEditorElement } from '../MarkupEditor';
import {
	generateMarkup,
	isEqualObjects,
	validateContent,
	type Content,
	type EditorError,
	type EditorMarkup,
	type MarkupGeneratorOptions,
} from '../../../../utils';
import type { EditorDocument } from '../../../../contexts';
import type { CodeEditorProps } from '../../../../CodeEditor';

export type MarkupEditorData = {
	document: EditorDocument;
	error: EditorError;
	markup: EditorMarkup;
} | null;

export type RendererObject = {
	editorRef: React.RefObject<MarkupEditorElement | null>;
	editorDataRef: React.RefObject<MarkupEditorData>;
	editorChangeCallback: () => void;
	getRenderedDocument: () => EditorDocument | null;
	renderDocument: (document: EditorDocument) => void;
};

export function useMarkupRenderer(
	document: EditorDocument,
	options: MarkupGeneratorOptions,
	onChange?: CodeEditorProps['onChange']
): RendererObject {
	const editorRef = useRef<MarkupEditorElement>(null);
	const editorDataRef = useRef<MarkupEditorData>(null);

	const documentChangeCallback = useCallback(() => {
		renderDocument(document);
	}, [document]);

	const editorChangeCallback = useCallback(() => {
		if (!editorDataRef?.current) return;

		onChange?.(
			editorDataRef.current.document.content,
			editorDataRef.current.error
		);
	}, [editorDataRef]);

	useEffect(documentChangeCallback, [document]);

	return {
		editorRef,
		editorDataRef,
		editorChangeCallback,
		getRenderedDocument,
		renderDocument,
	};

	function getRenderedDocument() {
		if (!editorDataRef.current) return null;

		return editorDataRef.current.document;
	}

	function renderDocument(newDocument: EditorDocument) {
		if (!editorRef.current) return;

		const existingRenderedDocument = getRenderedDocument();

		if (
			!existingRenderedDocument ||
			!isEqualObjects(existingRenderedDocument, newDocument)
		) {
			updateDocumentContent(newDocument, newDocument.content);
		}
	}

	function updateDocumentContent(document: EditorDocument, content: Content) {
		const updatedDocument = { ...document, content };
		const updatedError = validateContent(updatedDocument);
		const updatedMarkup = generateMarkup(
			updatedDocument,
			updatedError,
			options
		);

		editorRef.current!.innerHTML = updatedMarkup;
		editorDataRef.current = {
			document: updatedDocument,
			markup: updatedMarkup,
			error: updatedError,
		};

		console.info('CodeEditor: Document is rendered.');
	}
}
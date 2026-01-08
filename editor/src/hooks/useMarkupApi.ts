import { useCallback, useEffect, useRef } from 'react';
import {
	type Content,
	type EditorError,
	type EditorMarkup,
	type MarkupOptions,
	generateMarkup,
	isEqualObjects,
	validateContent,
} from '../utils';
import type { EditorDocument } from '../contexts';
import type { MarkupElement } from '../components';


export type Listeners = {
	onChange?: (content: Content) => void
	onError?: (error: EditorError) => void
}

export type MarkupData = {
	document: EditorDocument;
	error: EditorError;
	markup: EditorMarkup;
} | null;

export type MarkupApi = {
	markupDataRef: React.RefObject<MarkupData | null>;
	markupElementRef: React.RefObject<MarkupElement | null>;
	updateDocumentContent: (
		arg: Content | ((prev: Content) => Content)
	) => void;
};

export function useMarkupApi(
	document: EditorDocument,
	markupOptions: MarkupOptions,
	listeners?: Listeners
): MarkupApi {
	const markupDataRef = useRef<MarkupData>(null);
	const markupElementRef = useRef<MarkupElement>(null);

	const documentChangeCallback = useCallback(() => {
		renderDocument(document);
	}, [document]);

	const renderDocument = useCallback(
		(newDocument: EditorDocument) => {
			if (!markupElementRef.current) return;

			const isDocumentChanged = !isEqualObjects(
				markupDataRef.current?.document,
				newDocument
			);

			if (isDocumentChanged) {
				const newError = validateContent(newDocument);
				const newMarkup = generateMarkup(
					newDocument,
					newError,
					markupOptions
				);

				markupDataRef.current = {
					document: newDocument,
					error: newError,
					markup: newMarkup,
				};

				markupElementRef.current.innerHTML = newMarkup;
				console.info('CodeEditor: Document is updated.');
			}


		},
		[markupElementRef, markupDataRef, markupOptions]
	);

	useEffect(documentChangeCallback, [document]);

	return {
		markupDataRef,

		markupElementRef,

		updateDocumentContent: useCallback(
			(arg) => {
				if (!markupDataRef.current) return;

				const newContent =
					typeof arg === 'function'
						? arg(markupDataRef.current.document.content)
						: arg;

				renderDocument({
					...markupDataRef.current.document,
					content: newContent,
				});

				listeners?.onChange?.(
					markupDataRef.current.document.content,
				);
				listeners?.onError?.(
					markupDataRef.current.error
				);
			},
			[markupDataRef, listeners, renderDocument]
		),
	};
}

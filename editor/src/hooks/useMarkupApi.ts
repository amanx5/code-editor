import { useCallback, useEffect, useRef } from 'react';
import {
	type Content,
	type EditorError,
	type EditorMarkup,
	type LineMeta,
	type MarkupOptions,
	generateMarkup,
	isEqualObjects,
	validateContent,
} from '../utils';
import type { EditorDocument } from '../contexts';
import type { MarkupElement } from '../components';
import type { Listeners } from '../CodeEditor';
import type { TokenMeta } from '../utils/content-helpers/tokenise-content';

export type MarkupData = {
	document: EditorDocument;
	error: EditorError;
	markup: EditorMarkup;
};

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

	useEffect(documentChangeCallback, [document]);

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

				renderMarkup(newMarkup, markupElementRef.current);
			}
		},
		[markupElementRef, markupDataRef, markupOptions]
	);

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

				listeners?.onChange?.(markupDataRef.current.document.content);
				listeners?.onError?.(markupDataRef.current.error);
			},
			[markupDataRef, listeners, renderDocument]
		),
	};
}

// TODO: Perform a minimal diff of changed lines and only add new token markup instead of re-rendering complete markup
export function renderMarkup(
	markup: EditorMarkup,
	markupElement: MarkupElement
) {
	const linesMarkup = markup
		.map((lineMeta) => convertLineMetaToMarkup(lineMeta))
		.join('');

	markupElement.innerHTML = linesMarkup;
}

export function convertLineMetaToMarkup(lineMeta: LineMeta): string {
	const { cls, number, value } = lineMeta;

	const tokensMarkup = value.map(convertTokenMetaToMarkup).join('');

	return `<pre class='${cls}' data-line-num='${number}'>${tokensMarkup}</pre>`;
}

export function convertTokenMetaToMarkup(token: TokenMeta): string {
	return `<span class='${token.cls}'>${token.value}</span>`;
}

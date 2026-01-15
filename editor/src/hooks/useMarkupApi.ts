import { useCallback, useEffect, useRef } from 'react';
import {
	type Content,
	type EditorError,
	isEqualObjects,
	isPlainObject,
	validateContent,
} from '../utils';
import type { EditorDocument, ToolbarStateValues } from '../contexts';
import type {
	CodeLineNumber,
	MarkupElement,
	MarkupOptions,
} from '../components';
import type { EditorListeners } from '../CodeEditor';
import {
	updateMarkupMetrics,
	type MarkupMetrics,
	type EditorMarkupMeta,
	generateMarkupMeta,
	renderMarkup,
} from '../hooks';

export const MARKUP_LINE_ATTRIBUTES = {
	lineNumber: 'data-line-num',
};

export type RenderOptions = MarkupOptions & ToolbarStateValues;

export type MarkupCommit = {
	document: EditorDocument;
	error: EditorError;
	markupMeta: EditorMarkupMeta;
	renderOptions: RenderOptions;
};

export type MarkupLineElement = HTMLPreElement;

export type MarkupApi = {
	getElement: () => MarkupElement | null;
	
	getElementRef: () => React.RefObject<MarkupElement | null>;

	getLineElement: (
		position?: CodeLineNumber | 'first' | 'last' | { near: HTMLElement },
		referenceEl?: HTMLElement
	) => MarkupLineElement | null;

	getMetrics: () => MarkupMetrics | null;

	setMetrics: (metrics: MarkupMetrics) => void;

	updateDocumentContent: (
		arg: Content | ((prev: Content) => Content)
	) => void;
};

export function useMarkupApi(
	document: EditorDocument,
	renderOptions: RenderOptions,
	listeners?: EditorListeners
): MarkupApi {
	const markupElementRef = useRef<MarkupElement>(null);
	const markupCommitRef = useRef<MarkupCommit>(null);
	const markupMetricsRef = useRef<MarkupMetrics>(null);

	const renderDocument = useCallback(
		(newDocument?: EditorDocument, newRenderOptions?: RenderOptions) => {
			newDocument = newDocument ?? document;
			newRenderOptions = newRenderOptions ?? renderOptions;

			const isFirstRender = markupCommitRef.current === null;
			const isDocumentChanged = !isEqualObjects(
				markupCommitRef.current?.document,
				newDocument
			);

			const isOptionsChanged = !isEqualObjects(
				markupCommitRef.current?.renderOptions,
				newRenderOptions
			);

			if (isFirstRender || isDocumentChanged || isOptionsChanged) {
				const newError = validateContent(newDocument);
				const newMarkupMeta = generateMarkupMeta(newDocument, newError);

				renderMarkup(markupApi, newMarkupMeta, newRenderOptions);

				markupCommitRef.current = {
					document: newDocument,
					error: newError,
					markupMeta: newMarkupMeta,
					renderOptions: newRenderOptions,
				};

				// fire onChange only in the subsequent renders
				if (!isFirstRender) {
					listeners?.onChange?.(newDocument.content);
				}
				// fire onError always
				listeners?.onError?.(newError);

				// TODO: Don't cache metrics, we need to re-calculate metrics everytime cursor changes.
				// Assuming that content change doesn't have impact on metrics is wrong, since
				// not all glyphs acquire same column width
				if (isOptionsChanged) {
					updateMarkupMetrics(markupApi);
				}
			}
		},
		[document, renderOptions]
	);

	useEffect(renderDocument, [document, renderOptions]);

	const markupApi: MarkupApi = {
		getElement: () => markupElementRef.current ?? null,
		getElementRef: () => markupElementRef,

		getLineElement: (position = 'first') => {
			const markupEl = markupApi.getElement();
			if (!markupEl) return null;

			const lineNumAttr = MARKUP_LINE_ATTRIBUTES.lineNumber;
			let lineEl;

			if (isPlainObject(position) && 'near' in position) {
				lineEl = position.near.closest(`[${lineNumAttr}]`);
			} else {
				const selector =
					position === 'first'
						? `[${lineNumAttr}='1']`
						: position === 'last'
						? `[${lineNumAttr}]:last-child`
						: `[${lineNumAttr}='${position}']`;

				lineEl = markupEl.querySelector(selector);
			}

			if (lineEl) {
				return lineEl as MarkupLineElement;
			}

			return null;
		},

		getMetrics: () => markupMetricsRef.current ?? null,

		setMetrics: (metrics: MarkupMetrics) => {
			markupMetricsRef.current = metrics;
		},

		updateDocumentContent: useCallback(
			(arg) => {
				if (!markupCommitRef.current) return;

				const newContent =
					typeof arg === 'function'
						? arg(markupCommitRef.current.document.content)
						: arg;

				renderDocument({
					...markupCommitRef.current.document,
					content: newContent,
				});
			},
			[renderDocument]
		),
	};

	return markupApi;
}

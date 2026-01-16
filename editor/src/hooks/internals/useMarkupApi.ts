import { useEffect, useLayoutEffect, useRef } from 'react';
import {
	type Content,
	type EditorError,
	isEqualObjects,
	isPlainObject,
	validateContent,
} from '../../utils';
import type { EditorDocument } from '../../contexts';
import type {
	CodeLineNumber,
	MarkupElement,
	MarkupOptions,
	ToolbarStateValues,
} from '../../components';
import type { EditorListeners } from '../../CodeEditor';
import {
	updateMarkupMetrics,
	type MarkupMetrics,
	type EditorMarkupMeta,
	generateMarkupMeta,
	renderMarkup,
} from './markup-api';

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
	getElement(): MarkupElement | null;

	getElementRef(): React.RefObject<MarkupElement | null>;

	getLineElement(
		position?: CodeLineNumber | 'first' | 'last' | { near: HTMLElement },
		referenceEl?: HTMLElement
	): MarkupLineElement | null;

	getMetrics(): MarkupMetrics | null;

	setMetrics(metrics: MarkupMetrics): void;

	updateDocumentContent(arg: Content | ((prev: Content) => Content)): void;
};

/**
 * Markup API hook
 *
 * NOTE: This is a single use hook per editor instance.
 */
export function useMarkupApi(
	document: EditorDocument,
	renderOptions: RenderOptions,
	listeners?: EditorListeners
): MarkupApi {
	const apiRef = useRef<MarkupApi>(null);
	const elementRef = useRef<MarkupElement>(null);
	const commitRef = useRef<MarkupCommit>(null);
	const metricsRef = useRef<MarkupMetrics>(null);
	const listenersRef = useRef(listeners);

	useEffect(() => {
		listenersRef.current = listeners;
	}, [listeners]);

	useLayoutEffect(() => {
		renderDocument(document, renderOptions);
	}, [document, renderOptions]);

	// prevent unnecessary re-creations of the API object because if the api reference is changed, the editor will rerender.
	// dont use ?? even though it prevents overwriting, the assignment itself runs every render, which is a smell and can break in StrictMode or future refactors.
	if (!apiRef.current) {
		apiRef.current = {
			getElement() {
				return elementRef.current ?? null;
			},
			getElementRef() {
				return elementRef;
			},

			getLineElement(position = 'first') {
				const markupEl = this.getElement();
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

			getMetrics() {
				return metricsRef.current ?? null;
			},

			setMetrics(metrics: MarkupMetrics) {
				return (metricsRef.current = metrics);
			},

			updateDocumentContent(arg) {
				if (!commitRef.current) return;

				const newContent =
					typeof arg === 'function'
						? arg(commitRef.current.document.content)
						: arg;

				const newDocument = {
					...commitRef.current.document,
					content: newContent,
				};

				renderDocument(newDocument, commitRef.current.renderOptions);
			},
		};
	}

	return apiRef.current;

	function renderDocument(
		newDocument: EditorDocument,
		newRenderOptions: RenderOptions
	) {
		const markupApi = apiRef.current;
		if (!markupApi) return;

		const latestCommit = commitRef.current;

		const isFirstRender = latestCommit === null;

		const isDocumentChanged = !isEqualObjects(
			latestCommit?.document,
			newDocument
		);

		const isOptionsChanged = !isEqualObjects(
			latestCommit?.renderOptions,
			newRenderOptions
		);

		if (isFirstRender || isDocumentChanged || isOptionsChanged) {
			const newError = validateContent(newDocument);
			const newMarkupMeta = generateMarkupMeta(newDocument, newError);

			renderMarkup(markupApi, newMarkupMeta, newRenderOptions);

			commitRef.current = {
				document: newDocument,
				error: newError,
				markupMeta: newMarkupMeta,
				renderOptions: newRenderOptions,
			};

			const listeners = listenersRef.current;
			// don't fire onChange on first render
			if (!isFirstRender) {
				listeners?.onChange?.(newDocument.content);
			}
			// fire onError on each render
			listeners?.onError?.(newError);

			// TODO: Don't cache metrics, we need to re-calculate metrics everytime cursor changes.
			// Assuming that content change doesn't have impact on metrics is wrong, since
			// not all glyphs acquire same column width
			if (isOptionsChanged) {
				updateMarkupMetrics(markupApi);
			}
		}
	}
}

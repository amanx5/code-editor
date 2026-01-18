import { useEffect, useLayoutEffect, useRef } from 'react';
import {
	type Content,
	type EditorError,
	isEqualObjects,
	isPlainObject,
	resolveSetterValue,
	type SetterValue,
	validateContent,
} from '../../utils';
import type { EditorDocument } from '../../contexts';
import type {
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
	type MarkupLineAttribute,
	MarkupLineAttributeDomName,
} from './markup-api';
import { type LineNumber } from './useCursorApi';

export type Axis = 'x' | 'y';

export type Coordinates = {
	[key in Axis]: number;
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
	getCurrentCommit(): MarkupCommit | null;

	getElement(): MarkupElement | null;

	getLineElement(
		position?: LineNumber | 'first' | 'last' | { near: HTMLElement },
		referenceEl?: HTMLElement,
	): MarkupLineElement | null;

	getLineElementAttribute(
		lineElement: MarkupLineElement,
		attribute: MarkupLineAttribute,
	): string;
	/** 
	 * Returns coordinates of the given line element with respect to `MarkupElement`.
	 * TODO: Written coordinates w.r.t `Body` element as all layers reside inside `Body`. It will be more robust solution.
	 */
	getLineElementCoordinates(lineElement: MarkupLineElement): Coordinates;

	getMetrics(): MarkupMetrics | null;

	setElement(element: MarkupElement): void;

	setMetrics(metrics: MarkupMetrics): void;

	updateDocumentContent(arg: SetterValue<Content>): void;
};

/**
 * Markup API hook
 *
 * NOTE: This is a single use hook per editor instance.
 */
export function useMarkupApi(
	document: EditorDocument,
	renderOptions: RenderOptions,
	listeners?: EditorListeners,
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

	// Create the Markup API only once to keep a stable imperative API reference.
	// Recreating this object would break functions holding the old reference
	// dont use ?? even though it prevents overwriting, the assignment itself runs every render, which is a smell and can break in StrictMode or future refactors.
	if (!apiRef.current) {
		apiRef.current = {
			getCurrentCommit() {
				return commitRef.current ?? null;
			},

			getElement() {
				return elementRef.current ?? null;
			},

			getLineElement(position = 'first') {
				const markupEl = this.getElement();
				if (!markupEl) return null;

				const lineNumAttr = MarkupLineAttributeDomName.lineNumber;
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

			getLineElementAttribute(lineElement, attribute) {
				const attrDomName = MarkupLineAttributeDomName[attribute];
				const attrValue = lineElement.getAttribute(attrDomName);

				if (attrValue == null) {
					throw new Error(
						`No value is assigned to this line element for attribute "${attribute}". Searched using dom name "${attrDomName}" `,
					);
				}

				return attrValue;
			},

			getLineElementCoordinates(lineElement) {
				const markupElement = this.getElement();

				if (!markupElement) {
					throw new Error(
						'Markup element is not rendered yet. This method should not be used before render',
					);
				}

				const lineElementRect = lineElement.getBoundingClientRect();
				const parentElementRect = markupElement.getBoundingClientRect();

				const x = lineElementRect.left - parentElementRect.left;
				const y = lineElementRect.top - parentElementRect.top;

				// Can use offsets but they might miscalculate when:
				// - line element ancestors are transformed (NOT SURE)
				// - page scrolled (NOT SURE)
				// - lineElement.offsetParent != markupElement (FOR SURE, offsetParent is closest positioned parent, not just any parent)
				// - borders (NOT SURE), RTL mode (NOT SURE)
				// const { offsetLeft, offsetTop } = lineElement;
				// const x = offsetLeft;
				// const y = offsetTop;

				return { x, y };
			},

			getMetrics() {
				return metricsRef.current ?? null;
			},

			setElement(el) {
				elementRef.current = el;
			},

			setMetrics(metrics: MarkupMetrics) {
				return (metricsRef.current = metrics);
			},

			updateDocumentContent(value) {
				if (!commitRef.current) return;

				const newContent = resolveSetterValue(
					value,
					commitRef.current.document.content,
				);

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
		newRenderOptions: RenderOptions,
	) {
		const markupApi = apiRef.current;
		if (!markupApi) return;

		const latestCommit = commitRef.current;

		const isFirstRender = latestCommit === null;

		const isDocumentChanged = !isEqualObjects(
			latestCommit?.document,
			newDocument,
		);

		const isOptionsChanged = !isEqualObjects(
			latestCommit?.renderOptions,
			newRenderOptions,
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

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	type Content,
	type EditorError,
	isEqualObjects,
	isPlainObject,
	resolveSetterValue,
	type SetterValue,
	validateContent,
} from '../../utils';
import type { EditorDocument, EditorListeners, EditorOptions } from '../..';
import type { MarkupElement } from '../../components';
import {
	updateMarkupMetrics,
	type MarkupMetrics,
	type EditorMarkupMeta,
	generateMarkupMeta,
	renderMarkup,
	type MarkupLineAttribute,
	MarkupLineAttributeDomName,
} from './markup-api';

export type Axis = 'x' | 'y';

export type Coordinates = {
	[key in Axis]: number;
};

export type LineColumn = number;
export type LineNumber = number;

export const MIN_LINE_COLUMN: LineColumn = 1;
export const MIN_LINE_NUMBER: LineNumber = 1;

export type MarkupCommit = {
	document: EditorDocument;
	error: EditorError;
	markupMeta: EditorMarkupMeta;
	editorOptions: EditorOptions;
};

export type EditorFocused = boolean;
export type MarkupLineElement = HTMLPreElement;

export type MarkupApi = {
	focused: EditorFocused;

	getCurrentCommit(): MarkupCommit | null;
	getElement(): MarkupElement | null;
	getLineElement(
		position?: LineNumber | 'first' | 'last' | { near: HTMLElement },
	): MarkupLineElement | null;
	getLineElementAttribute(
		lineElement: MarkupLineElement,
		attribute: MarkupLineAttribute,
	): string;
	/**
	 * Returns coordinates of the given line element with respect to `MarkupElement`.
	 * TODO: Return coordinates w.r.t `Body` element as all layers reside inside `Body`. It will be more robust solution.
	 */
	getLineElementCoordinates(lineElement: MarkupLineElement): Coordinates;
	getMaxLineColumn(lineNumber: LineNumber): LineColumn;
	getMaxLineNumber(): LineNumber;
	getMetrics(): MarkupMetrics | null;

	setElement(element: MarkupElement): void;
	setFocused: React.Dispatch<React.SetStateAction<EditorFocused>>;
	setMetrics(metrics: MarkupMetrics): void;

	updateDocument(
		document: EditorDocument,
		editorOptions: EditorOptions,
	): void;
	updateDocumentContent(arg: SetterValue<Content>): void;
};

/**
 * Markup API hook
 *
 * NOTE: This is a single use hook per editor instance.
 */
export function useSetupMarkupApi(
	document: EditorDocument,
	editorOptions: EditorOptions,
	listeners?: EditorListeners,
): MarkupApi {
	const elementRef = useRef<MarkupElement>(null);
	const commitRef = useRef<MarkupCommit>(null);
	const metricsRef = useRef<MarkupMetrics>(null);
	const listenersRef = useRef(listeners);
	const [focused, setFocused] = useState<EditorFocused>(false);

	useEffect(() => {
		listenersRef.current = listeners;
	}, [listeners]);

	useLayoutEffect(() => {
		markupApi.updateDocument(document, editorOptions);
	}, [document, editorOptions]);

	const markupApi: MarkupApi = {
		focused,

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
		getMaxLineColumn(lineNumber) {
			const currentCommit = markupApi.getCurrentCommit();
			if (!currentCommit) return MIN_LINE_COLUMN;

			const lineMeta = currentCommit.markupMeta.find(
				(lineMeta) => lineMeta.number === lineNumber,
			);

			if (!lineMeta) {
				throw new Error(
					`Line meta doesn't exist for line number: ${lineNumber}`,
				);
			}

			return lineMeta.content.length;
		},
		getMaxLineNumber() {
			const currentCommit = markupApi.getCurrentCommit();
			if (!currentCommit) return MIN_LINE_NUMBER;

			return currentCommit.markupMeta.length;
		},
		getMetrics() {
			return metricsRef.current ?? null;
		},

		setElement(el) {
			elementRef.current = el;
		},
		setFocused,
		setMetrics(metrics) {
			return (metricsRef.current = metrics);
		},

		updateDocument(document, editorOptions) {
			const latestCommit = commitRef.current;
			const isFirstRender = latestCommit === null;
			const isDocumentChanged = !isEqualObjects(
				document,
				latestCommit?.document,
			);
			const isOptionsChanged = !isEqualObjects(
				editorOptions,
				latestCommit?.editorOptions,
			);

			if (isFirstRender || isDocumentChanged || isOptionsChanged) {
				const error = validateContent(document);
				const markupMeta = generateMarkupMeta(document, error);

				renderMarkup(markupApi, markupMeta, editorOptions);

				commitRef.current = {
					document: document,
					error: error,
					markupMeta: markupMeta,
					editorOptions: editorOptions,
				};

				const listeners = listenersRef.current;
				// don't fire onChange on first render
				if (!isFirstRender) {
					listeners?.onChange?.(document.content);
				}
				// fire onError on each render
				listeners?.onError?.(error);

				// TODO: Don't cache metrics, we need to re-calculate metrics everytime cursor changes.
				// Assuming that content change doesn't have impact on metrics is wrong, since
				// not all glyphs acquire same column width
				if (isOptionsChanged) {
					updateMarkupMetrics(markupApi);
				}
			}
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

			this.updateDocument(newDocument, commitRef.current.editorOptions);
		},
	};

	return markupApi;
}

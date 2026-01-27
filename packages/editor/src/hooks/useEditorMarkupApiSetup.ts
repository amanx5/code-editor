import { useLayoutEffect, useRef, useState, useMemo } from 'react';
import {
	type Content,
	type EditorError,
	isEqualObjects,
	isPlainObject,
	resolveSetterValue,
	type SetterValue,
	validateContent,
} from '../utils';
import {
	calculateMarkupMetrics,
	EditorOptionsDefault,
	MarkupLineAttributeDomName,
	applyDefaults,
	type EditorDocument,
	type EditorListeners,
	type EditorOptions,
	type MarkupLineAttribute,
} from '..';
import type { MarkupElement } from '../components';
import {
	type MarkupMetrics,
	type EditorMarkupMeta,
	generateMarkupMeta,
} from './markup-api-setup';

// let lastCheckedFont: CSSStyleDeclaration['font'] | null = null;

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
	editorOptions: EditorOptions;
	markupMeta: EditorMarkupMeta;
};

export type EditorFocused = boolean;
export type MarkupLineElement = HTMLPreElement;

export type MarkupApi = {
	commit: MarkupCommit | null;
	focused: EditorFocused;

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
	 * TODO: Return coordinates w.r.t `EditorRoot` component as all layers reside inside `EditorRoot`. It will be more robust solution.
	 */
	getLineElementCoordinates(lineElement: MarkupLineElement): Coordinates;
	getMaxLineColumn(lineNumber: LineNumber): LineColumn;
	getMaxLineNumber(): LineNumber;
	getMetrics(): MarkupMetrics | null;

	setElement(element: MarkupElement): void;
	setFocused: React.Dispatch<React.SetStateAction<EditorFocused>>;

	updateDocument(
		document: EditorDocument,
		editorOptions?: EditorOptions,
	): void;
	updateDocumentContent(arg: SetterValue<Content>): void;
};

/**
 * MarkupAPI setup hook
 *
 * NOTE: This is a single use hook per editor instance.
 */
export function useEditorMarkupApiSetup(
	document: EditorDocument,
	editorOptions?: EditorOptions,
	listeners?: EditorListeners,
): MarkupApi {
	const elementRef = useRef<MarkupElement>(null);
	const [commit, setCommit] = useState<MarkupCommit | null>(null);
	const [focused, setFocused] = useState<EditorFocused>(false);
	// const [loading, setLoading] = useState<boolean>(false);

	useLayoutEffect(() => {
		markupApiMemoized.updateDocument(document, editorOptions);

		// TODO: Either Block access to Editor until the font is loaded
		// Or write a mechanism to update selection layer, cursor layer, etc. when font is loaded/updated.
		// const lineEl = markupApiMemoized.getLineElement();
		// if (!lineEl) return;

		// const lineStyle = getComputedStyle(lineEl);

		// if (lastCheckedFont === lineStyle.font) return;
		// lastCheckedFont = lineStyle.font;

		// setLoading(true);
		// window.document.fonts.load(lineStyle.font).then(() => {
		// 	setLoading(false);
		// });
	}, [document, editorOptions]);

	const markupApiMemoized = useMemo<MarkupApi>(() => {
		const markupApi: MarkupApi = {
			commit,
			focused,

			getElement() {
				return elementRef.current ?? null;
			},
			getLineElement(position = 'first') {
				const markupEl = markupApi.getElement();
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
				const markupElement = markupApi.getElement();

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
				if (!commit) return MIN_LINE_COLUMN;

				const lineMeta = commit.markupMeta.find(
					(lineMeta) => lineMeta.number === lineNumber,
				);

				if (!lineMeta) {
					throw new Error(
						`Line meta doesn't exist for line number: ${lineNumber}`,
					);
				}

				return lineMeta.value.length;
			},
			getMaxLineNumber() {
				if (!commit) return MIN_LINE_NUMBER;

				return commit.markupMeta.length;
			},
			getMetrics() {
				const lineEl = markupApi.getLineElement();
				if (!lineEl) {
					throw new Error(
						'Call `getMetrics` method only after render',
					);
				}

				const lineStyle = getComputedStyle(lineEl);

				return calculateMarkupMetrics(lineStyle);
			},

			setElement(el) {
				elementRef.current = el;
			},
			setFocused,

			updateDocument(document, editorOptions) {
				editorOptions = applyDefaults(
					editorOptions,
					EditorOptionsDefault,
				);

				const isDocumentChanged = !isEqualObjects(
					document,
					commit?.document,
				);
				const isOptionsChanged = !isEqualObjects(
					editorOptions,
					commit?.editorOptions,
				);

				if (isDocumentChanged || isOptionsChanged) {
					const error = validateContent(document);
					const markupMeta = generateMarkupMeta(document, error);

					setCommit({
						document: document,
						error: error,
						markupMeta: markupMeta,
						editorOptions: editorOptions,
					});

					listeners?.documentChange?.(document, error);
				}
			},
			updateDocumentContent(value) {
				if (!commit) return;

				const newContent = resolveSetterValue(
					value,
					commit.document.content,
				);

				const newDocument = {
					...commit.document,
					content: newContent,
				};

				markupApi.updateDocument(newDocument, commit.editorOptions);
			},
		};

		return markupApi;
	}, [commit, focused, listeners]);

	return markupApiMemoized;
}

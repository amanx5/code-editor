import { useCallback, useEffect, useRef } from 'react';
import {
	type Content,
	type EditorError,
	type EditorMarkup,
	type MarkupOptions,
	generateMarkup,
	getCharWidth,
	isEqualObjects,
	validateContent,
} from '../utils';
import type { EditorDocument } from '../contexts';
import type { CodeLineNumber, MarkupElement } from '../components';
import type { Listeners } from '../CodeEditor';

export const MARKUP_LINE_ATTRIBUTES = {
	lineNumber: 'data-line-num',
};

export type MarkupData = {
	document: EditorDocument;
	error: EditorError;
	markup: EditorMarkup;
};

export type MarkupMetrics = {
	line: {
		paddingLeft: number;
		columnWidth: number;
	};
};

export type MarkupLineElement = HTMLPreElement;

export type MarkupApi = {
	markupDataRef: React.RefObject<MarkupData | null>;
	markupRef: React.RefObject<MarkupElement | null>;

	getMarkupEl: () => MarkupElement | null;
	getMarkupLineEl: (lineNumber?: CodeLineNumber) => MarkupLineElement | null;
	getMarkupMetrics: () => MarkupMetrics | null;

	updateDocumentContent: (
		arg: Content | ((prev: Content) => Content)
	) => void;
};

export function useMarkupApi(
	document: EditorDocument,
	markupOptions: MarkupOptions,
	listeners?: Listeners
): MarkupApi {
	const markupRef = useRef<MarkupElement>(null);
	const markupDataRef = useRef<MarkupData>(null);
	const markupMetricsRef = useRef<MarkupMetrics>(null);

	const documentChangeCallback = useCallback(() => {
		renderDocument(document);
	}, [document]);

	useEffect(setMarkupMetrics, []);
	useEffect(documentChangeCallback, [document]);

	const renderDocument = useCallback(
		(newDocument: EditorDocument) => {
			if (!markupRef.current) return;

			const isDocumentChanged = !isEqualObjects(
				markupDataRef.current?.document,
				newDocument
			);

			if (isDocumentChanged) {
				const newError = validateContent(newDocument);
				const newMarkup = generateMarkup(
					newDocument,
					newError,
					markupRef.current,
					markupOptions
				);

				markupDataRef.current = {
					document: newDocument,
					error: newError,
					markup: newMarkup,
				};
			}
		},
		[markupOptions]
	);

	return {
		markupDataRef,

		markupRef,

		getMarkupEl,
		getMarkupLineEl,
		getMarkupMetrics,

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
			[listeners, renderDocument]
		),
	};

	function getMarkupEl() {
		return markupRef.current ?? null;
	}

	function getMarkupLineEl(lineNumber?: CodeLineNumber) {
		if (!markupRef.current) return null;

		const lineNumAttr = MARKUP_LINE_ATTRIBUTES.lineNumber;
		const selector =
			lineNumber == null
				? `[${lineNumAttr}]`
				: `[${lineNumAttr}='${lineNumber}']`;

		return markupRef.current.querySelector(selector) as MarkupLineElement;
	}

	function getMarkupMetrics() {
		return markupMetricsRef.current ?? null;
	}

	function setMarkupMetrics() {
		const lineEl = getMarkupLineEl();

		if (!lineEl) return;

		const lineColumnWidth = getCharWidth(lineEl);
		const linePaddingLeft = parseFloat(
			getComputedStyle(lineEl).paddingLeft
		);

		markupMetricsRef.current = {
			line: {
				columnWidth: lineColumnWidth,
				paddingLeft: linePaddingLeft,
			},
		};
	}
}

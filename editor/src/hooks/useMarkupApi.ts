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

export type MarkupCommit = {
	document: EditorDocument;
	error: EditorError;
	markup: EditorMarkup;
	markupOptions: MarkupOptions;
};

export type MarkupMetrics = {
	line: {
		paddingLeft: number;
		columnWidth: number;
	};
};

export type MarkupLineElement = HTMLPreElement;

export type MarkupApi = {
	markupRef: React.RefObject<MarkupElement | null>;
	markupCommitRef: React.RefObject<MarkupCommit | null>;

	getMarkupEl: () => MarkupElement | null;
	getMarkupLineEl: (
		position?: CodeLineNumber | 'first' | 'last'
	) => MarkupLineElement | null;
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
	const markupCommitRef = useRef<MarkupCommit>(null);
	const markupMetricsRef = useRef<MarkupMetrics>(null);

	const renderDocument = useCallback(
		(newDocument?: EditorDocument) => {
			newDocument = newDocument ?? document;

			if (!markupRef.current) return;

			const isDocumentChanged = !isEqualObjects(
				markupCommitRef.current?.document,
				newDocument
			);

			const isOptionsChanged = !isEqualObjects(
				markupCommitRef.current?.markupOptions,
				markupOptions
			);

			if (isDocumentChanged || isOptionsChanged) {
				const newError = validateContent(newDocument);
				const newMarkup = generateMarkup(
					newDocument,
					newError,
					markupRef.current,
					markupOptions
				);

				markupCommitRef.current = {
					document: newDocument,
					error: newError,
					markup: newMarkup,
					markupOptions,
				};

				setMarkupMetrics();
			}
		},
		[document, markupOptions]
	);

	useEffect(renderDocument, [document, markupOptions]);

	const getMarkupLineEl: MarkupApi['getMarkupLineEl'] = (
		position = 'first'
	) => {
		if (!markupRef.current) return null;

		const lineNumAttr = MARKUP_LINE_ATTRIBUTES.lineNumber;
		const selector =
			position === 'first'
				? `[${lineNumAttr}='1']`
				: position === 'last'
				? `[${lineNumAttr}]:last-child`
				: `[${lineNumAttr}='${position}']`;

		const lineEl = markupRef.current.querySelector(selector);

		if (lineEl) {
			return lineEl as MarkupLineElement;
		}

		return null;
	};

	return {
		markupRef,
		markupCommitRef,

		getMarkupEl,
		getMarkupLineEl,
		getMarkupMetrics,

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

				listeners?.onChange?.(markupCommitRef.current.document.content);
				listeners?.onError?.(markupCommitRef.current.error);
			},
			[listeners, renderDocument]
		),
	};

	function getMarkupEl() {
		return markupRef.current ?? null;
	}

	function getMarkupMetrics() {
		return markupMetricsRef.current ?? null;
	}

	function setMarkupMetrics() {
		if (markupMetricsRef.current) return;

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

import { useMemo } from 'react';
import type { MarkupApi } from '../../../hooks';
import type { CursorApi } from '../../../hooks/useCursorApi';
import { cls, getEventHandlers } from '../../../utils';

export type CodeLineNumber = number;

export type MarkupOptions = {
	disabled?: boolean;
	highlightLines?: CodeLineNumber[];
	hideLineNumbers?: boolean;
};

export const MarkupOptionsDefault: MarkupOptions = {
	disabled: false,
	highlightLines: [],
	hideLineNumbers: false,
};

export type MarkupElement = HTMLDivElement;

export function MarkupLayer({
	cursorApi,
	markupApi,
}: {
	cursorApi: CursorApi;
	markupApi: MarkupApi;
}) {
	const eventHandlers = useMemo(
		() =>
			getEventHandlers({
				cursorApi,
				markupApi,
			}),
		[cursorApi, markupApi]
	);

	return (
		<div
			aria-multiline
			className={cls(
				'cursor-text',
				'flex-1 inline-flex flex-col min-h-full h-max',
				'focus:outline-none',
				'selection:bg-blue-100',
				'z-10'
			)}
			ref={markupApi.markupRef}
			role='textbox'
			spellCheck={false}
			tabIndex={0}
			{...eventHandlers}
		/>
	);
}

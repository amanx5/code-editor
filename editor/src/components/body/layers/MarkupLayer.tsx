import { useContext, useMemo } from 'react';
import { cls, getEventHandlers } from '../../../utils';
import { EditorApiContext } from '../../../contexts';

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

export function MarkupLayer() {
	const { cursorApi, markupApi } = useContext(EditorApiContext);

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
				'bg-ceMarkupLayer',
				'cursor-text',
				'flex-1 inline-flex flex-col min-h-full h-max',
				'focus:outline-none',
				'selection:bg-blue-100',
				'z-10'
			)}
			ref={markupApi.getElementRef()}
			role='textbox'
			spellCheck={false}
			tabIndex={0}
			{...eventHandlers}
		/>
	);
}

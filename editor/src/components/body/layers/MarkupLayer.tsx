import type { MarkupApi } from '../../../hooks';
import type { CursorApi } from '../../../hooks/useCursorApi';
import { cls, getEventHandlers } from '../../../utils';

export type CodeLineNumber = number;

export type EditorOptions = {
	disabled?: boolean;
	highlightLines?: CodeLineNumber[];
	hideLineNumbers?: boolean;
};

export const EditorOptionsDefault: EditorOptions = {
	disabled: false,
	highlightLines: [],
	hideLineNumbers: false,
};

export type MarkupElement = HTMLPreElement;

export function MarkupLayer({
	cursorApi,
	markupApi,
	editorOptions,
}: {
	cursorApi: CursorApi;
	markupApi: MarkupApi;
	editorOptions: EditorOptions;
}) {
	const {
		disabled = EditorOptionsDefault.disabled,
		// highlightLines = EditorOptionsDefault.highlightLines,
		hideLineNumbers = EditorOptionsDefault.hideLineNumbers,
	} = editorOptions;

	const eventHandlers =
		!disabled &&
		getEventHandlers({
			cursorApi,
			markupApi,
		});

	return (
		<pre
			className={cls(
				'ce-content',
				'cursor-text',
				'flex-1 inline-flex flex-col h-max',
				'focus:outline-none',
				hideLineNumbers && 'ce-content-pd',
				'z-10'
			)}
			ref={markupApi.markupElementRef}
			spellCheck={false}
			{...eventHandlers}
		/>
	);
}

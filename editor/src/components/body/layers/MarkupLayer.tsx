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
	} = editorOptions;

	const eventHandlers =
		!disabled &&
		getEventHandlers({
			cursorApi,
			markupApi,
		});

	return (
		<pre
			aria-multiline
			className={cls(
				'cursor-text',
				'flex-1 inline-flex flex-col min-h-full h-max',
				'focus:outline-none',
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

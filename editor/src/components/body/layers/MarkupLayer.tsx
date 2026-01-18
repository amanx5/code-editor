import { cls, getEventHandlers } from '../../../utils';
import { useEditor, type LineNumber } from '../../../hooks';

export type MarkupOptions = {
	disabled?: boolean;
	highlightLines?: LineNumber[];
	hideLineNumbers?: boolean;
};

export const MarkupOptionsDefault: MarkupOptions = {
	disabled: false,
	highlightLines: [],
	hideLineNumbers: false,
};

export type MarkupElement = HTMLDivElement;

export function MarkupLayer() {
	const editorApi = useEditor();
	const { markupApi } = editorApi;
	const eventHandlers = getEventHandlers(editorApi);

	return (
		<div
			aria-multiline
			className={cls(
				'absolute',
				'cursor-text',
				'flex-1 inline-flex flex-col min-h-full h-max',
				'focus:outline-none',
				'selection:bg-transparent',
			)}
			ref={markupApi.setElement} // callback ref
			role='textbox'
			spellCheck={false}
			tabIndex={0}
			{...eventHandlers}
		/>
	);
}

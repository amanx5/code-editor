import { cls, getEventHandlers } from '../../utils';
import { useEditorApi } from '../../hooks';

export type MarkupElement = HTMLDivElement;

export function MarkupLayer({ children }: { children?: React.ReactNode }) {
	const editorApi = useEditorApi();
	const eventHandlers = getEventHandlers(editorApi);

	return (
		<div
			aria-multiline
			className={cls(
				'absolute',
				'cursor-text',
				'flex-1 inline-flex flex-col min-h-full min-w-full h-max',
				'focus:outline-none',
				'selection:bg-transparent',
				// 'selection:bg-red-800 selection:bg-opacity-40', // for testing
			)}
			ref={editorApi.markup.setElement} // callback ref
			role='textbox'
			spellCheck={false}
			tabIndex={0}
			{...eventHandlers}
		>
			{children}
		</div>
	);
}

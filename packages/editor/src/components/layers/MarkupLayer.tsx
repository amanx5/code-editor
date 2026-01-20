import { cls, getEventHandlers } from '../../utils';
import { useCursorApi, useMarkupApi } from '../../hooks';

export type MarkupElement = HTMLDivElement;

export function MarkupLayer() {
	const cursorApi = useCursorApi();
	const markupApi = useMarkupApi();
	const eventHandlers = getEventHandlers({ cursorApi, markupApi });

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
			ref={markupApi.setElement} // callback ref
			role='textbox'
			spellCheck={false}
			tabIndex={0}
			{...eventHandlers}
		/>
	);
}

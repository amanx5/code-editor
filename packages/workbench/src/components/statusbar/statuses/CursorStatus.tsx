import { EditorApiContext, toNumber } from 'code-editor';
import { StatusButton } from './StatusButton';
import { useContext } from 'react';

export function CursorStatus() {
	const editorApi = useContext(EditorApiContext);

	if (!editorApi) {
		return null;
	}

	const { cursor, markup } = editorApi;
	const selectedContent = cursor.getSelectedContent();
	const selectionStatus = selectedContent
		? `(${selectedContent.length} selected)`
		: '';
	const status = cursor.selection
		? `Ln ${cursor.selection.end.lineNumber}, Col ${cursor.selection.end.lineColumn} ${selectionStatus}`
		: 'Go to line';

	return (
		<StatusButton
			className='px-1'
			onClick={onClick}
			title='Cursor Position'
		>
			{status}
		</StatusButton>
	);

	function onClick() {
		// TODO: Implement go to line functionality component
		const input = prompt(
			'Type a line number to go to (optionally add :column)',
		);

		const [line, column] = input?.split(':') ?? [];

		if (line) {
			const lineColumn = toNumber(column, 'int');
			const lineNumber = toNumber(line, 'int');

			markup.setFocused(true);
			cursor.updateSelection({
				collapse: {
					lineColumn,
					lineNumber,
				},
			});
		}
	}
}

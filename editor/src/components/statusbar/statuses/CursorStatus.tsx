import { useCursorSelection, useEditor } from '../../../hooks';
import { toNumber } from '../../../utils';
import { StatusButton } from './StatusButton';

export function CursorStatus() {
	const { cursorApi } = useEditor();
	const { end } = useCursorSelection();

	const selectedContent = cursorApi.getSelectedContent();
	const selectionStatus = selectedContent ? `(${selectedContent.length} selected)`: ''
	const status = `Ln ${end.lineNumber}, Col ${end.lineColumn} ${selectionStatus}`;

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

			cursorApi.setSelectionCollapsed({
				lineColumn,
				lineNumber,
			});
		}
	}
}

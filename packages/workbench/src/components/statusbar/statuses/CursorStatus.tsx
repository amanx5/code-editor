import { useCursorSelection, useCursorApi } from 'code-editor/hooks';
import { toNumber } from 'code-editor/utils';
import { StatusButton } from './StatusButton';

export function CursorStatus() {
	const cursorApi = useCursorApi();

	if (!cursorApi) {
		return null;
	}
	
	const selection = useCursorSelection();

	const selectedContent = cursorApi?.getSelectedContent();
	const selectionStatus = selectedContent
		? `(${selectedContent.length} selected)`
		: '';
	const status = selection
		? `Ln ${selection.end.lineNumber}, Col ${selection.end.lineColumn} ${selectionStatus}`
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

			updateSelection({
				collapse: {
					lineColumn,
					lineNumber,
				},
			});
		}
	}
}

import { useCursorPosition, useEditor } from '../../../hooks';
import { StatusButton } from './StatusButton';

export function CursorStatus() {
	const { cursorApi } = useEditor();
	const { lineNumber, lineColumn } = useCursorPosition();

	return (
		<StatusButton
			className='px-1'
			onClick={onClick}
			title='Cursor Position'
		>
			Ln {lineNumber}, Col {lineColumn}
		</StatusButton>
	);

	function onClick() {
		// TODO: Implement go to line functionality component
		const input = prompt(
			'Type a line number or column to go to (line:column)'
		);

		const [line, column] = input?.split(':') ?? [];

		cursorApi.setPosition((prev) => ({
			lineColumn: column ? parseInt(column, 10) : prev.lineColumn,
			lineNumber: line ? parseInt(line, 10) : prev.lineNumber,
		}));
	}
}

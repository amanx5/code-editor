import { useCursorPosition } from '../../../hooks';
import { StatusButton } from './StatusButton';

export function CursorStatus() {
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
		// TODO: Implement go to line functionality
	}
}

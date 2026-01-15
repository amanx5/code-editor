import { useContext, useEffect, useState } from 'react';
import type { CursorPosition } from '../../../hooks';
import { EditorApiContext } from '../../../contexts';
import { StatusButton } from './StatusButton';

export function CursorStatus() {
	const { cursorApi } = useContext(EditorApiContext);

	const [cursorPosition, setCursorPosition] = useState(
		cursorApi.getPosition()
	);

	useEffect(() => {
		function syncCursorPosition(cursorPosition: CursorPosition) {
			setCursorPosition(cursorPosition);
		}

		cursorApi.addListener('positionChange', syncCursorPosition);

		return () => {
			cursorApi.removeListener('positionChange', syncCursorPosition);
		};
	}, []);

	const { lineNumber, lineColumn } = cursorPosition;

	return (
		<StatusButton
			className='px-1'
			onClick={onClick}
			title='Cursor Position'
		>{`Ln ${lineNumber}, Col ${lineColumn}`}</StatusButton>
	);

	function onClick() {
		// TODO: Implement go to line functionality
	}
}

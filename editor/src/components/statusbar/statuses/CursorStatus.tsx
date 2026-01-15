import { useContext, useEffect, useState } from 'react';
import type { CursorPosition } from '../../../hooks';
import { EditorApiContext } from '../../../contexts';

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

	return <div>{`Ln ${lineNumber}, Col ${lineColumn}`}</div>;
}

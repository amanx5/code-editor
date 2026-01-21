import { cls } from '../../utils';
import { useLayoutEffect, useRef } from 'react';
import { useEditorApi } from '../../hooks';

export type CursorElement = HTMLDivElement;

// TODO
// - Add Blink effect (make sure to pause blink when typing)
export function Cursor() {
	const { cursor, markup } = useEditorApi();
	const { focused } = markup;
	const { positionToCoordinates, selection } = cursor;

	const cursorElRef = useRef<CursorElement>(null);

	useLayoutEffect(() => {
		const cursorEl = cursorElRef.current;

		if (!cursorEl) return;

		if (selection) {
			const coordinates = positionToCoordinates(selection.end);
			cursorEl.style.transform = `translate(${coordinates.x}px, ${coordinates.y}px)`;

			cursorEl.scrollIntoView({
				behavior: 'instant',
				block: 'nearest',
				inline: 'nearest',
			});
		}
	}, [selection]);

	return (
		<div
			className={cls(
				'ceContent',
				'border-l-[1.2px] border-black',
				focused ? 'block' : 'hidden',
			)}
			ref={cursorElRef}
		/>
	);
}

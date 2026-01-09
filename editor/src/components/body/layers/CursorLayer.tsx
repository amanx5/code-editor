import type { CursorApi } from '../../../hooks';
import { cls } from '../../../utils';

export type CursorElement = HTMLDivElement;

// TODO 
// 1. Hide cursor when not in focus, not typing
// 2. Keep cursor stable while typing
export function CursorLayer({
	cursorApi,
}: {
	cursorApi: CursorApi;
}) {
	const { cursorRef, getCursorPosition } = cursorApi;
	const { x, y } = getCursorPosition();

	return (
		<div aria-hidden className='absolute'>
			<div
				className={cls(
					'animate-ce-caret',
					`absolute left-${x}px top-${y}px`,
					'border-l-[1.2px] border-black',
					'ce-content',
					'pointer-events-none',
					'z-10'
				)}
				ref={cursorRef}
			></div>
		</div>
	);
}

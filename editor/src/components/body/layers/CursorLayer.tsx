import type { CursorApi } from '../../../hooks';
import { cls } from '../../../utils';

export type CursorElement = HTMLDivElement;

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
					'bg-black ce-content',
					'h-full w-[1px]',
					'relative',
					`left-${x}px`,
					`top-${y}px`,
				)}
				ref={cursorRef}
			></div>
		</div>
	);
}

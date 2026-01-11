import type { CursorApi } from '../../../hooks';
import { cls } from '../../../utils';

export type CursorElement = HTMLDivElement;

// TODO
// 1. Hide cursor when not in focus
// 2. Keep cursor stable while typing
export function CursorLayer({ cursorApi }: { cursorApi: CursorApi }) {
	const { cursorRef } = cursorApi;

	return (
		<div aria-hidden className='absolute'>
			<div
				className={cls(
					'absolute',
					'border-l-[1.2px] border-black',
					'ce-content',
					'hidden',
					'pointer-events-none',
					'z-10'
				)}
				ref={cursorRef}
			></div>
		</div>
	);
}

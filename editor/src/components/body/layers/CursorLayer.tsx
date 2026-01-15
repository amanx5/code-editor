import type { CursorApi } from '../../../hooks';
import { cls } from '../../../utils';

export type CursorElement = HTMLDivElement;

// TODO
// - Keep cursor stable while typing
export function CursorLayer({ cursorApi }: { cursorApi: CursorApi }) {
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
				ref={cursorApi.getElementRef()}
			></div>
		</div>
	);
}

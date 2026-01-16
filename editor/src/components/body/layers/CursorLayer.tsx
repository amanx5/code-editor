import { cls } from '../../../utils';
import { useEditor } from '../../../hooks';

export type CursorElement = HTMLDivElement;

// TODO
// - Add Blink effect (make sure to pause blink when typing)
export function CursorLayer() {
	const { cursorApi } = useEditor();
	
	return (
		<div aria-hidden className='absolute'>
			<div
				className={cls(
					'absolute',
					'ceContent',
					'border-l-[1.2px] border-black',
					'hidden',
					'pointer-events-none',
					'z-10'
				)}
				ref={cursorApi.setElement} // callback ref
			></div>
		</div>
	);
}

import { Cursor } from './Cursor';

export function CursorLayer() {
	return (
		<div aria-hidden className='absolute select-none pointer-events-none'>
			<Cursor />
		</div>
	);
}

import { cls } from '../utils';

export function EditorRoot({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={cls(
				'bg-ceScroller',
				'flex-1 h-full', // for stretching to fill parent container
				'overflow-auto', // for scrolling
				'relative', // for positioning of absolute layers
			)}
		>
			{children}
		</div>
	);
}

import { cls } from '../utils';

export function Scroller({ children }: { children: React.ReactNode }) {
	return (
		<div className={cls('bg-ceScroller', 'flex flex-1 overflow-auto relative')}>
			{children}
		</div>
	);
}

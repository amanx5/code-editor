import { cls } from '../../utils';

export function Body({ children }: { children: React.ReactNode }) {
	return (
		<div className={cls('flex flex-1 py-2 overflow-auto relative')}>
			{children}
		</div>
	);
}

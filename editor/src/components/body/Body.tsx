import { cls } from '../../utils';

export function Body({ children }: { children: React.ReactNode }) {
	return (
		<div className={cls('bg-ceBody', 'flex flex-1 overflow-auto relative')}>
			{children}
		</div>
	);
}

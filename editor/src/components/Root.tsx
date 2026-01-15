import { cls } from '../utils';

export function Root({ children }: { children: React.ReactNode }) {
	return (
		<div
			// flex-1: for forcing grow if consumer wraps CodeEditor in flex container
			// don-t add min-h as it can be extra if there is only one line of code
			className={cls(
				'bg-ceRoot',
				'border border-cePanel',
				'flex-1 flex flex-col',
				'overflow-hidden'
			)}
		>
			{children}
		</div>
	);
}

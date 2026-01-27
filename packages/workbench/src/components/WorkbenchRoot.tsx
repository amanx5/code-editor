import { cls } from 'code-editor';

export function WorkbenchRoot({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={cls(
				'bg-cwRoot',
				'border border-cwPanel',
				'flex-1 flex flex-col',
				'overflow-hidden',
			)}
		>
			{children}
		</div>
	);
}

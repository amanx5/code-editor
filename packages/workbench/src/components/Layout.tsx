import { cls } from 'code-editor/utils';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={cls(
				'bg-ceLayout',
				'border border-cePanel',
				'flex-1 flex flex-col',
				'overflow-hidden'
			)}
		>
			{children}
		</div>
	);
}

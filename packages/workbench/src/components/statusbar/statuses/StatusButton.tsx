import { cls } from 'code-editor';

export function StatusButton(props: React.ComponentProps<'button'>) {
	return (
		<button
			{...props}
			className={cls(
				'px-2',
				'text-xs text-cwStatusBarItem-normal',
				'hover:bg-cwStatusBarItem-hover hover:text-cwStatusBarItem-hover',
				props.className,
			)}
			type='button'
		/>
	);
}

import { cls } from '../../../utils';

export function StatusButton(props: React.ComponentProps<'button'>) {
	return (
		<button
			{...props}
			className={cls(
				'px-2',
				'text-xs text-ceStatusBarItem-normal',
				'hover:bg-ceStatusBarItem-hover hover:text-ceStatusBarItem-hover',
				props.className
			)}
			type='button'
		/>
	);
}

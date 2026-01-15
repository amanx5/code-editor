import { cls } from '../../../utils';

export function ToolButton(props: React.ComponentProps<'button'>) {
	return (
		<button
			className={cls(
				'flex items-center justify-center',
				'px-2',
				'text-ceToolbarItem-normal',
				'hover:text-ceToolbarItem-hover hover:bg-ceToolbarItem-hover',
				props.className
			)}
			{...props}
		/>
	);
}

export const ToolDefaultSvgProps: React.SVGProps<SVGSVGElement> = {
	height: 16,
	width: 16,
};

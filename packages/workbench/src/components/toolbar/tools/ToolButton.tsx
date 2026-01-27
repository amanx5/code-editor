import { cls } from 'code-editor';

export function ToolButton(props: React.ComponentProps<'button'>) {
	return (
		<button
			className={cls(
				'flex items-center justify-center',
				'px-2',
				'text-cwToolbarItem-normal',
				'hover:text-cwToolbarItem-hover hover:bg-cwToolbarItem-hover',
				props.className,
			)}
			{...props}
		/>
	);
}

export const ToolDefaultSvgProps: React.SVGProps<SVGSVGElement> = {
	height: 16,
	width: 16,
};

import { cls } from '../../../utils';

export function ToolButton(props: React.ComponentProps<'button'>) {
	return (
		<button
			className={cls(
				'flex items-center justify-center',
				'rounded-md hover:bg-surface-muted'
			)}
			{...props}
		/>
	);
}

export const ToolDefaultSvgProps: React.SVGProps<SVGSVGElement> = {
	height: 16,
	width: 16,
};

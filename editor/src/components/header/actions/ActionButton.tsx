import { cls } from '../../../utils';

export function ActionButton(props: React.ComponentProps<'button'>) {
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

export const ActionButtonDefaultSvgProps: React.SVGProps<SVGSVGElement> = {
	height: 16,
	width: 16,
};

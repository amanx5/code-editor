import { cls } from '../../utils/cls';

export function CodeEditorActionButton(props: React.ComponentProps<'button'>) {
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

export const CodeEditorActionButtonDefaultSvgProps: React.SVGProps<SVGSVGElement> = {
	height: 16,
	width: 16,
};
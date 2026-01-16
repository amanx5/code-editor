import { WrapTextSvg } from '../../svg/WrapTextSvg';
import { ToolDefaultSvgProps, ToolButton } from './ToolButton';

export function ContentWrapTool({
	isWrapEnabled,
	setIsWrapEnabled,
}: {
	isWrapEnabled: boolean;
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const readerText = isWrapEnabled ? 'Disable Code Wrap' : 'Enable Code Wrap';

	return (
		<ToolButton
			aria-label={readerText}
			onClick={() => setIsWrapEnabled((isWrapEnabled) => !isWrapEnabled)}
			title={readerText}
		>
			<WrapTextSvg
				disabled={!isWrapEnabled}
				disabledPathStyle='slashed'
				{...ToolDefaultSvgProps}
			/>
		</ToolButton>
	);
}

import { useContext } from 'react';
import { WrapTextSvg } from '../../svg/WrapTextSvg';
import { ToolDefaultSvgProps, ToolWrapper } from './ToolWrapper';
import { RootContext } from '../../../contexts';

export function ContentWrapTool() {
	const { isWrapEnabled, setIsWrapEnabled } = useContext(RootContext);

	const readerText = isWrapEnabled ? 'Disable Code Wrap' : 'Enable Code Wrap';

	return (
		<ToolWrapper
			aria-label={readerText}
			onClick={() => setIsWrapEnabled((isWrapEnabled) => !isWrapEnabled)}
			title={readerText}
		>
			<WrapTextSvg
				disabled={!isWrapEnabled}
				disabledPathStyle='slashed'
				{...ToolDefaultSvgProps}
			/>
		</ToolWrapper>
	);
}

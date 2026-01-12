import { useContext } from 'react';
import { WrapTextSvg } from '../../svg/WrapTextSvg';
import { ToolDefaultSvgProps, ToolButton } from './ToolButton';
import { ToolbarStatesContext } from '../../../contexts/ToolbarStatesContext';

export function ContentWrapTool() {
	const { isWrapEnabled, setIsWrapEnabled } =
		useContext(ToolbarStatesContext);

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

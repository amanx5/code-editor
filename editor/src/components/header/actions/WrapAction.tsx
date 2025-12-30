import { useContext } from 'react';
import { CodeEditorContext } from '../../../CodeEditor';
import { WrapTextSvg } from '../../svg/WrapTextSvg';
import { ActionButton, ActionButtonDefaultSvgProps } from './ActionButton';

export function WrapAction() {
	const { isWrapEnabled, setIsWrapEnabled } = useContext(CodeEditorContext);

	const readerText = isWrapEnabled ? 'Disable Code Wrap' : 'Enable Code Wrap';

	return (
		<ActionButton
			aria-label={readerText}
			onClick={() => setIsWrapEnabled((isWrapEnabled) => !isWrapEnabled)}
			title={readerText}
		>
			<WrapTextSvg
				{...ActionButtonDefaultSvgProps}
				disabled={!isWrapEnabled}
				disabledPathStyle='slashed'
			/>
		</ActionButton>
	);
}

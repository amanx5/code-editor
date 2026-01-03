import { useContext, useState, useCallback } from 'react';
import { ClipboardSvg } from '../../svg/ClipboardSvg';
import { copyToClipboard } from '../../body/input-layer/utils/internals/clipboard';
import { ToolDefaultSvgProps, ToolWrapper } from './ToolWrapper';
import {  RootContext } from '../../../contexts';

export function ContentCopyTool() {
	const { internalContent } = useContext(RootContext);


	const [isCopied, setIsCopied] = useState(false);
	const readerText = 'Copy code to clipboard';
	const hoverText = isCopied ? 'Code copied' : 'Copy code';

	const copyCode = useCallback(async () => {
		await copyToClipboard(internalContent);
		setIsCopied(true);

		const timeout = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		return () => clearTimeout(timeout);
	}, [internalContent, isCopied]);

	return (
		<>
			<ToolWrapper
				aria-label={readerText}
				disabled={isCopied}
				onClick={copyCode}
				title={hoverText}
				type='button'
			>
				<ClipboardSvg
					checked={isCopied}
					{...ToolDefaultSvgProps}
				/>
			</ToolWrapper>

			<span role='status' aria-live='polite' className='sr-only'>
				{!isCopied ? readerText : ''}
			</span>
		</>
	);
}

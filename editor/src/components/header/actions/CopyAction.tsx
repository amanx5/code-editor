import { useContext, useState, useCallback } from 'react';
import { CodeEditorContext } from '../../../CodeEditor';
import { ClipboardSvg } from '../../svg/ClipboardSvg';
import { copyToClipboard } from '../../body/editor/utils/internals/clipboard';
import { ActionButton, ActionButtonDefaultSvgProps } from './ActionButton';

export function CopyAction() {
	const { code } = useContext(CodeEditorContext);

	const [isCopied, setIsCopied] = useState(false);
	const readerText = 'Copy code to clipboard';
	const hoverText = isCopied ? 'Code copied' : 'Copy code';

	const copyCode = useCallback(async () => {
		await copyToClipboard(code);
		setIsCopied(true);

		const timeout = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		return () => clearTimeout(timeout);
	}, [code, isCopied]);

	return (
		<>
			<ActionButton
				aria-label={readerText}
				disabled={isCopied}
				onClick={copyCode}
				title={hoverText}
				type='button'
			>
				<ClipboardSvg
					checked={isCopied}
					{...ActionButtonDefaultSvgProps}
				/>
			</ActionButton>

			<span role='status' aria-live='polite' className='sr-only'>
				{!isCopied ? readerText : ''}
			</span>
		</>
	);
}

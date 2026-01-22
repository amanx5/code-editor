import { useContext, useState } from 'react';
import { ClipboardSvg } from '../../svg/ClipboardSvg';
import { ToolDefaultSvgProps, ToolButton } from './ToolButton';
import { EditorDocumentContext } from '../../../contexts';

export function ContentCopyTool() {
	const [isCopied, setIsCopied] = useState(false);
	const document = useContext(EditorDocumentContext);

	const copyCode = async () => {
		await copyToClipboard(document ? document.content : '');
		setIsCopied(true);

		const timeout = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		return () => clearTimeout(timeout);
	};

	const readerText = 'Copy code to clipboard';
	const hoverText = isCopied ? 'Code copied' : 'Copy code';

	return (
		<>
			<ToolButton
				aria-label={readerText}
				disabled={isCopied}
				onClick={copyCode}
				title={hoverText}
				type='button'
			>
				<ClipboardSvg checked={isCopied} {...ToolDefaultSvgProps} />
			</ToolButton>

			<span role='status' aria-live='polite' className='sr-only'>
				{!isCopied ? readerText : ''}
			</span>
		</>
	);
}

export async function copyToClipboard(text: string) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
	} else {
		writeTextFallback(text);
	}
}

/**
 * Fallbsck for `clipboard.writeText`.
 *
 * This is added because native `clipboard.writeText` requires a secure context like https://example.com or http://localhost
 * It is not available in http://example.com  or http://192.168.x.x.
 *
 * WARNING: It's functionality is not thoroughly tested
 */
export function writeTextFallback(text: string) {
	const ta = document.createElement('textarea');
	ta.value = text;
	ta.style.position = 'fixed';
	ta.style.opacity = '0';
	document.body.appendChild(ta);
	ta.focus();
	ta.select();
	document.execCommand('copy');
	document.body.removeChild(ta);
}

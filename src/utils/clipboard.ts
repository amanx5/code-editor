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

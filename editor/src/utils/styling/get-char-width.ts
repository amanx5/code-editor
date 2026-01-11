let measureCanvas: HTMLCanvasElement | null = null;

export function getCharWidth(preEl: HTMLElement, ch = 'M'): number {
	const style = getComputedStyle(preEl);

	const font = [
		style.fontStyle,
		style.fontVariant,
		style.fontWeight,
		style.fontSize,
		style.fontFamily,
	].join(' ');

	if (!measureCanvas) {
		measureCanvas = document.createElement('canvas');
	}

	const ctx = measureCanvas.getContext('2d');
	if (!ctx) return parseFloat(style.fontSize) * 0.6;

	ctx.font = font;

	let width = ctx.measureText(ch).width;

	const letterSpacing = parseFloat(style.letterSpacing);
	if (!Number.isNaN(letterSpacing)) {
		width += letterSpacing;
	}

	return width;
}

let measureCanvas: HTMLCanvasElement | null = null;

export function getCharWidth(el: HTMLElement, char = 'M'): number {
	measureCanvas = measureCanvas ?? document.createElement('canvas');

	const style = getComputedStyle(el);
	const context = measureCanvas.getContext('2d');

	if (context) {
		context.font = [
			style.fontStyle,
			style.fontVariant,
			style.fontWeight,
			style.fontSize,
			style.fontFamily,
		].join(' ');

		let width = context.measureText(char).width;
		const letterSpacing = parseFloat(style.letterSpacing);

		if (!Number.isNaN(letterSpacing)) {
			width += letterSpacing;
		}

		return width;
	} else {
		return parseFloat(style.fontSize) * 0.6;
	}
}

let canvasEl = window.document.createElement('canvas');

export type MarkupMetrics = {
	column: {
		letterSpacing: CSSStyleDeclaration['letterSpacing']; // "normal" | "<length>" | "<global-value>"
		width: TextMetrics['width'];
	};
	line: {
		paddingLeft: CSSStyleDeclaration['paddingLeft']; // "<length>" | "<percentage>" | "<global-value>"
	};
};

export function calculateMarkupMetrics(styles: CSSStyleDeclaration): MarkupMetrics {
	const { paddingLeft, font, letterSpacing } = styles;

	const columnMeasurementContext2d = canvasEl.getContext('2d');
	if (!columnMeasurementContext2d) {
		throw new Error('CodeEditor: Error calculating column metrics.');
	}

	columnMeasurementContext2d.font = font; // TODO: Issue: font styles of token children can be different from font styles of the line element.
	const { width } = columnMeasurementContext2d.measureText('M'); // TODO: Issue: Emojis don't acquire same space as characters

	return {
		line: {
			paddingLeft,
		},
		column: {
			width,
			letterSpacing,
		},
	};
}

import type { MarkupApi } from '..';

let canvasEl = window.document.createElement('canvas');
let lastCheckedFont: CSSStyleDeclaration['font'] | null = null;

export type MarkupMetrics = {
	column: {
		letterSpacing: CSSStyleDeclaration['letterSpacing']; // "normal" | "<length>" | "<global-value>"
		width: TextMetrics['width'];
	};
	line: {
		paddingLeft: CSSStyleDeclaration['paddingLeft']; // "<length>" | "<percentage>" | "<global-value>"
	};
};

export function updateMarkupMetrics(markupApi: MarkupApi) {
	const lineEl = markupApi.getLineEl();
	if (!lineEl) return;

	const lineStyle = getComputedStyle(lineEl);

	// set metrics based on current font
	markupApi.markupMetricsRef.current = calculateMetrics(lineStyle);

	// optimisation
	if (lastCheckedFont === lineStyle.font) return;

	lastCheckedFont = lineStyle.font;

	// when the font is loaded, re-calculate metrics
	// TODO: Implement mechanism to detect whether the recalculation is needed (as maybe the
	// font has been loaded already)
	// NOTE: FontFaceSet.load itself doesn't load any font, it just returns a promise that
	// resolves when all the fonts provided in parameters are loaded
	window.document.fonts.load(lineStyle.font).then(() => {
		// lineEl from closure might be stale (if the markup has been re-rendered)
		const lineEl2 = markupApi.getLineEl();
		if (!lineEl2) return;

		const lineStyle2 = getComputedStyle(lineEl2);

		// set metrics based on loaded font
		markupApi.markupMetricsRef.current = calculateMetrics(lineStyle2);
	});
}

function calculateMetrics(styles: CSSStyleDeclaration): MarkupMetrics {
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

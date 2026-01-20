import type { CursorPosition } from "../../hooks";

export enum PositionComparison {
    LESSER = -1,
    EQUAL = 0,
    GREATER = 1,
}

export function comparePositions(
	a: CursorPosition,
	b: CursorPosition,
): PositionComparison {
	const { lineNumber: ln1, lineColumn: lc1 } = a;
	const { lineNumber: ln2, lineColumn: lc2 } = b;

	if (ln1 !== ln2) {
		return ln1 > ln2
			? PositionComparison.GREATER
			: PositionComparison.LESSER;
	}

	if (lc1 !== lc2) {
		return lc1 > lc2
			? PositionComparison.GREATER
			: PositionComparison.LESSER;
	}

	return PositionComparison.EQUAL;
}

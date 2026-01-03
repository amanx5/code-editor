export function range(start: number, end: number): number[] {
	if (!Number.isInteger(start) || !Number.isInteger(end)) {
		throw new Error('start and end must be integers');
	}

	const step = start <= end ? 1 : -1;
	const length = Math.abs(end - start) + 1;

	return Array.from({ length }, (_, i) => start + i * step);
}

export function shuffle<T>(arr: T[]) {
	return [...arr].sort(() => Math.random() - 0.5);
}

export function range(start: number, end: number): number[] {
	if (!Number.isInteger(start) || !Number.isInteger(end)) {
		throw new Error('start and end must be integers');
	}

	const step = start <= end ? 1 : -1;
	const length = Math.abs(end - start) + 1;

	return Array.from({ length }, (_, i) => start + i * step);
}

function shuffle<T>(arr: T[]) {
	return [...arr].sort(() => Math.random() - 0.5);
}

export function getSampleLines(
	count: number,
	minWordCount: number = 0,
	maxWordCount: number = 10
) {
	const line =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia accusamus, reprehenderit, nobis itaque dolorem fugit ipsa vel minima natus enim quis nesciunt. Fugiat, sed? Iure ex quam suscipit est temporibus?';

	const words = line.split(' ');

	return range(1, count)
		.map(() =>
			shuffle(words)
				.slice(
					0,
					Math.min(
						Math.floor(
							Math.random() * (maxWordCount - minWordCount + 1)
						) + minWordCount,
						words.length
					)
				)
				.join(' ')
		)
		.join('\n');
}

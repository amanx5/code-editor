import type { TokenMeta } from '../../..';

export function MarkupToken({ tokenMeta }: { tokenMeta: TokenMeta }) {
	return <span className={tokenMeta.cls}>{tokenMeta.value}</span>;
}

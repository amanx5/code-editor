import { memo } from 'react';
import { comparePropsByValue, type TokenMeta } from '../../..';

export const MarkupTokenMemo = memo(MarkupToken, comparePropsByValue);

export function MarkupToken({
	cls,
	value,
}: {
	cls: TokenMeta['cls'];
	value: TokenMeta['value'];
}) {
	return <span className={cls}>{value}</span>;
}

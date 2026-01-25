import { memo } from 'react';
import { arePropValuesEqual, type TokenMeta } from '../../..';

export const MarkupTokenMemo = memo(MarkupToken, arePropValuesEqual);

export function MarkupToken({
	cls,
	value,
}: {
	cls: TokenMeta['cls'];
	value: TokenMeta['value'];
}) {
	return <span className={cls}>{value}</span>;
}

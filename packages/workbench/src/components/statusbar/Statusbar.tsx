import { memo } from 'react';
import { cls } from 'code-editor';
import { CursorStatus } from './statuses';

export const Statusbar = memo(function Statusbar() {
	return (
		<div
			className={cls(
				'border-t border-t-cwPanel',
				'flex items-stretch justify-end',
				'h-6 max-h-6',
			)}
		>
			<CursorStatus />
		</div>
	);
});

import { memo } from 'react';
import { cls } from 'code-editor/utils';
import { CursorStatus } from './statuses';

export const Statusbar = memo(function Statusbar() {
	return (
		<div
			className={cls(
				'border-t border-t-cePanel',
				'flex items-stretch justify-end',
				'h-6 max-h-6',
			)}
		>
            <CursorStatus />
		</div>
	);
});

import { memo } from 'react';
import { cls } from '../../utils';
import { CursorStatus } from './statuses';

export const Statusbar = memo(function Statusbar() {
	return (
		<div
			className={cls(
				'bg-ce-bg-toolbar  border-t border-t-ce-border-subtle',
				'flex items-center justify-end',
				'h-8 max-h-8',
				'px-6'
			)}
		>
            <CursorStatus />
		</div>
	);
});

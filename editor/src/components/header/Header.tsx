import { cls } from '../../utils';
import { CopyAction, WrapAction } from './actions';
import { FileInfo } from './FileInfo';

export function Header() {
	return (
		<div
			className={cls(
				'bg-ce-bg-header border-b border-b-ce-border-subtle',
				'flex justify-between',
				'h-12 max-h-12',
				'p-3'
			)}
		>
			<div>
				<FileInfo />
			</div>

			<div className='flex h-full items-center gap-4'>
				<WrapAction />
				<CopyAction />
			</div>
		</div>
	);
}

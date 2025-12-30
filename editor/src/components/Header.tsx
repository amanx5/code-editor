import { cls } from '../utils/cls';
import { CopyAction } from './header/CopyAction';
import { Title } from './header/Title';
import { WrapAction } from './header/WrapAction';

export function Header() {
	return (
		<div
			className={cls(
				'border-b border-b-outline-subtle',
				'flex justify-between',
				'h-12 max-h-12',
				'p-3'
			)}
		>
			<div>
				<Title />
			</div>

			<div className='flex h-full items-center gap-4'>
				<WrapAction />
				<CopyAction />
			</div>
		</div>
	);
}

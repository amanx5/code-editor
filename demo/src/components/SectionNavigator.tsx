import { cls } from 'code-editor/utils';
import { pxToNum, TW_CONFIG } from '../utils/styling';

type SectionNavigatorProps = {
	sections: Array<{
		id: string;
		title: string;
	}>;
};
export function SectionNavigator({ sections }: SectionNavigatorProps) {
	return (
		<>
			<nav
				className={cls(
					'bg-white border-b border-outline-subtle ',
					'w-full top-belowHeader sticky ',
					'lg:w-56 lg:min-w-56 lg:order-2 lg:self-stretch lg:border-b-0 lg:border-l z-50'
				)}
			>
				<div className='p-4 sticky top-belowHeader'>
					<h3 className='mb-4 text-xs text-text-muted '>
						On This Page
					</h3>

					<ul className='flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible'>
						{sections.map(({ id, title }) => (
							<li key={id} className='shrink-0 lg:shrink'>
								<button
									onClick={() => scrollToId(id)}
									className={cls(
										'block py-1 px-2',
										'text-xs text-text-muted hover:text-text-primary',
										'transition-colors rounded hover:bg-surface-hover',
										'whitespace-nowrap lg:whitespace-normal'
									)}
								>
									{title}
								</button>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</>
	);
}

function scrollToId(id: string) {
	const el = document.getElementById(id);
	if (!el) return;

	const offset =
		pxToNum(TW_CONFIG.height.header) + pxToNum(TW_CONFIG.spacing.pageY);
	const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

	window.scrollTo({
		top: y,
		behavior: 'smooth',
	});
}

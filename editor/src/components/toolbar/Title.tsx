import { cls, getLanguageName } from '../../utils';
import { useDocument } from '../../hooks';

export function Title() {
	const { language, name } = useDocument();
	const title = name ? name + '.' + language : getLanguageName(language);

	return (
		<div
			className={cls(
				'flex items-center pl-2',
				'text-ceToolbarItem-normal',
				'text-sm'
			)}
		>
			{title}
		</div>
	);
}

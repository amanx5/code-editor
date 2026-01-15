import { EditorDocumentContext } from '../../contexts';
import { useContext } from 'react';
import { cls, getLanguageName } from '../../utils';

export function Title() {
	const { name, language } = useContext(EditorDocumentContext);
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

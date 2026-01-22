import { cls, getLanguageName } from 'code-editor/utils';
import { useEditorDocument } from '../../hooks';

export function Title() {
	const document = useEditorDocument();

	if (!document) {
		return null;
	}

	const { name, language } = document;
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

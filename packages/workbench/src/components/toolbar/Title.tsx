import { cls, LANGUAGE_NAMES, useEditorApi } from 'code-editor';

export function Title() {
	const { markup } = useEditorApi();
	if (!markup.commit) {
		return null;
	}

	const { document } = markup.commit;
	const { name, language } = document;
	const title = name ? name + '.' + language : LANGUAGE_NAMES[language];

	return (
		<div
			className={cls(
				'flex items-center pl-2',
				'text-cwToolbarItem-normal',
				'text-sm',
			)}
		>
			{title}
		</div>
	);
}

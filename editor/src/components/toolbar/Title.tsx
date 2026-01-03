import { CODE_LANGUAGES } from '../../utils';
import { EditorDocumentContext } from '../../contexts';
import { useContext } from 'react';

export function Title() {
	const { name, language } = useContext(EditorDocumentContext);
	const { name: languageName } = CODE_LANGUAGES[language];
	const title = name ? name + '.' + language : languageName;

	return <div className='flex items-center'>{title}</div>;
}

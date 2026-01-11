import { EditorDocumentContext } from '../../contexts';
import { useContext } from 'react';
import { getLanguageName } from '../../utils';

export function Title() {
	const { name, language } = useContext(EditorDocumentContext);
	const title = name ? name + '.' + language : getLanguageName(language);

	return <div className='flex items-center'>{title}</div>;
}

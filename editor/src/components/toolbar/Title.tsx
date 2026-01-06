import { EditorDocumentContext } from '../../contexts';
import { useContext } from 'react';

export function Title() {
	const { name, language } = useContext(EditorDocumentContext);
	const extension = '.' + language;
	const title = name ? name + extension : extension.toUpperCase();

	return <div className='flex items-center'>{title}</div>;
}

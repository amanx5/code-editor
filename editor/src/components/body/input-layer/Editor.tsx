import { useContext, useCallback } from 'react';
import { getEventHandlers } from './utils';
import { cls, validateContent } from '../../../utils';
import {
	EditorDocumentContext,
	EditorOptionsContext,
	RootContext,
} from '../../../contexts';
import { useEditorRenderer } from './hooks';

export type EditorElement = HTMLPreElement;

export function Editor({}: {}) {
	const document = useContext(EditorDocumentContext);
	const editorOptions = useContext(EditorOptionsContext);
	const { onChange } = useContext(RootContext);
	const { editorRef, getCurrentContent, setEditorMarkup } = useEditorRenderer(document);

	const changeCallback = useCallback(() => {
		const currentContent = getCurrentContent();
		const updatedError = validateContent(currentContent, document.language);

		onChange?.(currentContent, updatedError);
	}, [getCurrentContent]);

	return (
		<pre
			className={cls(
				'ce-content inline-block',
				'flex-1 h-max',
				'focus:outline-none',
				editorOptions.hideLineNumbers && 'ce-content-pd',
				'z-10'
			)}
			contentEditable={!editorOptions.disabled}
			ref={editorRef}
			spellCheck={false}
			{...getEventHandlers(changeCallback, getCurrentContent, setEditorMarkup)}
		/>
	);
}

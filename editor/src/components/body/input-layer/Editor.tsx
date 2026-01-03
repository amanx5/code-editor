import { useContext, useCallback } from 'react';
import { getEventHandlers, convertToSourceCode } from './utils';
import { useEditor } from './hooks/useEditor';
import { cls } from '../../../utils';
import { EditorOptionsContext, RootContext, type Content } from '../../../contexts';

export type EditorElement = HTMLPreElement;

export function Editor({
	hideLineNumbers,
	content,
	setContent,
}: {
	hideLineNumbers: boolean;
	content: Content;
	setContent: React.Dispatch<React.SetStateAction<Content>>;
}) {
	const { isWrapEnabled } = useContext(RootContext);
	const editorOptions = useContext(EditorOptionsContext);

	const { editorRef, getEditorContent } = useEditor(content);

	const domChangeCallback = useCallback(() => {
		const sourceCode = convertToSourceCode(getEditorContent());
		setContent(sourceCode);
	}, [setContent, getEditorContent]);

	return (
		<pre
			className={cls(
				'ce-content inline-block',
				'flex-1 h-max',
				'text-transparent/20 caret-black focus:outline-none',
				hideLineNumbers && 'ce-content-pd',
				isWrapEnabled && 'ce-content-wrap',
				'z-10'
			)}
			contentEditable={!editorOptions.disabled}
			ref={editorRef}
			spellCheck={false}
			{...getEventHandlers(domChangeCallback)}
		/>
	);
}

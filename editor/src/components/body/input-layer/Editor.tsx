import { useContext, useCallback } from 'react';
import { getEventHandlers, convertToInternalContent } from './utils';
import { useEditor } from './hooks/useEditor';
import { cls } from '../../../utils';
import {
	EditorOptionsContext,
	RootContext,
	type Content,
} from '../../../contexts';

export type EditorElement = HTMLPreElement;

export function Editor({
	hideLineNumbers,
	internalContent,
	setInternalContent,
}: {
	hideLineNumbers: boolean;
	internalContent: Content;
	setInternalContent: React.Dispatch<React.SetStateAction<Content>>;
}) {
	const { isWrapEnabled } = useContext(RootContext);
	const editorOptions = useContext(EditorOptionsContext);

	const { editorRef, getEditorContent } = useEditor(internalContent);

	const domChangeCallback = useCallback(() => {
		const sourceCode = convertToInternalContent(getEditorContent());
		setInternalContent(sourceCode);
	}, [getEditorContent, setInternalContent]);

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

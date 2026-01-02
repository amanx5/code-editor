import { useContext, useCallback } from 'react';
import { CodeEditorContext } from '../../../CodeEditor';
import { getEventHandlers, convertToSourceCode } from './utils';
import { useEditor } from './hooks/useEditor';
import { cls, validateCode } from '../../../utils';

export type EditorElement = HTMLPreElement;

export function Editor() {
	const { code, isWrapEnabled, codeLang, setCode, setCodeError } =
		useContext(CodeEditorContext);
	const { editorRef, getEditorContent } = useEditor(code);

	const onEditorContentChange = useCallback(() => {
		const sourceCode = convertToSourceCode(getEditorContent());
		setCode?.(sourceCode);
		setCodeError?.(validateCode(sourceCode, codeLang));
	}, [setCode, setCodeError, getEditorContent]);

	return (
		<pre
			className={cls(
				'ce-content inline-block',
				'flex-1 h-max',
				'text-transparent/20 caret-black focus:outline-none',
				isWrapEnabled && 'ce-content-wrap',
				'z-10'
			)}
			contentEditable={!!setCode}
			ref={editorRef}
			spellCheck={false}
			{...getEventHandlers(onEditorContentChange)}
		/>
	);
}

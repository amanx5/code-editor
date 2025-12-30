import { useContext, useCallback } from 'react';
import { CodeEditorContext } from '../../CodeEditor';
import { validateCode } from '../../utils/codeLanguageUtil';
import { convertToSourceCode } from '../../utils/virtualLinesUtil';
import { onKeyDown } from '../../utils/eventHandling/keyboardEvent';
import { onPaste } from '../../utils/eventHandling/clipboardEvent';
import { useEditor } from '../../hooks/useEditor';
import { cls } from '../../utils/cls';

export function Editor({ lineCls }: { lineCls: string }) {
	const { code, codeLang, isWrapEnabled, setCode, setCodeError } =
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
				lineCls,
				isWrapEnabled && 'pl-12',
				'text-transparent/20 caret-black focus:outline-none'
			)}
			contentEditable={!!setCode}
			onKeyDown={(e) => onKeyDown(e, onEditorContentChange)}
			onPaste={(e) => onPaste(e, onEditorContentChange)}
			ref={editorRef}
			spellCheck={false}
		/>
	);
}

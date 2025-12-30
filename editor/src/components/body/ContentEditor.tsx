import { useContext, useCallback } from 'react';
import { CodeEditorContext } from '../../CodeEditor';
import { validateCode } from '../../utils/codeLanguageUtil';
import { convertToSourceCode } from '../../utils/virtualLinesUtil';
import { onKeyDown } from '../../utils/eventHandling/keyboardEvent';
import { onPaste } from '../../utils/eventHandling/clipboardEvent';
import { useContentEditor } from '../../hooks/useContentEditor';
import { cls } from '../../utils/cls';

export function ContentEditor({ lineCls }: { lineCls: string }) {
	const { code, codeLang, isWrapEnabled, setCode, setCodeError } =
		useContext(CodeEditorContext);
	const { contentEditorRef, getEditorContent } = useContentEditor(code);

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
			ref={contentEditorRef}
			spellCheck={false}
		/>
	);
}

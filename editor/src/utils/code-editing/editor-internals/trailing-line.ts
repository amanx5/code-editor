import type { Code } from '../../../CodeEditor';

/**
 * V8 browsers doesn't render a newline if there is no text after it.
 * TRAILING_LINE ensures there is always text ("\n") at the end of the code. So that
 * if the user presses Enter(↵) at the end of the code, browser is forced to render
 * a newline.
 *
 * TRAILING_LINE is deliberately kept as "\n" as browsers also usually ignore the
 * last '\n' on arrow keys and text selection. So, this ensures that cursor
 * doesn't move if the user presses → or ↓ key before the TRAILING_LINE.
 */
export const TRAILING_LINE = '\n';

export function convertToEditorContent(sourceCode: Code = ''): Code {
	return sourceCode + TRAILING_LINE;
}

export function convertToSourceCode(editorCode: Code = ''): Code {
	return editorCode.slice(0, -TRAILING_LINE.length);
}

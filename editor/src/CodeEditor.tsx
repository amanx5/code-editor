import { useEffect, useState } from 'react';
import { Root, Body, Toolbar, type ToolbarOptions, ToolbarOptionsDefault } from './components';
import {
	type Content,
	type EditorDocument,
	type EditorOptions,
	EditorDocumentContext,
	EditorOptionsContext,
	EditorOptionsDefault,
	RootContext,
} from './contexts';
import { isPlainObject, validateCode, type CodeError } from './utils/';


export type CodeEditorProps = {
	document: EditorDocument;
	editor?: EditorOptions;
	toolbar?: ToolbarOptions;
	onChange?: (content: Content, error: CodeError) => void;
};

/**
 * Code Editor component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function CodeEditor({
	document,
	editor = EditorOptionsDefault,
	toolbar = ToolbarOptionsDefault,
	onChange,
}: CodeEditorProps) {
	const [isWrapEnabled, setIsWrapEnabled] = useState(
		isPlainObject(toolbar) ? !!toolbar.showWrapTool : false
	);

	// TODO: use ref instead of state, currently virtual lines are dependent on this state, 
	// better approach is to mutate syntax layer automatically on content change and add a cursor layer
	// instead of double content layers
	const [content, setContent] = useState<Content>(document.content);
	const [error, setError] = useState<CodeError>(null);

	useEffect(()=>{
		const error = validateCode(content, document.language)
		setError(error);
		onChange?.(content, error);
	}, [content, document.language])

	return (
		<EditorDocumentContext.Provider value={document}>
			<EditorOptionsContext.Provider value={editor}>
				<RootContext.Provider
					value={{ 
						isWrapEnabled, 
						setIsWrapEnabled, 
						content,
						setContent,
						error,
						setError,
					}}
				>
					<Root>
						<Toolbar options={toolbar} />
						<Body />
					</Root>
				</RootContext.Provider>
			</EditorOptionsContext.Provider>
		</EditorDocumentContext.Provider>
	);
}

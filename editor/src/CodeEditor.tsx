import { useState } from 'react';
import {
	Root,
	Body,
	Toolbar,
	type ToolbarOptions,
	ToolbarOptionsDefault,
} from './components';
import {
	type EditorDocument,
	type EditorOptions,
	EditorDocumentContext,
	EditorOptionsContext,
	EditorOptionsDefault,
	RootContext,
} from './contexts';
import { isPlainObject, type Content, type EditorError } from './utils/';

export type CodeEditorProps = {
	document: EditorDocument;
	editor?: EditorOptions;
	toolbar?: ToolbarOptions;
	onChange?: (content: Content, error: EditorError) => void;
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
	const [error, setError] = useState<EditorError>(null);

	const [isWrapEnabled, setIsWrapEnabled] = useState(
		isPlainObject(toolbar) ? !!toolbar.showWrapTool : false
	);

	const rootContextValue = {
		error,
		isWrapEnabled,
		setIsWrapEnabled,
		setError,
		onChange,
	};

	return (
		<EditorDocumentContext.Provider value={document}>
			<EditorOptionsContext.Provider value={editor}>
				<RootContext.Provider value={rootContextValue}>
					<Root>
						<Toolbar options={toolbar} />
						<Body />
					</Root>
				</RootContext.Provider>
			</EditorOptionsContext.Provider>
		</EditorDocumentContext.Provider>
	);
}

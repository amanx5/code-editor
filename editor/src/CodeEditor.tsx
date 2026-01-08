import { useState } from 'react';
import {
	type EditorOptions,
	type ToolbarOptions,
	Body,
	CursorLayer,
	MarkupLayer,
	Root,
	Toolbar,
	ToolbarOptionsDefault,
	EditorOptionsDefault,
} from './components';
import {
	type EditorDocument,
	EditorDocumentContext,
	EditorStatesContext,
} from './contexts';

import { isPlainObject, type EditorError } from './utils';
import { ToolbarStatesContext } from './contexts/ToolbarStatesContext';
import { useCursorApi } from './hooks/useCursorApi';
import { useMarkupApi, type Listeners } from './hooks';


export type CodeEditorProps = {
	document: EditorDocument;
	editorOptions?: EditorOptions;
	listeners?: Listeners;
	toolbarOptions?: ToolbarOptions;
};

/**
 * Code Editor component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function CodeEditor({
	document,
	editorOptions = EditorOptionsDefault,
	listeners,
	toolbarOptions = ToolbarOptionsDefault,
}: CodeEditorProps) {
	const [error, setError] = useState<EditorError>(null);
	const [isWrapEnabled, setIsWrapEnabled] = useState(
		isPlainObject(toolbarOptions) ? !!toolbarOptions.showWrapTool : false
	);
	const [isFormatEnabled, setIsFormatEnabled] = useState(
		isPlainObject(toolbarOptions) ? !!toolbarOptions.showFormatTool : false
	);

	const toolbarStates = {
		isWrapEnabled,
		isFormatEnabled,
		setIsWrapEnabled,
		setIsFormatEnabled,
	};
	const editorStates = {
		error,
		setError,
	};

	const markupOptions = {
		...editorOptions,
		isWrapEnabled,
		isFormatEnabled,
	};

	const cursorApi = useCursorApi();

	const markupApi = useMarkupApi(document, markupOptions, listeners);

	return (
		<EditorDocumentContext.Provider value={document}>
			<EditorStatesContext.Provider value={editorStates}>
				<ToolbarStatesContext.Provider value={toolbarStates}>
					<Root>
						<Toolbar options={toolbarOptions} />
						<Body>
							<MarkupLayer
								cursorApi={cursorApi}
								markupApi={markupApi}
								editorOptions={editorOptions}
							/>
							<CursorLayer cursorApi={cursorApi} />
						</Body>
					</Root>
				</ToolbarStatesContext.Provider>
			</EditorStatesContext.Provider>
		</EditorDocumentContext.Provider>
	);
}

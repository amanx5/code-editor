import { useState } from 'react';
import {
	type MarkupOptions,
	type ToolbarOptions,
	Body,
	CursorLayer,
	MarkupLayer,
	Root,
	Toolbar,
	ToolbarOptionsDefault,
	MarkupOptionsDefault,
} from './components';
import {
	type EditorDocument,
	EditorDocumentContext,
	EditorStatesContext,
} from './contexts';

import { type Content, type EditorError } from './utils';
import {
	ToolbarStatesContext,
	ToolbarStatesDefault,
} from './contexts/ToolbarStatesContext';
import { useCursorApi } from './hooks/useCursorApi';
import { useMarkupApi, type RenderOptions } from './hooks';

export type Listeners = {
	onChange?: (content: Content) => void;
	onError?: (error: EditorError) => void;
};

export type CodeEditorProps = {
	document: EditorDocument;
	listeners?: Listeners;
	markupOptions?: MarkupOptions;
	toolbarOptions?: ToolbarOptions;
};

/**
 * Code Editor component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function CodeEditor({
	document,
	listeners,
	markupOptions = MarkupOptionsDefault,
	toolbarOptions = ToolbarOptionsDefault,
}: CodeEditorProps) {
	const [error, setError] = useState<EditorError>(null);
	const [isWrapEnabled, setIsWrapEnabled] = useState(
		ToolbarStatesDefault.isWrapEnabled
	);
	const [isFormatEnabled, setIsFormatEnabled] = useState(
		ToolbarStatesDefault.isFormatEnabled
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

	const renderOptions: RenderOptions = {
		...markupOptions,
		isWrapEnabled,
		isFormatEnabled,
	};

	const markupApi = useMarkupApi(document, renderOptions, listeners);

	const cursorApi = useCursorApi(markupApi);

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
							/>
							<CursorLayer cursorApi={cursorApi} />
						</Body>
					</Root>
				</ToolbarStatesContext.Provider>
			</EditorStatesContext.Provider>
		</EditorDocumentContext.Provider>
	);
}

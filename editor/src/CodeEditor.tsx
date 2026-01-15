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
import { type EditorDocument, EditorDocumentContext } from './contexts';
import { type Content, type EditorError } from './utils';
import {
	ToolbarStatesContext,
	ToolbarStatesDefault,
} from './contexts/ToolbarStatesContext';
import { useCursorApi, useMarkupApi, type RenderOptions } from './hooks';

export type EditorListeners = {
	onChange?: (content: Content) => void;
	onError?: (error: EditorError) => void;
};

export type CodeEditorProps = {
	document: EditorDocument;
	listeners?: EditorListeners;
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

	const renderOptions: RenderOptions = {
		...markupOptions,
		isWrapEnabled,
		isFormatEnabled,
	};

	const markupApi = useMarkupApi(document, renderOptions, listeners);

	const cursorApi = useCursorApi(markupApi);

	return (
		<EditorDocumentContext.Provider value={document}>
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
		</EditorDocumentContext.Provider>
	);
}

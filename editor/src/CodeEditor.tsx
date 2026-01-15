import { useMemo, useState } from 'react';
import {
	type MarkupOptions,
	type ToolbarOptions,
	Body,
	CursorLayer,
	MarkupLayer,
	Root,
	Statusbar,
	Toolbar,
	ToolbarOptionsDefault,
	MarkupOptionsDefault,
} from './components';
import {
	EditorApiContext,
	type EditorDocument,
	EditorDocumentContext,
} from './contexts';
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
	markupOptions = {},
	toolbarOptions = {},
}: CodeEditorProps) {
	markupOptions = applyDefaults(markupOptions, MarkupOptionsDefault);
	toolbarOptions = applyDefaults(toolbarOptions, ToolbarOptionsDefault);

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

	const apiContextValue = useMemo(
		() => ({
			cursorApi,
			markupApi,
		}),
		[cursorApi, markupApi]
	);

	return (
		<EditorApiContext.Provider value={apiContextValue}>
			<EditorDocumentContext.Provider value={document}>
				<ToolbarStatesContext.Provider value={toolbarStates}>
					<Root>
						<Toolbar options={toolbarOptions} />

						<Body>
							<MarkupLayer />
							<CursorLayer />
						</Body>

						<Statusbar />
					</Root>
				</ToolbarStatesContext.Provider>
			</EditorDocumentContext.Provider>
		</EditorApiContext.Provider>
	);
}

export function applyDefaults<T>(overrides: Partial<T>, defaults: T): T {
	return {
		...defaults,
		...overrides,
	};
}

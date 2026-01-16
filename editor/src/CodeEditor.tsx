import { useMemo } from 'react';
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
	useCursorApi,
	useMarkupApi,
	useToolbarStates,
	type RenderOptions,
} from './hooks';

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

	const toolbarStates = useToolbarStates();
	const { isWrapEnabled, isFormatEnabled } = toolbarStates;

	const renderOptions: RenderOptions = {
		isWrapEnabled,
		isFormatEnabled,
		...markupOptions,
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
				<Root>
					<Toolbar options={toolbarOptions} states={toolbarStates} />

					<Body>
						<MarkupLayer />
						<CursorLayer />
					</Body>

					<Statusbar />
				</Root>
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

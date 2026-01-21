import { Scroller } from './components';
import { EditorApiContext } from './contexts';
import { type Content, type EditorError, type Language } from './utils';
import { useEditorApiSetup, type EditorApi, type LineNumber } from './hooks';
import {
	Cursor,
	CursorLayer,
	MarkupLayer,
	SelectionLayer,
} from './components/layers';

export type EditorDocument = {
	content: Content;
	language: Language;
	name?: string;
};

export type EditorListeners = {
	apiChange?: (editorApi: EditorApi) => void;
	documentChange?: (document: EditorDocument, error: EditorError) => void;
};

export type EditorOptions = {
	disabled?: boolean;
	highlightLines?: LineNumber[];
	hideLineNumbers?: boolean;
};

export const EditorOptionsDefault: EditorOptions = {
	disabled: false,
	highlightLines: [],
	hideLineNumbers: false,
};

export type EditorProps = {
	document: EditorDocument;
	listeners?: EditorListeners;
	editorOptions?: EditorOptions;
};

/**
 * Code Editor component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function Editor({ document, listeners, editorOptions }: EditorProps) {
	editorOptions = mergeOverrides(EditorOptionsDefault, editorOptions);

	const editorApi = useEditorApiSetup(document, editorOptions, listeners);

	return (
		<EditorApiContext.Provider value={editorApi}>
			<Scroller>
				<SelectionLayer />

				<MarkupLayer />

				<CursorLayer>
					<Cursor />
				</CursorLayer>
			</Scroller>
		</EditorApiContext.Provider>
	);
}

export function mergeOverrides<T>(
	defaults: T,
	overrides: Partial<T> | undefined,
): T {
	return {
		...defaults,
		...overrides,
	};
}

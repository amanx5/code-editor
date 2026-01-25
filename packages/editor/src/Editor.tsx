import {
	Cursor,
	CursorLayer,
	MarkupLayer,
	MarkupLineMemo,
	Scroller,
	SelectionLayer,
} from './components';
import { EditorApiContext } from './contexts';
import { type Content, type EditorError, type Language } from './utils';
import { useEditorApiSetup, type EditorApi, type LineNumber } from './hooks';

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
	const editorApi = useEditorApiSetup(document, editorOptions, listeners);
	const { markup } = editorApi;
	const { commit } = markup;
	const lineMetaArray = commit?.markupMeta ?? [];

	return (
		<EditorApiContext.Provider value={editorApi}>
			{/* TODO: Render the components within a renderer, this will allow consumers to wrap the editor
			in a container of their choice (will also give access to EditorApiContext) */}
			<Scroller>
				<SelectionLayer />

				<MarkupLayer>
					{lineMetaArray.map(({ error, number, tokens }) => (
						<MarkupLineMemo
							key={number}
							number={number}
							error={error}
							tokens={tokens}
							editorOptions={editorOptions}
						/>
					))}
				</MarkupLayer>

				<CursorLayer>
					<Cursor />
				</CursorLayer>
			</Scroller>
		</EditorApiContext.Provider>
	);
}

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
import { MarkupLine } from './components/layers/markup-layer/MarkupLine';
import { MarkupToken } from './components/layers/markup-layer/MarkupToken';

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
	const { markup } = editorApi;
	const { commit } = markup;
	const lineMetaArray = commit?.markupMeta ?? [];

	return (
		<EditorApiContext.Provider value={editorApi}>
			<Scroller>
				<SelectionLayer />

				<MarkupLayer>
					{lineMetaArray.map((lineMeta, index) => (
						<MarkupLine
							key={index}
							lineMeta={lineMeta}
							editorOptions={editorOptions}
						>
							{lineMeta.tokens.map((tokenMeta, index) => (
								<MarkupToken
									key={index}
									tokenMeta={tokenMeta}
								/>
							))}
						</MarkupLine>
					))}
				</MarkupLayer>

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

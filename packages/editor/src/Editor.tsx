import {
	Cursor,
	CursorLayer,
	MarkupLayer,
	MarkupLineMemo,
	EditorRoot,
	SelectionLayer,
} from './components';
import { EditorApiContext } from './contexts';
import { type Content, type DocumentIssues, type Language } from './utils';
import { useEditorApiSetup, type EditorApi, type LineNumber } from './hooks';
import { Fragment, type ReactElement } from 'react';

export type EditorDocument = {
	content: Content;
	language: Language;
	name?: string;
};

export type EditorListeners = {
	apiChange?: (editorApi: EditorApi) => void;
	documentChange?: (document: EditorDocument, documentIssues: DocumentIssues) => void;
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

export type EditorRootWrapper = React.ComponentType<{
	children: ReactElement<typeof EditorRoot>;
}>;

export type EditorProps = {
	document: EditorDocument;
	listeners?: EditorListeners;
	editorOptions?: EditorOptions;
	/**
	 * Custom wrapper component to wrap the `EditorRoot` component.
	 * @default React.Fragment
	 */
	RootWrapper?: EditorRootWrapper;
};

/**
 * Code Editor component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function Editor({
	document,
	listeners,
	editorOptions,
	RootWrapper = Fragment,
}: EditorProps) {
	const editorApi = useEditorApiSetup(document, editorOptions, listeners);
	const { markup } = editorApi;
	const { commit } = markup;
	const lineMetaArray = commit?.markupMeta ?? [];

	return (
		<EditorApiContext.Provider value={editorApi}>
			<RootWrapper>
				<EditorRoot>
					<SelectionLayer />

					<MarkupLayer>
						{lineMetaArray.map(({ issue, number, tokens }) => (
							<MarkupLineMemo
								key={number}
								number={number}
								issue={issue}
								tokens={tokens}
								editorOptions={editorOptions}
							/>
						))}
					</MarkupLayer>

					<CursorLayer>
						<Cursor />
					</CursorLayer>
				</EditorRoot>
			</RootWrapper>
		</EditorApiContext.Provider>
	);
}

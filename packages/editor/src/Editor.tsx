import {
	CursorLayer,
	DecorationLayer,
	EditorRoot,
	MarkupLayer,
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

export const EditorOptionsDefault: Required<EditorOptions> = {
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

	return (
		<EditorApiContext.Provider value={editorApi}>
			<RootWrapper>
				<EditorRoot>
					<DecorationLayer editorOptions={editorOptions} />

					<SelectionLayer />

					<MarkupLayer />

					<CursorLayer />
				</EditorRoot>
			</RootWrapper>
		</EditorApiContext.Provider>
	);
}

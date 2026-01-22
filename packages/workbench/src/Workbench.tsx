import { useState } from 'react';
import {
	type ToolbarOptions,
	Layout,
	Statusbar,
	Toolbar,
	ToolbarOptionsDefault,
} from './components';

import { useToolbarStates } from './hooks';
import {
	mergeOverrides,
	Editor,
	type EditorProps,
	type EditorListeners,
	type EditorDocument,
	EditorApiContext,
} from 'code-editor';
import type { EditorApi } from '../../editor/src/hooks';
import type { EditorError } from 'code-editor';
import { EditorDocumentContext, EditorErrorContext } from './contexts';

export type EditorDataKey = keyof EditorDataClone;
export type EditorDataClone = {
	api: EditorApi | null;
	error: EditorError | null;
	document: EditorDocument | null;
};

export type WorkbenchProps = {
	editorProps: EditorProps;
	toolbarOptions?: ToolbarOptions;
};

/**
 * Code Workbench component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function Workbench({ editorProps, toolbarOptions }: WorkbenchProps) {
	toolbarOptions = mergeOverrides(ToolbarOptionsDefault, toolbarOptions);

	const toolbarStates = useToolbarStates();
	const [editorApi, setEditorApi] = useState<EditorApi | null>(null);
	const [editorDocument, setEditorDocument] = useState<EditorDocument | null>(
		null,
	);
	const [editorError, setEditorError] = useState<EditorError | null>(null);

	const listeners: EditorListeners = {
		...editorProps.listeners,
		apiChange: (api) => {
			setEditorApi(api);
			editorProps.listeners?.apiChange?.(api);
		},
		documentChange: (document, error) => {
			setEditorDocument(document);
			setEditorError(error);
			editorProps.listeners?.documentChange?.(document, error);
		},
	};

	return (
		<EditorApiContext.Provider value={editorApi}>
			<EditorDocumentContext.Provider value={editorDocument}>
				<EditorErrorContext.Provider value={editorError}>
					<Layout>
						<Toolbar
							options={toolbarOptions}
							states={toolbarStates}
						/>

						<Editor {...editorProps} listeners={listeners} />

						<Statusbar />
					</Layout>
				</EditorErrorContext.Provider>
			</EditorDocumentContext.Provider>
		</EditorApiContext.Provider>
	);
}

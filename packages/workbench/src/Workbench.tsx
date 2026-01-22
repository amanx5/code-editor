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
} from 'code-editor';
import { WorkbenchContext } from './contexts/WorkbenchContext';
import type { EditorApi } from '../../editor/src/hooks';

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

	const listeners: EditorListeners = {
		...editorProps.listeners,
		apiChange: (editorApi) => {
			setEditorApi(editorApi);
			editorProps.listeners?.apiChange?.(editorApi);
		},
		documentChange: (document, error) => {
			setEditorDocument(document);
			editorProps.listeners?.documentChange?.(document, error);
		},
	};

	return (
		<WorkbenchContext.Provider value={{ editorApi, editorDocument }}>
			<Layout>
				<Toolbar options={toolbarOptions} states={toolbarStates} />

				<Editor {...editorProps} listeners={listeners} />

				<Statusbar />
			</Layout>
		</WorkbenchContext.Provider>
	);
}

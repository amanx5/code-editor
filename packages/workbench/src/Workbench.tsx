import { useState } from 'react';
import {
	type ToolbarOptions,
	Layout,
	Statusbar,
	Toolbar,
	ToolbarOptionsDefault,
} from './components';

import { useToolbarStates } from './hooks';
import { mergeOverrides, Editor, type EditorProps } from 'code-editor';

export type WorkbenchProps = {
	editorOptions: EditorProps;
	toolbarOptions?: ToolbarOptions;
};

/**
 * Code Workbench component
 *
 * Note: CSS for this component is not included by default. Refer README for CSS installation.
 */
export function Workbench({ editorOptions, toolbarOptions }: WorkbenchProps) {
	const {listeners, ...restEditorOptions} = editorOptions;
	toolbarOptions = mergeOverrides(ToolbarOptionsDefault, toolbarOptions);

	const toolbarStates = useToolbarStates();
	const [document, setDocument] = useState(editorOptions.document);

	const mergedListeners = {
		
	}

	return (
		<Layout>
			<Toolbar options={toolbarOptions} states={toolbarStates} />

			<Editor listeners={{onChange: [...listeners?.onChange, setDocument]}}{...restEditorOptions}  />

			<Statusbar />
		</Layout>
	);
}

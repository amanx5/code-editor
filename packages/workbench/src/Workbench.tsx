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
	toolbarOptions = mergeOverrides(ToolbarOptionsDefault, toolbarOptions);

	const toolbarStates = useToolbarStates();

	return (
		<Layout>
			<Toolbar options={toolbarOptions} states={toolbarStates} />

			<Editor {...editorOptions} />

			<Statusbar />
		</Layout>
	);
}

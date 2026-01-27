import {
	Editor,
	type EditorProps,
	type EditorDocument,
	type EditorApi,
	type EditorError,
} from 'code-editor';
import { type ToolbarOptions, Wrapper } from './components';
import { useToolbarStates } from './hooks';
import { WorkbenchContext } from './contexts';

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
	const toolbarStates = useToolbarStates();

	return (
		<WorkbenchContext.Provider value={{ toolbarOptions, toolbarStates }}>
			<Editor {...editorProps} RootWrapper={Wrapper} />
		</WorkbenchContext.Provider>
	);
}

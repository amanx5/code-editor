import { WorkbenchRoot } from './WorkbenchRoot';
import { Toolbar } from './toolbar';
import { useWorkbenchContext } from '../hooks';
import type { EditorRootWrapper } from 'code-editor';
import { Statusbar } from './statusbar';
import { Fragment } from 'react/jsx-runtime';

export const Wrapper: EditorRootWrapper = ({ children }) => {
	const { editorProps, toolbarOptions, toolbarStates } =
		useWorkbenchContext();
	const EditorWrapper = editorProps.RootWrapper ?? Fragment;

	return (
		<WorkbenchRoot>
			<Toolbar options={toolbarOptions} states={toolbarStates} />
			<EditorWrapper>{children}</EditorWrapper>
			<Statusbar />
		</WorkbenchRoot>
	);
};

import { WorkbenchRoot } from './WorkbenchRoot';
import { Toolbar } from './toolbar';
import { useWorkbenchContext } from '../hooks';
import type { EditorRootWrapper } from 'code-editor';
import { Statusbar } from './statusbar';

export const Wrapper: EditorRootWrapper = ({ children }) => {
	const { toolbarOptions, toolbarStates } = useWorkbenchContext();

	return (
		<WorkbenchRoot>
			<Toolbar options={toolbarOptions} states={toolbarStates} />
			{children}
			<Statusbar />
		</WorkbenchRoot>
	);
};

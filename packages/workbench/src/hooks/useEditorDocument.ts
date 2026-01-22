import { useContext } from 'react';
import { WorkbenchContext } from '../contexts/WorkbenchContext';

export function useEditorDocument() {
	const workbenchContext = useContext(WorkbenchContext);

	if (!workbenchContext) {
		throw new Error(
			'Invalid hook call. Call this hook inside WorkbenchContext provider only.',
		);
	}

	return workbenchContext.editorDocument;
}

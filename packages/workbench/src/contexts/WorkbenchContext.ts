import type { EditorDocument } from 'code-editor';
import { createContext } from 'react';
import type { EditorApi } from '../../../editor/src/hooks';

export type WorkbenchContext = {
	editorApi: EditorApi | null,
	editorDocument: EditorDocument | null;
};

export const WorkbenchContext = createContext<WorkbenchContext | null>(null);
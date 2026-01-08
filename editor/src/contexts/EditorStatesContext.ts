import { createContext } from 'react';
import type { EditorError } from '../utils';

export type EditorStates = {
	error: EditorError;
	setError: React.Dispatch<React.SetStateAction<EditorError>>;
};

export const EditorStatesContext = createContext<EditorStates>({
	error: null,
	setError: () => {},
});

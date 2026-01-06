import { createContext } from 'react';
import type { Content, EditorError } from '../utils';

export type RootContext = {
	isWrapEnabled: boolean;
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
	error: EditorError;
	setError: React.Dispatch<React.SetStateAction<EditorError>>;
	onChange?: (content: Content, error: EditorError) => void;
};

export const RootContext = createContext<RootContext>({
	isWrapEnabled: false,
	setIsWrapEnabled: () => {},
	error: null,
	setError: () => {},
	onChange: () => {},
});

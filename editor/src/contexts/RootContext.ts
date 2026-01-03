import { createContext } from 'react';
import type { Content } from './EditorDocumentContext';
import type { CodeError } from '../utils';

export type RootContext = {
	isWrapEnabled: boolean;
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
	content: Content;
	setContent: React.Dispatch<React.SetStateAction<Content>>;
	error: CodeError;
	setError: React.Dispatch<React.SetStateAction<CodeError>>;
};

export const RootContext = createContext<RootContext>({
	isWrapEnabled: false,
	setIsWrapEnabled: () => {},
	content: '',
	setContent: () => {},
	error: null,
	setError: () => {},
});

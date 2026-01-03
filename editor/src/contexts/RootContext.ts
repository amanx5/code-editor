import { createContext } from 'react';
import type { Content } from './EditorDocumentContext';
import type { CodeError } from '../utils';

export type RootContext = {
	isWrapEnabled: boolean;
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
	internalContent: Content;
	setInternalContent: React.Dispatch<React.SetStateAction<Content>>;
	internalError: CodeError;
};

export const RootContext = createContext<RootContext>({
	isWrapEnabled: false,
	setIsWrapEnabled: () => {},
	internalContent: '',
	setInternalContent: () => {},
	internalError: null,
});

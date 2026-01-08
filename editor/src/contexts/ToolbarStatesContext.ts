import { createContext } from 'react';

export type ToolbarStateValues = {
	isWrapEnabled: boolean;
	isFormatEnabled: boolean;
};

export type ToolbarStateSetters = {
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
	setIsFormatEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ToolbarStates = ToolbarStateValues & ToolbarStateSetters;

export const ToolbarStatesDefault: ToolbarStates = {
	isWrapEnabled: false,
	isFormatEnabled: false,
	setIsWrapEnabled: () => {},
	setIsFormatEnabled: () => {},
};

export const ToolbarStatesContext =
	createContext<ToolbarStates>(ToolbarStatesDefault);

import { createContext } from "react";

export type CodeLineNumber = number;

export type EditorOptions = {
	disabled?: boolean;
	highlightLines?: CodeLineNumber[]
	hideLineNumbers?: boolean;
};

export const EditorOptionsDefault: EditorOptions = {
	disabled: false,
	highlightLines: [],
	hideLineNumbers: false,
};
export const EditorOptionsContext = createContext<EditorOptions>(EditorOptionsDefault);

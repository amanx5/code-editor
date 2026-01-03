import { createContext } from "react";
import type { CodeLanguage } from "../utils";

export type Content = string;
export type EditorDocument = {
	content: Content;
	language: CodeLanguage;
	name?: string;
};
export const EditorDocumentContext = createContext<EditorDocument>({
	content: '',
	language: 'txt',
});

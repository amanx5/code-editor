import { createContext } from "react";
import type { Content, Language } from "../utils";

export type EditorDocument = {
	content: Content;
	language: Language;
	name?: string;
};
export const EditorDocumentContext = createContext<EditorDocument>({
	content: '',
	language: 'txt',
});

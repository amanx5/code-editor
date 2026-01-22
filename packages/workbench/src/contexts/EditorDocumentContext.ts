import { createContext } from 'react';
import type { EditorDocument } from 'code-editor';

export const EditorDocumentContext = createContext<EditorDocument | null>(null);

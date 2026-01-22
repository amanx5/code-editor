import { createContext } from 'react';
import type { EditorApi } from 'code-editor';

export const EditorApiContext = createContext<EditorApi | null>(null);

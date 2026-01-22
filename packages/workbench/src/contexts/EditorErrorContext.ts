import { createContext } from 'react';
import type { EditorError } from 'code-editor';

export const EditorErrorContext = createContext<EditorError | null>(null);

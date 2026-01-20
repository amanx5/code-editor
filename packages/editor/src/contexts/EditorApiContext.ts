import { createContext } from 'react';
import type { EditorApi } from '../hooks';

export const EditorApiContext = createContext<EditorApi | null>(null);
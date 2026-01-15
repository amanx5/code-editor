import { createContext } from 'react';
import type { CursorApi, MarkupApi } from '../hooks';

export type EditorApi = {
	cursorApi: CursorApi;
	markupApi: MarkupApi;
};

export const EditorApiContext = createContext<EditorApi>({
	cursorApi: {} as CursorApi, // FIXME temporary cast
	markupApi: {} as MarkupApi,
});

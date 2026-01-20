import type { CursorSelection } from '../internals';
import { useCursorApi } from './useCursorApi';

export function useCursorSelection(): CursorSelection | null {
	const cursorApi = useCursorApi();

	return cursorApi.selection;
}

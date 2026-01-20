import type { EditorDocument } from '../..';
import { useMarkupApi } from './useMarkupApi';

export function useDocument(): EditorDocument | null{
	const markupApi = useMarkupApi();
	const commit = markupApi?.getCurrentCommit();

	return commit ? commit.document : null;
}

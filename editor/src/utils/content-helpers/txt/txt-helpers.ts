import type { ContentHelpers } from "..";

export const TXT_HELPERS: ContentHelpers['txt'] = {
	languageName: 'Text',
	validator: () => null,
	renderer: (content) => content,
};
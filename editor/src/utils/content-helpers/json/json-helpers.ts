import type { ContentHelpers } from "..";
import { validateJson } from "./decode-json";
import { renderJson } from "./render-json";

export const JSON_HELPERS: ContentHelpers['json'] = {
	languageName: 'JSON',
	validator: validateJson,
	renderer: renderJson,
};
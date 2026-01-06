import type { Content, EditorMarkup } from '../content-helpers';
import { beautifyJson } from './encode-json';

export function renderJson(content: Content, beautify?: boolean): EditorMarkup {
	const json = beautify ? beautifyJson(content) : content;

	return json;
}

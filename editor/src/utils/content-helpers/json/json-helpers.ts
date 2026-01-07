import type { LanguageUtil } from '..';
import { validateJson } from './decode-json';
import { generateMarkupJson } from './generate-markup-json';

export const JSON_HELPERS: LanguageUtil = {
	languageName: 'JSON',
	contentValidator: validateJson,
	markupGenerator: generateMarkupJson,
};

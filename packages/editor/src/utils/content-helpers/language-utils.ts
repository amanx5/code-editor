import { LANGUAGE_UTIL_TXT } from './txt';
import { LANGUAGE_UTIL_JSON } from './json';
import type { ContentTokeniser } from './tokenise-content';
import type { ContentValidator } from './validate-content';
import type { Language } from './language-names';

export type Content = string;

export type LanguageUtil = {
	contentValidator?: ContentValidator;
	contentTokeniser?: ContentTokeniser;
};

export const LANGUAGE_UTILS: Record<Language, LanguageUtil> = {
	cmd: {},
	js: {},
	jsx: {},
	json: LANGUAGE_UTIL_JSON,
	ts: {},
	tsx: {},
	txt: LANGUAGE_UTIL_TXT,
};

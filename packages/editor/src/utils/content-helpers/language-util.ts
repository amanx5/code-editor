import { LANGUAGE_UTIL_TXT } from './txt';
import type { ContentTokeniser } from './tokenise-content';
import type { ContentValidator } from './validate-content';
import { LANGUAGE_UTIL_JSON } from './json';

export type Content = string;
export type Language = 'cmd' | 'json' | 'js' | 'jsx' | 'txt' | 'ts' | 'tsx';
export type LanguageName = string;

export type LanguageUtil = {
	languageName: LanguageName;
	contentValidator?: ContentValidator;
	contentTokeniser?: ContentTokeniser;
};

export const LANGUAGE_UTIL: Record<Language, LanguageUtil> = {
	cmd: { languageName: 'Command' },
	js: { languageName: 'JavaScript' },
	jsx: { languageName: 'JavaScript XML' },
	json: LANGUAGE_UTIL_JSON,
	ts: { languageName: 'TypeScript' },
	tsx: { languageName: 'TypeScript XML' },
	txt: LANGUAGE_UTIL_TXT,
};

export function getLanguageName(language: Language): LanguageName {
	return LANGUAGE_UTIL[language]?.languageName;
}

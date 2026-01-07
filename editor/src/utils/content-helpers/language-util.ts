import type { MarkupGenerator } from './generate-markup';
import { JSON_HELPERS } from './json';
import { TXT_HELPERS } from './txt';
import type { ContentcontentValidator } from './validate-content';

export type Content = string;
export type Language = 'cmd' | 'json' | 'js' | 'jsx' | 'txt' | 'ts' | 'tsx';
export type LanguageName = string;

export type LanguageUtil = {
	languageName: LanguageName;
	contentValidator?: ContentcontentValidator;
	markupGenerator?: MarkupGenerator;
};

export const LANGUAGE_UTIL: Record<Language, LanguageUtil> = {
	cmd: { languageName: 'Command' },
	js: { languageName: 'JavaScript' },
	jsx: { languageName: 'JavaScript XML' },
	json: JSON_HELPERS,
	ts: { languageName: 'TypeScript' },
	tsx: { languageName: 'TypeScript XML' },
	txt: TXT_HELPERS,
};

export function getLanguageName(language: Language): LanguageName {
	return LANGUAGE_UTIL[language]?.languageName;
}

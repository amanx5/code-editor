import type { LanguageUtil } from '..';
import { contentTokeniserTxt } from './content-tokeniser-txt';

export const LANGUAGE_UTIL_TXT: LanguageUtil = {
	languageName: 'Text',
	contentValidator: () => null,
	contentTokeniser: contentTokeniserTxt,
};

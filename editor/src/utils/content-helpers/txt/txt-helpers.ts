import type { LanguageUtil } from '..';
import { generateMarkupTxt } from './generate-markup-txt';

export const TXT_HELPERS: LanguageUtil = {
	languageName: 'Text',
	contentValidator: () => null,
	markupGenerator: generateMarkupTxt,
};

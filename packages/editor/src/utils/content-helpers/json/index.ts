import type { LanguageUtil } from '..';
import { contentValidatorJson } from './content-validator-json';
import { contentTokeniserJson } from './content-tokeniser-json';

export const LANGUAGE_UTIL_JSON: LanguageUtil = {
	contentValidator: contentValidatorJson,
	contentTokeniser: contentTokeniserJson,
};

export * from './decode-json';
export * from './encode-json';
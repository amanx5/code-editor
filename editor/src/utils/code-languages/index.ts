import type { Code, CodeError, CodeLanguage } from '../../CodeEditor';
import { validateJson } from './json/decode-json';
import { beautifyJson } from './json/encode-json';

export type TokenizedLine = string; // TODO

type CodeLanguageUtil = {
	name: string;
	validate?: (code: Code) => CodeError;
	beautify?: (code: Code) => Code;
	tokenizer?: (code: Code) => TokenizedLine[];
};
export const CODE_LANGUAGES: Record<CodeLanguage, CodeLanguageUtil> = {
	cmd: { name: 'Terminal' },
	js: { name: 'JavaScript' },
	jsx: { name: 'JavaScript XML' },
	json: {
		name: 'JSON',
		validate: validateJson,
		beautify: beautifyJson,
	},
	ts: { name: 'TypeScript' },
	tsx: { name: 'TypeScript XML' },
};

export function validateCode(code: Code, codeLang: CodeLanguage): CodeError {
	const validate = CODE_LANGUAGES[codeLang]?.validate;
	if (validate) {
		return validate(code);
	}
	return null;
}

import type { Code } from '../../CodeEditor';
import type { CodeTokens } from './code-tokenization';
import type { CodeError } from './code-validation';
import { jsonUtil } from './json';

export type CodeLanguage = 'cmd' | 'json' | 'js' | 'jsx' | 'txt' | 'ts' | 'tsx';
export type CodeLanguageUtil = {
	name: string;
	validate?: (code: Code) => CodeError;
	beautify?: (code: Code) => Code;
	tokenize?: (code: Code) => CodeTokens;
};
export const CODE_LANGUAGES: Record<CodeLanguage, CodeLanguageUtil> = {
	cmd: { name: 'Command' },
	js: { name: 'JavaScript' },
	jsx: { name: 'JavaScript XML' },
	json: jsonUtil,
	ts: { name: 'TypeScript' },
	tsx: { name: 'TypeScript XML' },
	txt: { name: 'Text' },
};

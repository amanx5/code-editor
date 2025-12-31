import type { Code } from "../../CodeEditor";
import { CODE_LANGUAGES, type CodeLanguage } from "./code-languages";

export type CodeError = {
	message: string;
	type?: string;
	position?: number;
	line?: number;
	column?: number;
} | null;

export function validateCode(code: Code, codeLang: CodeLanguage): CodeError {
	const validate = CODE_LANGUAGES[codeLang]?.validate;
	if (validate) {
		return validate(code);
	}
	return null;
}
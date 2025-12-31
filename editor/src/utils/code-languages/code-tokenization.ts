import type { Code } from "../../CodeEditor";
import { CODE_LANGUAGES, type CodeLanguage } from "./code-languages";

export type TokenizedLine = string;
export type CodeTokens = TokenizedLine[];

export function tokenizeCode(code: Code, codeLang: CodeLanguage): CodeTokens {
    const tokenize = CODE_LANGUAGES[codeLang]?.tokenize;
    if (tokenize) {
        return tokenize(code);
    }
    
    return code.split('\n');
}
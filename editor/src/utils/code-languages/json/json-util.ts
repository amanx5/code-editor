import type { CodeLanguageUtil } from "..";
import { validateJson } from "./decode-json";
import { beautifyJson } from "./encode-json";

export const jsonUtil: CodeLanguageUtil = {
	name: 'JSON',
	validate: validateJson,
	beautify: beautifyJson,
};
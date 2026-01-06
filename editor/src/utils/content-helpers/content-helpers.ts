import { JSON_HELPERS } from './json';
import { TXT_HELPERS } from './txt';

export type Content = string;
export type Language = 'cmd' | 'json' | 'js' | 'jsx' | 'txt' | 'ts' | 'tsx';
export type LanguageName = string;
export type EditorMarkup = string;
export type EditorError = {
	message: string;
	type?: string;
	position?: number;
	line?: number;
	column?: number;
} | null;

export type ContentValidator = (content: Content) => EditorError;
export type ContentRenderer = (
	content: Content,
	beautify?: boolean
) => EditorMarkup;

export type ContentHelpers = {
	[key in Language]: {
		languageName: LanguageName;
		validator?: ContentValidator;
		renderer?: ContentRenderer;
	};
};

export const CONTENT_HELPERS: ContentHelpers = {
	cmd: { languageName: 'Command' },
	js: { languageName: 'JavaScript' },
	jsx: { languageName: 'JavaScript XML' },
	json: JSON_HELPERS,
	ts: { languageName: 'TypeScript' },
	tsx: { languageName: 'TypeScript XML' },
	txt: TXT_HELPERS,
};

export function renderContent(
	content: Content,
	language: Language,
	beautify?: boolean
): EditorMarkup {
	const renderer = CONTENT_HELPERS[language]?.renderer;

	if (!renderer) {
		throw new Error(`No renderer found for language: ${language}`);
	}

	return renderer(content, beautify);
}

export function validateContent(
	content: Content,
	language: Language
): EditorError {
	const validator = CONTENT_HELPERS[language]?.validator;

	if (!validator) {
		throw new Error(`No validator found for language: ${language}`);
	}

	return validator(content);
}

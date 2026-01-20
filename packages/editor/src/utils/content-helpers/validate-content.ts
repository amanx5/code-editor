import type { EditorDocument } from '../../';
import { LANGUAGE_UTIL, type Content } from './language-util';

export type EditorError = {
	message: string;
	type?: string;
	position?: number;
	line?: number;
	column?: number;
} | null;

export type ContentValidator = (content: Content) => EditorError;

export function validateContent(document: EditorDocument): EditorError {
	const { content, language } = document;

	let contentValidator: ContentValidator;
	if (LANGUAGE_UTIL[language].contentValidator) {
		contentValidator = LANGUAGE_UTIL[language].contentValidator;
	} else {
		console.warn(
			`No 'contentValidator' found for language '${language}'. Content will be validated as plain-text.`
		);

		contentValidator = LANGUAGE_UTIL.txt.contentValidator!;
	}

	return contentValidator(content);
}

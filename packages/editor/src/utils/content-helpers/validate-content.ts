import type { EditorDocument } from '../../';
import { LANGUAGE_UTILS, type Content } from './language-utils';

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

	if (!LANGUAGE_UTILS[language].contentValidator) {
		console.warn(
			`No 'contentValidator' found for language '${language}'. Content will not be validated.`,
		);
		return null;
	}

	return LANGUAGE_UTILS[language].contentValidator(content);
}

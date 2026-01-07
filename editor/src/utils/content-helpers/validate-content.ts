import type { EditorDocument } from '../../contexts';
import { LANGUAGE_UTIL, type Content } from './language-util';

export type EditorError = {
	message: string;
	type?: string;
	position?: number;
	line?: number;
	column?: number;
} | null;
export type ContentcontentValidator = (content: Content) => EditorError;

export function validateContent(document: EditorDocument): EditorError {
	const { content, language } = document;
	const contentValidator = LANGUAGE_UTIL[language]?.contentValidator;

	if (!contentValidator) {
		throw new Error(
			`No 'contentValidator' found for language '${language}'`
		);
	}

	return contentValidator(content);
}

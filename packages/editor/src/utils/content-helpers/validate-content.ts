import type { EditorDocument, LineColumn, LineNumber } from '../../';
import { LANGUAGE_UTILS, type Content } from './language-utils';

export type IssueType = 'error' | 'warning';

export type LineIssue = {
	column?: LineColumn;
	message: string;
	type: IssueType;
};

export type DocumentIssues = Record<LineNumber, LineIssue>;

export type ContentValidator = (content: Content) => DocumentIssues;

export function validateContent(document: EditorDocument): DocumentIssues {
	const { content, language } = document;

	if (!LANGUAGE_UTILS[language].contentValidator) {
		console.warn(
			`No 'contentValidator' found for language '${language}'. Content will not be validated.`,
		);
		return {};
	}

	return LANGUAGE_UTILS[language].contentValidator(content);
}

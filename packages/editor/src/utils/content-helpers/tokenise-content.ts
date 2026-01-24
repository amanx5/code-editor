import type { EditorDocument } from '../../';
import { LANGUAGE_UTILS, type Content } from './language-utils';

export type TokenMeta = {
	cls: string;
	value: Content;
};

export type TokenisedLine = {
	tokens: TokenMeta[];
	value: Content;
};

export type ContentTokeniser = (content: Content) => TokenisedLine[];

export function tokeniseContent(document: EditorDocument): TokenisedLine[] {
	const { content, language } = document;

	const contentTokeniser = LANGUAGE_UTILS[language].contentTokeniser;
	if (!contentTokeniser) {
		console.warn(
			`No 'contentTokeniser' found for language '${language}'. Using 'txt' content-tokeniser instead.`,
		);

		const txtContentTokeniser = LANGUAGE_UTILS.txt.contentTokeniser;

		if (!txtContentTokeniser) {
			throw new Error(`No 'contentTokeniser' found for language 'txt'.`);
		}

		return txtContentTokeniser(content);
	}

	return contentTokeniser(content);
}

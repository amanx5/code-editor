import type { EditorDocument } from '../../';
import { LANGUAGE_UTIL, type Content } from './language-util';

export type TokenMeta = {
	cls: string;
	value: string;
};

export type TokenisedLine = {
	content: Content;
	tokens: TokenMeta[];
};

export type ContentTokeniser = (content: Content) => TokenisedLine[];

export function tokeniseContent(document: EditorDocument): TokenisedLine[] {
	const { content, language } = document;

	let contentTokeniser: ContentTokeniser;

	if (LANGUAGE_UTIL[language].contentTokeniser) {
		contentTokeniser = LANGUAGE_UTIL[language].contentTokeniser;
	} else {
		console.warn(
			`No 'contentTokeniser' found for language '${language}'. Content will be displayed as plain-text.`,
		);

		contentTokeniser = LANGUAGE_UTIL.txt.contentTokeniser!;
	}

	return contentTokeniser(content);
}

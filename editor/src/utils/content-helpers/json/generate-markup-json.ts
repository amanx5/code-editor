import { type MarkupGenerator } from '../generate-markup';
import { generateMarkupTxt } from '../txt/generate-markup-txt';
import { beautifyJson } from './encode-json';

export const generateMarkupJson: MarkupGenerator = (content, error, options) => {
	const json = options?.beautify ? beautifyJson(content) : content;

	return generateMarkupTxt(json, error, options);
};

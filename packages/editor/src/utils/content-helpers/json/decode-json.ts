import type { DocumentIssues } from '../validate-content';

export type JsonDecodeResult = {
	value?: object;
	issues?: DocumentIssues;
};
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * If provided `json` is valid, this method returns object containing decoded value
 * otherwise returns object containing JSON issues.
 */
export function decode(json: string): JsonDecodeResult {
	try {
		const value = JSON.parse(json);
		return { value };
	} catch (error) {
		return {
			issues: getJsonIssues(json, error as SyntaxError),
		};
	}
}

/**
 * Prepares issue metadata from message property of `SyntaxError` thrown by JSON.parse.
 * This method is only reliable for V8 based browsers.
 *
 * TODO: Need to use some other approach (maybe use jsonc-parser)
 * as JSON.parse is native method and its implementation can vary on different browsers.
 */
function getJsonIssues(json: string, err: SyntaxError): DocumentIssues {
	let position, line = 1, column;

	// Examples:
	// Unexpected end of JSON input
	// Unexpected token 'a', "abc" is not valid JSON
	// Expected ':' after property name in JSON at position 13 (line 4 column 1)
	// Expected ',' or '}' after property value in JSON at position 21 (line 3 column 3)
	const message = err.message;

	const positionMatch = message.match(/at position\s+(\d+)/i);
	const lineColumnMatch = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);

	if (positionMatch) {
		position = Number(positionMatch[1]);

		column = 0;
		for (let i = 0; i < position; i++) {
			if (json[i] === '\n') {
				line++;
				column = 0;
			} else {
				column++;
			}
		}
	} else if (lineColumnMatch) {
		line = Number(lineColumnMatch[1]);
		column = Number(lineColumnMatch[2]);
	}

	return {
		[line]: {
			column,
			message,
			type: 'error',
		},
	};
}

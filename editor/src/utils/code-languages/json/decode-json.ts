export type JsonDecodeResult = {
	value?: object;
	error?: JsonErrorMeta;
};
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * If provided `json` is valid, this method returns object containing decoded value
 * otherwise returns object containing `JsonError`.
 */
export function decode(json: string): JsonDecodeResult {
	try {
		const value = JSON.parse(json);
		return { value };
	} catch (catchedError) {
		return {
			error: getJsonErrorMeta(catchedError),
		};
	}
}

export type JsonErrorMeta = {
	message: SyntaxError['message'];
	type?: 'SyntaxError';
	position?: number;
	line?: number;
	column?: number;
};
/**
 * Extracts error metadata from message property of `SyntaxError` thrown by JSON.parse.
 * This method is only reliable for V8 based browsers.
 *
 * TODO: Need to use some other approach (maybe use jsonc-parser)
 * as JSON.parse is native method and its implementation can vary on different browsers.
 */
export function getJsonErrorMeta(err: unknown | SyntaxError): JsonErrorMeta {
	if (err instanceof SyntaxError) {
		let position, line, column;

		// Examples:
		// Unexpected end of JSON input
		// Unexpected token 'a', "abc" is not valid JSON
		// Expected ':' after property name in JSON at position 13 (line 4 column 1)
		// Expected ',' or '}' after property value in JSON at position 21 (line 3 column 3)
		const message = err.message;

		const positionMatch = message.match(/at position\s+(\d+)/i);
		if (positionMatch) {
			position = Number(positionMatch[1]);
		}

		const lineColumnMatch = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);
		if (lineColumnMatch) {
			line = Number(lineColumnMatch[1]);
			column = Number(lineColumnMatch[2]);
		}

		return {
			type: 'SyntaxError',
			message,
			position,
			line,
			column,
		};
	} else {
		return {
			message: 'Invalid JSON string.',
		};
	}
}

export function validateJson(json: string) {
	const { error } = decode(json);

	return error || null;
}

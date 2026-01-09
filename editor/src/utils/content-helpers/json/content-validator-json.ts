import { decode } from "./decode-json";

export function contentValidatorJson(json: string) {
	const { error } = decode(json);

	return error || null;
}



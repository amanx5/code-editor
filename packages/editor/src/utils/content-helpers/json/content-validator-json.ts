import type { ContentValidator } from "../validate-content";
import { decode } from "./decode-json";

export const contentValidatorJson: ContentValidator = (json) => {
	const { issues } = decode(json);

	return issues ?? {};
}

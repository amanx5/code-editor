import { isEqualObjects } from "../..";

export function arePropValuesEqual<T>(propValue1: T, propValue2: T) {
	return isEqualObjects(propValue1, propValue2);
}

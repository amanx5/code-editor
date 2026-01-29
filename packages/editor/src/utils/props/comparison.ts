import { isEqualObjects } from '../..';

export function comparePropsByValue<P>(prevProps: P, nextProps: P) {
	return isEqualObjects(prevProps, nextProps);
}

import type {
	EditorEventHandler,
} from '../get-event-handlers';
import { setCursorPositionOnEvent } from '../../../hooks';

export const handlePointerUp: EditorEventHandler<'onPointerUp'> = (e, apiMap) => {
	console.log('pointer up');

	setCursorPositionOnEvent(e, apiMap);
};


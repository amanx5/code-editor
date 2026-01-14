import { setCursorPositionOnEvent } from '../../../hooks';
import type { EditorEventHandler } from '../get-event-handlers';

export const handlePointerDown: EditorEventHandler<'onPointerDown'> = (e, apiMap) => {
    console.log('pointer down');

    setCursorPositionOnEvent(e, apiMap);
};

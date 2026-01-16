import type { EditorEventHandler } from '../get-event-handlers';

export const handlePointerDown: EditorEventHandler<'onPointerDown'> = (e, apiMap) => {
    console.log('pointer down');
    const {cursorApi} = apiMap;

    cursorApi.setPositionOnPointer(e);
};

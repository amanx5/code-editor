import type { EditorEventHandler } from '../get-event-handlers';

export const handlePointerDown: EditorEventHandler<'onPointerDown'> = (e, editorApi) => {
    console.log('pointer down');
    const {cursorApi} = editorApi;

    cursorApi.setPositionOnPointer(e);
};

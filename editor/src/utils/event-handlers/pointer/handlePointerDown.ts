import type { EditorEventHandler } from '../get-event-handlers';

export const handlePointerDown: EditorEventHandler<'onPointerDown'> = (e, apiMap) => {
    console.log('pointer down');

    // e.preventDefault(); // focus will not fire if preventDefault is called

    const { cursorApi } = apiMap;

    cursorApi.setVisible(false)
};

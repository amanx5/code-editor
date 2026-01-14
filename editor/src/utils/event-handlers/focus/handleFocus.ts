import type { EditorEventHandler } from '../get-event-handlers';

export const handleFocus: EditorEventHandler<'onFocus'> = (eventObject, apiMap) => {
    console.log('focus');

    // don't need to make cursor visible here, pointer event handlers will do that
};
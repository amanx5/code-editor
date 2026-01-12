import type { EditorEventHandler } from '../get-event-handlers';

export const handleFocus: EditorEventHandler<'onFocus'> = (eventObject, apiMap) => {
    console.log('focus');

    const {cursorApi} = apiMap;
    
    cursorApi.setVisible(true);
};
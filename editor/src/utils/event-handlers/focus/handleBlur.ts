import type { EditorEventHandler } from '../get-event-handlers';

export const handleBlur: EditorEventHandler<'onBlur'> = (eventObject, apiMap) => {
    console.log('blur');
    const {cursorApi} = apiMap;
    
    cursorApi.setVisible(false);
};

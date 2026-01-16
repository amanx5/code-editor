import type { EditorEventHandler } from '../get-event-handlers';

export const handleBlur: EditorEventHandler<'onBlur'> = (eventObject, editorApi) => {
    console.log('blur');
    const {cursorApi} = editorApi;
    
    cursorApi.setVisible(false);
};

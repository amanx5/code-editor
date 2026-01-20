import type { EditorEventHandler } from '../get-event-handlers';

export const handleBlur: EditorEventHandler<'onBlur'> = (eventObject, editorApi) => {
    console.log('blur');
    const {markupApi} = editorApi;
    
    markupApi.setFocused(false);
};

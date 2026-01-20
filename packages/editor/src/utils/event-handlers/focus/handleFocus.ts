import type { EditorEventHandler } from '../get-event-handlers';

export const handleFocus: EditorEventHandler<'onFocus'> = (eventObject, editorApi) => {
    console.log('focus');

    const {markupApi} = editorApi;

    markupApi.setFocused(true);
};
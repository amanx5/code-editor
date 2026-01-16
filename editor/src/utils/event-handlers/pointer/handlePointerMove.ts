import type { EditorEventHandler } from '../get-event-handlers';

// FIXME: 
// - Needs debouncing
// - Unable to calculate Cursor position when selection is moved outside the markup element
// - Native selection also selects elements outside the markup element
export const handlePointerMove: EditorEventHandler<'onPointerMove'> = (e, apiMap) => {
    // when primary button is pressed
    if (e.buttons === 1 ) {
        console.log('pointer move with button 1');
        const {cursorApi} = apiMap;
        
        cursorApi.setPositionOnPointer(e);
    }
};

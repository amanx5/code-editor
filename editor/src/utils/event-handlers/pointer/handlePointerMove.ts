import { setCursorPositionOnEvent } from '../../../hooks';
import type { EditorEventHandler } from '../get-event-handlers';

export const handlePointerMove: EditorEventHandler<'onPointerMove'> = (e, apiMap) => {
    
    if (e.buttons === 1 ) {
        console.log('pointer move with button 1');
        setCursorPositionOnEvent(e, apiMap);
    }
};

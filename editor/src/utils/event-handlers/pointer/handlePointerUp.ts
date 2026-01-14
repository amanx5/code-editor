import type {
	EditorEventHandler,
} from '../get-event-handlers';

export const handlePointerUp: EditorEventHandler<'onPointerUp'> = (e, apiMap) => {
	console.log('pointer up');
};


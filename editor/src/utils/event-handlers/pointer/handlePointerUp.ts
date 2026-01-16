import type {
	EditorEventHandler,
} from '../get-event-handlers';

export const handlePointerUp: EditorEventHandler<'onPointerUp'> = (e, editorApi) => {
	console.log('pointer up');
};


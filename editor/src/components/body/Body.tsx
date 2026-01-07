import { cls } from '../../utils';
import { MarkupEditor } from './input-layer';

/**
 * Code Editor Body Component
 *
 * TODO: Scroll the body when the user enters on last line or type in the end of a line
 */
export function Body() {

	return (
		/* scroller */
		<div className={cls('flex flex-1 py-2 overflow-auto relative')}>
			<MarkupEditor
			/>
		</div>
	);
}

export type DomUpdater = () => boolean;
export type StateUpdater = () => void;

export function applyEdit(
	event:
		| React.KeyboardEvent<HTMLPreElement>
		| React.ClipboardEvent<HTMLPreElement>,
	domUpdater: DomUpdater,
	stateUpdater: StateUpdater
) {
	event.preventDefault();

	if (domUpdater()) {
		stateUpdater();
	}
}